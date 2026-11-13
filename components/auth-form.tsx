"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { login, register, recover, updatePassword, updateProfile } from "@/app/actions";
type Mode = "login" | "register" | "recover" | "password" | "profile";
const actions = {login, register, recover, password:updatePassword, profile:updateProfile};
const labels = {login:"Entrar a mi cuenta",register:"Crear mi cuenta",recover:"Enviar enlace",password:"Guardar contraseña",profile:"Guardar nombre"};
export function AuthForm({mode, name = ""}: {mode:Mode; name?:string}) {
  const [state, action, pending] = useActionState(actions[mode], {});
  const [show, setShow] = useState(false);
  const hasPassword = ["login","register","password"].includes(mode);
  return <form action={action} className="auth-form">
    <fieldset disabled={pending}>
      {(mode === "register" || mode === "profile") && <label>Tu nombre<input name="display_name" autoComplete="nickname" placeholder="¿Cómo te llamas?" defaultValue={name} required maxLength={80}/></label>}
      {["login","register","recover"].includes(mode) && <label>Correo electrónico<input type="email" name="email" autoComplete="email" placeholder="tu@correo.com" required maxLength={254}/></label>}
      {hasPassword && <label>{mode === "password" ? "Nueva contraseña" : "Contraseña"}<span className="password-field"><input type={show?"text":"password"} name="password" autoComplete={mode==="login"?"current-password":"new-password"} placeholder={mode==="login"?"Tu contraseña":"Al menos 10 caracteres"} required minLength={mode==="login"?1:10} maxLength={128}/><button className="reveal" type="button" aria-label={show?"Ocultar contraseña":"Mostrar contraseña"} aria-pressed={show} onClick={()=>setShow(!show)}>{show?"Ocultar":"Ver"}</button></span></label>}
      {(mode === "register" || mode === "password") && <label>Confirmar contraseña<input type={show?"text":"password"} name="confirm_password" autoComplete="new-password" placeholder="Repite tu contraseña" required minLength={10} maxLength={128}/></label>}
      {mode==="login" && <Link className="forgot" href="/recuperar">Olvidé mi contraseña</Link>}
      <div aria-live="polite" aria-atomic="true">{state.error && <p className="notice error" role="alert">{state.error}</p>}{state.success && <p className="notice success">{state.success}</p>}</div>
      <button className="primary" disabled={pending} type="submit">{pending?"Un momento…":labels[mode]} <span aria-hidden="true">↗</span></button>
    </fieldset>
  </form>;
}
