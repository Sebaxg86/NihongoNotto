# NihongoNotto

Aplicación web para estudiar japonés mediante traducciones y un cuaderno personal de frases.

## Funciones previstas

- Traducir del español al japonés y del japonés al español.
- Consultar el texto japonés, su lectura en kana y su representación en rōmaji.
- Crear una cuenta y acceder al cuaderno desde distintos dispositivos.
- Guardar traducciones con notas, categorías y favoritos.

## Tecnologías propuestas

| Componente | Tecnología |
| --- | --- |
| Interfaz y servidor | Next.js, React y TypeScript |
| Estilos | Tailwind CSS |
| Traducción | OCI Language |
| Lecturas de japonés | Kuromoji y Kuroshiro, sujetos a validación |
| Autenticación y base de datos | Supabase Auth y PostgreSQL |
| Despliegue | Instancia de Oracle Cloud con Docker y Vercel |

## Estado

Proyecto de Supabase creado y enlazado mediante Supabase CLI. Primera migración aplicada: perfiles privados vinculados a Supabase Auth.

Registro, inicio y cierre de sesión, recuperación de contraseña y edición del nombre implementados. El acceso por correo requiere confirmación. La entrega real de correos está pendiente de validación; el servicio predeterminado de Supabase limita los destinatarios a la organización.

La configuración de conexión se guarda en `.env.local`, excluido de Git; `.env.example` contiene los nombres de las variables.

## Desarrollo local

Requiere Node.js 22.12 o posterior. Los scripts incluyen un runtime Node.js 22 local para mantener compatibilidad.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Completar `.env.local` con la URL y clave publicable de Supabase y `APP_URL=http://localhost:3000`. Si el archivo ya existe, conservar sus valores. Abrir `http://localhost:3000`.

```sh
npm test
npm run typecheck
npm run build
```

`npm start` ejecuta la compilación de producción. Docker y los despliegues públicos quedan para una etapa posterior.

## Documentación

- [Arquitectura](Arquitectura/README.md)
- [Base de datos y actualización del esquema](Arquitectura/DB/README.md)
- [Esquema SQL](Arquitectura/DB/schema.sql)
- [Autenticación](Arquitectura/Autenticacion.md)
