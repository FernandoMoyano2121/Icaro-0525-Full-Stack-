# Clase 46 — Envío de correos desde Node.js con Nodemailer

## Descripción

En esta clase aprendemos a enviar correos electrónicos desde el backend usando **Nodemailer**,
la librería estándar del ecosistema Node.js para envío de emails vía SMTP.

Partimos de un correo de texto plano y llegamos a un servidor Express con un endpoint
que dispara un correo de bienvenida al registrar un usuario — escenario que se repite
en casi todos los proyectos web reales.

---

## ¿Qué es Nodemailer?

Nodemailer es una librería que abstrae la complejidad del protocolo SMTP.
En lugar de configurar sockets, handshakes y autenticación manualmente,
simplemente creás un **transporter** y llamás a `sendMail()`.

Soporta múltiples proveedores: Gmail, Outlook, Amazon SES, SendGrid, Mailgun y cualquier
servidor SMTP estándar.

---

## Estructura del proyecto

```
Clase_46/
├── .env.example                          ← variables de entorno (copiá como .env)
├── package.json
├── README.md
└── ejemplos/
    ├── 01-correo-simple/
    │   └── index.js                      ← texto plano, verify(), sendMail()
    ├── 02-correo-html/
    │   └── index.js                      ← cuerpo HTML con estilos inline
    ├── 03-correo-adjuntos/
    │   ├── index.js                      ← attachments con path y content
    │   └── assets/
    │       └── factura.txt               ← archivo adjunto de ejemplo
    ├── 04-correo-plantilla/
    │   ├── index.js                      ← lee .html y reemplaza {{variables}}
    │   └── templates/
    │       └── bienvenida.html           ← plantilla con {{nombre}} {{email}} {{fecha}}
    └── 05-express-nodemailer/
        ├── index.js                      ← servidor Express con endpoints
        └── src/
            └── config/
                └── mailer.js             ← transporter centralizado (buena práctica)
```

---

## Instalación y configuración

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de variables de entorno
cp .env.example .env

# 3. Completar el .env con tus credenciales de Mailtrap o Gmail
```

### Configurar Mailtrap (recomendado para clase)

1. Crear cuenta gratis en https://mailtrap.io
2. Ir a **Email Testing → Inboxes → tu inbox → SMTP Settings**
3. Seleccionar **Nodemailer** en el dropdown de integración
4. Copiar los valores `host`, `port`, `user`, `pass` al `.env`

### Configurar Gmail (para producción)

1. Activar verificación en 2 pasos en tu cuenta Google
2. Ir a **Cuenta → Seguridad → Contraseñas de aplicación**
3. Crear una contraseña para "Correo" en "Otro dispositivo"
4. Usar esa contraseña de 16 caracteres (no tu contraseña de Gmail) en `MAIL_PASS`

---

## Referencia de Nodemailer

### Crear un Transporter

```js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',  // servidor SMTP
  port: 2525,                         // puerto
  auth: {
    user: 'tu_usuario',
    pass: 'tu_password',
  },
});
```

### Verificar conexión

```js
await transporter.verify();
// → lanza error si las credenciales son incorrectas
```

### Opciones de correo (mailOptions)

| Propiedad     | Tipo             | Descripción                                       |
|---------------|------------------|---------------------------------------------------|
| `from`        | string           | Remitente: `"Nombre <email@ejemplo.com>"`         |
| `to`          | string / array   | Destinatario/s (separados por coma)               |
| `subject`     | string           | Asunto del correo                                 |
| `text`        | string           | Cuerpo en texto plano (fallback)                  |
| `html`        | string           | Cuerpo en HTML enriquecido                        |
| `attachments` | array de objetos | Archivos adjuntos (ver abajo)                     |

### Adjuntos

```js
attachments: [
  { filename: 'doc.txt',  path: '/ruta/al/archivo.txt' },   // desde disco
  { filename: 'gen.txt',  content: 'texto generado' },       // desde memoria
  { filename: 'img.png',  path: './img.png', cid: 'logo' },  // embebido con cid
]
```

### Plantillas con {{variables}}

```js
let html = await fs.readFile('./template.html', 'utf-8');
html = html.replaceAll('{{nombre}}', usuario.nombre);
html = html.replaceAll('{{email}}',  usuario.email);
```

### Ubicación del transporter en un proyecto real

Según las diapos, el transporter se ubica en `./src/config/mailer.js`
y se exporta para importarlo en cualquier parte de la app.

```
proyecto/
└── src/
    └── config/
        └── mailer.js   ← transporter centralizado
```

---

## Proveedores de correo

| Situación                  | Proveedor recomendado              |
|----------------------------|------------------------------------|
| Desarrollo / clase         | Mailtrap (gratis, atrapa emails)   |
| Producción — bajo volumen  | Gmail con app password             |
| Producción — alto volumen  | SendGrid / Mailgun / Amazon SES    |

---

## Seguridad y buenas prácticas

1. **Nunca hardcodear credenciales** — siempre usar `.env`
2. **Agregar `.env` al `.gitignore`** — nunca subir al repositorio
3. **Usar TLS/SSL** — `secure: true` con puerto 465, o STARTTLS con puerto 587
4. **Testear en Mailtrap** antes de pasar a producción
5. **Limitar frecuencia de envío** — evitar ser marcado como spam

---

## Orden de demostración en clase

### Paso 1 — Correo de texto plano
```bash
node ejemplos/01-correo-simple/index.js
```
Conceptos: transporter, verify(), mailOptions, sendMail(), info.messageId

### Paso 2 — Cuerpo HTML
```bash
node ejemplos/02-correo-html/index.js
```
Conceptos: propiedad `html`, estilos inline, fallback con `text`

### Paso 3 — Adjuntos
```bash
node ejemplos/03-correo-adjuntos/index.js
```
Conceptos: `attachments[]`, `path` vs `content`, tipos MIME

### Paso 4 — Plantilla con variables
```bash
node ejemplos/04-correo-plantilla/index.js
```
Conceptos: `fs.readFile()`, `replaceAll('{{variable}}', valor)`, separación template/lógica

### Paso 5 — Servidor Express completo
```bash
node ejemplos/05-express-nodemailer/index.js
```
Luego probar con Thunder Client:
```
POST http://localhost:3000/registro
Content-Type: application/json

{ "nombre": "Juan Pérez", "email": "juan@ejemplo.com" }
```
Conceptos: `src/config/mailer.js`, integración Express + Nodemailer, validación de body, códigos HTTP 201/400/500

---

## Conceptos clave

| Concepto          | Qué es                                                            |
|-------------------|-------------------------------------------------------------------|
| Transporter       | Objeto que gestiona la conexión SMTP y las credenciales           |
| SMTP              | Protocolo estándar para envío de correos entre servidores         |
| Mailtrap          | Servidor SMTP de prueba — atrapa correos sin enviarlos            |
| mailOptions       | Objeto con los datos del correo (from, to, subject, html, etc.)  |
| attachments       | Array de objetos que describen los archivos adjuntos              |
| cid               | Content-ID — identifica imágenes embebidas dentro del HTML        |
| App Password      | Contraseña de 16 chars que Google genera para apps de terceros    |
| verify()          | Método que verifica la conexión SMTP antes de enviar              |
| sendMail()        | Método que dispara el envío del correo                            |
| `src/config/mailer.js` | Ubicación recomendada para el transporter en proyectos reales |
