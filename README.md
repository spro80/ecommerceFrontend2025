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

Las imágenes de productos viven en `public/assets/products` y se resuelven localmente por `id` y/o por `category` a través de `src/lib/images.js`.

- Para generar (o regenerar) las imágenes placeholder basadas en los datos de `src/data/products.js`:

```
npm run generate:images
```

- Regla de resolución de imágenes:
  - Si el producto tiene `id`, se usa `/assets/products/<ID>.svg`.
  - Si no hay `id`, se usa un default por categoría:
    - `cabello` -> `/assets/products/default-cabello.svg`
    - `tazon` -> `/assets/products/default-tazon.svg`
    - cualquier otra -> `/assets/products/default.svg`

Estas imágenes se usan automáticamente en los listados y detalle de producto mediante las funciones `attachImages` y `attachImageToProduct` en `src/lib/api.js`.
