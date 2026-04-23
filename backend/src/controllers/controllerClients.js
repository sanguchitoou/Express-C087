//Importamos el Schema de la colección que vamos a utilizar
import clientsModel from "../models/modelClients.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const clientsController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
clientsController.getClients = async (request, response) => {
  const clients = await clientsModel.find();
  //Devolvemos la respuesta
  response.json(clients);
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
clientsController.updateClients = async (request, response) => {
  const {
    name,
    lastName,
    email,
    password,
    phone,
    address,
    isVerified,
    loginAttemps,
    timeOut,
  } = request.body;

  //Actualizamos el registro por ID
  await clientsModel.findByIdAndUpdate(
    request.params.id,
    {
      name,
      lastName,
      email,
      password,
      phone,
      address,
      isVerified,
      loginAttemps,
      timeOut,
    },
    { new: true },
  );

  //Imprimimos la respuesta
  response.json({ message: "Cliente actualizado existosamente" });
};

//Realizamos el DELETE
clientsController.deleteClients = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await clientsModel.findByIdAndDelete(request.params.id);

  //Eliminamos el registro
  response.json({ message: "Cliente eliminado exitosamente" });
};

//Exportamos TODO
export default clientsController;