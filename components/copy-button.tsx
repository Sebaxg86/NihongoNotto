"use client";
import {useState,useRef,useEffect} from 'react';
export function CopyButton({text,label}:{text:string;label:string}){
 const [state,setState]=useState<'idle'|'copied'|'error'>('idle');const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 async function copy(){try{await navigator.clipboard.writeText(text);setState('copied');}catch{setState('error');}if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setState('idle'),2000);}
 return <><button type="button" className={`notebook-copy ${state==='copied'?'is-copied':''}`} onClick={copy} aria-label={state==='copied'?`${label} copiado`:`Copiar ${label}`} title={state==='copied'?'Copiado':`Copiar ${label}`}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{state==='copied'?<path d="m5 12 4 4 10-10"/>:<><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></>}</svg></button><span className="copy-feedback" role="status">{state==='copied'?`${label} copiado`:state==='error'?'No se pudo copiar. Selecciona el texto para copiarlo.':''}</span></>;
}
