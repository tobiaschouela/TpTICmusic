import { Router } from "express";
import * as escuchaController from "../controllers/escucha.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Cualquier usuario logueado
router.post("/", verifyToken, escuchaController.escucho);
router.get("/", verifyToken, escuchaController.misEscuchas);

export default router;