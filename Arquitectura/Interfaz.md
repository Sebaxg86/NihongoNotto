# Interfaz

La versión de escritorio anterior a la adaptación móvil está marcada con `v1.0.0-desktop`.

## Pantallas pequeñas

`app/mobile.css` aplica hasta 767 px. El escritorio conserva sus estilos en `globals.css` y `workspace.css`.

- Barra inferior flotante: Traducir, Cuaderno y Cuenta.
- Altura ajustada al área visible y márgenes de seguridad del dispositivo.
- El teclado libera espacio ocultando temporalmente la navegación y las lecturas.
- Traducciones y tarjetas con desplazamiento propio; cuenta y formularios con desplazamiento vertical.
- Campos de 16 px como mínimo para evitar el zoom automático al escribir en iOS.
- La traducción actual se conserva en memoria al cambiar de sección, hasta recargar o salir de la sesión.
- Las animaciones respetan la preferencia de movimiento reducido.

## Acceso desde la pantalla de inicio

El manifiesto y los iconos permiten agregar el sitio a la pantalla de inicio desde el navegador. Se abre en modo independiente cuando el navegador lo admite. La traducción y la sincronización del cuaderno requieren conexión.

## Comprobación

Revisar acceso, registro, recuperación, traducción en ambos sentidos, guardado, lecturas, copia, borrado y restauración. Probar 320, 390 y 430 px; orientación horizontal; teclado abierto; y escritorio de 1280 px o más.

Verificado en navegador: 320 × 568, 390 × 844, 430 × 932, horizontal 740 × 360 y escritorio 1280 × 900. La apertura del teclado se comprobó reduciendo el área visible; queda por contrastar su comportamiento en dispositivos físicos iOS y Android.
