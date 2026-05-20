import { Task } from "../models/task.js";

// Listar todas las tareas (vista)
export const renderTaskList = (req, res) => {
  const tasks = Task.findAll();
  res.render("index", { tasks });
};
