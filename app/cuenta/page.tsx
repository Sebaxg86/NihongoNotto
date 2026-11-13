import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions";
import { AuthForm } from "@/components/auth-form";
export default async function Account({searchParams}:{searchParams:Promise<{error?:string}>}) {
 const supabase=await createClient();const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)redirect("/acceso");
 const {data:profile,error}=await supabase.from("profiles").select("display_name,created_at").eq("id",user.id).single();
 const params=await searchParams;
 return <main className="account"><header><Link className="brand" href="/cuenta"><span className="brand-icon" lang="ja">の</span>NihongoNotto.</Link><form action={logout}><button className="secondary">Cerrar sesión ↗</button></form></header><section className="account-content"><p className="kicker">MI ESPACIO</p><h1>Hola{profile?.display_name?`, ${profile.display_name}`:""}.</h1><p className="form-description">Cada palabra es un pequeño comienzo.</p>{params.error && <p role="alert" className="notice error">No pudimos cerrar la sesión. Inténtalo de nuevo.</p>}<div className="account-grid"><section className="profile-card"><span className="tag">TU PERFIL</span><h2>Hagámoslo tuyo.</h2><p className="email">{user.email}</p>{error?<p className="notice error" role="alert">No pudimos cargar tu perfil. Recarga la página para volver a intentarlo.</p>:<AuthForm mode="profile" name={profile?.display_name??""}/>}<Link href="/actualizar-clave" className="text-link">Cambiar contraseña →</Link></section><section className="coming-card"><span className="tag">PRÓXIMAMENTE</span><p lang="ja" className="coming-kanji">学ぶ</p><h2>Tu cuaderno está por comenzar.</h2><p>Este será el lugar de tus traducciones, descubrimientos y frases favoritas. Por ahora, tu cuenta ya tiene su propio espacio.</p></section></div></section></main>;
}
