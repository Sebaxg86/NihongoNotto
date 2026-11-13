"use client";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions";
const links=[{href:"/traducir",label:"Traducir",number:"01"},{href:"/cuaderno",label:"Cuaderno",number:"02"},{href:"/cuenta",label:"Mi cuenta",number:"03"}];
export function WorkspaceShell({children}:{children:React.ReactNode}) {
 const dialog=useRef<HTMLDialogElement>(null);const path=usePathname();const current=links.find(l=>l.href===path);
 return <div className="workspace"><header className="workspace-header"><button className="menu-trigger" aria-label="Abrir menú de navegación" onClick={()=>dialog.current?.showModal()}><span/><span/><span/></button><Link href="/traducir" className="wordmark">Nihongo<span>Notto</span><small>日本語</small></Link><span className="header-section">{current?.label}</span></header>
 <dialog className="navigation-dialog" ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}><aside className="drawer"><div className="drawer-top"><span className="wordmark">NihongoNotto</span><button className="close-menu" aria-label="Cerrar menú" onClick={()=>dialog.current?.close()}>×</button></div><p className="drawer-caption">ESPACIO DE ESTUDIO</p><nav aria-label="Navegación principal">{links.map((link,i)=><Link style={{"--order":i} as React.CSSProperties} aria-current={path===link.href?"page":undefined} href={link.href} key={link.href} onClick={()=>dialog.current?.close()}><span>{link.number}</span>{link.label}<b aria-hidden="true">↗</b></Link>)}</nav><div className="drawer-bottom"><p>日本語を学ぶ<small>Tu espacio para estudiar japonés.</small></p><form action={logout}><button className="secondary">Cerrar sesión</button></form></div></aside></dialog>
 <main className="workspace-main">{children}</main><footer className="workspace-footer"><span>NIHONGONOTTO</span><span>ES / 日本語</span></footer></div>;
}
