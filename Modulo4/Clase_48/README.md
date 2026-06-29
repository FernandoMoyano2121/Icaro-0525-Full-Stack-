# Clase 48 — Manejo de archivos con Node.js

## Descripción

En esta clase aprendemos a trabajar con archivos desde el backend:
leer y escribir en disco con los módulos nativos `path` y `fs`,
y recibir archivos subidos por el cliente usando **Multer** y **express-fileupload**.

---

## Estructura del proyecto

```
Clase_48/
├── package.json
├── README.md
└── ejemplos/
    ├── 01-path-fs/
    │   └── index.js          ← path.join, path.resolve, fs read/write/mkdir/rename/rm
    ├── 02-multer-basico/
    │   └── index.js          ← multer con dest, upload.single, req.file
    ├── 03-multer-filtros/
    │   └── index.js          ← diskStorage + fileFilter + limits.fileSize
    ├── 04-express-fileupload/
    │   └── index.js          ← alternativa simple, req.files, .mv()
    └── 05-practica-upload/
        └── index.js          ← práctica completa: POST /upload + GET /files/:name
```

---

## Instalación

```bash
npm install
```

---

## Referencia rápida

### Módulo path

| Método                         | Qué hace                                              |
|-------------------------------|-------------------------------------------------------|
| `path.join(...segmentos)`     | Concatena con el separador del OS (` / ` o ` \ `)    |
| `path.resolve(...segmentos)`  | Devuelve la ruta absoluta resolviendo `.` y `..`      |
| `path.extname(archivo)`       | Devuelve la extensión: `.jpg`, `.png`, `.pdf`...      |
| `path.basename(archivo, ext)` | Devuelve el nombre sin la extensión                   |

### Módulo fs (async/await con fs.promises)

| Método                              | Qué hace                                        |
|-------------------------------------|-------------------------------------------------|
| `fs.readFile(ruta, 'utf-8')`        | Lee el contenido como string                   |
| `fs.writeFile(ruta, data)`          | Escribe (crea o sobreescribe)                  |
| `fs.mkdir(ruta, { recursive: true })` | Crea carpeta sin error si ya existe           |
| `fs.rename(origen, destino)`        | Renombra o mueve un archivo                    |
| `fs.rm(ruta, { recursive: true })`  | Elimina archivo o carpeta con todo su contenido|

### Multer

```js
// Configuración básica (nombres aleatorios)
const upload = multer({ dest: 'uploads/' });

// Configuración avanzada (control total)
const upload = multer({
  storage:    multer.diskStorage({ destination, filename }),
  fileFilter: (req, file, cb) => { cb(null, true/false) },
  limits:     { fileSize: 1 * 1024 * 1024 }  // 1 MB
});

// Usar en la ruta
app.post('/upload', upload.single('campo'), (req, res) => {
  req.file   // → información del archivo subido
});
```

### req.file — propiedades principales

| Propiedad      | Valor de ejemplo                |
|----------------|---------------------------------|
| `originalname` | `foto-perfil.jpg`               |
| `filename`     | `1710000000000-foto-perfil.jpg` |
| `mimetype`     | `image/jpeg`                    |
| `size`         | `204800` (bytes)                |
| `path`         | `/ruta/absoluta/al/archivo`     |

### express-fileupload

```js
app.use(fileUpload({ useTempFiles: true, tempFileDir: './tmp' }));

app.post('/upload', async (req, res) => {
  const archivo = req.files.photo;   // nombre del campo del formulario
  await archivo.mv('/destino/final/archivo.jpg');
});
```

---

## Orden de demostración en clase

### Paso 1 — path y fs (sin servidor)
```bash
node ejemplos/01-path-fs/index.js
```
Ver en consola cómo `path.join` y `path.resolve` construyen rutas,
y cómo `fs` crea, lee, renombra y elimina archivos.

### Paso 2 — Multer básico
```bash
node ejemplos/02-multer-basico/index.js
```
Thunder Client → `POST /upload` con form-data, campo `archivo`.
Ver en `uploads/` el archivo con nombre aleatorio sin extensión.

### Paso 3 — Multer con filtros
```bash
node ejemplos/03-multer-filtros/index.js
```
Probar los tres casos: imagen válida, tipo incorrecto, tamaño excedido.
Ver en `uploads/` que ahora el nombre incluye extensión y timestamp.

### Paso 4 — express-fileupload
```bash
node ejemplos/04-express-fileupload/index.js
```
Thunder Client → `POST /upload` con form-data, campo `photo`.
Comparar con Multer: menos configuración, el nombre original se conserva, hay que llamar `.mv()`.

### Paso 5 — Práctica completa
```bash
node ejemplos/05-practica-upload/index.js
```
Flujo completo:
1. `POST /upload` con imagen PNG ≤ 1MB → recibe `{ url, originalName, size }`
2. `GET /files/:name` con el nombre recibido → el cliente obtiene la imagen

---

## Conceptos clave

| Concepto             | Descripción                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `path.join`          | Concatena segmentos con el separador correcto del OS                        |
| `path.resolve`       | Devuelve la ruta absoluta desde la raíz del sistema                        |
| `fs.promises`        | Versiones async/await de todas las operaciones de archivo                   |
| `multipart/form-data`| Formato HTTP para enviar archivos junto con otros campos en un mismo request |
| Multer               | Middleware para parsear multipart/form-data y guardar archivos en disco      |
| `diskStorage`        | Configuración de Multer con control sobre nombre y destino del archivo      |
| `fileFilter`         | Función de Multer que valida el tipo MIME antes de guardar                  |
| `limits.fileSize`    | Tamaño máximo permitido en bytes                                            |
| `req.file`           | Objeto con los metadatos del archivo subido (Multer)                        |
| `res.sendFile`       | Sirve un archivo desde el servidor al cliente con el Content-Type correcto  |
| Path traversal       | Ataque que usa `../` para acceder a archivos fuera de la carpeta permitida  |
| express-fileupload   | Alternativa a Multer, más simple, ideal para prototipos                     |
