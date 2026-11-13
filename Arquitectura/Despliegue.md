# Despliegue Oracle

Sitio: https://nihongonotto.duckdns.org

Caddy termina HTTPS y renueva el certificado. Docker ejecuta Next.js como usuario sin privilegios en `127.0.0.1:3000`. UFW permite 22, 80 y 443. La imagen OCI tenía un rechazo previo a UFW: se añadió la excepción web antes de esa regla y se guardó en `/etc/iptables/rules.v4`.

Cada versión se sincroniza por rsync a `/opt/nihongonotto/releases/<commit>`. Los secretos están en `shared/app.env` y `shared/oci.pem`, fuera de las versiones y de la imagen. La clave se monta como archivo de solo lectura.

```sh
DEPLOY_HOST=ubuntu@158.101.108.181 DEPLOY_SSH_KEY=/ruta/clave scripts/deploy-oracle.sh
```

El script construye la imagen, espera el estado saludable y actualiza el enlace `current`. Las imágenes conservan la etiqueta del commit. Para restaurar una anterior, ejecutar Compose desde esa versión con su `RELEASE_TAG`; no se automatiza todavía la restauración.

Supabase permite los callbacks públicos y locales. El dominio público es el Site URL. Las migraciones se ejecutan por separado una sola vez.

El repositorio incluye un flujo para GitHub Actions, pero el despliegue en Oracle se realiza actualmente con el script anterior. Vercel publica automáticamente los cambios de `main`. Las migraciones no forman parte de estos despliegues y se aplican por separado.

## Vercel

Publicado: https://nihongonotto.vercel.app. Next.js con Node.js 22, región `iad1` y repositorio conectado a `main` para despliegues automáticos. Las variables de producción están configuradas, incluyendo la clave privada como secreto. Los callbacks están autorizados en Supabase; ambos sitios comparten los mismos datos.

Verificadas traducciones reales en ambos sentidos y lecturas dentro de las funciones de Vercel.

Configurar las variables de `.env.example`. En Vercel, sustituir `OCI_PRIVATE_KEY_PATH` por el secreto `OCI_PRIVATE_KEY` con el contenido PEM; nunca subir el archivo. `APP_URL` debe ser el origen público de Vercel. Registrar sus callbacks en Supabase conservando los de Oracle. Ambos sitios comparten cuentas y cuaderno.
