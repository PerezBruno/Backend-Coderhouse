import express from "express";
import displayRoutes from "express-routemap";
import { __dirname } from "./path.js";
import { mongoDBconnection } from "./db/mongo.config.js";
import { engine } from "express-handlebars";
import path from "path";
import { Server } from "socket.io"
import ProductsManager from "./managers/productManagers.js";

class App {
  app;
  port;
  server;
  productsManager

  constructor(routes, viewsRoutes) {
    this.app = express();
    this.port = 8080;
    this.productsManager = new ProductsManager()

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initHandlebars();
    this.initializeViewsRoutes(viewsRoutes)
  }


  //inicializa la conexión con la base de datos
  async connectToDatabase() {
    // TODO: Inicializar la conexion
    await mongoDBconnection();
  }


  //implementando midleweares
  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "/public")))
    //this.app.use("/static", express.static(`${__dirname}/public`));
  }


  //Rutas de la API
  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(`/api/`, route.router);
    });
  }


  //rutas de las vistas
  initializeViewsRoutes(viewsRoutes) {
    viewsRoutes.forEach((route) => {
      this.app.use(`/`, route.router);
    });
  }


  //iniciando Express
  async listen() {
    this.server = this.app.listen(this.port, () => {
      displayRoutes(this.app);
      console.log(`=================================`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });



    let products = await this.productsManager.getAllProducts()



    //configuración de socket.io

    const io = new Server(this.server);
    
    io.on(`connection`, async (socket) =>{
      console.log("Servidor socket.io conectado")

      socket.emit('products', products);


    })
  }

   initHandlebars() {
    this.app.engine("handlebars", engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", path.resolve(__dirname, "./views"));
  }

  
}


export default App;