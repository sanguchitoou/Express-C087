import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import vehiclesController from "../controllers/controllerVehicles.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(vehiclesController.getVehicles)
  .post(vehiclesController.insertVehicles);

//Por ID
router
  .route("/:id")
  .put(vehiclesController.updateVehicles)
  .delete(vehiclesController.deleteVehicles);

export default router;