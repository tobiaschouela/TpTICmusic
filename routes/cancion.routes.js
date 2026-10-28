import { Router } from "express";
import CancionController from "../controllers/cancion.controller.js";
import Auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", Auth.verifyToken, Auth.verifyAdmin, CancionController.crearCancion);
router.put("/", Auth.verifyToken, Auth.verifyAdmin, CancionController.modificarCancion);
router.delete("/", Auth.verifyToken, Auth.verifyAdmin, CancionController.borrarCancion);

export default router;