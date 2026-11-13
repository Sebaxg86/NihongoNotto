# Arquitectura

Next.js reúne la interfaz y las rutas del servidor. OCI Language traduce el texto; Kuromoji y Kuroshiro generan las lecturas en kana y rōmaji. Las credenciales de Oracle permanecen en el servidor.

Supabase Auth administra las cuentas. PostgreSQL guarda perfiles y traducciones; las políticas RLS limitan cada registro a su propietario. El esquema y sus migraciones se mantienen en [DB](DB/README.md).

## Navegación

Las rutas privadas son `/traducir`, `/cuaderno` y `/cuenta`. Escritorio usa un menú lateral; móvil, una barra inferior. La traducción actual permanece en memoria al cambiar de sección y se descarta al abandonar el espacio autenticado.

El cuaderno usa columnas independientes, lecturas desplegables, orden por arrastre y borrado recuperable. Las animaciones respetan la preferencia de movimiento reducido.

## Despliegue

Oracle Cloud ejecuta la aplicación con Docker; Vercel compila el mismo repositorio. Ambos entornos comparten Supabase y mantienen sus propias variables privadas. El cuaderno no depende del disco del servidor ni del navegador.

## Referencias

- [Autenticación](Autenticacion.md)
- [Traducción y lecturas](Traduccion.md)
- [Interfaz y adaptación móvil](Interfaz.md)
- [Despliegue](Despliegue.md)
