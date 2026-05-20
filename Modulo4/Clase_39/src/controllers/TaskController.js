// (/tasks, (req, res)=>{})
// (/tasks, listTasks)

import { Task } from "../models/task.js";

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
  const task = findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
  res.status(200).json(task);
};
