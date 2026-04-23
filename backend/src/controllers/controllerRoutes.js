//Importamos el Schema de la colección que vamos a utilizar
import routesModel from "../models/modelRoutes.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const routesController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
routesController.getRoutes = async (request, response) => {
  const routes = await routesModel.find();

  //Devolvemos la respuesta
  response.json(routes);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
routesController.insertRoutes = async (request, response) => {
  const { origin, destination, distance, estimatedTime } = request.body;

  //Llenamos la instancia con el schema creado
  const newRoute = new routesModel({
    origin,
    destination,
    distance,
    estimatedTime,
  });

  //Guardamos en la base de datos
  await newRoute.save();

  //Imprimimos la respuesta
  response.json({ message: "Ruta guardada existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
routesController.updateRoutes = async (request, response) => {
  const { origin, destination, distance, estimatedTime } = request.body;

  //Actualizamos el registro por ID
  await routesModel.findByIdAndUpdate(
    request.params.id,
    {
      origin,
      destination,
      distance,
      estimatedTime,
    },
    { new: true },
  );

  //Imprimimos la respuesta
  response.json({ message: "Ruta actualizada existosamente" });
};

//Realizamos el DELETE
routesController.deleteRoutes = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await routesModel.findByIdAndDelete(request.params.id);

  //Eliminamos el registro
  response.json({ message: "Ruta eliminada exitosamente" });
};

//Exportamos TODO
export default routesController;