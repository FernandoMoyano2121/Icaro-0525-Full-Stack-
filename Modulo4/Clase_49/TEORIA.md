# Clase 49 — Glosario Teórico: WebSocket y Comunicación en Tiempo Real

---

## ¿Por qué WebSocket?

Antes de entrar en los términos, el contexto:

HTTP funciona con un modelo **request/response** — el cliente pregunta, el servidor responde, y la conexión se cierra. Si el servidor quiere avisarle algo al cliente *sin que el cliente lo pida*, HTTP no puede hacerlo de forma nativa.

WebSocket resuelve exactamente eso: establece un canal **persistente y bidireccional** entre cliente y servidor, donde cualquiera de los dos puede enviar mensajes en cualquier momento.

---

## Términos fundamentales

---

### Protocolo

Un **protocolo** es un conjunto de reglas que define cómo dos partes se comunican: qué formato tienen los mensajes, cómo se inicia y se cierra la conexión, qué pasa si hay un error, etc.

- **HTTP** (`http://` / `https://`) → protocolo para transferir documentos y datos. Conexión breve, una petición a la vez.
- **WebSocket** (`ws://` / `wss://`) → protocolo para comunicación persistente y bidireccional. La conexión queda abierta.

Ambos corren sobre **TCP** (Protocolo de Control de Transmisión), que garantiza que los paquetes lleguen en orden y sin pérdidas.

---

### Handshake

El **handshake** (apretón de manos) es el proceso inicial para establecer una conexión WebSocket.

Funciona así:
1. El cliente envía una petición HTTP normal con una cabecera especial: `Upgrade: websocket`
2. El servidor responde con código `101 Switching Protocols`
3. A partir de ese momento, la conexión "cambia de protocolo" — deja de ser HTTP y pasa a ser WebSocket

```
Cliente → Servidor:  GET /socket.io/?... HTTP/1.1
                     Upgrade: websocket
                     Connection: Upgrade

Servidor → Cliente:  HTTP/1.1 101 Switching Protocols
                     Upgrade: websocket
```

Esto explica por qué socket.io usa `http://` en la URL aunque por dentro use WS — el handshake siempre arranca como HTTP.

---

### Full-duplex

**Full-duplex** significa que los dos extremos de la conexión pueden enviar y recibir mensajes **al mismo tiempo**, de forma independiente.

Analogía:
- **Half-duplex** → walkie-talkie (uno habla, el otro escucha, se turnan)
- **Full-duplex** → llamada telefónica (ambos pueden hablar y escuchar simultáneamente)

HTTP es half-duplex: el cliente habla (request) y espera que el servidor responda (response). WebSocket es full-duplex: el servidor puede mandarle datos al cliente sin que el cliente los haya pedido.

---

### Conexión persistente

En HTTP, cada petición abre una conexión TCP, el servidor responde, y la conexión se cierra (o se reutiliza brevemente con `keep-alive`, pero con límites).

En WebSocket la conexión **se mantiene abierta** indefinidamente hasta que una de las partes la cierra explícitamente. Esto elimina el overhead de re-establecer la conexión en cada intercambio de datos — clave para aplicaciones en tiempo real.

---

### Polling

**Polling** es la técnica de hacer peticiones HTTP repetidas al servidor para verificar si hay datos nuevos.

```
Cliente → Servidor:  ¿Hay algo nuevo?   (cada N segundos)
Servidor → Cliente:  No
Cliente → Servidor:  ¿Hay algo nuevo?
Servidor → Cliente:  Sí, acá va: [datos]
```

Problemas:
- Genera tráfico innecesario (la mayoría de las veces no hay nada nuevo)
- Introduce latencia mínima de N segundos
- Satura el servidor con conexiones frecuentes

WebSocket reemplaza el polling porque el servidor puede **empujar** datos al cliente en el momento en que están disponibles.

---

### Long-polling

Variante del polling donde el servidor **mantiene la petición abierta** hasta que tenga un dato para devolver.

