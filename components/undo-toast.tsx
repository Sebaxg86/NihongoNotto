"use client";

import {useEffect, useRef, useState} from 'react';

export function UndoToast({busy,onUndo,onDismiss}:{busy:boolean;onUndo:()=>void;onDismiss:()=>void}) {
 const bar=useRef<HTMLSpanElement>(null);
 const dismiss=useRef(onDismiss);
 const [cycle,setCycle]=useState(0);
 const [leaving,setLeaving]=useState(false);
 useEffect(()=>{dismiss.current=onDismiss;},[onDismiss]);
 useEffect(()=>{
  const element=bar.current;
  if(!element||busy)return;
  let active=true;
  let animation:Animation|undefined;
  let exitTimer:ReturnType<typeof setTimeout>|undefined;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  async function countdown(){
   try {
    if(cycle>0){
     animation=element!.animate([{transform:getComputedStyle(element!).transform},{transform:'scaleX(1)'}],{duration:reduced?0:240,easing:'ease-out',fill:'forwards'});
     await animation.finished;
     element!.style.transform='scaleX(1)';
     animation.cancel();
    }
    if(!active)return;
    animation=element!.animate([{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:5000,easing:'linear',fill:'forwards'});
    await animation.finished;
    if(!active)return;
    setLeaving(true);
    exitTimer=setTimeout(()=>dismiss.current(),reduced?0:220);
   }catch{/* Reiniciar o desmontar cancela la animación anterior. */}
  }
  void countdown();
  return ()=>{active=false;if(exitTimer)clearTimeout(exitTimer);if(animation){element.style.transform=getComputedStyle(element).transform;animation.cancel();}};
 },[cycle,busy]);
 function restart(){if(busy)return;setLeaving(false);setCycle(value=>value+1);}
 return <aside className={`undo-toast ${leaving?'undo-toast-leaving':''}`} aria-label="Tarjeta borrada" onPointerEnter={restart} onFocus={restart}>
  <span className="undo-toast-track" aria-hidden="true"><span ref={bar}/></span>
  <span className="undo-toast-check" aria-hidden="true">✓</span>
  <span role="status">{busy?'Restaurando…':'Tarjeta borrada'}</span>
  <button type="button" disabled={busy||leaving} onClick={onUndo}><span aria-hidden="true">↶</span> Deshacer</button>
 </aside>;
}
