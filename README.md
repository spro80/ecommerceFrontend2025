# Tienda React + Vite

Proyecto de tienda con carrito, checkout y confirmación de pedido.

## Variables de entorno (Email de confirmación)

Para enviar automáticamente el correo de confirmación al finalizar el pago se usa EmailJS. Crea un archivo `.env.local` en la raíz con:

```
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
```

El template de EmailJS debe aceptar al menos estas variables:

- `order_id`
- `to_email`
- `to_name`
- `subject`
- `message`
- `total_amount`
- `payment_method`

Si no configuras estas variables, la app no bloqueará el flujo; el botón "Preparar correo de confirmación" abrirá tu cliente de email con el detalle prellenado.

## Imágenes de productos

- Las imágenes locales viven en `public/images`.
- Fallback por categoría:
  - `public/images/category/cabello.svg`
  - `public/images/category/tazon.svg`
- Imágenes por producto (si existen):
  - `public/images/products/{PRODUCT_ID}.svg` (por ejemplo `public/images/products/CAB-SHA-001.svg`)
- El mapeo se implementa en `src/utils/imageMapper.js` y se aplica al cargar productos en `src/lib/api.js`.
- Si no existe una imagen específica por ID, se usará la de la categoría.
