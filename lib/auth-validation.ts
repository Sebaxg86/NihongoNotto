export function credentials(form: FormData, registering = false) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const displayName = String(form.get("display_name") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { error: "Escribe un correo válido." } as const;
  if (!password || password.length > 128) return { error: "Revisa tu contraseña." } as const;
  if (registering && (password.length < 10 || password !== form.get("confirm_password"))) return { error: "Usa al menos 10 caracteres y confirma la misma contraseña." } as const;
  if (registering && (!displayName || displayName.length > 80)) return { error: "Escribe un nombre de entre 1 y 80 caracteres." } as const;
  return { email, password, displayName } as const;
}
export function callbackDestination(value: string | null) {
  return value === "/actualizar-clave" ? value : "/cuenta";
}
export function passwordError(form: FormData) {
  const password = String(form.get("password") ?? "");
  return password.length < 10 || password.length > 128 || password !== form.get("confirm_password")
    ? "Usa entre 10 y 128 caracteres y confirma la misma contraseña." : null;
}
