//Importamos el APP de nuestro archivo
import app from "./app.js";
//Importamos la DB
import "./database.js";

//Creamos una funcion para ejecutar el servidor
async function main (){
    app.listen(4000);
    console.log("server port on 4000");
}

main();