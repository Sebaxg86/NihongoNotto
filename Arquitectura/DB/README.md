# Base de datos

Proyecto: **NihongoNotto**, PostgreSQL 17 en Supabase (Ohio).

## Modelo actual

| Tabla | Finalidad |
| --- | --- |
| `auth.users` | Cuentas administradas por Supabase Auth. |
| `public.profiles` | Nombre y fechas del perfil, vinculado a una cuenta. |

`profiles.id` referencia `auth.users.id`. Un disparador crea el perfil al registrar una cuenta; al eliminarla se elimina su perfil. La aplicación no almacena contraseñas ni duplica el correo.

RLS permite consultar y actualizar únicamente el perfil propio. El usuario solo puede modificar `display_name`; las fechas se administran en la base de datos. No se permite acceso anónimo ni creación manual de perfiles desde la API.

## Cuaderno

`public.notebook_entries` guarda original, dirección, traducción, japonés, kana y rōmaji como un conjunto. El propietario se asigna desde la sesión; RLS restringe inserción y consulta al usuario. Las fechas e identidades no se pueden insertar desde el cliente. La pantalla muestra los 100 conjuntos más recientes.

## Esquema y migraciones

- [schema.sql](schema.sql): estado vigente de los objetos propios de la aplicación; no se ejecuta sobre una base existente.
- [Migrations](Migrations/README.md): cambios numerados y registro de ejecución.
- Cada cambio aplicado debe actualizar el esquema y esta documentación en la misma entrega.
- Una migración aplicada no se modifica: cualquier corrección se incorpora en la siguiente.

La actualización del esquema forma parte del desarrollo; no hay sincronización automática en segundo plano. El cuaderno utiliza `notebook_entries`.

`profiles.notebook_order` conserva los identificadores ordenados del cuaderno. La API valida la propiedad de cada tarjeta antes de guardar el orden; cada usuario solo modifica su perfil.
