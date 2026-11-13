# Arquitectura

## Diseño

Next.js reúne la interfaz y las funciones de servidor en un mismo proyecto. El servidor consultará OCI Language para traducir y procesará las lecturas del texto japonés.

Supabase Auth administra las cuentas y las sesiones. PostgreSQL almacenará el cuaderno personal; las políticas de seguridad por fila (RLS) limitarán el acceso a los datos de cada usuario.

Las credenciales privadas de Oracle permanecerán en el servidor, fuera del código enviado al navegador.

## Despliegue

La misma base de código se desplegará en una instancia de Oracle Cloud mediante Docker y en Vercel. Cada entorno tendrá su propia configuración y podrá conectarse al mismo proyecto de Supabase.

El cuaderno se guardará en PostgreSQL, sin depender del disco del servidor ni del almacenamiento del navegador.

## Datos

Supabase Auth administra las identidades. La tabla `public.profiles` almacena el nombre del usuario y sus fechas, con acceso limitado al propietario mediante RLS. Las tablas de frases, traducciones y organización del cuaderno se incorporarán en futuras migraciones.

El estado del modelo se documenta en [DB](DB/README.md).

El flujo de cuentas y la configuración por entorno se describen en [Autenticación](Autenticacion.md).

## Navegación

Las rutas privadas comparten un menú lateral: `/traducir` como inicio, `/cuaderno` para el estudio guardado y `/cuenta` para nombre y contraseña. El menú admite teclado y movimiento reducido. Traducción y guardado siguen pendientes de conectar.
