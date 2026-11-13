"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import {StudySessionProvider} from "@/components/study-session";
import {MobileNavigation} from "@/components/mobile-navigation";
import {Icon} from "@/components/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions";
const links=[{href:"/traducir",label:"Traducir",number:"01"},{href:"/cuaderno",label:"Cuaderno",number:"02"},{href:"/cuenta",label:"Mi cuenta",number:"03"}];
export function WorkspaceShell({children}:{children:React.ReactNode}) {
 const workspace=useRef<HTMLDivElement>(null);
 const [keyboardOpen,setKeyboardOpen]=useState(false);
 useEffect(()=>{
  const viewport=window.visualViewport;
  let fullHeight=window.innerHeight;let lastWidth=window.innerWidth;
  function resize(){
   const root=workspace.current;if(!root)return;
   const height=viewport?.height??window.innerHeight;
   if(lastWidth!==window.innerWidth){fullHeight=window.innerHeight;lastWidth=window.innerWidth;}
   fullHeight=Math.max(fullHeight,window.innerHeight,height);
   const editing=document.activeElement?.matches('input,textarea,[contenteditable=true]');
   root.style.setProperty('--app-height',`${height}px`);
   const keyboard=!!(window.matchMedia('(max-width:767px)').matches&&editing&&fullHeight-height>120);
   root.dataset.keyboard=String(keyboard);setKeyboardOpen(keyboard);
  }
  resize();viewport?.addEventListener('resize',resize);window.addEventListener('resize',resize);document.addEventListener('focusin',resize);document.addEventListener('focusout',resize);
  return ()=>{viewport?.removeEventListener('resize',resize);window.removeEventListener('resize',resize);document.removeEventListener('focusin',resize);document.removeEventListener('focusout',resize);};
 },[]);
 const confirm=useRef<HTMLDialogElement>(null);const requestLogout=useRef(false);const [pending,startTransition]=useTransition();
 const [closing,setClosing]=useState(false);
 function closeMenu(){if(closing)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){finishClose();return;}setClosing(true);}
 function finishClose(){dialog.current?.close();setClosing(false);if(requestLogout.current){requestLogout.current=false;confirm.current?.showModal();}}
 const dialog=useRef<HTMLDialogElement>(null);const path=usePathname();const current=links.find(l=>l.href===path);
 return <StudySessionProvider><div ref={workspace} className={`workspace ${path==='/cuenta'?'workspace-settings':'workspace-fixed'} workspace-${path.slice(1)}`}><header className="workspace-header"><button className="menu-trigger" aria-label="Abrir menú de navegación" onClick={()=>dialog.current?.showModal()}><span/><span/><span/></button><Link href="/traducir" className="wordmark">Nihongo<span>Notto</span><small>日本語</small></Link><span className="header-section">{current?.label}</span></header>
 <dialog className={`navigation-dialog ${closing?'is-closing':''}`} ref={dialog} onCancel={e=>{e.preventDefault();closeMenu();}} onClick={e=>{if(e.target===dialog.current)closeMenu();}}><aside className="drawer" onAnimationEnd={e=>{if(closing&&e.target===e.currentTarget)finishClose();}}><div className="drawer-top"><span className="wordmark">NihongoNotto</span><button className="close-menu" aria-label="Cerrar menú" onClick={closeMenu}>×</button></div><p className="drawer-caption">ESPACIO DE ESTUDIO</p><nav aria-label="Navegación principal">{links.map((link,i)=><Link style={{"--order":i} as React.CSSProperties} aria-current={path===link.href?"page":undefined} href={link.href} key={link.href} onClick={closeMenu}><span>{link.number}</span>{link.label}<b aria-hidden="true">↗</b></Link>)}</nav><div className="drawer-bottom"><p>日本語を学ぶ<small>Tu espacio para estudiar japonés.</small></p><button className="secondary" onClick={()=>{requestLogout.current=true;closeMenu();}}>Cerrar sesión <span aria-hidden="true">↪</span></button></div></aside></dialog>
 <dialog ref={confirm} className="logout-confirm" aria-labelledby="logout-title"><div className="logout-symbol" aria-hidden="true">↪</div><h2 id="logout-title">¿Quieres cerrar la sesión?</h2><p>Tu cuaderno quedará guardado para cuando vuelvas.</p><div className="logout-actions"><button className="secondary" disabled={pending} onClick={()=>confirm.current?.close()}>Seguir aquí</button><button className="primary" disabled={pending} onClick={()=>startTransition(async()=>{await logout();confirm.current?.close();})}>{pending?'Cerrando…':'Cerrar sesión'}</button></div></dialog><main className="workspace-main"><div className="workspace-content" key={path}>{children}{path==='/cuenta'&&<button className="mobile-logout" onClick={()=>confirm.current?.showModal()}><Icon name="exit"/>Cerrar sesión</button>}{path==='/cuenta'&&<p className="mobile-credit">NihongoNotto · Desarrollado por Sebastián Chairez</p>}</div></main><MobileNavigation hidden={keyboardOpen}/><footer className="workspace-footer"><span>NIHONGONOTTO</span><span className="developer-credit">Desarrollado por Sebastián Chairez</span><span>ES / 日本語</span></footer></div></StudySessionProvider>;
}
