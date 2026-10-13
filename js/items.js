/* items.js — 傳送卷軸（Town Portal）：脫離戰鬥外的任何地點，傳送回最近的城鎮
 * 數量存在 mats.ret（隨存檔保存；舊存檔沒有此欄位時視為 0）。
 * 取得：鍊金藥鋪購買、煉金台（5 魔晶碎片）、木箱 12% 掉落、開局 1 張。
 * 使用：☰ 背包「使用傳送卷軸」、方向鍵旁 🧧 按鈕。戰鬥中與對話中不可使用。 */
const townOf=i=>{const A=AREAS[i];return A.ty=='town'?i:(A.par==null?0:A.par)};
function useReturn(){
 if(cur){say('🧧 戰鬥中無法使用傳送卷軸');return render()}
 if(busy)return;
 if(AREAS[ai].ty=='town'){say('🧧 你已經在城鎮裡了');return render()}
 if((mats.ret|0)<1){say('🧧 沒有傳送卷軸了（藥鋪、煉金台或木箱可取得）');return render()}
 const to=townOf(ai);mats.ret--;busy=true;
 say(`🧧 展開傳送卷軸，光華包裹全隊，返回「${AREAS[to].n}」`);render();
 try{FX.play('warp',{A:()=>[view.clientWidth/2,view.clientHeight*.8],B:()=>[view.clientWidth/2,view.clientHeight*.8],hit:0})}catch(e){}
 setTimeout(()=>{busy=false;enter(to)},850)}
$('#rt').onclick=ev=>{ev.stopPropagation();useReturn()};
