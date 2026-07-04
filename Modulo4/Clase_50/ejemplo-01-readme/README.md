# API de aplicación de taras

Pequeña API REST para crear, listar y completar tareas.

## Instalación

```bash
git clone https://github.com/usuario/todo-api
cd todo-api
npm install
cp .env.example .env
```

## Uso en desarrollo

```bash
npm run dev
```

## Endpoints principales

- `GET /tasks` : Listar todas las tareas.
- `POST /tasks` : Crear una nueva tarea.
- `PUT /tasks/:id` : Completar una tarea.
- `DELETE /tasks/:id` : Eliminar una tarea.

## Contribuir

1. Hacé un fork del repositorio.
2. Creá una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commitá tus cambios: `git commit -m "feat: descripción"`
4. Abrí un Pull Request.

## Autores

- [Tu Nombre](github.com/tuusuario)
