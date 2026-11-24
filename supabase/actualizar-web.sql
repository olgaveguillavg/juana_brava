-- Juana Brava · actualizar las páginas para buscadores al publicar o borrar.
-- Cuando cambia lo publicado, la base de datos avisa a Vercel (deploy hook) y la web se vuelve a compilar.
-- La dirección del deploy hook se guarda en la tabla privada `ajustes`, nunca en el código ni en el CMS:
--   insert into public.ajustes (clave, valor) values ('deploy_hook', 'DIRECCION-DEL-HOOK')
--   on conflict (clave) do update set valor = excluded.valor;

create extension if not exists pg_net;

-- Sin políticas ni permisos: desde fuera no se puede leer ni escribir.
create table if not exists public.ajustes (clave text primary key, valor text not null);
alter table public.ajustes enable row level security;
revoke all on public.ajustes from anon, authenticated;

create or replace function public.avisar_web() returns trigger
language plpgsql security definer set search_path = public as $$
declare hook text;
begin
  -- Guardar un borrador no cambia la web: solo cuenta lo publicado.
  if (tg_op = 'DELETE' and old.publicada is not null)
     or (tg_op = 'INSERT' and new.publicada is not null)
     or (tg_op = 'UPDATE' and new.publicada is distinct from old.publicada) then
    -- Un fallo en el aviso nunca debe impedir publicar o borrar.
    begin
      select valor into hook from public.ajustes where clave = 'deploy_hook';
      if hook like 'https://api.vercel.com/v1/integrations/deploy/%' then
        perform net.http_post(url := hook);
      end if;
    exception when others then
      raise warning 'No se pudo avisar a la web';
    end;
  end if;
  return null;
end;
$$;

drop trigger if exists avisar_web on public.publicaciones;
create trigger avisar_web after insert or update or delete on public.publicaciones
  for each row execute function public.avisar_web();
