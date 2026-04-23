import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import packagesController from "../controllers/controllerPackages.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(packagesController.getPackages)
  .post(packagesController.insertPackages);

//Por ID
router
  .route("/:id")
  .put(packagesController.updatePackages)
  .delete(packagesController.deletePackages);

export default router;