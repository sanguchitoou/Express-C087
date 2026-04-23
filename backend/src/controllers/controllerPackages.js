//Importamos el Schema de la colección que vamos a utilizar
import packagesModel from "../models/modelPackages.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const packagesController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
packagesController.getPackages = async (request, response) => {
  const packages = await packagesModel.find()
    .populate("senderId")
    .populate("receiverId");

  //Devolvemos la respuesta
  response.json(packages);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
packagesController.insertPackages = async (request, response) => {
  const {
    trackingNumber,
    weight,
    dimensions,
    description,
    senderId,
    receiverId,
    status,
  } = request.body;

  //Llenamos la instancia con el schema creado
  const newPackage = new packagesModel({
    trackingNumber,
    weight,
    dimensions,
    description,
    senderId,
    receiverId,
    status,
  });

  //Guardamos en la base de datos
  await newPackage.save();

  //Imprimimos la respuesta
  response.json({ message: "Paquete guardado existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
packagesController.updatePackages = async (request, response) => {
  const {
    trackingNumber,
    weight,
    dimensions,
    description,
    senderId,
    receiverId,
    status,
  } = request.body;

  //Actualizamos el registro por ID
  await packagesModel.findByIdAndUpdate(
    request.params.id,
    {
      trackingNumber,
      weight,
      dimensions,
      description,
      senderId,
      receiverId,
      status,
    },
    { new: true },
  );

  //Imprimimos la respuesta
  response.json({ message: "Paquete actualizado existosamente" });
};

//Realizamos el DELETE
packagesController.deletePackages = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await packagesModel.findByIdAndDelete(request.params.id);

  //Eliminamos el registro
  response.json({ message: "Paquete eliminado exitosamente" });
};

//Exportamos TODO
export default packagesController;