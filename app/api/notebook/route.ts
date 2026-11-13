import {createClient} from '@/lib/supabase/server';
export async function POST(request:Request){
 const headers={'Cache-Control':'no-store'};
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Origen no permitido.'},{status:403,headers});
 const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)return Response.json({error:'Inicia sesión para guardar.'},{status:401,headers});
 let body;try{body=await request.json();}catch{return Response.json({error:'Datos no válidos.'},{status:400,headers});}
 const limits={original:2000,translated:16000,japanese:16000,kana:16000,romaji:32000};
 if(!body||!['es','ja'].includes(body.source)||Object.entries(limits).some(([key,max])=>typeof body[key]!=='string'||!body[key].trim()||body[key].length>max))return Response.json({error:'El conjunto está incompleto o excede el tamaño permitido.'},{status:400,headers});
 const row={source:body.source,original:body.original,translated:body.translated,japanese:body.japanese,kana:body.kana,romaji:body.romaji};
 const {error}=await db.from('notebook_entries').insert(row);
 if(error)return Response.json({error:'No se pudo guardar. Inténtalo de nuevo.'},{status:500,headers});
 return Response.json({saved:true},{status:201,headers});
}