```
Cliente → Servidor:  ¿Hay algo nuevo?   (conexión queda abierta)
...espera...
Servidor → Cliente:  Sí, acá va: [datos]   (recién ahora responde)
Cliente → Servidor:  ¿Hay algo nuevo?   (vuelve a pedir)
```

Es mejor que el polling simple pero sigue siendo HTTP — cada respuesta cierra la conexión y el cliente debe volver a pedir. Además bloquea un hilo del servidor mientras espera.

---

### SSE (Server-Sent Events)

**SSE** es un mecanismo HTTP donde el servidor mantiene una conexión abierta y empuja eventos al cliente de forma unidireccional.

- ✅ El servidor puede enviarle datos al cliente cuando quiera
- ❌ El cliente **no puede** enviarle datos al servidor por ese mismo canal
- Útil para: notificaciones, feeds de noticias, actualizaciones de estado

WebSocket es bidireccional; SSE es solo **servidor → cliente**.

---

### Evento

En socket.io, un **evento** es el mecanismo central de comunicación. Es simplemente un mensaje con un **nombre** (string) y un **payload** (datos adjuntos).

```js
// Emitir un evento con nombre "chat message" y payload "Hola"
socket.emit('chat message', 'Hola')

// Escuchar ese evento en el otro extremo
socket.on('chat message', (msg) => {
  console.log(msg) // "Hola"
})
```

El nombre del evento lo definís vos — puede ser cualquier string. El servidor y el cliente deben usar **exactamente el mismo nombre** para que se comuniquen.

Eventos reservados por socket.io (no los podés usar para tus propios datos):
| Evento | Cuándo se dispara |
|---|---|
| `connect` | Conexión establecida (cliente) |
| `connection` | Un cliente se conectó (servidor) |
| `disconnect` | Se cerró la conexión |
| `error` | Ocurrió un error |
| `reconnect` | El cliente se reconectó tras una caída |

---

### socket.id

Cuando un cliente se conecta, socket.io le asigna automáticamente un **identificador único** — el `socket.id`. Es un string generado aleatoriamente (ej: `"aB3kX9mQpZ2..."`) que dura mientras la conexión esté activa.

```js
io.on('connection', (socket) => {
  console.log(socket.id) // identificador único de ESTE cliente
})
```

Si el cliente se desconecta y vuelve a conectar, recibe un `socket.id` diferente. Sirve para distinguir a cada usuario conectado.

---

### Broadcast

**Broadcast** significa enviar un mensaje a **múltiples destinatarios** al mismo tiempo.

En socket.io hay tres variantes:

```js
// 1. A TODOS los clientes conectados (incluido el emisor)
io.emit('evento', datos)

// 2. A todos EXCEPTO al cliente que generó el mensaje
socket.broadcast.emit('evento', datos)

// 3. Solo al cliente emisor
socket.emit('evento', datos)
```

En el chat de la práctica usamos `io.emit()` — cuando alguien envía un mensaje, el servidor lo reenvía a **todos**, incluido quien lo mandó. Por eso el mensaje aparece en todas las pestañas abiertas al mismo tiempo.

---

### Room (sala)

Una **room** es un canal nombrado al que los sockets pueden unirse y del que pueden salir. Permite enviar mensajes solo a un subconjunto de clientes.

```js
// El cliente se une a una sala
socket.join('sala-futbol')

// El servidor emite solo a los de esa sala
io.to('sala-futbol').emit('gol', 'Argentina marcó!')
```

Casos de uso: chats grupales, salas de juego, notificaciones por rol de usuario.

> Los desafíos avanzados de esta clase proponen implementar rooms.

---

### ws vs socket.io

Ambas son librerías para WebSocket en Node.js, pero tienen diferencias importantes:

| | `ws` | `socket.io` |
|---|---|---|
| Qué es | Implementación pura del protocolo WS | Capa de abstracción sobre `ws` |
| Peso | Muy liviano | Más pesado |
| Eventos con nombre | ❌ Manual | ✅ Nativo |
| Rooms | ❌ Manual | ✅ Nativo |
| Reconexión automática | ❌ Manual | ✅ Nativa |
| Fallback a polling | ❌ No | ✅ Sí (configurable) |
| Compatibilidad | Clientes WS puros | Requiere socket.io-client |

