//Importamos el Schema de la colección que vamos a utilizar
import driversModel from "../models/modelDrivers.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const driversController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
driversController.getDrivers = async (request, response) => {
  const drivers = await driversModel.find();
  //Devolvemos la respuesta
  response.json(drivers);
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
driversController.updateDrivers = async (request, response) => {
  const {
    name,
    lastName,
    licenseNumber,
    phone,
    email,
    password,
    isActive,
    isVerified,
    loginAttemps,
    timeOut,
  } = request.body;

  //Actualizamos el registro por ID
  await driversModel.findByIdAndUpdate(
    request.params.id,
    {
      name,
      lastName,
      licenseNumber,
      phone,
      email,
      password,
      isActive,
      isVerified,
      loginAttemps,
      timeOut,
    },
    { new: true },
  );

  //Imprimimos la respuesta
  response.json({ message: "Conductor actualizado existosamente" });
};

//Realizamos el DELETE
driversController.deleteDrivers = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await driversModel.findByIdAndDelete(request.params.id);

  //Eliminamos el registro
  response.json({ message: "Conductor eliminado exitosamente" });
};

//Exportamos TODO
export default driversController;