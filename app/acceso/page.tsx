import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}) {
 const {error}=await searchParams;
 return <AuthShell eyebrow="QUÉ BUENO VERTE" title="Vuelve a tu cuaderno." description="Inicia sesión para continuar con tu japonés.">{error && <p className="notice error" role="alert">El enlace no es válido o ya venció. Abre el enlace en el navegador donde lo solicitaste, o pide uno nuevo.</p>}<AuthForm mode="login"/><p className="switch">¿Primera vez por aquí? <Link href="/registro">Crear una cuenta</Link></p></AuthShell>;
}
