const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../db/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // conectar con base de dato
    this.conectarDB();
    
    // middlewares
    this.middlewares();

    // rutas de la app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS

    this.app.use(cors());

    //pareso y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionando", this.port);
    });
  }
}

module.exports = Server;
