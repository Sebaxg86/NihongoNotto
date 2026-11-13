# Traducción

`POST /api/translate` recibe `text` (1–2000 caracteres) y `source` (`es` o `ja`). Exige una sesión válida y valida los datos antes de consultar OCI Language.

Oracle traduce al idioma opuesto. Kuromoji analiza la oración japonesa y genera una lectura sin kanji conservando el katakana; Kuroshiro produce rōmaji Hepburn. En japonés → español se conserva el texto japonés original como base de las lecturas.

El diccionario se carga una vez por proceso. Las lecturas automáticas pueden fallar en nombres o términos ambiguos. El rōmaji separa unidades del analizador, no necesariamente palabras pedagógicas.

Las credenciales OCI permanecen en variables del servidor. En desarrollo se lee la clave desde `OCI_PRIVATE_KEY_PATH`; para Vercel puede configurarse `OCI_PRIVATE_KEY` como secreto. Nunca incluir la clave privada en Git. La configuración de Next.js incluye el diccionario en el empaquetado del servidor; los despliegues todavía requieren validación en cada plataforma.

La interfaz permite cambiar la dirección, limpiar el texto y copiar los resultados. El cuaderno aún no guarda traducciones; no se modificó la base de datos en esta etapa.

Validación: traducciones reales en ambos sentidos, conservación del katakana y conversión de kanji, compilación y pruebas de autenticación. La revisión visual completa del nuevo resultado queda pendiente.
