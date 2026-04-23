import express from "express";
//Importamos TODOS los ENDPOINTS para ser utilizados en el endpoint principal
import clientsRoutes from "./src/routes/routeClients.js";
import driversRoutes from "./src/routes/routeDrivers.js";
import packagesRoutes from "./src/routes/routePackages.js";
import routesRoutes from "./src/routes/routeRoutes.js";
import sendingsRoutes from "./src/routes/routeSendings.js";
import vehiclesRoutes from "./src/routes/routeVehicles.js";

import registerClientsRoutes from "./src/routes/routeRegisterClients.js";
import registerDriversRoutes from "./src/routes/routeRegisterDrivers.js";

import loginClientsRoutes from "./src/routes/routeLoginClients.js";
import loginDriversRoutes from "./src/routes/routeLoginDrivers.js";

import logoutRoutes from "./src/routes/routeLogout.js";

import cookieParser from "cookie-parser";
//Importamos para usar CORS
import cors from "cors";

//Crear una constante que guarda la instancia EXPRESS
const app = express();

//Utilizamos la librería de las cookies para utilizarlas
app.use(cookieParser());

//Utilizamos la librería de CORS para utilizarlas
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ], 
    credentials: true
}))

//Hacemos que acepte los JSON de donde sea
app.use(express.json());

/* ACA VAN TODOS LOS ENDPOINTS!!! */

//CRUD
app.use("/api/clients", clientsRoutes);
app.use("/api/drivers", driversRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/routes", routesRoutes);
app.use("/api/sendings", sendingsRoutes);
app.use("/api/vehicles", vehiclesRoutes);

//REGISTER
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/registerDrivers", registerDriversRoutes);

//LOGIN
app.use("/api/loginClients", loginClientsRoutes);
app.use("/api/loginDrivers", loginDriversRoutes);

//LOGOUT
app.use("/api/logout", logoutRoutes);

//Exportamos la función EXPRESS
export default app;