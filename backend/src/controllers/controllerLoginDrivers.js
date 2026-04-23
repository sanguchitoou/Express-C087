//Importamos el Schema de la colección que vamos a utilizar
import driversModel from "../models/modelDrivers.js";

//Importamos las librerías necesarias para realizar un login exitoso
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { config } from "../../config.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const loginDriversController = {};

//Realizamos la función para la realización del login
loginDriversController.login = async (request, response) => {
  //1. Solicitamos los datos
  const { email, password } = request.body;

  //Validamos el formato del código
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //Comparamos
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    //2. Buscamos el correo electrónico en la base de datos
    const driverFound = await driversModel.findOne({ email });

    //Si no existe el correo en la base de datos
    if (!driverFound) {
      return response.status(400).json({ message: "Email no encontrado " });
    }

    //Verificamos si el usuario no está bloqueado dentro de la aplicación
    if (driverFound.loginAttemps && driverFound.timeOut > Date.now) {
      return response
        .status(400)
        .json({ message: "Usuario bloqueado temporalmente" });
    }

    //Validamos la contraseña
    const isMatch = await bcryptjs.compare(password, driverFound.password);

    if (!isMatch) {
      //Si la contraseña no coincide, incrementamos los intentos de inicio de sesión
      driverFound.loginAttemps = (driverFound.loginAttemps || 0) + 1;

      if (driverFound.loginAttemps >= 3) {
        //Si se alcanzan los 5 intentos, bloqueamos al usuario durante 15 minutos
        driverFound.timeOut = new Date(Date.now() + 15 * 60 * 1000);
        driverFound.loginAttemps = 0; //Reiniciamos los intentos después de bloquear

        await driverFound.save();
        return response
          .status(403)
          .json({ message: "Usuario bloqueado temporalmente" });
      }

      //Guardamos el número de intentos de inicio de sesión en la base de datos
      await driverFound.save();
      return response.status(400).json({ message: "Contraseña incorrecta" });
    }

    //Reseteamos los intentos de inicio de sesión y el tiempo de bloqueo si la contraseña es correcta
    driverFound.loginAttemps = 0;
    driverFound.timeOut = null;

    //Generamos el token JWT
    const token = jsonwebtoken.sign(
      { id: driverFound._id, userType: "Driver" },
      config.JWT.SECRET,
      { expiresIn: "30d" },
    );

    //Guardamos el token en la cookie del cliente
    response.cookie("authCookie", token);

    //Devolvemos la respuesta del login
    return response.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en el login:", error);
    return response.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginDriversController;