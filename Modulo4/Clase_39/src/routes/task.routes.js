import { Router } from "express";
import { getTaskById, listTasks } from "../controllers/TaskController.js";

const router = Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", getTaskById);
export default router;
