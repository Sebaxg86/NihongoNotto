"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions";
const links=[{href:"/traducir",label:"Traducir",number:"01"},{href:"/cuaderno",label:"Cuaderno",number:"02"},{href:"/cuenta",label:"Mi cuenta",number:"03"}];
export function WorkspaceShell({children}:{children:React.ReactNode}) {
 const [closing,setClosing]=useState(false);
 function closeMenu(){if(closing)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){finishClose();return;}setClosing(true);}
 function finishClose(){dialog.current?.close();setClosing(false);}
 const dialog=useRef<HTMLDialogElement>(null);const path=usePathname();const current=links.find(l=>l.href===path);
 return <div className={`workspace ${path==='/cuenta'?'workspace-settings':'workspace-fixed'}`}><header className="workspace-header"><button className="menu-trigger" aria-label="Abrir menú de navegación" onClick={()=>dialog.current?.showModal()}><span/><span/><span/></button><Link href="/traducir" className="wordmark">Nihongo<span>Notto</span><small>日本語</small></Link><span className="header-section">{current?.label}</span></header>
 <dialog className={`navigation-dialog ${closing?'is-closing':''}`} ref={dialog} onCancel={e=>{e.preventDefault();closeMenu();}} onClick={e=>{if(e.target===dialog.current)closeMenu();}}><aside className="drawer" onAnimationEnd={e=>{if(closing&&e.target===e.currentTarget)finishClose();}}><div className="drawer-top"><span className="wordmark">NihongoNotto</span><button className="close-menu" aria-label="Cerrar menú" onClick={closeMenu}>×</button></div><p className="drawer-caption">ESPACIO DE ESTUDIO</p><nav aria-label="Navegación principal">{links.map((link,i)=><Link style={{"--order":i} as React.CSSProperties} aria-current={path===link.href?"page":undefined} href={link.href} key={link.href} onClick={closeMenu}><span>{link.number}</span>{link.label}<b aria-hidden="true">↗</b></Link>)}</nav><div className="drawer-bottom"><p>日本語を学ぶ<small>Tu espacio para estudiar japonés.</small></p><form action={logout}><button className="secondary">Cerrar sesión</button></form></div></aside></dialog>
 <main className="workspace-main">{children}</main><footer className="workspace-footer"><span>NIHONGONOTTO</span><span>ES / 日本語</span></footer></div>;
}
