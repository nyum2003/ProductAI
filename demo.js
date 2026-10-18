let scene=0;
const scenes=[...document.querySelectorAll('[data-scene]')];
function showScene(index){scene=Math.max(0,Math.min(index,scenes.length-1));scenes.forEach((el,i)=>el.hidden=i!==scene);document.getElementById('counter').textContent=`0${scene+1} / 0${scenes.length}`;document.getElementById('previous').disabled=scene===0;document.getElementById('next').disabled=scene===scenes.length-1;}
document.getElementById('previous').onclick=()=>showScene(scene-1);
document.getElementById('next').onclick=()=>showScene(scene+1);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')showScene(scene+1);if(e.key==='ArrowLeft')showScene(scene-1)});
showScene(0);