Para aprender el concepto, `ws` es más transparente. Para aplicaciones reales, `socket.io` ahorra mucho trabajo.

---

### Fallback (transporte)

socket.io no usa WebSocket directamente desde el primer intento. Su estrategia por defecto es:

1. Intentar **HTTP long-polling** primero (más compatible)
2. Hacer **upgrade a WebSocket** si el entorno lo soporta

Esto garantiza que funcione incluso en redes o proxies que bloqueen WS. Se puede forzar WS desde el inicio con:

```js
const socket = io('http://localhost:3001', {
  transports: ['websocket'] // sin fallback
})
```

---

### wss:// (WebSocket Seguro)

`wss://` es a WebSocket lo que `https://` es a HTTP — la versión **encriptada con TLS/SSL**.

- `ws://` → sin encriptación (solo para desarrollo local)
- `wss://` → encriptado (obligatorio en producción)

En producción, el servidor debe tener un certificado SSL y la URL del cliente debe usar `wss://`.

---

## Resumen visual del flujo

```
CLIENTE                          SERVIDOR
  |                                  |
  |--- HTTP Upgrade (handshake) ---->|
  |<-- 101 Switching Protocols ------|
  |                                  |
  |  [conexión WebSocket abierta]    |
  |                                  |
  |--- emit('chat message', msg) --->|  socket.on('chat message')
  |                                  |
  |                                  |--- io.emit('chat message', msg)
  |<-- 'chat message' (broadcast) ---|  (a todos los clientes)
  |                                  |
  |--- disconnect() ---------------->|
  |                                  |  socket.on('disconnect')
  |  [conexión cerrada]              |
```

---

## API de socket.io — Servidor (`socket.io`)

> `npm install socket.io`  
> Se usa en Node.js. Gestiona todas las conexiones entrantes.

---

### El objeto `io` — instancia del servidor

```js
import { createServer } from 'http'
import { Server } from 'socket.io'

const server = createServer(app)
const io = new Server(server)
```

`io` representa el servidor completo. Desde él se puede hablar con **todos** los clientes conectados.

| Método / Propiedad | Descripción |
|---|---|
| `io.on('connection', callback)` | Se ejecuta cada vez que un nuevo cliente se conecta. El callback recibe el objeto `socket` de ese cliente. |
| `io.emit(evento, datos)` | Emite un evento a **todos** los clientes conectados (broadcast global). |
| `io.to(sala).emit(evento, datos)` | Emite solo a los clientes que están en una room específica. |
| `io.sockets.sockets` | `Map` con todos los sockets activos. Clave: `socket.id`, valor: instancia del socket. |

---

### El objeto `socket` — conexión individual

Dentro del callback de `connection`, `socket` representa **la conexión de un único cliente**. Cada cliente tiene su propio `socket`.

#### Propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `socket.id` | `string` | Identificador único de esta conexión. Cambia si el cliente se reconecta. |
| `socket.rooms` | `Set<string>` | Conjunto de rooms a las que pertenece este socket. Siempre incluye su propio `socket.id` como room privada. |
| `socket.handshake` | `object` | Datos del handshake inicial: headers, query params, IP, tiempo de conexión, etc. |
| `socket.connected` | `boolean` | `true` si la conexión está activa. |

#### Métodos de escucha

| Método | Descripción |
|---|---|
| `socket.on(evento, callback)` | Escucha un evento enviado por este cliente. |
| `socket.once(evento, callback)` | Igual que `on` pero se ejecuta **una sola vez** y luego se desregistra. |
| `socket.off(evento, callback)` | Elimina un listener previamente registrado. |

#### Métodos de emisión

