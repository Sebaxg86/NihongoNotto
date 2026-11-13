import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";
export default async function Password() {
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/recuperar");
 return <AuthShell eyebrow="UN NUEVO COMIENZO" title="Elige tu contraseña." description="Usa al menos 10 caracteres y una combinación que solo tú conozcas."><AuthForm mode="password"/><p className="switch"><Link href="/cuenta">Continuar a mi cuenta →</Link></p></AuthShell>;
}
