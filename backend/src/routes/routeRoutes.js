import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import routesController from "../controllers/controllerRoutes.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(routesController.getRoutes)
  .post(routesController.insertRoutes);

//Por ID
router
  .route("/:id")
  .put(routesController.updateRoutes)
  .delete(routesController.deleteRoutes);

export default router;