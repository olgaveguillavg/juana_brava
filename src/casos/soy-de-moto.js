/* Comportamiento de la ficha «soy-de-moto» (código original, aplicado solo dentro de la ficha). */
export function run({ root, body, addEventListener, IntersectionObserver, setInterval }) {
(()=>{
 const hero=root.querySelector('.hero');
 const heroImg=root.getElementById('hero-visual');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function frame(){
  if(!reduce&&heroImg){
   const pct=Math.max(0,Math.min(1, -hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight)));
   heroImg.style.transform=`translate3d(0, ${pct*12}%, 0) scale(${1.03+pct*.065})`;
  }
 }
 let ticking=false;
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{frame();ticking=false});ticking=true}},{passive:true});
 addEventListener('resize',frame,{passive:true});frame();
 const targets=root.querySelectorAll('.reveal,.image-reveal');
 if(reduce||!('IntersectionObserver'in window)){targets.forEach(el=>el.classList.add('is-visible'))}
 else{const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -4% 0px'});targets.forEach(el=>io.observe(el))}

})();
;
(()=>{
 const tabs=[...root.querySelectorAll('.jb-demo-tabs [role="tab"]')];
 const panels=[...root.querySelectorAll('.jb-ui-pane')];
 const phones=[...root.querySelectorAll('[data-phone-panel]')];
 function select(name, focus=false){
  tabs.forEach(t=>{const on=t.dataset.tab===name;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;if(on&&focus)t.focus()});
  panels.forEach(p=>{const on=p.dataset.panel===name;p.classList.toggle('active',on);p.hidden=!on});
  phones.forEach(p=>{p.hidden=p.dataset.phonePanel!==name});
 }
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab.dataset.tab));tab.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End'){
   e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;select(tabs[next].dataset.tab,true)
  }
 })});
 const vid=root.getElementById('jb-film');
 if(vid&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){vid.pause();vid.removeAttribute('autoplay');}
})();
;
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const movies=[...root.querySelectorAll('.jb-new-film')];
 if(reduced){movies.forEach(v=>{v.pause();v.removeAttribute('autoplay')});return;}
 if('IntersectionObserver' in window){
  const movieObserver=new IntersectionObserver(entries=>{
   entries.forEach(({target,isIntersecting})=>{
    if(isIntersecting){const attempt=target.play();if(attempt&&attempt.catch)attempt.catch(()=>{});}
    else{target.pause();}
   });
  },{threshold:.12,rootMargin:'180px 0px 180px 0px'});
  movies.forEach(v=>{v.pause();movieObserver.observe(v)});
  const layers=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
    if(isIntersecting)target.classList.add('is-in-frame');
  }),{threshold:.08});
  root.querySelectorAll('.jb-layer-stage').forEach(el=>layers.observe(el));
 }else{root.querySelectorAll('.jb-layer-stage').forEach(el=>el.classList.add('is-in-frame'));}
})();
;
(()=>{
  const video=root.getElementById('jb-system-film');
  const replay=root.querySelector('.jb-system-motion-replay');
  if(!video || !replay) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const play=()=>{
     try{video.pause(); video.currentTime=0; const result=video.play(); if(result&&result.catch)result.catch(()=>{});}catch(e){}
  };
  replay.addEventListener('click',play);
  if(!reduce){
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver((entries)=>{
        if(entries.some(entry=>entry.isIntersecting)){play();io.disconnect();}
      },{threshold:.35});io.observe(video);
    }else{video.addEventListener('loadedmetadata',play,{once:true});}
  }
})();
}
