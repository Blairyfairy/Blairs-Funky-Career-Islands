/* Self-contained audio: pre-rendered WAV music and effects. No WebAudio dependency. */
(()=>{'use strict';
const toggle=document.getElementById('soundBtn');if(!toggle)return;
const files='assets/audio/';const tracks=['island','hardcore','chiptune','ambient'];const labels=['ISLAND GROOVE','HARDCORE','CHIPTUNE','AMBIENT'];
let enabled=true,started=false,mode=0,volume=.8,lastHover=0,lastStep=0,lastIdle=0;
const bg=new Audio(files+tracks[0]+'.wav');bg.loop=true;bg.preload='auto';
const effects={};for(const name of ['hover','click','step','open','close','gift','success','error','idle']){effects[name]=Array.from({length:3},()=>{let a=new Audio(files+name+'.wav');a.preload='auto';return a;});}
const indices={};const musicBtn=document.createElement('button');musicBtn.type='button';musicBtn.id='islandMusicMode';toggle.after(musicBtn);
const volumeSlider=document.createElement('input');volumeSlider.id='islandVolume';volumeSlider.type='range';volumeSlider.min='0';volumeSlider.max='100';volumeSlider.value='80';volumeSlider.setAttribute('aria-label','Game audio volume');volumeSlider.title='Game audio volume';volumeSlider.style.cssText='width:90px;vertical-align:middle;accent-color:#bd8fff';musicBtn.after(volumeSlider);
function paint(){toggle.textContent='♪ SOUND: '+(enabled?'ON':'OFF');toggle.setAttribute('aria-pressed',String(enabled));toggle.title=enabled?'Turn music and sound effects OFF':'Turn music and sound effects ON';musicBtn.textContent='♫ '+labels[mode];musicBtn.disabled=!enabled;volumeSlider.disabled=!enabled;}
function stopAll(){bg.pause();for(const pool of Object.values(effects))for(const a of pool){a.pause();a.currentTime=0;}}
function playMusic(){if(!enabled||!started||document.hidden)return;bg.volume=Math.min(1,volume*.72);const promise=bg.play();if(promise?.catch)promise.catch(e=>{console.warn('Music playback requires a user interaction:',e);});}
function effect(name){if(!enabled||!started||document.hidden)return;const pool=effects[name]||effects.click;const i=indices[name]=(indices[name]||0)+1;const a=pool[i%pool.length];try{a.pause();a.currentTime=0;a.volume=Math.min(1,volume*.95);const p=a.play();if(p?.catch)p.catch(()=>{});}catch(_){}}
window.islandsSound=effect;
// Activation is called synchronously during an actual pointer or keyboard gesture.
function activate(){if(!enabled)return;if(!started){started=true;playMusic();effect('success');}else if(bg.paused)playMusic();}
document.addEventListener('pointerdown',activate,true);document.addEventListener('keydown',activate,true);document.addEventListener('touchstart',activate,{capture:true,passive:true});
toggle.addEventListener('click',()=>{enabled=!enabled;if(!enabled)stopAll();else {started=true;playMusic();effect('success');}paint();});
musicBtn.addEventListener('click',()=>{if(!enabled)return;mode=(mode+1)%tracks.length;bg.pause();bg.src=files+tracks[mode]+'.wav';bg.load();playMusic();effect('open');paint();});
volumeSlider.addEventListener('input',()=>{volume=Number(volumeSlider.value)/100;bg.volume=Math.min(1,volume*.72);});
document.addEventListener('pointerover',e=>{const el=e.target.closest?.('button,a,input[type="range"],[role="button"]');if(!el||el.contains(e.relatedTarget))return;const t=performance.now();if(t-lastHover>95){lastHover=t;effect('hover');}},true);
document.addEventListener('click',e=>{if(e.target===toggle)return;const el=e.target.closest?.('button,a,[role="button"]');if(!el)return;const id=el.id;effect(['closeModal','trialClose','mentorClose'].includes(id)?'close':['mapBtn','careerBtn','achieveBtn','helpBtn'].includes(id)?'open':id==='touchGift'?'gift':'click');},true);
document.addEventListener('keydown',e=>{if(e.repeat)return;const key=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(key)){let t=performance.now();if(t-lastStep>145){lastStep=t;effect('step');}}else if(key==='escape')effect('close');else if(key==='e')effect('open');else if(key===' ')effect('gift');},true);
const canvas=document.getElementById('game');if(canvas)canvas.addEventListener('pointerdown',()=>effect('click'));
document.addEventListener('visibilitychange',()=>{if(document.hidden)bg.pause();else if(enabled&&started)playMusic();});window.addEventListener('pagehide',stopAll);
setInterval(()=>{if(!enabled||!started||document.hidden||mode!==3)return;const t=performance.now();if(t-lastStep>4000&&t-lastIdle>8500){lastIdle=t;effect('idle');}},2500);
paint();
})();
