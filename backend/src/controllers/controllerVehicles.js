//Importamos el Schema de la colección que vamos a utilizar
import vehiclesModel from "../models/modelVehicles.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const vehiclesController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
vehiclesController.getVehicles = async (request, response) => {
  const vehicles = await vehiclesModel.find().populate("driverId");

  //Devolvemos la respuesta
  response.json(vehicles);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
vehiclesController.insertVehicles = async (request, response) => {
  const { plate, model, capacity, status, driverId } = request.body;

  //Llenamos la instancia con el schema creado
  const newVehicle = new vehiclesModel({
    plate,
    model,
    capacity,
    status,
    driverId,
  });

  //Guardamos en la base de datos
  await newVehicle.save();

  //Imprimimos la respuesta
  response.json({ message: "Vehículo guardado existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
vehiclesController.updateVehicles = async (request, response) => {
  const { plate, model, capacity, status, driverId } = request.body;

  //Actualizamos el registro por ID
  await vehiclesModel.findByIdAndUpdate(
    request.params.id,
    {
      plate,
      model,
      capacity,
      status,
      driverId,
    },
    { new: true },
  );

  //Imprimimos la respuesta
  response.json({ message: "Vehículo actualizado existosamente" });
};

//Realizamos el DELETE
vehiclesController.deleteVehicles = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await vehiclesModel.findByIdAndDelete(request.params.id);

  //Eliminamos el registro
  response.json({ message: "Vehículo eliminado exitosamente" });
};

//Exportamos TODO
export default vehiclesController;