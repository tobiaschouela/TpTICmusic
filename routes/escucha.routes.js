import { Router } from "express";
import EscuchaController from "../controllers/escucha.controller.js";
import Auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", Auth.verifyToken, EscuchaController.escucho);
router.get("/", Auth.verifyToken, EscuchaController.misEscuchas);

export default router;