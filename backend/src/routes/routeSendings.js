import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import sendingsController from "../controllers/controllerSendings.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(sendingsController.getSendings)
  .post(sendingsController.insertSendings);

//Por ID
router
  .route("/:id")
  .put(sendingsController.updateSendings)
  .delete(sendingsController.deleteSendings);

export default router;