import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import loginClientsController from "../controllers/controllerLoginClients.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(loginClientsController.login);

export default router;