#!/usr/bin/env python3
"""精靈圖檢查：python3 tools/check_sprites.py [專案根目錄，預設 .]
檢查 js/sprite-map.js 的每個圖塊座標 vs assets/img/*.png（需要 pillow、numpy）：
  OOB      圖塊超出圖檔範圍           EMPTY   圖塊內沒有像素（座標跑位）
  SLACK    圖塊左右上下留白 > 6px（人物偏心）
  CUT      圖塊邊緣的不透明像素延伸到圖塊外 > 3px（被切到一半）
  OVERLAP  兩個圖塊的範圍互相包到對方的像素 > 30px（切到鄰居）
  SIZE     圖檔尺寸與 SHEETS 內的 w/h 不符（圖被換過／縮放過）
有任何問題時結束碼為 1，可放進發佈前檢查。"""
import re,sys,json
import numpy as np
from PIL import Image
root=sys.argv[1] if len(sys.argv)>1 else '.'
SP=json.loads(re.search(r'SP=(\{.*?\});\n',open(root+'/js/sprite-map.js',encoding='utf8').read(),re.S).group(1))
src=open(root+'/js/sprite-map.js',encoding='utf8').read()
EXP={m[0]:(int(m[1]),int(m[2])) for m in re.findall(r"(\w+):\{f:\[SHEET_SRC\('\w+'\)\],pre:true,w:(\d+),h:(\d+)\}",src)}
S={n:Image.open(f'{root}/assets/img/{n}.png').convert('RGBA') for n in ['zen','zen2','zen3']}
flag=0
for n,im in S.items():
    if n in EXP and im.size!=EXP[n]: print('SIZE',n,im.size,'expected',EXP[n]);flag+=1
A={n:np.array(i)[:,:,3]>40 for n,i in S.items()}
bad=0
rects={}
for k,r in SP.items(): rects.setdefault(tuple(r[:5]),[]).append(k)
for (n,x,y,w,h),keys in rects.items():
    a=A[n];H,W=a.shape
    if x<0 or y<0 or x+w>W or y+h>H: print('OOB',keys,n,x,y,w,h,(W,H));flag+=1;continue
    sub=a[y:y+h,x:x+w]
    cut=0
    pad=np.pad(a,1)  # outside neighbors
    for side,(ins,out) in {'T':(a[y,x:x+w],pad[y,x+1:x+w+1]),'B':(a[y+h-1,x:x+w],pad[y+h+1,x+1:x+w+1]),
                           'L':(a[y:y+h,x],pad[y+1:y+h+1,x]),'R':(a[y:y+h,x+w-1],pad[y+1:y+h+1,x+w+1])}.items():
        c=int((ins&out).sum())
        if c>3: cut+=c;print('CUT',side,c,keys[0],(n,x,y,w,h));bad+=c>12
    # slack: tight bbox vs crop
    ys,xs=np.where(sub)
    if len(xs)==0: print('EMPTY',keys);flag+=1;continue
    sl=(xs.min(),ys.min(),w-1-xs.max(),h-1-ys.max())
    if max(sl)>6: bad+=1;print('SLACK(L,T,R,B)',sl,keys[0],(n,x,y,w,h))
    # foreign pixels: opaque pixels in crop belonging to neighbouring sprite rect
    for (n2,x2,y2,w2,h2),k2 in rects.items():
        if n2!=n or (n2,x2,y2,w2,h2)==(n,x,y,w,h):continue
        ix=max(x,x2);iy=max(y,y2);ix2=min(x+w,x2+w2);iy2=min(y+h,y2+h2)
        if ix<ix2 and iy<iy2:
            c=int(a[iy:iy2,ix:ix2].sum())
            if c>30: bad+=1;print('OVERLAP',keys[0],'with',k2[0],c,'px')
print('OK' if not flag and not bad else f'{flag} problem(s)');sys.exit(1 if flag or bad else 0)
