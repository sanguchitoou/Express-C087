import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import driversController from "../controllers/controllerDrivers.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").get(driversController.getDrivers);

//Por ID
router
  .route("/:id")
  .put(driversController.updateDrivers)
  .delete(driversController.deleteDrivers);

export default router;