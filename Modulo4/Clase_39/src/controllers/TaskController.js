// (/tasks, (req, res)=>{})
// (/tasks, listTasks)

import { Task } from "../models/task.js";

const parseTaskId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

/**
 * Listar todas las tareas
 * GET /api/tasks
 */
export const listTasks = (req, res) => {
  const all = Task.findAll();
  res.json(all);
};

/**
 * Obtener una tarea por ID
 * GET /api/tasks/:id
 */
export const getTaskById = (req, res) => {
  const id = parseTaskId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "El ID debe ser un número entero positivo" });
  }

  const task = Task.findById(id);
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
  res.status(200).json(task);
};

/**
 * Actualiza una tarea existente
 * PUT/PATCH /api/tasks/:id
 */
export const updateTask = (req, res) => {
  const id = parseTaskId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "El ID debe ser un número entero positivo" });
  }

  const { body } = req;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "El cuerpo debe ser un objeto JSON" });
  }

  const allowedFields = ["title", "completed"];
  const fields = Object.keys(body);
  if (fields.length === 0 || fields.some((field) => !allowedFields.includes(field))) {
    return res.status(400).json({
      error: "Envía al menos un campo válido: title o completed",
    });
  }

  if (
    body.title !== undefined &&
    (typeof body.title !== "string" || body.title.trim().length === 0)
  ) {
    return res.status(400).json({ error: "El título debe ser un texto no vacío" });
  }
  if (body.completed !== undefined && typeof body.completed !== "boolean") {
    return res.status(400).json({ error: "completed debe ser un valor booleano" });
  }

  const updates = { ...body };
  if (updates.title !== undefined) updates.title = updates.title.trim();

  const task = Task.update(id, updates);
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
  res.status(200).json(task);
};

/**
 * Elimina una tarea existente
 * DELETE /api/tasks/:id
 */
export const deleteTask = (req, res) => {
  const id = parseTaskId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "El ID debe ser un número entero positivo" });
  }

  const deleted = Task.delete(id);
  if (!deleted) return res.status(404).json({ error: "Tarea no encontrada" });
  res.status(204).end();
};
