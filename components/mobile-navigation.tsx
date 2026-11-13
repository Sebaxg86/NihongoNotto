"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {Icon} from '@/components/icon';

const tabs=[{href:'/traducir',label:'Traducir',icon:'translate'},{href:'/cuaderno',label:'Cuaderno',icon:'book'},{href:'/cuenta',label:'Cuenta',icon:'user'}] as const;

export function MobileNavigation({hidden=false}:{hidden?:boolean}){
 const path=usePathname();
 const [destination,setDestination]=useState<string|null>(null);
 useEffect(()=>setDestination(null),[path]);
 const selected=Math.max(0,tabs.findIndex(tab=>tab.href===(destination??path)));
 return <nav inert={hidden} aria-hidden={hidden} className="mobile-tabs" aria-label="Navegación móvil">
  <span className="mobile-tab-indicator" style={{translate:`${selected*100}% 0`}} aria-hidden="true"/>
  {tabs.map(tab=><Link key={tab.href} href={tab.href} aria-current={path===tab.href?'page':undefined} data-selected={(destination??path)===tab.href} onClick={()=>setDestination(tab.href)}><Icon name={tab.icon}/><span>{tab.label}</span></Link>)}
 </nav>;
}
