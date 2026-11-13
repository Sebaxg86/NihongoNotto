# Migraciones

| Archivo | Descripción | Estado | Fecha local |
| --- | --- | --- | --- |
| [Migration-01.sql](Migration-01.sql) | Perfiles, disparadores y políticas RLS. | Aplicada en NihongoNotto | 2026-11-12 |

| [Migration-02.sql](Migration-02.sql) | Conjuntos de estudio privados. | Aplicada en NihongoNotto | 2026-11-12 |

## Ejecución

Los archivos `Migration-01.sql`, `Migration-02.sql`, etc., son la fuente de cada cambio. `supabase/migrations/` contiene enlaces a ellos con el nombre temporal que requiere Supabase CLI; no hay dos copias del SQL.

Correspondencia inicial: `Migration-01.sql` → `20261113020000_profiles.sql`. El identificador ordena la migración; la fecha de ejecución se registra por separado.

Desde la raíz del proyecto:

```sh
supabase migration list
supabase db push --dry-run
supabase db push
```

Antes de ejecutar, comprobar que el proyecto enlazado es NihongoNotto (`emsbdfakrxqrvetsanje`). Registrar como aplicada solo después de confirmar la ejecución remota. El historial remoto de Supabase evita volver a ejecutar migraciones ya aplicadas.

No editar archivos aplicados ni usar `db reset` sobre el proyecto remoto.
