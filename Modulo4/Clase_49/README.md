# Clase 49 — WebSocket con Socket.IO

## Progresión de ejemplos

| Carpeta                      | Qué hace                   | Cómo probarlo                                     |
| ---------------------------- | -------------------------- | ------------------------------------------------- |
| `ejemplo-01-servidor-basico` | Servidor socket.io mínimo  | Postman (Socket.IO request)                       |
| `ejemplo-02-cliente-node`    | Servidor + cliente Node.js | 2 terminales: `node server.js` / `node client.js` |

## Arrancar cualquier ejemplo

```bash
cd nombre-del-ejemplo
npm install
npm start
```

## Puertos

- ejemplo-01 → 3001
- ejemplo-02 → 3002

## Desafíos avanzados (para casa)

1. **Autenticación con JWT** — enviar el token en el handshake (`auth: { token }`) y verificarlo en el servidor con un middleware de socket.io
2. **Rooms (salas)** — `socket.join('sala-1')` + `io.to('sala-1').emit(...)` para mensajes grupales separados
3. **Reconexión automática** — configurar `reconnectionAttempts` y `reconnectionDelay` en el cliente
