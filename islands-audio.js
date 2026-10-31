/* Dedicated Web Audio engine. Original game mechanics are unchanged. */
(()=>{'use strict';
const button=document.getElementById('soundBtn');if(!button)return;
const AC=window.AudioContext||window.webkitAudioContext;
let enabled=true,ctx=null,master=null,music=null,sfx=null,timer=null,step=0,mode=0,volume=.8,unlocked=false,lastHover=0,lastStep=0;
const modes=[
 {name:'ISLAND GROOVE',bpm:116,wave:'triangle',root:196,notes:[0,4,7,12,7,4,2,7,0,5,9,12,9,5,4,2]},
 {name:'HARDCORE',bpm:172,wave:'sawtooth',root:110,notes:[0,0,7,12,10,7,5,3,0,0,12,10,7,5,3,2]},
 {name:'CHIPTUNE',bpm:148,wave:'square',root:220,notes:[0,7,12,7,4,9,12,16,12,7,5,4,2,7,0,12]},
 {name:'AMBIENT',bpm:82,wave:'sine',root:174.61,notes:[0,4,7,11,7,4,2,7,0,5,9,12,9,5,4,2]}
];
function init(){if(!AC)return false;if(!ctx){ctx=new AC();master=ctx.createGain();master.connect(ctx.destination);music=ctx.createGain();music.gain.value=.42;music.connect(master);sfx=ctx.createGain();sfx.gain.value=.95;sfx.connect(master);}master.gain.value=enabled?volume:0;return true;}
function note(f,d=.12,w='triangle',v=.13,delay=0,bus=sfx){if(!enabled||!ctx||ctx.state!=='running'||document.hidden)return;let t=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();o.type=w;o.frequency.setValueAtTime(Math.max(30,f),t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+.009);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus||sfx);o.start(t);o.stop(t+d+.02);o.onended=()=>{o.disconnect();g.disconnect()};}
function fx(kind){if(!enabled||!unlocked)return;switch(kind){
case'hover':note(860,.055,'sine',.09);break;
case'click':note(420,.07,'triangle',.18);note(650,.09,'sine',.13,.055);break;
case'open':note(350,.12,'triangle',.17);note(700,.16,'sine',.15,.08);break;
case'close':note(630,.08,'sine',.14);note(310,.13,'triangle',.14,.065);break;
case'move':note(125,.055,'triangle',.09);break;
case'collect':note(750,.09,'square',.13);note(1200,.17,'sine',.18,.09);break;
case'gift':note(440,.12,'triangle',.18);note(660,.15,'triangle',.18,.10);note(990,.22,'sine',.19,.22);break;
case'error':note(170,.19,'sawtooth',.12);break;
case'success':[523,659,784,1047].forEach((f,i)=>note(f,.22,'triangle',.16,i*.11));break;
case'idle':note(520,.22,'sine',.015);break;
}}
function percussion(type){if(!ctx||ctx.state!=='running')return;const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type=type==='kick'?'sine':'triangle';o.frequency.setValueAtTime(type==='kick'?145:type==='snare'?300:900,t);o.frequency.exponentialRampToValueAtTime(type==='kick'?45:type==='snare'?120:450,t+.09);g.gain.setValueAtTime(type==='kick'?.24:.08,t);g.gain.exponentialRampToValueAtTime(.0001,t+.12);o.connect(g);g.connect(music);o.start(t);o.stop(t+.13);o.onended=()=>{o.disconnect();g.disconnect()};}
function playBeat(){if(!enabled||!unlocked||document.hidden||!ctx||ctx.state!=='running')return;let m=modes[mode],i=step++,semi=m.notes[i%16],freq=m.root*Math.pow(2,semi/12);note(freq,mode===3?.52:.20,m.wave,mode===1?.14:.17,0,music);if(i%2===0)note(freq/2,.29,mode===1?'square':'sine',.17,0,music);if(mode!==3)percussion(i%4===0?'kick':i%4===2?'snare':'hat');else if(i%4===0)note(freq/4,.75,'sine',.09,0,music);}
function stop(){if(timer!==null){clearInterval(timer);timer=null;}}
function start(){stop();if(!enabled||!unlocked||document.hidden||!ctx||ctx.state!=='running')return;playBeat();timer=setInterval(playBeat,60000/modes[mode].bpm/2);}
const modeBtn=document.createElement('button');modeBtn.id='islandMusicMode';modeBtn.type='button';button.after(modeBtn);
const vol=document.createElement('input');vol.id='islandVolume';vol.type='range';vol.min='0';vol.max='100';vol.value='80';vol.title='Music and effects volume';vol.style.cssText='width:88px;vertical-align:middle;accent-color:#bd8fff;cursor:pointer';modeBtn.after(vol);
function display(){button.textContent='♪ SOUND: '+(enabled?'ON':'OFF');button.setAttribute('aria-pressed',String(enabled));button.title=enabled?'Click to turn ALL audio off':'Click to turn ALL audio on';modeBtn.textContent='♫ '+modes[mode].name;modeBtn.disabled=!enabled;vol.disabled=!enabled;}
// game.js has a separate legacy sound handler; remove it so the state cannot invert twice.
button.onclick=null;
try{sound=false}catch(_e){}
async function unlock(){if(!enabled||!AC)return false;try{if(!init())return false;await ctx.resume();if(!enabled||ctx.state!=='running')return false;const first=!unlocked;unlocked=true;master.gain.value=volume;if(first){fx('success')}start();return true;}catch(e){console.warn('Funky Islands: audio activation failed',e);return false;}}
// Default is ON. Browser policy requires a real user gesture before the first audible note.
// Capture phase starts the context directly during that gesture; no extra TEST button.
function gesture(){if(!enabled||unlocked)return;if(!init())return;const p=ctx.resume();Promise.resolve(p).then(()=>{if(!enabled||ctx.state!=='running')return;unlocked=true;master.gain.value=volume;fx('success');start();}).catch(e=>console.warn('Audio unlock:',e));}
document.addEventListener('pointerdown',gesture,{capture:true});document.addEventListener('keydown',gesture,{capture:true});document.addEventListener('touchstart',gesture,{capture:true,passive:true});
button.addEventListener('click',()=>{enabled=!enabled;if(!enabled){stop();if(master)master.gain.value=0;display();return;}display();void unlock();});
modeBtn.addEventListener('click',()=>{if(!enabled)return;mode=(mode+1)%modes.length;step=0;fx('success');start();display();});
vol.addEventListener('input',()=>{volume=Number(vol.value)/100;if(master)master.gain.value=enabled?volume:0;});
document.addEventListener('pointerover',e=>{if(!enabled||!unlocked)return;const el=e.target.closest?.('button,a,[role="button"],input[type="range"]');if(!el)return;const t=performance.now();if(t-lastHover>105){lastHover=t;fx('hover');}},true);
document.addEventListener('click',e=>{if(!enabled||!unlocked||e.target===button)return;const el=e.target.closest?.('button,a,[role="button"]');if(!el)return;const id=el.id;if(id==='closeModal'||id==='trialClose'||id==='mentorClose')fx('close');else if(id==='touchGift')fx('gift');else if(id==='mapBtn'||id==='careerBtn'||id==='achieveBtn'||id==='helpBtn')fx('open');else fx('click');},true);
document.addEventListener('keydown',e=>{if(!enabled||!unlocked||e.repeat)return;const k=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k)){const t=performance.now();if(t-lastStep>140){lastStep=t;fx('move');}}else if(k==='escape')fx('close');else if(k==='e')fx('open');else if(k===' ')fx('gift');else if(k==='m')fx('open');},true);
const canvas=document.getElementById('game');if(canvas){canvas.addEventListener('pointerdown',()=>fx('click'));}
document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});}else if(enabled&&unlocked&&ctx){ctx.resume().then(start).catch(()=>{});}});
window.addEventListener('pagehide',stop);
// Periodic quiet ambient cue when stationary; suppressed whenever OFF.
setInterval(()=>{if(enabled&&unlocked&&!document.hidden&&mode===3)fx('idle');},9000);
display();
})();