| Método | Destino | Descripción |
|---|---|---|
| `socket.emit(evento, datos)` | Solo este cliente | Responde únicamente al cliente de esta conexión. |
| `socket.broadcast.emit(evento, datos)` | Todos **excepto** este cliente | Útil para notificar a los demás que alguien se unió. |
| `io.emit(evento, datos)` | Todos los clientes | Broadcast global, incluido el emisor. |
| `socket.to(sala).emit(evento, datos)` | Clientes en una room (sin incluir el emisor) | Emite a una sala sin incluirse a uno mismo. |
| `io.to(sala).emit(evento, datos)` | Clientes en una room (incluido el emisor si está en ella) | Emite a toda una sala. |

#### Métodos de rooms

| Método | Descripción |
|---|---|
| `socket.join(sala)` | Une este socket a una room. Puede unirse a múltiples. |
| `socket.leave(sala)` | Abandona una room. |
| `socket.rooms` | Devuelve el `Set` de rooms actuales del socket. |

#### Métodos de conexión

| Método | Descripción |
|---|---|
| `socket.disconnect(close?)` | Cierra la conexión de este cliente desde el servidor. Si `close` es `true`, cierra también el transporte subyacente. |

#### Eventos reservados del servidor

| Evento | Cuándo se dispara |
|---|---|
| `connection` | En `io.on()` — un nuevo cliente se conectó. |
| `disconnect` | En `socket.on()` — este cliente se desconectó. Recibe un string `reason`. |
| `disconnecting` | En `socket.on()` — el cliente está por desconectarse (aún pertenece a sus rooms). |
| `error` | En `socket.on()` — ocurrió un error en la conexión. |

```js
// Ejemplo completo con los métodos más usados en el servidor
io.on('connection', (socket) => {
  console.log('Conectado:', socket.id)
  console.log('Rooms actuales:', socket.rooms)

  // Unirse a una sala
  socket.join('sala-general')

  // Escuchar evento del cliente
  socket.on('mensaje', (datos) => {
    // Responder solo al emisor
    socket.emit('confirmacion', 'Recibido')

    // Avisar a todos los demás en la sala
    socket.to('sala-general').emit('nuevo-mensaje', datos)
  })

  // Solo una vez
  socket.once('identificacion', (nombre) => {
    console.log('El cliente se identifica como:', nombre)
  })

  socket.on('disconnecting', () => {
    console.log('Está por desconectarse. Rooms:', socket.rooms)
  })

  socket.on('disconnect', (reason) => {
    console.log('Desconectado. Razón:', reason)
  })
})
```

---

## API de socket.io-client — Cliente (`socket.io-client`)

> `npm install socket.io-client` para Node.js  
> O via CDN/script en el navegador: `<script src="/socket.io/socket.io.js"></script>`

---

### Crear la conexión — `io(url, opciones)`

```js
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', {
  transports: ['websocket'],   // forzar WS sin fallback a polling
  auth: { token: 'mi-jwt' },  // datos enviados en el handshake (útil para autenticación)
  reconnectionAttempts: 5,     // intentos de reconexión antes de rendirse
  reconnectionDelay: 1000,     // ms entre cada intento de reconexión
  timeout: 5000,               // ms máximos para el handshake inicial
})
```

Si se usa `io()` sin argumentos dentro de un HTML servido por el mismo servidor, se conecta automáticamente al mismo host y puerto.

---

### Propiedades del socket cliente

| Propiedad | Tipo | Descripción |
|---|---|---|
| `socket.id` | `string` | Identificador único asignado por el servidor. Disponible solo después del evento `connect`. |
| `socket.connected` | `boolean` | `true` si la conexión está activa. |
| `socket.disconnected` | `boolean` | `true` si la conexión está cerrada. |
| `socket.active` | `boolean` | `true` si el socket está intentando conectarse o reconectarse. |

---

### Métodos de emisión

| Método | Descripción |
|---|---|
| `socket.emit(evento, datos)` | Envía un evento al servidor con los datos indicados. El payload puede ser string, número, objeto, array, etc. |
| `socket.emit(evento, datos, callback)` | Envía con **acknowledgement** — el servidor puede confirmar la recepción llamando al callback. |

