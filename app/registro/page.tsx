import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";
export default function Register() {return <AuthShell eyebrow="EMPIEZA TU HISTORIA" title="Tu primera página." description="Crea una cuenta y haz espacio para un nuevo idioma."><AuthForm mode="register"/><p className="switch">¿Ya tienes una cuenta? <Link href="/acceso">Iniciar sesión</Link></p></AuthShell>;}
