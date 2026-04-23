//Importamos el DOT
import dotenv from "dotenv";

//Ejecutamos la librería DOT
dotenv.config()

//Exportamos la librería
export const config = {
    db:{
        URI: process.env.DB_URI
    },
    JWT:{
        SECRET: process.env.JWT_SECRET
    },
    EMAIL:{
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS
    }

}