```js
// Envío simple
socket.emit('chat message', 'Hola servidor')

// Envío con objeto
socket.emit('nuevo-usuario', { nombre: 'Ana', sala: 'general' })

// Envío con acknowledgement (el servidor llama al callback para confirmar)
socket.emit('guardar-dato', { valor: 42 }, (respuesta) => {
  console.log('Servidor confirmó:', respuesta)
})
```

---

### Métodos de escucha

| Método | Descripción |
|---|---|
| `socket.on(evento, callback)` | Escucha un evento enviado por el servidor. Se mantiene activo indefinidamente. |
| `socket.once(evento, callback)` | Igual que `on` pero se ejecuta **una sola vez** y se desregistra automáticamente. |
| `socket.off(evento, callback?)` | Elimina un listener. Si no se pasa callback, elimina todos los del evento. |

---

### Métodos de conexión

| Método | Descripción |
|---|---|
| `socket.connect()` | Conecta manualmente (útil si se creó el socket con `autoConnect: false`). |
| `socket.disconnect()` | Cierra la conexión de forma limpia desde el cliente. |

---

### Eventos reservados del cliente

| Evento | Cuándo se dispara |
|---|---|
| `connect` | La conexión se estableció correctamente. `socket.id` ya está disponible. |
| `disconnect` | La conexión se cerró. Recibe un string `reason`. |
| `connect_error` | Falló el intento de conexión. Recibe un objeto `Error`. |
| `reconnect` | La reconexión fue exitosa. Recibe el número de intentos que tomó. |
| `reconnect_attempt` | Se está intentando reconectar. Recibe el número de intento actual. |
| `reconnect_failed` | Se agotaron los intentos de reconexión sin éxito. |

```js
// Ejemplo completo del cliente con los métodos más usados
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
  reconnectionAttempts: 3,
})

// Conexión exitosa
socket.on('connect', () => {
  console.log('✅ Conectado con ID:', socket.id)
  socket.emit('identificacion', { nombre: 'Fernando' })
})

// Escuchar evento del servidor
socket.on('chat message', (msg) => {
  console.log('Nuevo mensaje:', msg)
})

// Solo una vez
socket.once('bienvenida', (texto) => {
  console.log('El servidor dice:', texto)
})

// Error de conexión
socket.on('connect_error', (err) => {
  console.error('❌ No se pudo conectar:', err.message)
})

// Reconexión
socket.on('reconnect', (intentos) => {
  console.log(`Reconectado tras ${intentos} intento(s)`)
})

// Desconexión
socket.on('disconnect', (reason) => {
  console.log('Desconectado. Razón:', reason)
})

// Cerrar manualmente (ej: al salir de una pantalla en React)
// socket.disconnect()
```

---

### Tabla comparativa — servidor vs cliente

| | `socket.io` (servidor) | `socket.io-client` (cliente) |
|---|---|---|
| Objeto principal | `io` (Server) + `socket` por cliente | `socket` |
| Crear instancia | `new Server(httpServer)` | `io(url, opciones)` |
| Emitir a todos | `io.emit(evento, datos)` | ❌ No aplica |
| Emitir a uno | `socket.emit(evento, datos)` | `socket.emit(evento, datos)` |
| Emitir a room | `io.to(sala).emit(evento, datos)` | ❌ No aplica (lo hace el servidor) |
| Escuchar eventos | `socket.on(evento, cb)` | `socket.on(evento, cb)` |
| Evento de conexión | `io.on('connection', cb)` | `socket.on('connect', cb)` |
| Evento de desconexión | `socket.on('disconnect', cb)` | `socket.on('disconnect', cb)` |
| Cerrar conexión | `socket.disconnect()` | `socket.disconnect()` |

---

## Referencias

- [MDN — WebSockets API](https://developer.mozilla.org/es/docs/Web/API/WebSockets_API)
- [Documentación oficial socket.io — Servidor](https://socket.io/docs/v4/server-api/)
- [Documentación oficial socket.io — Cliente](https://socket.io/docs/v4/client-api/)
- [Librería ws en npm](https://www.npmjs.com/package/ws)
- [RFC 6455 — The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)
