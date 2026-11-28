/* Comportamiento de la ficha «marcen-gt» (código original, aplicado solo dentro de la ficha). */
export function run({ root, body, addEventListener, IntersectionObserver, setInterval }) {
(()=>{const els=root.querySelectorAll('.rv');const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(red||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'))}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});els.forEach(e=>io.observe(e))}
const vids=root.querySelectorAll('video');if(red){vids.forEach(v=>{v.pause();v.removeAttribute('autoplay')})}else if('IntersectionObserver'in window){const vo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const p=e.target.play();p&&p.catch&&p.catch(()=>{})}else e.target.pause()}),{threshold:.2});vids.forEach(v=>vo.observe(v))}
root.querySelectorAll('.rnav').forEach(n=>{const r=n.previousElementSibling.classList.contains('rail')?n.previousElementSibling:n.parentElement.querySelector('.rail');const bs=n.querySelectorAll('.rbtn');const up=()=>{bs[0].disabled=r.scrollLeft<4;bs[1].disabled=r.scrollLeft>r.scrollWidth-r.clientWidth-4};bs.forEach(x=>x.addEventListener('click',()=>{const f=r.querySelector('figure');r.scrollBy({left:x.dataset.dir*(f.offsetWidth+18),behavior:'smooth'})}));r.addEventListener('scroll',up,{passive:true});addEventListener('resize',up);up()});
})();
}
