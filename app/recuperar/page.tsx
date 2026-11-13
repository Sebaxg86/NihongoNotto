import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";
export default function Recover() {return <AuthShell eyebrow="RETOMA EL CAMINO" title="Recupera tu acceso." description="Te enviaremos un enlace para elegir una nueva contraseña."><AuthForm mode="recover"/><p className="switch"><Link href="/acceso">← Volver a iniciar sesión</Link></p></AuthShell>;}
