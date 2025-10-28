Repositorio de Pruebas de Entrevistas Técnicas

Este repositorio permite practicar problemas típicos de entrevistas técnicas en varios lenguajes, organizados por carpeta.

Estructura propuesta:

```
problems/
  two-sum/
    README.md            # Enunciado
    python/
      solution.py
      test_solution.py
    javascript/
      solution.js
      solution.test.js
scripts/
  test-all.sh            # Ejecuta tests de todos los lenguajes
  test-python.sh
  test-js.sh
```

Requisitos
- Python 3.10+
- Node.js 18+

Uso rápido

- Ejecutar solo Python:
  ```bash
  bash scripts/test-python.sh
  ```
- Ejecutar solo JavaScript:
  ```bash
  bash scripts/test-js.sh
  ```
- Ejecutar todo:
  ```bash
  bash scripts/test-all.sh
  ```

Contribuir
- Agrega una carpeta dentro de `problems/` con el nombre del problema.
- Incluye `README.md` con el enunciado, entradas/salidas y complejidad esperada.
- Añade soluciones y tests por lenguaje en subcarpetas (`python/`, `javascript/`, etc.).
- Asegúrate de que los tests pasen con los scripts provistos.

CI
- Se ejecuta en GitHub Actions: `./.github/workflows/ci.yml` ejecuta `scripts/test-python.sh` y `scripts/test-js.sh`.
# Tienda React + Vite

Proyecto de tienda con carrito, checkout y confirmación de pedido.

## Login con Google + Environments

La app soporta login con Google usando Google Identity Services y un backend existente con endpoint `/login`.

### Archivos de entorno

Crea los siguientes archivos en la raíz (ya incluidos en este repo como ejemplo, recuerda no commitear tus valores reales):

```
.env.local   # desarrollo local
.env.stage   # staging
.env.prod    # producción
```

Variables usadas:

```
VITE_API_BASE_URL=URL base del backend (ej: http://localhost:3000)
VITE_GOOGLE_CLIENT_ID=Client ID de Google (OAuth / Web)
VITE_APP_SITE_NAME=Nombre del sitio mostrado en el header
```

Para ejecutar con un archivo de entorno específico:

```
# Local (por defecto usa .env.local)
npm run dev

# Stage
vite --mode stage

# Prod (preview/build)
vite build --mode prod && vite preview --mode prod
```

### Flujo de login

1. El botón "Continuar con Google" abre el flujo de Google Identity.
2. Se obtiene `credential` (JWT) de Google.
3. El frontend envía `POST /login` con `{ provider: 'google', credential }` al backend (`VITE_API_BASE_URL`).
4. Si el backend responde con usuario y token, se guarda en el contexto de usuario.
5. Si el backend falla (por ejemplo en local sin backend), se decodifica el JWT en el cliente para continuar en modo demo.

### Notas

- Configura `VITE_GOOGLE_CLIENT_ID` en `.env.local`, `.env.stage`, `.env.prod`.
- El archivo `.gitignore` ignora `.env` genérico; estos archivos específicos no deberían subirse con credenciales reales.
- Puedes reemplazar el ID de prueba por el tuyo desde Google Cloud Console.

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
