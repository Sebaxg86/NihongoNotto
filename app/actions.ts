"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { credentials, passwordError } from "@/lib/auth-validation";
export type FormState = { error?: string; success?: string };
function siteUrl() {
  const url = process.env.APP_URL;
  if (!url) throw new Error("Falta APP_URL en la configuración del servidor.");
  return new URL(url).origin;
}
function friendlyError(code?: string) {
  if (code === "email_not_confirmed") return "Confirma tu correo antes de iniciar sesión.";
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") return "Hay demasiados intentos. Espera unos minutos antes de volver a probar.";
  if (code === "weak_password") return "Elige una contraseña más segura.";
  return "No pudimos completar la solicitud. Revisa los datos e inténtalo de nuevo.";
}
export async function login(_: FormState, form: FormData): Promise<FormState> {
  const input = credentials(form);
  if (input.error) return {error: input.error};
  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.signInWithPassword({email: input.email!, password: input.password!});
    if (error) return {error: error.code === "invalid_credentials" ? "El correo o la contraseña no son correctos." : friendlyError(error.code)};
  } catch { return {error: "No se pudo conectar. Inténtalo de nuevo."}; }
  revalidatePath("/", "layout"); redirect("/traducir");
}
export async function register(_: FormState, form: FormData): Promise<FormState> {
  const input = credentials(form, true);
  if (input.error) return {error: input.error};
  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.signUp({email: input.email!, password: input.password!, options: {
      data: {display_name: input.displayName}, emailRedirectTo: `${siteUrl()}/auth/callback`,
    }});
    if (error) return {error: friendlyError(error.code)};
    return {success: "Revisa tu correo para confirmar la cuenta. Si ya tienes una, puedes iniciar sesión o recuperar tu contraseña. Abre el enlace en este mismo navegador."};
  } catch { return {error: "No se pudo conectar. Inténtalo de nuevo."}; }
}
export async function recover(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return {error:"Escribe un correo válido."};
  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.resetPasswordForEmail(email, {redirectTo: `${siteUrl()}/auth/callback?next=/actualizar-clave`});
    if (error) return {error: friendlyError(error.code)};
    return {success: "Si existe una cuenta con ese correo, recibirás un enlace para recuperar el acceso. Ábrelo en este mismo navegador."};
  } catch { return {error: "No se pudo conectar. Inténtalo de nuevo."}; }
}
export async function updatePassword(_: FormState, form: FormData): Promise<FormState> {
  const errorText = passwordError(form);
  if (errorText) return {error:errorText};
  const supabase = await createClient();
  const {data:{user}, error: authError} = await supabase.auth.getUser();
  if (authError || !user) return {error:"El enlace venció. Solicita uno nuevo desde Recuperar contraseña."};
  const {error} = await supabase.auth.updateUser({password:String(form.get("password"))});
  if (error) return {error: error.code === "same_password" ? "Elige una contraseña diferente a la anterior." : friendlyError(error.code)};
  return {success:"Tu contraseña se actualizó. Ya puedes continuar a tu cuenta."};
}
export async function updateProfile(_: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get("display_name") ?? "").trim();
  if (!name || name.length > 80) return {error:"Escribe un nombre de entre 1 y 80 caracteres."};
  const supabase = await createClient();
  const {data:{user}, error: authError} = await supabase.auth.getUser();
  if (authError || !user) return {error:"Inicia sesión de nuevo para guardar el nombre."};
  const {data,error} = await supabase.from("profiles").update({display_name:name}).eq("id",user.id).select("id").single();
  if (error || !data) return {error:"No se pudo guardar el nombre. Inténtalo de nuevo."};
  revalidatePath("/cuenta"); return {success:"Nombre actualizado."};
}
export async function logout() {
  const supabase = await createClient();
  const {error} = await supabase.auth.signOut({scope:"local"});
  if (error) redirect("/cuenta?error=salida");
  revalidatePath("/", "layout"); redirect("/acceso");
}
