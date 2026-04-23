import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import registerClientsController from "../controllers/controllerRegisterClients.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(registerClientsController.registerClients);

//Código de verificación de EMAIL
router.route("/verifyCodeEmail").post(registerClientsController.verifyCode);

export default router;