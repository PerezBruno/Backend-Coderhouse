import express from "express";
import displayRoutes from "express-routemap";
import { __dirname } from "./path.js";
import { mongoDBconnection } from "./db/mongo.config.js";

class App {
  app;
  port;

  constructor(routes) {
    this.app = express();
    this.port = 8080;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initHandlebars();
  }

  async connectToDatabase() {
    // TODO: Inicializar la conexion
    await mongoDBconnection();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use("/static", express.static(`${__dirname}/public`));
  }

  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(`/api/`, route.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      console.log(`=================================`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }
}


export default App;