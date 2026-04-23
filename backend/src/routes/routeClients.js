import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import clientsController from "../controllers/controllerClients.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").get(clientsController.getClients);

//Por ID
router
  .route("/:id")
  .put(clientsController.updateClients)
  .delete(clientsController.deleteClients);

export default router;