-- Juana Brava · base de datos del CMS.
-- Se pega entero en Supabase > SQL Editor y se pulsa "Run". Se puede ejecutar varias veces.
-- ANTES de ejecutarlo: cambia los dos correos del final del bloque 1.

-- 1. Quién puede entrar al CMS -------------------------------------------------
create table if not exists public.editores (email text primary key);
alter table public.editores enable row level security;

insert into public.editores (email) values
  ('CAMBIA-TU-CORREO@ejemplo.com'),
  ('CAMBIA-CORREO-COMPANERA@ejemplo.com')
on conflict (email) do nothing;

create or replace function public.es_editor() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.editores where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

-- 2. Publicaciones --------------------------------------------------------------
create table if not exists public.publicaciones (
  id               text primary key,
  contenido        jsonb not null,          -- borrador que se está editando
  publicada        jsonb,                   -- versión visible en la web
  publicada_el     timestamptz,
  modificada_el    timestamptz,
  programada       jsonb,                   -- versión que saldrá en la fecha elegida
  programada_para  timestamptz,
  vistas           jsonb not null default '{}'::jsonb,
  actualizada_el   timestamptz not null default now()
);
alter table public.publicaciones enable row level security;
drop policy if exists "editoras: publicaciones" on public.publicaciones;
create policy "editoras: publicaciones" on public.publicaciones
  for all to authenticated using (public.es_editor()) with check (public.es_editor());

-- Lo único que ve la web: lo publicado y lo programado cuya hora ya ha llegado.
-- Los borradores no salen nunca.
create or replace view public.ideas_publicas as
select id,
  case when programada_para <= now() then programada else publicada end as contenido,
  case when programada_para <= now() then coalesce(publicada_el, programada_para) else publicada_el end as publicada_el
from public.publicaciones
where publicada is not null or programada_para <= now();
revoke all on public.ideas_publicas from anon, authenticated;
grant select on public.ideas_publicas to anon, authenticated;
grant select, insert, update, delete on public.publicaciones to authenticated;

-- 3. Imágenes y vídeos ----------------------------------------------------------
create table if not exists public.archivos (
  id         text primary key,
  tipo       text not null check (tipo in ('image', 'video')),
  nombre     text not null,
  tamano     bigint not null,
  subido_el  timestamptz not null default now()
);
alter table public.archivos enable row level security;
drop policy if exists "editoras: archivos" on public.archivos;
create policy "editoras: archivos" on public.archivos
  for all to authenticated using (public.es_editor()) with check (public.es_editor());
grant select, insert, update, delete on public.archivos to authenticated;

-- La web necesita ver las imágenes, así que la carpeta es de lectura pública. Máximo 30 MB por archivo.
insert into storage.buckets (id, name, public, file_size_limit)
values ('ideas', 'ideas', true, 31457280)
on conflict (id) do nothing;

drop policy if exists "editoras: ver" on storage.objects;
drop policy if exists "editoras: subir" on storage.objects;
drop policy if exists "editoras: cambiar" on storage.objects;
drop policy if exists "editoras: borrar" on storage.objects;
create policy "editoras: ver" on storage.objects for select to authenticated
  using (bucket_id = 'ideas' and public.es_editor());
create policy "editoras: subir" on storage.objects for insert to authenticated
  with check (bucket_id = 'ideas' and public.es_editor());
create policy "editoras: cambiar" on storage.objects for update to authenticated
  using (bucket_id = 'ideas' and public.es_editor());
create policy "editoras: borrar" on storage.objects for delete to authenticated
  using (bucket_id = 'ideas' and public.es_editor());
