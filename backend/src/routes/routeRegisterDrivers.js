import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import registerDriversController from "../controllers/controllerRegisterDrivers.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(registerDriversController.registerDrivers);

//Código de verificación de EMAIL
router.route("/verifyCodeEmail").post(registerDriversController.verifyCode);

export default router;