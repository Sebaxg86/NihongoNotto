# Autenticación

## Flujo

- `/registro`: nombre, correo y contraseña; envía una confirmación mediante Supabase Auth.
- `/acceso`: valida credenciales y crea una sesión con cookies.
- `/recuperar`: solicita el enlace de recuperación sin revelar si existe la cuenta.
- `/auth/callback`: intercambia el código PKCE y redirige a una ruta interna permitida.
- `/actualizar-clave`: permite cambiar la contraseña con una sesión válida.
- `/cuenta`: consulta el perfil privado, permite editar el nombre y cerrar la sesión del navegador.

Los enlaces deben abrirse en el navegador desde el que se solicitaron, porque PKCE utiliza un verificador guardado en sus cookies. Un enlace vencido muestra un mensaje y permite volver al acceso.

## Seguridad

El servidor verifica la identidad con Supabase antes de consultar o modificar datos. El proxy renueva las cookies; las páginas privadas no se almacenan en caché compartida. Las políticas RLS restringen cada perfil a su propietario y los permisos de columna protegen las fechas.

Las contraseñas requieren entre 10 y 128 caracteres en la aplicación. Supabase exige un mínimo de 10 y mantiene la confirmación de correo habilitada. La aplicación utiliza únicamente la clave publicable; las claves administrativas no forman parte del proyecto.

## Configuración por entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Dirección del proyecto. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publicable para el cliente Supabase. |
| `APP_URL` | Origen de esta instalación, sin barra final. |

Para desarrollo, Supabase permite `http://localhost:3000/auth/callback` y `http://localhost:3000/auth/callback?next=/actualizar-clave`. Al desplegar, añadir los equivalentes HTTPS de Oracle y Vercel y configurar `APP_URL` en cada entorno.

Supabase usa su correo predeterminado, sin SMTP propio: solo admite destinatarios autorizados de la organización y tiene límites bajos de envío. Antes de abrir el registro al público se debe configurar un proveedor SMTP y verificar confirmación y recuperación con correos reales.

Estos ajustes pertenecen a Supabase Auth y no modifican el esquema SQL; no requieren una nueva migración.

## Verificación

Comprobados con cuentas temporales: inicio de sesión, creación automática del perfil, edición del nombre, aislamiento entre dos usuarios, protección de fechas y cambio de contraseña. Las cuentas de prueba se eliminan al terminar.

Las pruebas automatizadas locales cubren validación y redirecciones permitidas. La entrega de correo y el recorrido completo desde una bandeja real siguen pendientes.

Referencia: [Autenticación de Supabase con Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs).
