import {createClient} from '@/lib/supabase/server';
export async function PATCH(request:Request){
 const headers={'Cache-Control':'no-store'};const origin=request.headers.get('origin');if(origin&&origin!==new URL(process.env.APP_URL||request.url).origin)return Response.json({error:'Origen no permitido.'},{status:403,headers});
 const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)return Response.json({error:'Inicia sesión.'},{status:401,headers});
 let body;try{body=await request.json();}catch{return Response.json({error:'Solicitud no válida.'},{status:400,headers});}
 if(typeof body?.id!=='string'||!/^[a-f0-9-]{36}$/i.test(body.id)||typeof body.restore!=='boolean')return Response.json({error:'Solicitud no válida.'},{status:400,headers});
 const {data,error}=await db.from('notebook_entries').update({deleted_at:body.restore?null:new Date().toISOString()}).eq('id',body.id).eq('user_id',user.id).select('id').single();
 return Response.json(error||!data?{error:'No se pudo actualizar la tarjeta.'}:{saved:true},{status:error||!data?400:200,headers});
}
