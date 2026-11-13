import { createClient } from '@/lib/supabase/server';
import { translate } from '@/lib/translation';
export const runtime='nodejs';
export const maxDuration=60;
export async function POST(request:Request){
 const headers={'Cache-Control':'no-store'};
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin)return Response.json({error:'Origen no permitido.'},{status:403,headers});
 const db=await createClient();const {data:{user},error}=await db.auth.getUser();
 if(error||!user)return Response.json({error:'Inicia sesión para traducir.'},{status:401,headers});
 let body;try{body=await request.json();}catch{return Response.json({error:'Solicitud no válida.'},{status:400,headers});}
 if(!body||typeof body.text!=='string'||!body.text.trim()||body.text.length>2000||!['es','ja'].includes(body.source))return Response.json({error:'Escribe entre 1 y 2000 caracteres y elige un idioma válido.'},{status:400,headers});
 try{return Response.json(await translate(body.text.trim(),body.source),{headers});}
 catch(e){console.error('Translation failed',e instanceof Error?e.message:'UnknownError');return Response.json({error:'No pudimos traducir el texto. Inténtalo de nuevo en unos momentos.'},{status:502,headers});}
}
