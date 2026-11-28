/* Comportamiento de la ficha «juana-brava» (código original, aplicado solo dentro de la ficha). */
export function run({ root, body, addEventListener, IntersectionObserver, setInterval }) {
(()=>{const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
const els=root.querySelectorAll('.rv');
if(red||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'))}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06});els.forEach(e=>io.observe(e))}
body.classList.add('loaded');
const hero=root.querySelector('.hero-img'),hi=root.querySelector('.hero-in'),stw=[...root.querySelectorAll('#stw span')];
const par=[...root.querySelectorAll('.home>img,.end>img')];const party=root.querySelector('.party'),peep=root.querySelector('.peep');
const onS=()=>{const y=scrollY;if(red){stw.forEach(w=>w.classList.add('lit'));return}
 hero.style.transform='translateY('+(y*.25)+'px)';hi.style.opacity=Math.max(0,1-y/(innerHeight*.55));hi.style.transform='translateY('+(-y*.2)+'px)';
 const st=root.getElementById('stw').getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.85-st.top)/(st.height+innerHeight*.35)));stw.forEach((w,i)=>w.classList.toggle('lit',i/stw.length<p));
 {const r=party.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));const e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;peep.style.setProperty('--r',(3+e*90)+'%');peep.style.setProperty('--p',e);root.querySelector('.peep-intro').style.opacity=Math.max(0,1-p*4);root.querySelector('.party-pin').style.setProperty('--dot',Math.max(0,1-p*6));const pv=root.querySelector('.peep-v');if(p>.02&&p<1.2&&r.bottom>0){if(pv.paused){const q=pv.play();q&&q.catch&&q.catch(()=>{})}}}
 par.forEach(im=>{const r=im.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)im.style.transform='translateY('+(r.top*-.15)+'px) scale(1.15)'});};
addEventListener('scroll',onS,{passive:true});onS();
root.querySelectorAll('video[src*=""]').forEach(v=>{if(v.closest('.peep')||v.poster&&v.parentElement.querySelector('figcaption')&&/Reel/.test(v.parentElement.textContent)){v.addEventListener('loadedmetadata',()=>{if(v.currentTime<1.5)v.currentTime=1.8},{once:true})}});
const pls=[...root.querySelectorAll('.pl-list button')],pps=[...root.querySelectorAll('.pl-pane')];
const showS=k=>{muteAll();pls.forEach((x,n)=>x.classList.toggle('on',n===k));pps.forEach((x,n)=>{x.classList.toggle('on',n===k);x.querySelectorAll('video').forEach(v=>{if(n===k&&!red){v.currentTime=v.closest('.pl-pane')===pps[3]?1.8:0;const q=v.play();q&&q.catch&&q.catch(()=>{})}else v.pause()})})};
pls.forEach((x,n)=>x.addEventListener('click',()=>showS(n)));
const muteAll=(except)=>root.querySelectorAll('video').forEach(v=>{if(v!==except&&!v.muted){v.muted=true;const s=v.parentElement.querySelector('.sound')||v.closest('.peep')?.querySelector('.sound');if(s){s.setAttribute('aria-pressed','false');s.textContent='Activar sonido'}}});
root.querySelectorAll('.replay').forEach(r=>r.addEventListener('click',()=>{const v=r.closest('.peep').querySelector('video');v.currentTime=1.8;const q=v.play();q&&q.catch&&q.catch(()=>{})}));
if('IntersectionObserver'in window){const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting){const v=e.target.querySelector('video');if(v&&!v.muted){v.muted=true;v.pause();const s=e.target.querySelector('.sound');if(s){s.setAttribute('aria-pressed','false');s.textContent='Activar sonido'}}}}),{threshold:0,rootMargin:'-35% 0px -35% 0px'});root.querySelectorAll('.party-pin,.pl-phone').forEach(x=>so.observe(x))}
root.querySelectorAll('.sound').forEach(s=>s.addEventListener('click',()=>{const v=s.closest('.peep,.pl-phone').querySelector('video');if(v.muted)muteAll(v);v.muted=!v.muted;s.setAttribute('aria-pressed',String(!v.muted));s.textContent=v.muted?'Activar sonido':'Silenciar'}));
const sky=root.querySelector('.sky'),pat=root.querySelector('.pat');if(!red&&matchMedia('(pointer:fine)').matches)sky.addEventListener('pointermove',e=>{const r=sky.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,yy=(e.clientY-r.top)/r.height-.5;pat.style.transform='rotate('+(x*8)+'deg) translate('+(x*20)+'px,'+(yy*20)+'px)'});
const imgs=[...root.querySelectorAll('.sw-stage img')],btns=[...root.querySelectorAll('.sw-list button')];let cur=0,timer;
const go=i=>{cur=i;imgs.forEach((m,k)=>m.classList.toggle('on',k===i));btns.forEach((x,k)=>x.classList.toggle('on',k===i));const bar=root.querySelector('.sw-bar i');bar.style.animation='none';bar.offsetWidth;bar.style.animation=''};
const loop=()=>{clearInterval(timer);if(!red)timer=setInterval(()=>go((cur+1)%imgs.length),2600)};btns.forEach(x=>x.addEventListener('click',()=>{go(+x.dataset.i);loop()}));loop();
root.querySelectorAll('.rnav').forEach(n=>{const r=n.previousElementSibling;const bs=n.querySelectorAll('.rbtn');const up=()=>{bs[0].disabled=r.scrollLeft<4;bs[1].disabled=r.scrollLeft>r.scrollWidth-r.clientWidth-4};bs.forEach(x=>x.addEventListener('click',()=>{const f=r.querySelector('figure');r.scrollBy({left:x.dataset.dir*(f.offsetWidth+18),behavior:'smooth'})}));r.addEventListener('scroll',up,{passive:true});addEventListener('resize',up);up()});
root.querySelectorAll('.rail').forEach(r=>r.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY))return},{passive:true}));
const vids=root.querySelectorAll('video');if(red){vids.forEach(v=>v.pause())}else if('IntersectionObserver'in window){const vo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const p=e.target.play();p&&p.catch&&p.catch(()=>{})}else e.target.pause()}),{threshold:.2});vids.forEach(v=>vo.observe(v))}
})();
}
