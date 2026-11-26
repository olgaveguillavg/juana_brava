/* Comportamiento de la ficha «vyrk-r01» (código original, aplicado solo dentro de la ficha). */
export function run({ root, body, addEventListener, IntersectionObserver, setInterval }) {
(()=>{const hd=root.getElementById('hd');const f=()=>hd.classList.toggle('solid',scrollY>40);addEventListener('scroll',f,{passive:true});f();
const els=root.querySelectorAll('.rv');const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(red||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'))}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06});els.forEach(e=>io.observe(e))}
const vids=root.querySelectorAll('video');if(red){vids.forEach(v=>v.pause())}else if('IntersectionObserver'in window){const vo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const p=e.target.play();p&&p.catch&&p.catch(()=>{})}else e.target.pause()}),{threshold:.2});vids.forEach(v=>vo.observe(v))}
})();
}
