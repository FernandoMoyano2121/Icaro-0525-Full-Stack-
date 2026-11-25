import { Router } from "express";
import {
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from "../controllers/TaskController.js";

const router = Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
export default router;
