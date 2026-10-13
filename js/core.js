const R=n=>Math.floor(Math.random()*n),$=s=>document.querySelector(s);
const TH={
 town:{wl:'🧱',wc:'#7a6a58',fc:'#8c7a62',fg:'#a9b8a0'},
 waste:{wl:'🌳',wc:'#3a5a3a',fc:'#2d4a2d',fg:'#8ab886'},
 swamp:{wl:'🍄',wc:'#4b5a2e',fc:'#3a4a1e',fg:'#8aaa3a'},
 ruin:{wl:'🪨',wc:'#59544c',fc:'#3a3732',fg:'#6e7a78'},
 desert:{wl:'🪨',wc:'#c9a15a',fc:'#e3c27f',fg:'#f0d9a0'},
 cave:{wl:'🪨',wc:'#4a4038',fc:'#2c2622',fg:'#100e0c'},
 vault:{wl:'⛩️',wc:'#3a4d5c',fc:'#20303a',fg:'#08121a'},
 sewer:{wl:'🧱',wc:'#3d5148',fc:'#243229',fg:'#0d1411'},
 mutant:{wl:'🧱',wc:'#5a2a1c',fc:'#2a1510',fg:'#140806'},
 citadel:{wl:'🔥',wc:'#4a1e1e',fc:'#2a1010',fg:'#140606'}};
const mkLoc=o=>Object.assign({w:34,h:26,tt:0},TH[o.th],o);
const AREAS=[
 mkLoc({n:'鐵拳城堡',i:'🏰',ty:'town',th:'town',lv:0,w:26,h:20,tt:0,ex:[5,6,7]}),
 mkLoc({n:'甜水鎮',i:'🛖',ty:'town',th:'town',lv:1,w:26,h:20,tt:1,ex:[8]}),
 mkLoc({n:'銀灣',i:'🏚️',ty:'town',th:'town',lv:2,w:26,h:20,tt:1,ex:[9]}),
 mkLoc({n:'自由港',i:'🏙️',ty:'town',th:'town',lv:2,w:26,h:20,tt:2,ex:[10,11,12]}),
 mkLoc({n:'黑郡',i:'☠️',ty:'town',th:'town',lv:3,w:26,h:20,tt:3,ex:[13,14,15]}),
 mkLoc({n:'鐵拳林地',i:'🌳',ty:'field',th:'waste',lv:0,par:0,mon:['🐀','🦂','狼']}),
 mkLoc({n:'吸血蝠洞窟',i:'🕳️',ty:'dungeon',th:'cave',lv:0,par:0,mon:['🐀','🪳','🐀'],boss:'蝠'}),
 mkLoc({n:'法師古塔',i:'🗼',ty:'dungeon',th:'vault',lv:1,par:0,mon:['🧟','🪳','🐀'],boss:'傀',bk:'hourglass'}),
 mkLoc({n:'烏鴉山賊營',i:'🏕️',ty:'dungeon',th:'cave',lv:1,par:1,mon:['🥷','🧟','狼'],boss:'🦹',bk:'helm'}),
 mkLoc({n:'迷霧沼澤',i:'🍄',ty:'field',th:'swamp',lv:2,par:2,mon:['🐍','蜥','🧟'],qi:'shield'}),
 mkLoc({n:'地下水道走私窟',i:'🚰',ty:'dungeon',th:'sewer',lv:2,par:3,mon:['🐊','🪳','🥷'],boss:'🧓',bk:'prince'}),
 mkLoc({n:'腐骨沼澤',i:'☣️',ty:'field',th:'swamp',lv:3,par:3,mon:['🐊','🧟','飛']}),
 mkLoc({n:'灼熱荒漠',i:'🏜️',ty:'field',th:'desert',lv:4,par:3,mon:['🦂','鷹','💀'],boss:'龍',loot:2}),
 mkLoc({n:'惡魔廢墟',i:'💥',ty:'field',th:'ruin',lv:3,par:4,mon:['🧟','狼','👹']}),
 mkLoc({n:'惡魔祭壇',i:'👹',ty:'dungeon',th:'mutant',lv:3,par:4,mon:['👹','🥷','蝠'],boss:'💪',bk:'demons'}),
 mkLoc({n:'深淵王座（魔王巢穴）',i:'⛪',ty:'dungeon',th:'citadel',lv:4,par:4,w:40,h:30,mon:['👹','🧟','蝠'],boss:'魔',bk:'final'})];
const MN0={'🐀':'巨鼠','🦂':'赤血蠍','狼':'暗影灰狼','🪳':'褐毛巨蛛','蝠':'吸血蝠王','傀':'石魔像守衛','🥷':'烏鴉山賊','🦹':'山賊首領','🧟':'殭屍','🐍':'眼鏡蛇','蜥':'沼澤蜥蜴人','🐊':'沼澤水蛇龍','飛':'巨型毒蠅','鷹':'沙漠禿鷹','💀':'骷髏戰士','龍':'古代赤龍','👹':'食人魔','💪':'克里根將軍','🧓':'吸血鬼伯爵','魔':'深淵魔王','蛛':'洞穴蛛后'};
const MN=Object.fromEntries(Object.entries(MN0).map(([k,v])=>[k.replace(/\uFE0F/g,''),v]));
const mn=e=>MN[nk(e)]||e;
const SVC=[
 [['falagar','🧓','羅蘭國王'],['mission','🧑‍✈️','王室任務官 艾琳'],['shop','🧑‍💼','鐵拳軍械師'],['inn','🧑‍🍳','旅店老闆'],['temple','🧑‍⚕️','神殿牧師']],
 [['hall','🧑‍⚖️','甜水鎮長'],['witch','🧑‍🔬','藥草師'],['dock','👷','馬車站站長'],['academy','🧑‍🏫','訓練場教官'],['temple','🧑‍⚕️','神殿牧師'],['inn','🧑‍🍳','旅店老闆']],
 [['hall','🧑‍⚖️','銀灣鎮長'],['shop','🧑‍💼','雜貨商人'],['inn','🧑‍🍳','旅店老闆'],['temple','🧑‍⚕️','神殿牧師'],['dock','👷','馬車站站長']],
 [['hall','🧑‍⚖️','自由港議長'],['shop','🧑‍💼','軍械商會長'],['witch','🧑‍🔬','鍊金大師'],['inn','🧑‍🍳','旅店老闆'],['temple','🧑‍⚕️','神殿牧師'],['academy','🧑‍🏫','資深教官'],['oracle','🧑‍💻','神諭先知'],['dock','👷','碼頭管事'],['well','🧑‍🔧','魔法泉守護者']],
 [['hall','🧑‍⚖️','黑郡大祭司'],['hermit','🧙','亡骨隱者'],['shop','🧑‍💼','軍械商'],['inn','🧑‍🍳','旅店老闆'],['temple','🧑‍⚕️','神殿牧師'],['dock','👷','馬車站站長']]];
const WT={sw:['🗡️','長劍',['生鏽短劍','精鋼長劍','秘銀劍','附魔烈焰劍','聖光神劍']],ax:['🪓','戰斧',['精鋼斧','劈山斧','雙刃戰斧','巨人開山斧','泰坦碎星斧']],
 sp:['🔱','長矛',['木矛','騎士長槍','破甲槍','閃電長矛','天空之矛']],bw:['🏹','弓箭',['獵人短弓','橡木長弓','精靈弓','雷鳴弓','獵神之弓']],
 st:['⚡','法杖',['學徒法杖','閃電法杖','秘法權杖','雷霆法杖','大法師之杖']],mc:['🔨','釘頭錘',['木棍','熟銅錘','牧師釘錘','聖騎士戰錘','審判之錘']]};
const WB=[2,4,6,8,11],AF=['精良','附魔','附雷','強化','傳說'];
const GEAR={
 a:{e:['🥋','👘','🥋','🛡️','🦾'],n:['粗布衣','皮甲','鎖子甲','精鋼板甲','龍鱗鎧碎片'],b:[1,2,3,4,6]},
 s:{e:['🪵','🔰','🪞','⚜️','🔆'],n:['木盾','鐵圓盾','鏡面盾','騎士塔盾','聖光之盾'],b:[1,2,3,4,6]},
 h:{e:['🧢','⛑️','🪖','🥽','🌟'],n:['皮帽','鐵盔','騎士頭盔','符文頭盔','王者之冠'],b:[1,2,3,4,6]},
 b:{e:['🥿','🥾','👢','👞','🪽'],n:['草鞋','皮靴','旅人長靴','鋼靴','疾風之靴'],b:[1,1,2,3,4]},
 c:{e:['🏷️','💍','🧿','🪙','📟'],n:['幸運符','護身符','魔法寶珠','魔法戒指','魔法之門碎片'],b:[4,8,12,16,24]}};
const RECR=[
 {n:'艾倫',e:'🧔',hp:22,atk:7,def:0,cl:'archer',pf:['bw'],p:90,d:'弓箭手・遠攻'},
 {n:'莉亞',e:'👩',hp:26,atk:6,def:1,cl:'mage',pf:['st'],p:80,d:'雷電法師'},
 {n:'德雷克',e:'💂',hp:40,atk:9,def:2,cl:'dragon',p:200,d:'龍騎士・烈焰衝鋒'},
 {n:'戰犬雷克斯',e:'🐕',hp:30,atk:8,def:1,p:110,d:'近戰撕咬'},
 {n:'流浪遊俠',e:'🕵️',hp:28,atk:6,def:1,cl:'archer',pf:['bw'],p:100,d:'劍氣・遠攻'}];
const HIRE=[{id:'gate',n:'馬車嚮導',e:'🧭',p:200,d:'可直接前往去過的城鎮'},{id:'scholar',n:'資深導師',e:'🎖️',p:120,d:'經驗 +25%'},{id:'merchant',n:'商會代表',e:'💼',p:150,d:'購買物品 8 折'}];
const QUESTS=[
 {id:'humph',town:2,council:1,g:'銀灣 · 補給官',t:'失竊的補給箱',d:'到迷霧沼澤找出被搶走的補給箱 📦',k:'shield',r:200,x:60},
 {id:'newton',town:1,council:1,g:'甜水鎮 · 鎮長',t:'碎裂的魔力水晶',d:'擊敗法師古塔的守衛，奪回魔力水晶',k:'hourglass',r:150,x:50},
 {id:'charles',town:1,g:'甜水鎮 · 護衛隊長',t:'剿滅烏鴉山賊',d:'擊敗烏鴉山賊營的首領',k:'helm',r:120,x:40},
 {id:'stone',town:3,council:1,g:'自由港 · 商會代表',t:'活捉走私教父',d:'在地下水道走私窟活捉走私頭目',k:'prince',r:220,x:80},
 {id:'temper',town:4,council:1,g:'黑郡 · 大祭司',t:'搗毀惡魔祭壇',d:'擊敗惡魔祭壇的指揮官，消滅克里根的爪牙',k:'demons',r:260,x:100}];
