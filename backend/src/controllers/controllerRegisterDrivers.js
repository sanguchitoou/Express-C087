//Importamos las librerías para realizar todo el proceso de encriptación y envío de correos
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import driversModel from "../models/modelDrivers.js";
import { config } from "../../config.js";

const registerDriversController = {};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
registerDriversController.registerDrivers = async (request, response) => {
  const { name, lastName, licenseNumber, phone, email, password } =
    request.body;

  //Colocamos un trycatch para canalizar errores
  try {
    //Llenamos la instancia con el schema creado
    const existsDriver = await driversModel.findOne({ email });

    //Verificamos si el correo ya existe
    if (existsDriver) {
      return response.status(400).json({ message: "El correo ya existe" });
    }

    //Encriptamos la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Generamos un código aleatorio para la verificación del correo
    const verificationCode = crypto.randomBytes(3).toString("hex");

    //Guardamos en un token el código de verificación y el correo del usuario
    const token = jsonwebtoken.sign(
      {
        verificationCode,
        name,
        lastName,
        licenseNumber,
        phone,
        email,
        password: hashedPassword,
        isActive: true,
        isVerified: true,
        loginAttemps: 0,
        timeOut: null,
      },
      config.JWT.SECRET,
      { expiresIn: "15m" }, //El token expirará en 15 minutos
    );

    //Lo guardamos en la cookie
    response.cookie("registrationCookie", token, {
      maxAge: 15 * 60 * 1000, //15 minutos
    });

    //Enviamos el código por correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASS,
      },
    });

    //Creación del mailoptions, que contiene el correo del destinatario, el asunto y el cuerpo del mensaje
    const mailOptions = {
      from: config.EMAIL.USER,
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Hola ${name}, tu código de verificación es: ${verificationCode} y expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu registro.`,
    };

    //Enviamos el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo: " + error);
        return response
          .status(400)
          .json({ message: "Error al enviar el correo" });
      }
      return response
        .status(200)
        .json({ message: "Correo de verificación enviado exitosamente" });
    });
  } catch (error) {
    console.log("error " + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

//Verificar el código de verificación
registerDriversController.verifyCode = async (request, response) => {
  const { verificationCodeRequest } = request.body;

  try {
    //Extraemos los datos del token
    const token = request.cookies.registrationCookie;

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
    const {
      verificationCode: storedCode,
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
    } = decoded;

    //Comparar lo que el usuario escribió con el código que está en el token
    if (verificationCodeRequest !== storedCode) {
      return response
        .status(400)
        .json({ message: "Código de verificación inválido" });
    }

    //Si todo está bien, lo registramos en la DB
    const newDriver = new driversModel({
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
    });

    //Guardamos TODOS los datos del conductor
    await newDriver.save();

    //Limpiamos la cookie
    response.clearCookie("registrationCookie");

    //Retornamos la respuesta
    return response
      .status(200)
      .json({ message: "Conductor guardado exitosamente" });
  } catch (error) {
    console.log("error " + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

export default registerDriversController;