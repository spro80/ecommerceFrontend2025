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
