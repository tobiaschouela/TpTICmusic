import { Router } from "express";
import * as cancionController from "../controllers/cancion.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Sólo admin: verifyToken siempre antes que verifyAdmin
router.post("/", verifyToken, verifyAdmin, cancionController.crearCancion);
router.put("/", verifyToken, verifyAdmin, cancionController.modificarCancion);
router.delete("/", verifyToken, verifyAdmin, cancionController.borrarCancion);

export default router;