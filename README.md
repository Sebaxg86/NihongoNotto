# NihongoNotto

Aplicación para estudiar japonés mediante traducciones y un cuaderno personal de frases.

- Traducción español ↔ japonés mediante OCI Language.
- Texto japonés, lectura en kana y representación en rōmaji.
- Cuentas y perfiles privados con Supabase Auth.
- Cuaderno con tarjetas, copia, orden por arrastre y borrado con opción de deshacer.
- Interfaz adaptable a escritorio y móvil, con acceso desde la pantalla de inicio.

## Tecnologías

Next.js, React y TypeScript; CSS; OCI Language; Kuromoji y Kuroshiro; Supabase Auth y PostgreSQL.

Despliegues: [Oracle Cloud](https://nihongonotto.duckdns.org) con Docker y [Vercel](https://nihongonotto.vercel.app).

## Desarrollo local

Requiere Node.js 22.12 o posterior.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Completar `.env.local` con las conexiones de Supabase y OCI, y `APP_URL=http://localhost:3000`. Conservar los valores si el archivo ya existe. Las claves privadas y las variables de entorno se excluyen de Git.

```sh
npm test
npm run typecheck
npm run build
```

`npm start` ejecuta la compilación de producción.

## Versiones

`v1.0.0-desktop` conserva la versión de escritorio anterior a la adaptación móvil.

## Documentación

- [Arquitectura](Arquitectura/README.md)
- [Base de datos y migraciones](Arquitectura/DB/README.md)
- [Esquema SQL](Arquitectura/DB/schema.sql)
- [Autenticación](Arquitectura/Autenticacion.md)
- [Traducción](Arquitectura/Traduccion.md)
- [Interfaz](Arquitectura/Interfaz.md)
- [Despliegue](Arquitectura/Despliegue.md)
