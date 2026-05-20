import { Router } from "express";
import { renderTaskList } from "../controllers/TaskViewController.js";

const router = Router();

router.get("/tasks", renderTaskList);

export default router;
