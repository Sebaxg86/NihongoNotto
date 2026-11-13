import Link from 'next/link';
import {NotebookCards} from '@/components/notebook-cards';
import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
export default async function Notebook(){
 const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)redirect('/acceso');
 const {data:entries,error}=await db.from('notebook_entries').select('*').eq('user_id',user.id).is('deleted_at',null).order('created_at',{ascending:false}).limit(100);
 const {data:profile}=await db.from('profiles').select('notebook_order').eq('id',user.id).single();
 return <><div className="page-heading"><p className="section-code">02 — CUADERNO</p><h1>Estudia tus traducciones.</h1><p>Tus traducciones y lecturas, listas para repasar.</p></div>{error?<p className="notice error" role="alert">No pudimos cargar el cuaderno. Recarga para intentarlo de nuevo.</p>:entries?.length?<><NotebookCards entries={entries} order={profile?.notebook_order??[]}/></>:<section className="notebook-empty"><div className="notebook-lines" aria-hidden="true"><span/><span/><span/></div><h2>Tu primera frase empieza aquí.</h2><p>Traduce un texto y guarda su conjunto de lecturas para consultarlo desde cualquier dispositivo.</p><Link className="secondary" href="/traducir">Ir a traducir →</Link></section>}</>;
}