const QI={hourglass:'💧 魔力水晶',shield:'📦 失竊的補給箱',prince:'⛓️ 走私頭目（已活捉）',demons:'☯️ 惡魔祭壇已搗毀',helm:'🥷 烏鴉山賊已剿滅'};
const ROUTES=[{a:0,b:1,ty:'🚶 步行前往',days:[0,1,2,3,4,5,6],p:0},{a:1,b:2,ty:'🐴 驛馬車',days:[0,2,4],p:30},{a:2,b:3,ty:'⛵ 商船',days:[1,5],p:50},{a:3,b:4,ty:'⛵ 商船',days:[2,6],p:70}];
const WD=['週一','週二','週三','週四','週五','週六','週日'];
const RUM=['聽說鐵拳城堡的魔法之門核心水晶碎了，結界只能再撐一百多天。','有人說北邊的惡魔越來越多，似乎有深淵魔王在背後操縱。','自由港是大陸最大的貿易港，想去得先從甜水鎮搭驛馬車。','黑郡的亡骨居民雖然長得嚇人，其實很多都很講道理。','想搭商船？先看看船班週幾出發，別在碼頭空等。','神殿的牧師能治療傷勢，捐幾枚金幣還能得到神明祝福。','聽說有人在迷霧沼澤撿到一箱金幣，結果被一群赤血蠍追了三條街。'];
const DIR=[[0,-1],[1,0],[0,1],[-1,0]];
let party,gold,pot,xp,lv,ai,st,logs,busy,cur,done,has,qs,visited,hires,bless,day,SHOP,WITCH,oracle,fal,wl;
let bag=[],tab="log",lid=0,jkey="",ikey="";

const SH={};                       
const nk=s=>s.replace(/\uFE0F/g,'');
const aspZ=e=>{const r=lk(e,'w');return r&&r[6]?Math.min(1.7,Math.max(1,Math.sqrt(r[6]))):1};
function lk(ch,v){if(!v||!ch)return null;const c=nk(ch);
 return SP[v+':'+c]||(v=='b'?SP['f:'+c]:v=='npc2'?SP['npc:'+c]:null)||null}
function keySheet(img,bg,pre){            
 const W=img.naturalWidth,H=img.naturalHeight,cv=document.createElement('canvas');cv.width=W;cv.height=H;
 const cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(img,0,0);cx.getImageData(0,0,1,1);
 const out=document.createElement('canvas');out.width=W;out.height=H;const ox=out.getContext('2d');
 const seen=new Set();
 for(const k in SP){const r=SP[k];if(r[0]!=img._k)continue;const id=r.join();if(seen.has(id))continue;seen.add(id);
  const[,x,y,w,h,op]=r;let d=cx.getImageData(x,y,w,h);
  if(!op&&!pre)keyRect(d.data,w,h,bg);
  ox.putImageData(d,x,y)}
 return{canvas:out,w:W,h:H}}
function keyRect(a,w,h,bg){          
 const N=w*h,bgm=new Uint8Array(N),inner=new Uint8Array(N);
 for(let i=0;i<N;i++){const r=a[i*4],g=a[i*4+1],b=a[i*4+2],m=Math.max(r,b),gr=g-m,
   d=Math.hypot(r-bg[0],g-bg[1],b-bg[2]);
  if((d<75&&gr>50)||(gr>25&&m<70&&g<175))bgm[i]=1;
  if(d<48&&gr>100)inner[i]=1}
 const clr=new Uint8Array(N),st=[];
 const push=i=>{if(bgm[i]&&!clr[i]){clr[i]=1;st.push(i)}};
 for(let x=0;x<w;x++){push(x);push((h-1)*w+x)}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1)}
 while(st.length){const i=st.pop(),x=i%w,y=(i/w)|0;
  if(x>0)push(i-1);if(x<w-1)push(i+1);if(y>0)push(i-w);if(y<h-1)push(i+w)}
 for(let i=0;i<N;i++)if(inner[i])clr[i]=1;
 let fr=[];for(let i=0;i<N;i++)if(clr[i])fr.push(i);
 const dist=new Uint8Array(N);
 for(let s=1;s<=3;s++){const nx=[];
  for(const i of fr){const x=i%w,y=(i/w)|0;
   for(const j of [x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1]){
    if(j<0||clr[j]||dist[j])continue;dist[j]=s;nx.push(j);
    const p=j*4,r=a[p],g=a[p+1],b=a[p+2],m=Math.max(r,b),gr=g-m;
    if(gr>14){a[p+3]=Math.min(a[p+3],Math.round(255*Math.max(0,Math.min(1,1-(gr-14)/60))));a[p+1]=Math.min(g,m+8)}}}
  fr=nx}
 for(let i=0;i<N;i++)if(clr[i])a[i*4+3]=0}
function loadImg(src){return new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src=src})}
/* 精靈圖檢查：尺寸是否與座標表一致、每個圖塊是否在圖內／非空白／沒有被切到一半（只在載入時跑一次）
 * 結果放在 window.SPRITE_REPORT = {errors:[], warns:[]}，同時印到主控台。 */
function checkSheet(img,k,S){
 const rep=window.SPRITE_REPORT||(window.SPRITE_REPORT={errors:[],warns:[]}),W=img.naturalWidth,H=img.naturalHeight;
 if(S.w&&(W!=S.w||H!=S.h)){rep.errors.push(`圖檔「${k}」尺寸 ${W}×${H} 與座標表預期的 ${S.w}×${S.h} 不符，已停用該圖（改顯示 emoji）`);return false}
 let a=null;
 try{const cv=document.createElement('canvas');cv.width=W;cv.height=H;const cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(img,0,0);a=cx.getImageData(0,0,W,H).data}
 catch(e){return true}
 const op=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&a[(y*W+x)*4+3]>40,seen=new Set();
 for(const key in SP){const r=SP[key];if(r[0]!=k)continue;const id=r.slice(0,5).join();if(seen.has(id))continue;seen.add(id);
  const[,x,y,w,h]=r;
  if(x<0||y<0||x+w>W||y+h>H){rep.errors.push(`圖塊 ${key} 超出圖檔範圍 (${x},${y},${w},${h})`);continue}
  let n=0,cut=0;
  for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(op(x+i,y+j)){n++;
   if((j==0&&op(x+i,y-1))||(j==h-1&&op(x+i,y+h))||(i==0&&op(x-1,y+j))||(i==w-1&&op(x+w,y+j)))cut++}
  if(n<w*h*.03)rep.errors.push(`圖塊 ${key} 幾乎是空白（可能座標跑位）(${x},${y},${w},${h})`);
  else if(cut>12)rep.warns.push(`圖塊 ${key} 邊緣被切到（${cut} 像素與鄰近圖塊相連）(${x},${y},${w},${h})`)}
 return true}
async function loadSprites(){
 window.SPRITE_REPORT={errors:[],warns:[]};
 for(const k in SHEETS){const S=SHEETS[k];let img=null;
  for(const f of S.f){img=await loadImg(f);if(img&&img.naturalWidth>100){img._k=k;if(checkSheet(img,k,S))break}img=null}
  if(!img)continue;
  try{const sh=keySheet(img,S.bg,S.pre);
   const url=sh.canvas.toDataURL('image/png');
   document.documentElement.style.setProperty('--sh-'+k,'url('+url+')');SH[k]=sh}
  catch(e){console.warn('精靈圖「'+k+'」無法讀取像素，維持 emoji 顯示',e)}}
 const R_=window.SPRITE_REPORT;if(R_.errors.length)console.error('[精靈圖檢查] 錯誤：\n'+R_.errors.join('\n'));if(R_.warns.length)console.warn('[精靈圖檢查] 提醒：\n'+R_.warns.join('\n'));
 return Object.keys(SH).length}
function SI(ch,v,sz){const r=lk(ch,v),s=r&&SH[r[0]];if(!s)return ch;sz=sz||1.2;
 const[,x,y,w,h]=r,k=sz/Math.max(h,w*.7);
 const W_=w*k,H_=h*k;return`<i class="sp" style="width:${W_}em;height:${H_}em;border-top:${sz-H_}em solid transparent;background-clip:content-box;background-origin:content-box;background-image:var(--sh-${r[0]});background-size:${s.w*k}em ${s.h*k}em;background-position:${-x*k}em ${-y*k}em"></i>`}

