//Importamos el Schema de la colección que vamos a utilizar
import sendingsModel from "../models/modelSendings.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const sendingsController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
sendingsController.getSendings = async (request, response) => {
  const sendings = await sendingsModel.find()
    .populate("packageId")
    .populate("routeId")
    .populate("driverId")
    .populate("vehicleId");

  //Devolvemos la respuesta
  response.json(sendings);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
sendingsController.insertSendings = async (request, response) => {
  const {
    packageId,
    routeId,
    driverId,
    vehicleId,
    departureDate,
    deliveryDate,
    status,
  } = request.body;

  //Llenamos la instancia con el schema creado
  const newSending = new sendingsModel({
    packageId,
    routeId,
    driverId,
    vehicleId,
    departureDate,
    deliveryDate,
    status,
  });

  //Guardamos en la base de datos
  await newSending.save();

  //Imprimimos la respuesta
  response.json({ message: "Envío guardado existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
sendingsController.updateSendings = async (request, response) => {
  const {
    packageId,
    routeId,
    driverId,
    vehicleId,
    departureDate,
    deliveryDate,
    status,
  } = request.body;

  //Actualizamos el registro por ID
  await sendingsModel.findByIdAndUpdate(
    request.params.id,
    {
      packageId,
      routeId,
      driverId,
      vehicleId,
      departureDate,
      deliveryDate,
      status,
    },
    { new: true },
  );

  //Imprimimos la respuesta
  response.json({ message: "Envío actualizado existosamente" });
};

//Realizamos el DELETE
sendingsController.deleteSendings = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await sendingsModel.findByIdAndDelete(request.params.id);

  //Eliminamos el registro
  response.json({ message: "Envío eliminado exitosamente" });
};

//Exportamos TODO
export default sendingsController;