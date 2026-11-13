import {createClient} from '@/lib/supabase/server';
export async function PUT(request:Request){
 const headers={'Cache-Control':'no-store'};
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Origen no permitido.'},{status:403,headers});
 const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)return Response.json({error:'Inicia sesión.'},{status:401,headers});
 let body;try{body=await request.json();}catch{return Response.json({error:'Orden no válido.'},{status:400,headers});}
 const ids=body?.ids;if(!Array.isArray(ids)||ids.length>100||new Set(ids).size!==ids.length||ids.some(id=>typeof id!=='string'||!/^[a-f0-9-]{36}$/i.test(id)))return Response.json({error:'Orden no válido.'},{status:400,headers});
 const {data:owned,error:readError}=await db.from('notebook_entries').select('id').in('id',ids);
 if(readError||owned?.length!==ids.length)return Response.json({error:'No se puede ordenar este conjunto.'},{status:400,headers});
 const {error}=await db.from('profiles').update({notebook_order:ids}).eq('id',user.id);
 return Response.json(error?{error:'No se pudo guardar el orden.'}:{saved:true},{status:error?500:200,headers});
}