/* ---------- three.js ---------- */
const view=$('#view'),scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(70,4/3,.05,40);
const rd=new THREE.WebGLRenderer({antialias:true});rd.setPixelRatio(Math.min(devicePixelRatio||1,2));view.prepend(rd.domElement);
const torch=new THREE.PointLight(0xffd9a0,1.3,10);cam.add(torch);scene.add(cam);
scene.add(new THREE.AmbientLight(0xffffff,.45));
let world=new THREE.Group(),spr={},tx=0,tz=0,ty=0,sprites=[];scene.add(world);
const WH=1.4,tc={};
function etex(ch,bg,sc=.7,al=1,v){const k=ch+bg+sc+(v||'');if(tc[k])return tc[k];const s=128,c=document.createElement('canvas');c.width=c.height=s;const x=c.getContext('2d');
 const r=lk(ch,v),sh=r&&SH[r[0]];
 if(sh){x.imageSmoothingEnabled=false;if(bg){x.fillStyle=bg;x.fillRect(0,0,s,s);x.strokeStyle='#0005';x.lineWidth=6;x.strokeRect(0,0,s,s)}
  const[,sx,sy,sw,shh,op]=r;x.globalAlpha=al;
  if(bg&&op)x.drawImage(sh.canvas,sx,sy,sw,shh,0,0,s,s);
  else{const f=Math.min(s*(bg?.78:.96)/sw,s*(bg?.78:.96)/shh),dw=sw*f,dh=shh*f;x.drawImage(sh.canvas,sx,sy,sw,shh,(s-dw)/2,bg?(s-dh)/2:s-dh-2,dw,dh)}
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;return tc[k]=t}
 if(bg){x.fillStyle=bg;x.fillRect(0,0,s,s);x.strokeStyle='#0005';x.lineWidth=6;x.strokeRect(0,0,s,s)}
 x.globalAlpha=al;x.font=`${s*sc}px serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(ch,s/2,s/2+s*.05);
 return tc[k]=new THREE.CanvasTexture(c)}
function ftex(c){const s=64,cv=document.createElement('canvas');cv.width=cv.height=s;const x=cv.getContext('2d');
 x.fillStyle=c;x.fillRect(0,0,s,s);x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=2;x.strokeRect(0,0,s,s);
 const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t}
function fit(){const w=view.clientWidth,h=view.clientHeight;rd.setSize(w,h,false);cam.aspect=w/h;cam.fov=Math.min(95,Math.max(70,2*Math.atan(Math.tan(37.5*Math.PI/180)/cam.aspect)*180/Math.PI));cam.updateProjectionMatrix()}
new ResizeObserver(fit).observe(view);

function hx(c,f,tr,tb){const n=parseInt(c.slice(1),16),k=(v,m)=>Math.max(0,Math.min(255,Math.round(v*f*m)));
 return`rgb(${k(n>>16,tr||1)},${k(n>>8&255,1)},${k(n&255,tb||1)})`}
const hs=(x,y,k)=>{const t=Math.sin(x*127.1+y*311.7+k*74.7)*43758.5453;return t-Math.floor(t)};
function isBrick(A){const r=lk(A.wl,'w');return A.wl=='🧱'||!!(r&&r[5])}
function brickTex(A,vi){const key='brick'+A.wc+vi;if(tc[key])return tc[key];
 const n=32,c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');
 const h=(a,b)=>{const t=Math.sin(a*12.9898+b*78.233+vi*3.1)*43758.5453;return t-Math.floor(t)};
 const top=[];for(let i=0;i<n;i++){const g=Math.floor(i/6);top[i]=(g%2?8:4)+Math.floor(h(g,9)*4)}
 for(let i=1;i<n-1;i++)for(let y=top[i];y<n;y++){
  const br=Math.floor(y/4),off=(br%2)*4,bx=Math.floor((i+off)/8);
  let f=(y%4==3||(i+off)%8==7)?.5:.82+h(bx,br)*.38;
  if(y==top[i])f*=1.3;if(i<=1||i>=n-2)f*=.7;f*=1-y/n*.28;
  x.fillStyle=hx(A.wc,f,1.1,.88);x.fillRect(i,y,1,1)}
 const o=document.createElement('canvas');o.width=o.height=128;const ox=o.getContext('2d');
 ox.imageSmoothingEnabled=false;ox.drawImage(c,0,0,128,128);
 const t=new THREE.CanvasTexture(o);t.magFilter=THREE.NearestFilter;return tc[key]=t}
function buildWalls(S,A){
 const brick=isBrick(A),R_=brick?1:2,mats={},cells=[];
 for(let y=0;y<S.H;y++)for(let x=0;x<S.W;x++)if(S.g[y][x]){let n=0;
  for(let j=-R_;j<=R_&&!n;j++)for(let i=-R_;i<=R_;i++){const a=x+i,b=y+j;if(a>=0&&b>=0&&a<S.W&&b<S.H&&!S.g[b][a]){n=1;break}}
  if(n)cells.push([x,y])}
 const mat=map=>mats[map.uuid]||(mats[map.uuid]=new THREE.SpriteMaterial({map,transparent:true,alphaTest:.45}));
 const sh=new THREE.InstancedMesh(new THREE.CircleGeometry(.44,14),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.32,depthWrite:false}),cells.length),o=new THREE.Object3D();
 cells.forEach(([x,y],i)=>{
  const bk=S.bd&&S.bd[x+','+y],map=bk?etex(bk.e,null,.9,1,'w'):brick?brickTex(A,Math.floor(hs(x,y,1)*3)):etex(A.wl,null,.9,1,'w'),
   z=bk?bk.z*aspZ(bk.e):brick?1.25:1.1+hs(x,y,2)*.35,jx=bk||brick?0:(hs(x,y,3)-.5)*.3,jz=bk||brick?0:(hs(x,y,4)-.5)*.3,
   s=new THREE.Sprite(mat(map));
  s.scale.set(z,z,1);s.position.set(x+.5+jx,z/2+.01,y+.5+jz);world.add(s);
  o.position.set(x+.5+jx,.012,y+.5+jz);o.rotation.x=-Math.PI/2;o.scale.set(brick?1.1:.9,brick?.5:.9,1);o.updateMatrix();sh.setMatrixAt(i,o.matrix)});
 world.add(sh)}
function build(){const S=st[ai],A=AREAS[ai];
 scene.remove(world);world=new THREE.Group();scene.add(world);spr={};sprites=[];
 scene.background=new THREE.Color(A.fg);scene.fog=new THREE.Fog(A.fg,2,11);
 const ft=ftex(A.fc);ft.repeat.set(S.W,S.H);
 const fm=new THREE.Mesh(new THREE.PlaneGeometry(S.W,S.H),new THREE.MeshLambertMaterial({map:ft}));
 fm.rotation.x=-Math.PI/2;fm.position.set(S.W/2,0,S.H/2);world.add(fm);
 const cm=new THREE.Mesh(new THREE.PlaneGeometry(S.W,S.H),new THREE.MeshBasicMaterial({color:A.fg}));
 cm.rotation.x=Math.PI/2;cm.position.set(S.W/2,WH,S.H/2);world.add(cm);
 buildWalls(S,A);
 for(const k in S.ents)addSpr(k,S.ents[k]);
 snap()}
function addSpr(k,e){const[x,y]=k.split(',').map(Number);
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:etex(e.t=='c'?'📦':e.e,null,.8,1,e.t=='m'||e.t=='b'?'m':e.t=='n'?(e.v||(e.svc=='rumor'&&(e.g===undefined&&(e.g=R(2)),e.g)?'npc2':'npc')):'o'),transparent:true}));
 const z=e.t=='b'?1.15:e.t=='c'?.5:e.t=='n'?.85:e.t=='m'?.8:.6;
 s.scale.set(z,z,1);s.userData={z:z,y0:z/2+.03,ph:Math.random()*6,m:e.t=='m'||e.t=='b'||e.t=='p',n:e.t=='n',fl:Math.random()<.5?1:-1,nf:performance.now()+1500+Math.random()*4000};
 s.position.set(x+.5,s.userData.y0,y+.5);world.add(s);spr[k]=s;sprites.push(s)}
function delEnt(k){const S=st[ai];delete S.ents[k];if(spr[k]){world.remove(spr[k]);sprites=sprites.filter(s=>s!==spr[k]);delete spr[k]}}
function snap(){const S=st[ai];tx=S.x+.5;tz=S.y+.5;ty=-S.n*Math.PI/2;bx=tx;bz=tz;cam.position.set(tx,.62,tz);cam.rotation.y=ty;cam.rotation.order='YXZ'}
function loop(t){requestAnimationFrame(loop);if(!st)return;
 bx+=(tx-bx)*.22;bz+=(tz-bz)*.22;cam.rotation.y+=(ty-cam.rotation.y)*.22;
 const f=DIR[dirN()];lunge*=.86;shake*=.9;
 cam.position.set(bx+f[0]*lunge*.22+(Math.random()-.5)*shake*.07,.62+(Math.random()-.5)*shake*.05,bz+f[1]*lunge*.22+(Math.random()-.5)*shake*.07);
 sprites.forEach(s=>{const u=s.userData;
  if(u.die){u.die*=.85;s.scale.set(u.z*u.die,u.z*u.die,1);s.material.opacity=u.die;return}
  if(u.n){const br=Math.sin(t/430+u.ph),z=u.z;let mv=0;
   if(u.tx!==undefined){const dx=u.tx-s.position.x,dz=u.tz-s.position.z;s.position.x+=dx*.1;s.position.z+=dz*.1;mv=Math.min(1,Math.hypot(dx,dz)*2.5)}
   if(t>u.nf&&!mv){u.fl=-u.fl;u.nf=t+2500+Math.random()*5000}
   const sy=z*(1+.03*br),sx=z*(1-.012*br);s.scale.set(u.fl*sx,sy,1);s.position.y=u.y0+(sy-z)/2+Math.abs(Math.sin(t/260))*.012*mv}
  if(u.m)s.position.y=u.y0+Math.sin(t/300+u.ph)*.04;
  if(u.hit>.02){u.hit*=.88;s.material.color.setRGB(1,1-u.hit*.8,1-u.hit*.8);const k=u.z*(1+u.hit*.25);s.scale.set(k,k,1)}
  else if(u.hit){u.hit=0;s.material.color.setRGB(1,1,1);s.scale.set(u.z,u.z,1)}});
 const nw=performance.now();
 if(!busy&&!cur&&nw>wanderT){wanderT=nw+300;if(AREAS[ai].ty=='town')wanderStep(st[ai],nw)}
 if(ms.length){const th=cam.rotation.y,fx_=-Math.sin(th),fz=-Math.cos(th),rx=Math.cos(th),rz=-Math.sin(th);
  ms.forEach((m,i)=>{const u=m.s.userData,rg=m.rg;let k=0,c=0,col=[1,1,1];
   if(u.dash){const q=(nw-u.dash.t0)/u.dash.dur;if(q>=1)u.dash=null;else if(q>0)k=Math.sin(Math.PI*q)}
   if(u.cast){const q=(nw-u.cast.t0)/u.cast.dur;if(q>=1)u.cast=null;else if(q>0)c=Math.sin(Math.PI*q)}
   const fd=(rg?.5:.58)+.3*k;let lat=m.off*(1-.75*k),y=(rg?.34:.28)+.14*k+Math.sin(t/260+i)*.012,sc=(rg?.18:.2)+.07*k+.06*c;
   if(c)col=[.7,.85,1];
   if(u.hurt>.02){u.hurt*=.9;lat+=Math.sin(t/25)*.03*u.hurt;col=[1,1-u.hurt*.8,1-u.hurt*.8]}
   m.s.material.color.setRGB(col[0],col[1],col[2]);if(m.p.hp<=0)y=.2;
   m.s.position.set(bx+fx_*fd+rx*lat,y,bz+fz*fd+rz*lat);m.s.scale.set(sc,sc,1);if(typeof MX!='undefined'&&MX.on){m.s.visible=i==0;if(i==0){m.s.position.set(bx+fx_*(.55+.4*k)-rx*.2*(1-k),.4+.1*k,bz+fz*(.55+.4*k)-rz*.2*(1-k));m.s.scale.set(.5+.14*k,.5+.14*k,1)}}else m.s.visible=true})}
 fxs=fxs.filter(f=>{const q=(nw-f.t0)/f.dur;if(q<0){f.s.visible=false;return true}
  if(q>=1){world.remove(f.s);return false}
  f.s.visible=true;f.s.position.lerpVectors(f.a,f.b,q);f.s.position.y+=Math.sin(Math.PI*q)*f.arc;
  const z=f.s0+(f.s1-f.s0)*q;f.s.scale.set(z,z,1);f.s.material.opacity=f.fade?1-q:1;return true});
 torch.intensity=1.25+Math.sin(t/90)*.08;rd.render(scene,cam)}

/* ---------- game ---------- */
const mk=(n,e,hp,atk,def,cl,pf)=>({n,e,hp,mx:hp,atk,def,cl,pf:pf||[],g:{w:0,a:0,h:0,c:0,s:0,b:0},ic:{},it:{}});
const DL=()=>AREAS[ai].lv;
const STORY='鐵拳城堡的「魔法之門」核心魔力水晶碎裂，守護恩洛斯大陸的結界僅剩約 150 天。你是羅蘭國王親授的見習騎士，率領夥伴踏上冒險旅程，尋找能取代它的魔力水晶。\n\n沿途將造訪甜水鎮、銀灣、自由港與黑郡，也要面對深淵魔王與克里根惡魔軍團的陰影。當魔法之門的能量充滿，全隊可施展「魔門共鳴」召喚守護巨像，擊碎首領的魔法護盾。';
function init(){party=[mk('見習騎士','🧑‍🔧',44,6,3,0,['sw','ax','sp','mc']),mk('治療牧師','🧑‍⚕️',32,3,1,'heal',['mc','st'])];
 spc=[4,4,4,4,4,4,4];perks=[];pp=0;mats={scrap:6,core:0,ret:1};BS={pool:{scrap:0,food:0,water:0}};party[0].mx=party[0].hp=44+(spc[2]-1)*4;
 gold=150;pot=3;xp=0;lv=1;st=[];logs=[];bag=[];lid=0;busy=false;done={};has={};qs={};visited=new Set();hires=[];bless=0;day=1;SHOP={};WITCH={};oracle=0;fal=0;wl=0;
 $('#ov').style.display='none';enter(0);say('📖 劍與魔法之門：你們在 鐵拳城堡 待命');say('找 🧑‍✈️ 王室任務官艾琳接任務，出發前別忘了備足治療藥水與招募夥伴');say('🧭 城門傳送師可帶你前往甜水鎮、銀灣、自由港、黑郡（須依序打通）；👮 城衛隊長會記錄各副本達成度並發放獎勵');
 ui('🧓','《劍與魔法之門 · 恩洛斯》',STORY,[{t:'🧑‍🔧 創建騎士（七大屬性）',f:creUI}]);setTab('log')}
function enter(id){ai=id;const A=AREAS[id];if(A.ty!='town'||!st[id])st[id]=gen(id);const S=st[id];S.x=S.sx;S.y=S.sy;
 if(A.ty=='town')visited.add(id);say(`${A.i} 抵達「${A.n}」 第${day}天 ${WD[(day-1)%7]}`);build();render()}
function gen(i){const A=AREAS[i];if(A.ty=='town')return genTown(i);
 const W=A.w,H=A.h,g=Array.from({length:H},()=>Array(W).fill(1));
 if(A.ty=='dungeon'&&window.ROT){new ROT.Map.Digger(W,H).create((x,y,v)=>{g[y][x]=v})}
 else if(A.ty=='dungeon'){let x=W>>1,y=H>>1;for(let n=0;n<900;n++){g[y][x]=0;const d=R(4);x=Math.max(1,Math.min(W-2,x+[1,-1,0,0][d]));y=Math.max(1,Math.min(H-2,y+[0,0,1,-1][d]))}}
 else{for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)g[y][x]=Math.random()<.14?1:0}
 const all=[];g.forEach((r,y)=>r.forEach((v,x)=>{if(!v)all.push([x,y])}));
 const s0=all[R(all.length)],seen=new Set([s0+'']),q=[s0];
 while(q.length){const[x,y]=q.shift();for(const d of DIR){const a=x+d[0],b=y+d[1];if(g[b]&&g[b][a]===0&&!seen.has(a+','+b)){seen.add(a+','+b);q.push([a,b])}}}
 const fl=all.filter(p=>seen.has(p+'')).sort(()=>Math.random()-.5);
 const s=fl[0];let b=fl[1],bd=0;fl.forEach(p=>{const d=(p[0]-s[0])**2+(p[1]-s[1])**2;if(d>bd){bd=d;b=p}});
 const pool=fl.filter(p=>p!==s&&p!==b),ents={},put=(t,e,x={})=>{const p=pool.pop();if(p)ents[p+'']={t,e,...x}};
 if(A.boss&&!done[i])ents[b+'']={t:'b',e:A.boss};
 for(let k=0;k<(A.ty=='field'?11:9);k++)put('m',A.mon[R(3)]);
 for(let k=0;k<3;k++)put('c','📦');
 put('f','🚰');if(A.qi&&!has[A.qi])put('qi','📦',{key:A.qi});
 ents[s+'']={t:'q',e:'🔙'};
 let n=0;for(let d=0;d<4;d++){const q2=g[s[1]+DIR[d][1]]?.[s[0]+DIR[d][0]];if(q2===0){n=d;break}}
 return{g,ents,seen:new Set(),x:s[0],y:s[1],sx:s[0],sy:s[1],W,H,pp:null,n}}
const HOUSES=['🏚️','🛖','⛺','🏠','🏗️','🏡'],TREES=['🌳','🌲','🌴','🌳','🌵'],
 FEAT={falagar:'🏭',shop:'🏪',inn:'🏨',temple:'🏥',dock:'🛻',hall:'🏛️',witch:'🏬',academy:'🏫',oracle:'📡',hermit:'🏚️',well:'💧'};
const ROLES=[
 {e:'🧑‍🌾',nm:'鎮民',v:'npc',ln:['今年的麥子長得不錯，就是夜裡常聽見林子裡有野獸咆哮。','我家那口子去排隊打泉水了。','別看我只是個農夫，我女兒可是自由港的衛兵！']},
 {e:'🧑‍🍳',nm:'貨郎',v:'npc',ln:['剛烤好的蘑菇串，要不要來一串？','近來怪物猖獗，連商隊都不敢走夜路。','旅店裡消息最靈通，你們去打聽打聽。']},
 {e:'💂',nm:'護衛',v:'npc',ln:['鎮守重地，閒人莫入。最近怪物作亂，各位多加小心。','夜裡我都不敢打盹，聽說有烏鴉山賊摸進鎮裡。','要出城的話，記得先備足治療藥水。']},
 {e:'🤠',nm:'流浪者',v:'npc',ln:['我遊歷天下，只想找一把順手的附魔長劍。','聽說自由港的神諭先知能打聽到大陸大事，真想去看看。','在恩洛斯活下去，靠的不只是劍與魔法，還有運氣。']},
 {e:'🧑‍🔧',nm:'鐵匠',v:'npc2',ln:['噓……我只是路過，別盯著我的鐵砧看。','沒有王室庇護，什麼裝備都得自己動手打造。','想買情報？先看看你的錢袋夠不夠。']},
 {e:'🧑‍🚒',nm:'🌐 冒險者 鐵拳衛士',v:'npc',ln:['有人要組隊去法師古塔嗎？','（模擬玩家）我剛升到 5 級，終於買得起秘銀劍。']},
 {e:'🧑‍🎓',nm:'🌐 冒險者 老藥師',v:'npc',ln:['赤龍好痛，建議多帶治療藥水。','（模擬玩家）守護巨像真的很帥，記得先把魔法之門能量充滿。']},
 {e:'🧑‍🎤',nm:'🌐 冒險者 藍衣法師',v:'npc2',ln:['銀灣的弓箭好貴……','我昨天一個人清完烏鴉山賊營！']}];
function genTown(i){const A=AREAS[i],W=A.w,H=A.h,ents={},bd={},sx0=W>>1,sy0=H-3,
 g=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>x==0||y<=2||x==W-1||y==H-1?1:0)),
 hse=(x,y)=>({e:HOUSES[Math.floor(hs(x,y,5+i)*HOUSES.length)],z:1.15+hs(x,y,6)*.2}),
 tre=(x,y)=>({e:TREES[Math.floor(hs(x,y,7+i)*TREES.length)],z:1.2+hs(x,y,8)*.2});
 SVC[i].forEach((v,k)=>{const x=3+(k%6)*4,y=3+Math.floor(k/6)*5;ents[x+','+y]={t:'n',e:v[1],svc:v[0],nm:v[2]};
  for(let d=-1;d<=1;d++){const bx=x+d,by=y-1;if(bx<1||bx>=W-1)continue;g[by][bx]=1;bd[bx+','+by]=d?hse(bx,by):{e:FEAT[v[0]]||'🏠',z:1.38}}});
 for(let x=0;x<W;x++){const k=x+',2';if(!bd[k])bd[k]=(x==0||x==W-1)?tre(x,2):hse(x,2)}          
 for(let y=3;y<H-1;y++){bd['0,'+y]=tre(0,y);bd[(W-1)+','+y]=tre(W-1,y)}                             
 for(let x=0;x<W;x++)bd[x+','+(H-1)]=tre(x,H-1);                                                
 ents[sx0+','+(H-2)]={t:'n',e:'💂',svc:'gate',nm:'山門'};
 [[2,6],[W-3,6],[2,11],[W-3,11],[6,13],[W-7,13],[2,15],[W-3,15],[9,10],[W-10,10]].forEach(([x,y])=>{
  if(y>=H-2||g[y][x]||ents[x+','+y]||Math.abs(x-sx0)+Math.abs(y-sy0)<4)return;
  if(Object.keys(ents).some(k=>{const[a,b]=k.split(',').map(Number);return Math.abs(a-x)+Math.abs(b-y)<2}))return;
  g[y][x]=1;bd[x+','+y]=tre(x,y)});
 const free=[];for(let y=4;y<=H-4;y++)for(let x=2;x<=W-3;x++){if(g[y][x]||Math.abs(x-sx0)+Math.abs(y-sy0)<4)continue;
  if(Object.keys(ents).some(k=>{const[a,b]=k.split(',').map(Number);return Math.abs(a-x)+Math.abs(b-y)<2}))continue;free.push([x,y])}
 for(let j=free.length-1;j>0;j--){const r=R(j+1);[free[j],free[r]]=[free[r],free[j]]}
 const picked=[],ro=ROLES.map((r,k)=>[Math.random(),r]).sort((a,b)=>a[0]-b[0]).map(a=>a[1]);
 for(const [x,y] of free){if(picked.length>=6)break;if(picked.some(([a,b])=>Math.abs(a-x)+Math.abs(b-y)<4))continue;picked.push([x,y]);
  const r=ro[(picked.length-1)%ro.length];ents[x+','+y]={t:'n',e:r.e,svc:'chat',nm:r.nm,v:r.v,ln:r.ln,wander:1,hx:x,hy:y}}
 return{g,bd,ents,seen:new Set(),x:sx0,y:sy0,sx:sx0,sy:sy0,W,H,pp:null,n:0}}

const dirN=()=>((st[ai].n%4)+4)%4;
let lastAct=0;
function faceDir(d){const S=st[ai],diff=(d-dirN()+4)%4;if(diff){S.n+=diff==3?-1:diff;ty=-S.n*Math.PI/2}}
function act(a){if(busy)return;stopWalk();const nw=performance.now();if(nw-lastAct<(a=='tl'||a=='tr'?250:160))return;lastAct=nw;const S=st[ai],d=dirN(),f=DIR[d],r=DIR[(d+1)%4];
 if(a[0]=='d'){const q='nesw'.indexOf(a[1]);faceDir(q);move(DIR[q][0],DIR[q][1]);return}
 if(a=='tl'){S.n--;ty=-S.n*Math.PI/2;render();return}
 if(a=='tr'){S.n++;ty=-S.n*Math.PI/2;render();return}
 const v={f:f,b:[-f[0],-f[1]],sl:[-r[0],-r[1]],sr:r}[a];move(v[0],v[1])}
function move(dx,dy){const S=st[ai],nx=S.x+dx,ny=S.y+dy;
 if(nx<0||ny<0||nx>=S.W||ny>=S.H||S.g[ny][nx])return;
 const k=nx+','+ny,e=S.ents[k];
 if(e){
  if(e.t=='m'||e.t=='b'){fight(e,k);return}
  if(e.t=='n'){faceTo(k);SV[e.svc](e);return}
  if(e.t=='c'){delEnt(k);chest()}
  else if(e.t=='f'){delEnt(k);party.forEach(p=>p.hp=p.mx);say('🚰 飲下魔法泉水，全隊生命與魔力恢復！')}
  else if(e.t=='qi'){delEnt(k);has[e.key]=1;say(`📜 獲得任務物品：${QI[e.key]}`)}
  else if(e.t=='q'){enter(AREAS[ai].par);return}}
 S.x=nx;S.y=ny;tx=nx+.5;tz=ny+.5;render()}
function genItem(t,sl,mag){t=Math.min(4,t);sl=sl||'wwsahbc'[R(7)];const m=mag||Math.random()<.2+t*.05;let it;
 if(sl=='w'){const ty=Object.keys(WT)[R(6)];it={sl,ty,e:WT[ty][0],n:WT[ty][2][t],b:WB[t]}}
 else{const G=GEAR[sl];it={sl,e:G.e[t],n:G.n[t],b:G.b[t]}}
 if(m){it.mag=1;it.b+=sl=='c'?6:3;it.n=AF[R(5)]+it.n}return it}
const score=(m,it)=>it.b+(it.sl=='w'&&m.pf.includes(it.ty)?2:0);
function eq(p,it){const o=p.g[it.sl],old=p.it[it.sl];p.it[it.sl]=it;p.g[it.sl]=score(p,it);p.ic[it.sl]=it.e;
 if(it.sl=='c'){const d=p.g.c-o;p.mx+=d;p.hp=p.hp>0?Math.min(p.mx,Math.max(1,p.hp+d)):0}
 if(old)stash(old)}
function stash(it){if(bag.length>=30){gold+=it.b*6;say(`🎒 背包已滿，${it.e}${it.n} 自動賣出 🪙${it.b*6}`);return}
 bag.push(it);say(`🎒 ${it.e}${it.mag?'✨':''}${it.n} 放入背包`)}
function giveItem(it){let best=null,gain=0;party.forEach(p=>{const g=score(p,it)-p.g[it.sl];if(g>gain){gain=g;best=p}});
 if(best){eq(best,it);say(`🎁 ${it.e}${it.mag?'✨':''}${it.n} → ${best.e}${best.n} 裝備`);return}
 stash(it)}
function chest(){const L=DL();{const sc=2+R(4)+(hasP('lck')?3:0);mats.scrap+=sc;say(`🔩 魔晶碎片 +${sc}`)}
 if(Math.random()<.2){const gg=15+R(20)+L*10;gold+=gg;pot++;say(`🎁 🪙金幣${gg} 與 💊治療藥水×1`);return}
  if(Math.random()<.12){mats.ret=(mats.ret|0)+1;say('🧧 木箱裡有一張 傳送卷軸');return}
 giveItem(genItem(L+(Math.random()<.4+spc[6]*.02?1:0)))}
function recruit(r){party.push(mk(r.n,r.e,r.hp+(lv-1)*5,r.atk+(lv-1),r.def+((lv-1)>>1),r.cl,r.pf));say(`${r.e} ${r.n}加入了隊伍！`)}
function gainXp(x){x=Math.round(x*(hires.includes('scholar')?1.25:1)*(1+(spc[4]-1)*.03)*(hasP('int')?1.1:1));xp+=x;let up='';
 while(xp>=25*lv){xp-=25*lv;lv++;pp++;party.forEach(p=>{p.mx+=5;p.hp=Math.min(p.mx,p.hp+8);p.atk+=1;if(lv%2==0)p.def+=1});up=` ⭐升級！等級 ${lv}`}return up}
function bossDown(){const A=AREAS[ai];done[ai]=1;
 if(A.bk=='final'){victory();return true}
 if(A.bk){has[A.bk]=1;say(`📜 達成：${QI[A.bk]}`)}
 if(A.loot){for(let k=0;k<A.loot;k++)giveItem(genItem(4));gold+=150}else giveItem(genItem(A.lv+1));
 say('首領倒下！回到入口 🔙 即可離開');return false}

/* ---------- 城鎮服務（對話視窗）---------- */
let UI=[];
function ui(e,t,txt,opts,v){busy=true;UI=opts.map(o=>o.f);$('#ov').style.display='flex';
 $('#ob').innerHTML=`<div style="font-size:48px">${SI(e,v||'npc',1.3)}</div><b>${t}</b><p style="font-size:21px;margin:8px 0;text-align:left;white-space:pre-line">${txt}</p>
 <div style="display:flex;flex-direction:column;gap:6px;max-height:46vh;overflow:auto">${opts.map((o,i)=>`<button style="font-size:21px;padding:9px" ${o.d?'disabled':''} onclick="UI[${i}]()">${o.t}</button>`).join('')}
 <button style="font-size:21px;padding:9px" onclick="closeUI()">告辭</button></div>`}
function closeUI(){busy=false;$('#ov').style.display='none';render()}
const price=p=>Math.round(p*(hires.includes('merchant')?.8:1)*(1-(spc[3]-1)*.02)*(hasP('cha')?.92:1));
function pay(p){p=price(p);if(gold<p){say('🪙 金幣不足');return false}gold-=p;return true}
const cost=it=>it.b*14+(it.mag?30:0);
const iH=it=>`${SI(it.e,'i',1.4)}${it.mag?'✨':''}${esc(it.n)}${it.sl=='w'?'（'+WT[it.ty][1]+'）':''} +${it.b}${it.sl=='c'?'❤️':''}`;
const iTxt=it=>`${it.e}${it.mag?'✨':''}${it.n}${it.sl=='w'?'（'+WT[it.ty][1]+'）':''} +${it.b}${it.sl=='c'?'❤️':''}`;
const nextDep=days=>{let d=0;while(!days.includes((day-1+d)%7))d++;return d};
const SV={
 falagar(e){ui('🧓','羅蘭國王',STORY+'\n\n（拿著這幾瓶治療藥水，路上保重。）',[{t:'💊 收下 2 瓶治療藥水',d:fal,f:()=>{pot+=2;fal=1;SV.falagar(e)}}])},
 shop(e){const S_=SHOP[ai]||(SHOP[ai]=Array.from({length:6},()=>genItem(AREAS[ai].tt+R(2))));
  ui('🧑‍💼','鐵拳軍械庫',`🪙 金幣:${gold}（裝備與隊員職業專長相合有額外威力加成）`,S_.map(it=>({t:`${iH(it)}｜🪙${price(cost(it))}`,d:it.sold,f:()=>{if(pay(cost(it))){it.sold=1;giveItem(it)}SV.shop(e)}})))},
 witch(e){const c=WITCH[ai]||(WITCH[ai]=genItem(AREAS[ai].tt+1,'c',1));
  ui('🧑‍🔬','鍊金藥鋪',`🪙 金幣:${gold}`,[
   {t:`💊 治療藥水 ×1｜🪙${price(30)}`,f:()=>{if(pay(30))pot++;SV.witch(e)}},
   {t:`💊 治療藥水 ×5｜🪙${price(130)}`,f:()=>{if(pay(130))pot+=5;SV.witch(e)}},
   {t:`🧪 狂戰藥劑（3 場戰鬥攻擊 +3）｜🪙${price(45)}`,f:()=>{if(pay(45))bless=3;SV.witch(e)}},
   {t:`🧧 傳送卷軸 ×1（傳送回最近的城鎮）｜🪙${price(60)}`,f:()=>{if(pay(60))mats.ret=(mats.ret|0)+1;SV.witch(e)}},
   {t:`${iH(c)}｜🪙${price(cost(c)+40)}`,d:c.sold,f:()=>{if(pay(cost(c)+40)){c.sold=1;giveItem(c)}SV.witch(e)}}])},
 inn(e){const o=[{t:`🛏️ 住宿休息（全隊回復，過 1 天）｜🪙${price(15)}`,f:()=>{if(pay(15)){party.forEach(p=>p.hp=p.mx);day++;say('😴 好好睡了一整晚')}SV.inn(e)}}];
  RECR.filter(r=>!party.some(p=>p.n==r.n)).forEach(r=>o.push({t:`${SI(r.e,'f',1.4)} 招募${r.n}（${r.d}）｜🪙${price(r.p)}`,d:party.length>=5,f:()=>{if(pay(r.p))recruit(r);SV.inn(e)}}));
  HIRE.filter(h=>!hires.includes(h.id)).forEach(h=>o.push({t:`${h.e} 雇用${h.n}（${h.d}）｜🪙${price(h.p)}`,d:hires.length>=2,f:()=>{if(pay(h.p))hires.push(h.id);SV.inn(e)}}));
  ui('🧑‍🍳','旅店',`🪙 金幣:${gold}｜隊員 ${party.length}/5｜隨從 ${hires.length}/2`,o)},
 temple(e){ui('🧑‍⚕️','神殿牧師','願神明庇佑，牧師願意替你們治療傷勢。',[
  {t:'💊 療傷並救起全隊（免費）',f:()=>{party.forEach(p=>p.hp=p.mx);say('🏥 全隊獲得治療');SV.temple(e)}},
  {t:'🙏 捐獻 🪙10 金幣（神明祝福：3 場戰鬥攻擊 +3）',f:()=>{if(gold>=10){gold-=10;bless=3;say('🙏 你獲得了神明祝福')}else say('🪙 金幣不足');SV.temple(e)}}])},
 hall(e){const qq=QUESTS.filter(q=>q.town==ai),o=[];
  qq.forEach(q=>{const s_=qs[q.id]|0;
   if(s_==0)o.push({t:`📜 接下委託「${q.t}」`,f:()=>{qs[q.id]=1;say(`📜 接受委託：${q.t}`);SV.hall(e)}});
   else if(s_==1&&has[q.k])o.push({t:`✅ 交付「${q.t}」（🪙${q.r}金幣）`,f:()=>{gold+=q.r;const up=gainXp(q.x);giveItem(genItem(AREAS[ai].tt+1));qs[q.id]=3;say(`🏆 完成委託「${q.t}」${up}`);SV.hall(e)}});
   else if(s_==1)o.push({t:`⏳ 進行中：${q.t}`,d:1,f:()=>{}})});
  ui('🧑‍⚖️','市政廳',qq.map(q=>`【${q.g}】${q.t}\n${qs[q.id]==3?'✅ 已完成':q.d}`).join('\n\n'),o)},
 oracle(e){const n=QUESTS.filter(q=>q.council&&qs[q.id]==3).length;
  ui('🧑‍💻','神諭先知',n>=4?'四個城鎮的委託都辦妥了，神諭的幻象終於清晰：惡魔之主「深淵魔王」藏身在黑郡後方的深淵王座（本遊戲結局）。':`神諭的幻象還不完整。需要先替四個城鎮完成 4 項委託（目前 ${n}/4）。`,
   n>=4&&!oracle?[{t:'📡 祈求神諭',f:()=>{oracle=1;say('📡 深淵王座的位置已揭曉！');SV.oracle(e)}}]:[])},
 academy(e){ui('🧑‍🏫',e.nm,`付金幣請教官指導訓練，獲得經驗。🪙 金幣:${gold}`,[{t:`武藝訓練（🪙${price(40*lv)}，獲得 ${30*lv} 經驗）`,f:()=>{if(pay(40*lv)){const up=gainXp(30*lv);say('🎯 訓練完成'+up)}SV.academy(e)}}])},
 hermit(e){ui('🧙','亡骨隱者','這場惡魔之禍來得不尋常。想找答案，就從替四個城鎮辦事開始，自由港的神諭先知會替你們指路。',[])},
 rumor(e){ui('🧑‍🌾','路人',RUM[R(RUM.length)],[],e.g?'npc2':'npc')},
 chat(e){const l=e.ln&&Math.random()<.7?e.ln[R(e.ln.length)]:RUM[R(RUM.length)];ui(e.e,e.nm,l,[],e.v||'npc')},
 well(e){ui('🧑‍🔧','魔法泉',wl?'魔法泉已經乾涸了。':'一座閃著微光的魔法泉，泉水帶著淡淡的魔力。',wl?[]:[{t:'💧 飲下泉水（全隊攻擊永久 +2）',f:()=>{wl=1;party.forEach(p=>p.atk+=2);say('🚰 全隊攻擊永久 +2');SV.well(e)}}])},
 gate(e){ui('💂','城門','要前往何處？',AREAS[ai].ex.map(id=>{const A=AREAS[id],lock=A.bk=='final'&&!oracle;
  return{t:`${A.i} ${A.n}｜${A.ty=='field'?'野外':'據點'}｜建議等級 ${A.lv*2+1}${lock?' 🔒':''}`,d:lock,f:()=>{closeUI();enter(id)}}}))},
 dock(e){const o=ROUTES.filter(r=>r.a==ai||r.b==ai).map(r=>{const to=r.a==ai?r.b:r.a,w=nextDep(r.days);
   return{t:`${r.ty} → ${AREAS[to].n}｜${r.days.length==7?'每日':r.days.map(d=>WD[d]).join('、')}｜🪙${price(r.p)}｜${w?w+' 天後發車':'今日出發'}`,
    f:()=>{if(pay(r.p)){day+=w+1;closeUI();enter(to)}else SV.dock(e)}}});
  if(hires.includes('gate'))[...visited].filter(t=>t!=ai).forEach(t=>o.push({t:`🧭 車馬嚮導：直接帶你到 ${AREAS[t].n}｜🪙${price(40)}`,f:()=>{if(pay(40)){closeUI();enter(t)}else SV.dock(e)}}));
  ui(e.e,e.nm,`今天是第 ${day} 天（${WD[(day-1)%7]}）。`,o)}};

function say(t){logs.push({i:++lid,d:day,a:AREAS[ai]?.n||'',t});if(logs.length>800)logs.shift()}
let bx=0,bz=0,lunge=0,shake=0,ms=[];
const RG={archer:1,mage:1,heal:1,dragon:1};
let fxs=[];
function removeMs(){ms.forEach(m=>world.remove(m.s));ms=[];fxs.forEach(f=>world.remove(f.s));fxs=[]}
function mkMs(){removeMs();const ord=[...party.filter(p=>!RG[p.cl]),...party.filter(p=>RG[p.cl])],O=[0,-.26,.26,-.52,.52];
 ms=ord.map((p,i)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:etex(p.hp>0?p.e:'💀',null,.8,1,p.hp>0?'b':'dead'),transparent:true,fog:false}));
 s.scale.set(.2,.2,1);s.renderOrder=5;s.userData={};world.add(s);return{p,s,off:(party.indexOf(p)-(party.length-1)/2)*Math.min(.26,.6/Math.max(1,party.length-1)),rg:!!RG[p.cl]}})}
function arrowTex(){if(tc.arrow)return tc.arrow;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');
 x.strokeStyle='#e8d9a8';x.lineWidth=5;x.beginPath();x.moveTo(32,60);x.lineTo(32,14);x.moveTo(32,60);x.lineTo(25,50);x.moveTo(32,60);x.lineTo(39,50);x.stroke();
 x.fillStyle='#cfd6e6';x.beginPath();x.moveTo(32,2);x.lineTo(43,19);x.lineTo(21,19);x.fill();return tc.arrow=new THREE.CanvasTexture(c)}
function addFx(map,a,b,delay,dur,s0,s1,arc,fade){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,fog:false,depthTest:false}));
 sp.renderOrder=8;sp.visible=false;world.add(sp);fxs.push({s:sp,a:a.clone(),b:b.clone(),t0:performance.now()+delay,dur,s0,s1,arc,fade})}
function attackFx(m,i){const u=m.s.userData,cl=m.p.cl,mp=spr[cur.k].position,p=m.s.position,d=i*130,now=performance.now(),V=(x,y,z)=>new THREE.Vector3(x,y,z);
 const spark=(e)=>{for(let k=0;k<5;k++){const o=V((Math.random()-.5)*.2,0,(Math.random()-.5)*.2),a=p.clone().add(o);a.y=p.y-.05;const b=a.clone();b.y+=.28;addFx(etex(e,null,.8),a,b,d+k*50,380,.07,.13,0,true)}};
 if(cl=='archer'){u.cast={t0:now+d,dur:220};addFx(etex('🔸',null,.8),p,mp,d+90,300,.1,.1,.14,false);return{hit:d+390,rg:true}}
 if(cl=='mage'){u.cast={t0:now+d,dur:450};spark('✨');addFx(etex('⚡',null,.8,1,'x'),p,mp,d+450,360,.1,.34,.15,false);addFx(etex('💥',null,.8),mp,mp,d+810,320,.3,1.0,0,true);return{hit:d+810,rg:true}}
 if(cl=='heal'){u.cast={t0:now+d,dur:450};spark('💊');addFx(etex('🌟',null,.8),p,mp,d+450,360,.1,.3,.15,false);addFx(etex('💫',null,.8),mp,mp,d+810,320,.3,.9,0,true);return{hit:d+810,rg:true}}
 if(cl=='dragon'){u.cast={t0:now+d,dur:300};for(let k=0;k<4;k++)addFx(etex('🔥',null,.8,1,'x'),p,mp,d+k*90,300,.1,.36,.1,false);addFx(etex('💥',null,.8),mp,mp,d+420,320,.3,1.0,0,true);return{hit:d+420,rg:true}}
 u.dash={t0:now+d,dur:380};return{hit:d+190,rg:false}}
function syncMs(){ms.forEach(m=>{m.s.material.map=etex(m.p.hp>0?m.p.e:'💀',null,.8,1,m.p.hp>0?'b':'dead');m.s.material.needsUpdate=true})}
const alive=()=>party.filter(p=>p.hp>0);
const defOf=p=>p.def+p.g.a+p.g.h+p.g.s+p.g.b;
function faceTo(k){const S=st[ai],[x,y]=k.split(',').map(Number),d=DIR.findIndex(a=>a[0]==x-S.x&&a[1]==y-S.y);
 if(d<0)return;const diff=(d-dirN()+4)%4;S.n+=diff==3?-1:diff;ty=-S.n*Math.PI/2}
function fight(e,k){busy=true;const b=e.t=='b',hp=Math.round((14+DL()*16+R(8))*(b?3:1));
 cur={k,b,e:e.e,hp,mx:hp,atk:Math.round((3+DL()*3)*(b?1.5:1)),lock:false};faceTo(k);
 mkMs();$('#cb').style.display='flex';say(`${mn(e.e)} 擋住了去路！隊伍列陣，點擊畫面或按 ⚔️ 出擊`);fUI()}
function fUI(){const E=cur;if(!E)return;$('#eb').style.display='block';
 $('#eb').innerHTML=`${E.b?'👑 怪物首領':'野獸'} ${SI(E.e,'m',1.8)} ${mn(E.e)} ${Math.max(0,E.hp)}/${E.mx}<div class="eh"><i style="width:${Math.max(0,E.hp/E.mx*100)}%"></i></div>`;render()}
function endUI(keep){vatsClose();$('#cb').style.display='none';$('#eb').style.display='none';if(!keep)removeMs()}
function floatTxt(t,c,onE=true){const sp=cur&&spr[cur.k],el=document.createElement('div');el.className='dmg';el.textContent=t;el.style.color=c;
 let x=view.clientWidth/2,y=view.clientHeight*.65;
 if(onE&&sp){const v=sp.position.clone().project(cam);x=(v.x+1)/2*view.clientWidth;y=(1-v.y)/2*view.clientHeight}
 el.style.left=(x-16)+'px';el.style.top=y+'px';view.appendChild(el);
 requestAnimationFrame(()=>{el.style.transform='translateY(-55px)';el.style.opacity=0});setTimeout(()=>el.remove(),900)}
function hitFx(d,l){const sp=spr[cur.k];if(sp)sp.userData.hit=1;if(l)lunge=.4;floatTxt('-'+d,'#ffd84a')}
function hurtFx(){shake=1;$('#fl').style.opacity=.8;setTimeout(()=>$('#fl').style.opacity=0,220)}
function counter(){cur.lock=true;setTimeout(enemyTurn,520)}
function enemyTurn(){const E=cur;if(!E)return;
 if(alive().find(p=>p.cl=='heal')){const l=alive().sort((a,b)=>a.hp/a.mx-b.hp/b.mx)[0];l.hp=Math.min(l.mx,l.hp+4+lv)}
 const t=alive()[R(alive().length)],dm=Math.max(1,Math.round(E.atk+R(4)-defOf(t)/2));t.hp-=dm;
 hurtFx();{const m=ms.find(m=>m.p===t);if(m)m.s.userData.hurt=1;syncMs()}say(`${mn(E.e)} 攻擊 ${t.e}${t.n}，造成 ${dm} 傷害`);
 if(!alive().length){E.lock=true;fUI();setTimeout(wipe,600);return}
 E.lock=false;fUI()}
function round(){if(!cur||cur.lock)return;const E=cur;E.lock=true;const al=ms.filter(m=>m.p.hp>0);let tot=0,end=0;
 al.forEach((m,i)=>{let d=m.p.atk+m.p.g.w+R(4)+(bless>0?3:0)+dmgBonus(m.p);if(Math.random()<critCh())d=Math.round(d*1.8);tot+=d;const a=attackFx(m,i);end=Math.max(end,a.hit);
  setTimeout(()=>{if(cur!==E)return;E.hp-=d;hitFx(d,!a.rg);fUI()},a.hit)});
 say(`⚔️ 全隊齊發攻擊，共造成 ${tot} 傷害`);render();
 setTimeout(()=>{if(cur!==E)return;if(E.hp<=0)setTimeout(win,250);else counter()},end+300)}
function usePot(){if(!cur||cur.lock)return;if(pot<1){say('沒有治療藥水了！');return render()}pot--;
 const l=alive().sort((a,b)=>a.hp/a.mx-b.hp/b.mx)[0];l.hp=Math.min(l.mx,l.hp+30);
 floatTxt('+30','#6f6',false);say(`💊 ${l.e}${l.n} 喝下藥水恢復 30 HP`);fUI();counter()}
function flee(){if(!cur||cur.lock)return;
 if(Math.random()<(cur.b?.25:.65)+(spc[5]-1)*.02){cur=null;endUI();busy=false;say('🏃 成功逃跑！');render()}
 else{say('逃跑失敗！');fUI();counter()}}
function win(){const S=st[ai],E=cur,k=E.k,L=DL(),g=5+R(10)+L*8,x=(8+L*6)*(E.b?4:1);gold+=g;const up=gainXp(x);if(bless>0)bless--;
 party.forEach(p=>{if(p.hp<=0)p.hp=1});
 const sp=spr[k];if(sp)sp.userData.die=1;floatTxt(`✨+${x}`,'#9cf',false);
 say(`${mn(E.e)} 被擊敗！🪙金幣${g} 經驗✨${x}${up}`);cur=null;endUI(true);render();
 setTimeout(()=>{removeMs();delEnt(k);if(E.b&&bossDown())return;busy=false;render()},450)}
function wipe(){cur=null;endUI();party.forEach(p=>p.hp=Math.ceil(p.mx/2));gold=Math.floor(gold/2);$('#ov').style.display='flex';
 $('#ob').innerHTML=`<div class="big">💀</div><b>隊伍重傷倒下……</b><p>你們在入口甦醒，損失了一半金幣。</p><div class="row"><button onclick="respawn()">繼續冒險</button></div>`}
function respawn(){busy=false;$('#ov').style.display='none';const A=AREAS[ai];enter(A.ty=='town'?ai:A.par);say('🙏 你們在 神殿甦醒')}
function victory(){busy=true;$('#ov').style.display='flex';
 $('#ob').innerHTML=`<div class="big">🏆</div><h3>魔法之門重啟！</h3><p>深淵魔王倒下，克里根惡魔軍團瓦解。隊伍 ${party.length} 人，等級 ${lv}。<br>魔力水晶送回 鐵拳城堡，魔法之門重新運轉，恩洛斯得救了。</p><div class="row"><button onclick="init()">🔁 重新開始</button></div>`}

/* ---------- UI ---------- */
function render(){const S=st[ai],A=AREAS[ai];syncBgm();
 $('#hud').textContent=`${A.i} ${A.n}`;const cq=QUESTS.filter(q=>q.council&&qs[q.id]==3).length;
 $('#st').innerHTML=`等級 <b>${lv}</b>${pp>0?' ⭐'+pp:''}<br>🪙金幣 <b>${gold}</b> 💊藥水 <b>${pot}</b> 🧧傳送卷軸 <b>${mats.ret|0}</b> 🎒 <b>${bag.length}</b> 🔩碎片 <b>${mats.scrap}</b><br>📅 第${day}天 ${WD[(day-1)%7]}<br>🏛️ 城鎮委託 <b>${cq}/4</b><br>${hires.map(h=>HIRE.find(x=>x.id==h).e).join('')}${bless>0?'🕯️':''} 🧭${'北東南西'[dirN()]}<br>🌐 在線冒險者 <b>${typeof ONL!='undefined'?ONL:14}</b>（模擬）`;
 $('#log').innerHTML=`<b>${esc((logs[logs.length-1]||{}).t||'')}</b>`;
 $('#party').innerHTML=party.map(p=>`<div class="pc"><div class="vb"><i style="height:${Math.max(0,p.hp/p.mx*100)}%"></i></div>
  <div class="fc">${p.hp>0?SI(p.e,'f',1.45):SI('💀','dead',1.45)}<small>${p.hp}/${p.mx}</small><small>${['w','s','a','h','b','c'].map(k=>p.ic[k]?SI(p.ic[k],'i',1.5):'·').join('')}</small></div>
  <div class="vb m"><i style="height:${Math.min(100,(p.atk+p.g.w)*6)}%"></i></div></div>`).join('');
 mini();panel()}
function mini(){const S=st[ai],c=$('#mm'),x=c.getContext('2d'),z=8,r=10;x.clearRect(0,0,160,160);x.fillStyle='#0b0b10';x.fillRect(0,0,160,160);
 for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const a=S.x+dx,b=S.y+dy;if(a<0||b<0||a>=S.W||b>=S.H)continue;
  if(dx*dx+dy*dy<=30)S.seen.add(b*S.W+a);if(!S.seen.has(b*S.W+a))continue;
  x.fillStyle=S.g[b][a]?'#5a4a3a':'#b8a27a';x.fillRect(80+(dx-.5)*z,80+(dy-.5)*z,z-1,z-1);
  const e=S.ents[a+','+b];if(e&&dx*dx+dy*dy<=30){x.fillStyle=e.t=='m'||e.t=='b'?'#f33':e.t=='c'?'#fd0':'#4f8';x.fillRect(80+dx*z-2,80+dy*z-2,4,4)}}
 x.save();x.translate(80,80);x.rotate(dirN()*Math.PI/2);x.fillStyle='#4f8';x.beginPath();x.moveTo(0,-7);x.lineTo(5,5);x.lineTo(-5,5);x.fill();x.restore();drawPath(x,S)}

const BG=Object.fromEntries(['town','field','dungeon','battle','boss'].map(k=>[k,['audio/'+k+'.ogg','audio/'+k+'.mp3']])),AU={};
let want=null,playing=null,vol=.5,muted=false,unlocked=false,dp=null;
try{const a=JSON.parse(localStorage.getItem('tm_audio')||'{}');if(typeof a.vol=='number')vol=Math.max(0,Math.min(1,a.vol));muted=!!a.muted}catch(e){}
const saveAudio=()=>{try{localStorage.setItem('tm_audio',JSON.stringify({vol,muted}))}catch(e){}};
const aud=k=>{if(AU[k])return AU[k];const a=Object.assign(new Audio(),{loop:true,preload:'auto',volume:0});let i=0;a.onerror=()=>{if(++i<BG[k].length)a.src=BG[k][i]};a.src=BG[k][0];return AU[k]=a};
function fade(){clearInterval(fade.t);fade.t=setInterval(()=>{let w=0;for(const k in AU){const a=AU[k],tg=k==playing&&!muted?vol:0,d=tg-a.volume;
  if(Math.abs(d)<.03){a.volume=tg;if(!tg&&!a.paused)a.pause()}else{a.volume=Math.max(0,Math.min(1,a.volume+Math.sign(d)*.04));w=1}}if(!w)clearInterval(fade.t)},50)}
function bgm(k){want=k}
function unlock(){if(unlocked)return;unlocked=true;playing=null;bgm(want)}
['pointerdown','keydown','touchend'].forEach(v=>addEventListener(v,unlock,{passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden){for(const k in AU)AU[k].pause()}else if(unlocked){playing=null;bgm(want)}});
function toggleMute(){muted=!muted;saveAudio();$('#mt').textContent=muted?'🔇':'🔊';if(!muted&&unlocked){const k=playing||want;playing=null;bgm(k)}else fade()}
function setVol(v){vol=v/100;saveAudio();if(muted&&vol>0)toggleMute();else fade()}
function syncBgm(){const A=AREAS[ai];bgm(cur?(cur.b?'boss':'battle'):A.ty=='town'?'town':A.ty=='dungeon'?'dungeon':'field')}

const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform=='MacIntel'&&navigator.maxTouchPoints>1),isApp=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;if(tab=='sys')setTab('sys')});
addEventListener('appinstalled',()=>{dp=null;say('📲 已安裝為 App');if(tab=='sys')setTab('sys')});
function doInstall(){if(!dp)return;dp.prompt();dp.userChoice.finally(()=>{dp=null;setTab('sys')})}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openSheet(t){setTab(t||tab);document.body.classList.add('sheet')}
function closeSheet(){document.body.classList.remove('sheet')}
function setTab(t){tab=t;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==t));jkey=ikey='';panel()}
function panel(){const p=$('#tp');if(!p)return;if(tab=='sp'||tab=='mk'||tab=='bd')return xPanel(p);
 if(tab=='log'){const k=logs.length+':'+(logs[0]||{}).i+':'+(logs[logs.length-1]||{}).i;if(k==jkey)return;
  const stick=!jkey||p.scrollHeight-p.scrollTop-p.clientHeight<40;jkey=k;
  p.innerHTML=logs.map(l=>`<div class="je"><small>第${l.d}天 · ${esc(l.a)}</small>${esc(l.t)}</div>`).join('')||'尚無紀錄';
  if(stick)p.scrollTop=p.scrollHeight;return}
 if(tab=='sys'){if(ikey=='sys')return;ikey='sys';
  p.innerHTML=`<div class="sb"><div style="color:var(--mut);font-size:18px">💾 存檔欄位（每 30 秒自動存檔；${window.SAFE_LS?'儲存在瀏覽器':'⚠️ 此環境無法永久儲存，關閉頁面會消失，請務必匯出存檔'}）</div>${['auto',1,2,3].map(k=>{const i=slotInfo(k);return`<div class="ib"><span style="flex:1">${k=='auto'?'自動存檔':'欄位 '+k}<small>${i||'（空）'}</small></span>${k=='auto'?'':`<button onclick="saveSlot(${k})">存檔</button>`}<button ${i?'':'disabled'} onclick="loadSlot('${k}')">讀取</button></div>`}).join('')}
<button onclick="exportSave()">📤 匯出存檔（.json）</button><button onclick="FI.click()">📥 匯入存檔（.json）</button><button onclick="exportLog()">📝 匯出冒險日誌（.txt）</button><button onclick="copySave()">📋 複製存檔碼</button><textarea id="sc" rows="3" placeholder="在此貼上存檔碼，再按「由存檔碼讀取」" style="width:100%;font-size:16px;background:#0003;color:var(--ink);border:2px solid var(--edge);border-radius:8px;padding:6px;-webkit-user-select:text;user-select:text"></textarea><button onclick="pasteLoad()">📂 由存檔碼讀取</button><button onclick="newGame()">🔁 重新開始</button>
<div style="color:var(--mut);font-size:18px">快捷鍵：I 背包、J 日誌、K 系統、C 技能、X 煉金、B 城堡、戰鬥中 V 開啟精準瞄準。🌐 其他冒險者與聊天為模擬，沒有真正連線。</div></div>`;return}
 const SN={w:'武器',a:'護甲',s:'護盾',h:'頭盔',b:'靴子',c:'飾品'},lk=cur||busy?'disabled':'',qi=Object.keys(has).filter(k=>QI[k]);
 let h=`<h4>🪙 金幣 ${gold} 💊 治療藥水 ${pot}${bless>0?' 🕯️ 祝福 '+bless:''}</h4><div class="ib"><button ${lk} onclick="potion()">💊 喝下治療藥水</button> <button ${lk} onclick="useReturn()">🧧 使用傳送卷軸（${mats.ret|0}）</button></div>
 <h4>📜 任務物品</h4>`+(qi.length?qi.map(k=>`<div>${esc(QI[k])}</div>`).join(''):'<div style="color:var(--mut)">（無）</div>')
 +'<h4>🧑‍🤝‍🧑 隨從</h4><div>'+(hires.length?hires.map(x=>{const H=HIRE.find(y=>y.id==x);return esc(H.e+H.n+'（'+H.d+'）')}).join('<br>'):'<span style="color:var(--mut)">（無）</span>')+'</div>'
 +'<h4>🛡️ 隊員裝備</h4>'+party.map(m=>`<div style="margin-bottom:4px"><b>${SI(m.e,'f',1.5)}${esc(m.n)}</b>｜攻 ${m.atk+m.g.w}／防 ${defOf(m)}<br>`+Object.keys(SN).map(k=>`<span style="color:var(--mut)">${SN[k]}</span> ${m.it&&m.it[k]?iH(m.it[k]):'—'}`).join(' ')+'</div>').join('')
 +`<h4>🎒 背包 ${bag.length}/30</h4>`+(bag.length?bag.map((it,i)=>`<div class="ib"><span>${iH(it)}</span>`+party.map((m,j)=>{const d=score(m,it)-m.g[it.sl];return`<button ${lk} onclick="eqBag(${i},${j})">${SI(m.e,'f',1.4)}${d>0?'▲':d<0?'▼':'＝'}${Math.abs(d)}</button>`}).join('')+`<button ${lk} onclick="sellBag(${i})">賣 🪙${it.b*6}</button></div>`).join('')+`<div class="ib"><button ${lk} onclick="sellAll()">全部變賣</button></div>`:'<div style="color:var(--mut)">（空）▲▼表示裝備後的加成變化</div>');
 if(h==ikey)return;ikey=h;const sc=p.scrollTop;p.innerHTML=h;p.scrollTop=sc}
function eqBag(i,j){if(cur||busy)return;const it=bag.splice(i,1)[0],m=party[j];if(!it||!m)return;eq(m,it);say(`🎒 ${m.e}${m.n} 裝備上 ${it.e}${it.mag?'✨':''}${it.n}`);render()}
function sellBag(i){if(cur||busy)return;const it=bag.splice(i,1)[0];if(!it)return;gold+=it.b*6;say(`🪙 賣出 ${it.e}${it.n}，獲得金幣 ${it.b*6}`);render()}
function sellAll(){if(cur||busy||!bag.length)return;const g=bag.reduce((s,x)=>s+x.b*6,0);say(`🪙 賣出背包內 ${bag.length} 件物品，獲得金幣 ${g}`);gold+=g;bag=[];render()}
function dl(name,txt,type){const a=document.createElement('a'),u=URL.createObjectURL(new Blob([txt],{type}));a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}
const stamp=()=>{const d=new Date(),z=n=>String(n).padStart(2,'0');return`${d.getFullYear()}${z(d.getMonth()+1)}${z(d.getDate())}-${z(d.getHours())}${z(d.getMinutes())}`};
function saveGame(){const data=JSON.stringify({game:'劍與魔法之門',v:1,at:new Date().toISOString(),d:{party,gold,pot,xp,lv,ai,st,logs,done,has,qs,visited,hires,bless,day,SHOP,WITCH,oracle,fal,wl,bag,lid,MX}},(k,v)=>v instanceof Set?{__set:[...v]}:v);
 dl(`劍與魔法之門_等級${lv}_第${day}天_${stamp()}.json`,data,'application/json');say('💾 已匯出存檔')}
function saveLog(){dl(`劍與魔法之門_冒險日誌_${stamp()}.txt`,logs.map(l=>`[第${l.d}天｜${l.a}] ${l.t}`).join('\n'),'text/plain;charset=utf-8');say('📝 已匯出冒險日誌')}
function loadGame(txt){let o;try{o=JSON.parse(txt,(k,v)=>v&&typeof v=='object'&&Array.isArray(v.__set)?new Set(v.__set):v);const d=o.d;
  if((o.game!='劍與魔法之門'&&o.game!='仙途遠征')||!Array.isArray(d.party)||!d.party.length||!Array.isArray(d.st)||!d.st[d.ai]||!AREAS[d.ai]||!Array.isArray(d.logs))throw 0}
 catch(e){say('❌ 存檔格式不正確，讀取失敗');render();return}
 ({party,gold,pot,xp,lv,ai,st,logs,done,has,qs,visited,hires,bless,day,SHOP,WITCH,oracle,fal,wl}=o.d);
 bag=o.d.bag||[];spc=o.d.spc||[4,4,4,4,4,4,4];perks=o.d.perks||[];pp=o.d.pp||0;mats=o.d.mats||{scrap:6,core:0,ret:1};BS=o.d.BS||{pool:{scrap:0,food:0,water:0}};if(o.d.MX){MX=o.d.MX;if(MX.area)AREAS[MS]=MX.area}else MX=mxNew();lid=o.d.lid||logs.length;party.forEach(m=>{m.it=m.it||{};m.ic=m.ic||{}});
 cur=null;endUI();busy=false;$('#ov').style.display='none';build();say('📂 已讀取存檔');setTab(tab);render()}
function newGame(){ui('🔁','重新開始','確定要重新開始嗎？未存檔的進度將會消失。',[{t:'是，重新開始',f:()=>{closeUI();init()}}])}
function potion(){if(busy)return;if(pot<1){say('沒有治療藥水了');return render()}
 const l=[...party].sort((a,b)=>a.hp/a.mx-b.hp/b.mx)[0];if(l.hp>=l.mx){say('全員滿血');return render()}
 pot--;l.hp=Math.min(l.mx,l.hp+30);say(`💊 ${l.e}${l.n} 喝下藥水恢復 30 HP`);render()}
document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>act(b.dataset.a));
$('#pt').onclick=potion;
addEventListener('keydown',e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName))return;const tk={i:'inv',j:'log',k:'sys',c:'sp',x:'mk',b:'bd'}[e.key.toLowerCase()];if(tk){openSheet(tk);return}
 if(cur){if(e.key==' '||e.key=='Enter'){e.preventDefault();round()}else if(e.key=='h')usePot();else if(e.key=='v')vatsOpen();else if(e.key=='r')flee();return}const kk=e.key.length==1?e.key.toLowerCase():e.key,m=(CM=='abs'?{ArrowUp:'dn',w:'dn',ArrowDown:'ds',s:'ds',ArrowLeft:'dw',a:'dw',ArrowRight:'de',d:'de',q:'tl',e:'tr'}:{ArrowUp:'f',w:'f',ArrowDown:'b',s:'b',ArrowLeft:'tl',ArrowRight:'tr',q:'tl',e:'tr',a:'sl',d:'sr'})[kk];
 if(m){e.preventDefault();act(m)}});
(function(){
  document.querySelectorAll('#js button[data-d]').forEach(bt=>{let iv=null;const dd=()=>CM=='abs'?bt.dataset.abs:bt.dataset.d,stop=()=>{clearInterval(iv);iv=null};
   bt.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();bt.setPointerCapture(e.pointerId);act(dd());stop();iv=setInterval(()=>act(dd()),CM!='abs'&&(bt.dataset.d=='tl'||bt.dataset.d=='tr')?260:170)});
   ['pointerup','pointercancel','lostpointercapture'].forEach(v=>bt.addEventListener(v,stop));
   bt.addEventListener('contextmenu',e=>e.preventDefault())});
  let sx=0,down=false,moved=false;view.style.touchAction='none';
 view.addEventListener('pointerdown',e=>{if(e.target.closest('#cb,#mm,#vt'))return;down=true;moved=false;sx=e.clientX});
 view.addEventListener('pointermove',e=>{if(!down||cur)return;const dx=e.clientX-sx;if(Math.abs(dx)>6)moved=true;if(Math.abs(dx)>50){act(dx<0?'tl':'tr');sx=e.clientX}});
 view.addEventListener('pointerup',e=>{if(!down)return;down=false;
  if(cur){if(!moved&&!cur.lock)round();return}
  if(moved)return;const r=view.getBoundingClientRect(),q=(e.clientX-r.left)/r.width;act(q<.25?'tl':q>.75?'tr':'f')});
 view.addEventListener('pointercancel',()=>{down=false});
 view.addEventListener('wheel',e=>{e.preventDefault();if(!cur)act(e.deltaY<0?'f':'b')},{passive:false});
})();
(function(){const mq=matchMedia('(max-width:899px)'),mm=$('#mm'),top=$('#side .top');
 const place=()=>{if(mq.matches)view.appendChild(mm);else top.insertBefore(mm,top.firstChild)};
 (mq.addEventListener?mq.addEventListener('change',place):mq.addListener(place));place();
 mm.title='點一下地圖上的位置，自動走過去';
 mm.addEventListener('click',e=>{const mob=mq.matches;if(mob&&!mm.classList.contains('big')){mm.classList.add('big');return}
  const r=mm.getBoundingClientRect(),dx=Math.round(((e.clientX-r.left)/r.width*160-80)/8),dy=Math.round(((e.clientY-r.top)/r.height*160-80)/8);
  if(mob)mm.classList.remove('big');if(!dx&&!dy)return;const S=st[ai];walkTo(S.x+dx,S.y+dy)});
 $('#main').addEventListener('contextmenu',e=>e.preventDefault())})();

/* ---------- 城鎮居民走動 ---------- */
let wanderT=0,miniT=0;const wnx=new WeakMap();
function wanderStep(S,nw){let moved=0;
 for(const k of Object.keys(S.ents)){const e=S.ents[k];if(!e||!e.wander||nw<(wnx.get(e)||0))continue;
  wnx.set(e,nw+1600+Math.random()*3600);
  const[x,y]=k.split(',').map(Number),th0=cam.rotation.y,okD=DIR.filter(v=>v[0]*(-Math.sin(th0))+v[1]*(-Math.cos(th0))<=.3),d=okD[R(okD.length)],a=x+d[0],b=y+d[1],k2=a+','+b;
  if(a<1||b<4||a>=S.W-1||b>=S.H-2||S.g[b][a]||S.ents[k2]||(a==S.x&&b==S.y)||Math.abs(a-e.hx)+Math.abs(b-e.hy)>3)continue;
  if(Math.abs(a-S.sx)+Math.abs(b-S.sy)<=2)continue;
  S.ents[k2]=e;delete S.ents[k];const s=spr[k];
  if(s){spr[k2]=s;delete spr[k];const u=s.userData,th=cam.rotation.y,sd=d[0]*Math.cos(th)+d[1]*(-Math.sin(th));u.tx=a+.5;u.tz=b+.5;if(Math.abs(sd)>.3)u.fl=sd>0?1:-1;u.nf=nw+3000}
  moved=1}
 if(moved&&nw-miniT>300){miniT=nw;mini()}}
/* ---------- 操作模式與自動走路 ---------- */
let CM=(()=>{try{return localStorage.getItem('fr_cm')||'abs'}catch(e){return'abs'}})(),walkT=null,walkP=null;
function setCM(m,quiet){CM=m;try{localStorage.setItem('fr_cm',m)}catch(e){}
 const T={abs:{f:'往北（地圖上方）',b:'往南',tl:'往西',tr:'往東'},rel:{f:'前進',b:'後退',tl:'左轉',tr:'右轉'}}[m];
 document.querySelectorAll('#js button[data-d]').forEach(b=>b.title=T[b.dataset.d]);
 $('#cm').textContent=m=='abs'?'🧭':'👁️';$('#cm').title=m=='abs'?'目前：方向移動（點此改為第一人稱）':'目前：第一人稱（點此改為方向移動）';
 $('#pbh').innerHTML=m=='abs'?'方向鍵／WASD：往地圖上下左右走<br>Q/E 轉動視角<br>點小地圖：自動走到該處<br>點畫面中央前進':'W/S 前後 A/D 平移 Q/E 轉向<br>滑鼠拖曳轉向、滾輪前後<br>點畫面左右邊緣轉向、中央前進';
 if(!quiet){say(m=='abs'?'🧭 方向移動：▲往地圖上方、▼下方，畫面會自動轉向':'👁️ 第一人稱：▲前進、◀▶轉向');render()}}
function stopWalk(){if(walkT){clearInterval(walkT);walkT=null}if(walkP){walkP=null;if(st)mini()}}
function drawPath(x,S){if(!walkP)return;walkP.forEach(([a,b],i)=>{const dx=a-S.x,dy=b-S.y;if((!dx&&!dy)||Math.abs(dx)>10||Math.abs(dy)>10)return;x.fillStyle=i==walkP.length-1?'#fff':'#ffd24a';x.beginPath();x.arc(80+dx*8,80+dy*8,i==walkP.length-1?3.5:2,0,7);x.fill()})}
function walkTo(gx,gy){if(busy||cur)return;const S=st[ai];
 if(gx<0||gy<0||gx>=S.W||gy>=S.H||S.g[gy][gx]||!S.seen.has(gy*S.W+gx))return;
 const as=new ROT.Path.AStar(gx,gy,(x,y)=>x>=0&&y>=0&&x<S.W&&y<S.H&&!S.g[y][x]&&(!S.ents[x+','+y]||(x==gx&&y==gy)),{topology:4}),p=[];
 as.compute(S.x,S.y,(x,y)=>p.push([x,y]));p.shift();
 if(!p.length){say('🚫 無法走到該處');return}
 stopWalk();walkP=p;const area=ai;mini();
 walkT=setInterval(()=>{if(ai!=area||busy||cur||!walkP||!walkP.length){stopWalk();return}
  const S=st[ai],n=walkP[0],dx=n[0]-S.x,dy=n[1]-S.y,d=DIR.findIndex(v=>v[0]==dx&&v[1]==dy);
  if(d<0){stopWalk();return}
  const be=S.ents[n[0]+','+n[1]];if(be&&be.wander&&walkP.length>1){const g=walkP[walkP.length-1];stopWalk();walkTo(g[0],g[1]);return}
  const ox=S.x,oy=S.y;faceDir(d);move(dx,dy);
  if(ai!=area||busy||cur||(S.x==ox&&S.y==oy)){stopWalk();return}
  walkP.shift();if(!walkP.length)stopWalk()},150)}
$('#cm').onclick=()=>setCM(CM=='abs'?'rel':'abs');
setCM(CM,true);

window.boot=()=>loadSprites().catch(()=>0).then(()=>{init();fit();{const E_=(window.SPRITE_REPORT||{}).errors||[];if(E_.length)say('⚠️ 精靈圖檢查發現 '+E_.length+' 個問題，相關角色改以 emoji 顯示（詳見瀏覽器主控台）')}{const b=$('#pt');if(b)b.innerHTML=SI('💊','i',1.2)}requestAnimationFrame(loop)});
