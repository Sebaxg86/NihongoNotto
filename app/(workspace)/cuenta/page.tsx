import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "@/components/auth-form";
export default async function Account({searchParams}:{searchParams:Promise<{error?:string}>}) {
 const db=await createClient();const {data:{user},error:authError}=await db.auth.getUser();if(authError||!user)redirect("/acceso");
 const {data:profile,error}=await db.from("profiles").select("display_name").eq("id",user.id).single();const params=await searchParams;
 return <><div className="page-heading"><p className="section-code">03 — MI CUENTA</p><h1>Tu perfil.</h1><p>Administra tu nombre y el acceso a tu cuenta.</p></div>{params.error&&<p className="notice error">No pudimos cerrar la sesión. Inténtalo de nuevo.</p>}<div className="settings-row"><div><h2>Información personal</h2><p>Así aparecerá tu nombre en el cuaderno.</p><span className="email">{user.email}</span></div><section>{error?<p role="alert" className="notice error">No pudimos cargar el perfil. Recarga la página.</p>:<AuthForm mode="profile" name={profile?.display_name??""}/>}</section></div><div className="settings-row"><div><h2>Contraseña</h2><p>Elige una clave de al menos 10 caracteres.</p></div><section><AuthForm mode="password"/></section></div></>;
}
