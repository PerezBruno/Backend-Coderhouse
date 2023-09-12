import express from "express";
import productRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import { Server } from "socket.io"
import displayRoutes from "express-routemap";
import { connect } from "mongoose";
import { productsModel } from "./dao/models/products.models.js";
import { chatsModel } from "./dao/models/chats.models.js"


const DB_USER = "brunoleandroperez";
const DB_PASSWORD = "<TODO:>";
const PORT = 8080;
const app = express();
//const pathJson = "./products/products.json"
//const productManager = new ProductManager(pathJson);
const server = app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Server on port ${PORT}`);
});


//***************MIDLEWEARES**************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//path.join es un metodo que permite concatenar una ruta sin el problema de la barra "/" o "\"
app.use(express.static(path.join(__dirname, "/public")))


// instancio la clase Server (de Socket.io) con la conexion al puerto (server) como parámetro
const io = new Server(server);

io.on('connection', async (socket)=>{
  console.log("Servidor socket.io conectado")
  
  socket.emit('products', productsList);

  socket.on('addProd', async (newProd) => {
    try {
      const { title, description, price, code, stock, category } = newProd;
      await productsModel.create({ title, description, price, code, stock, category });
      const productsList = await productsModel.find();
      socket.emit('products', productsList);
    } catch (error) {
      console.log("🚀 ~ file: app.js:50 ~ socket.on ~ error:", error)
    }
  })

  socket.on('deleteProduct', async ({ code }) => {
    try {
        await productsModel.deleteOne({ code });
       socket.emit('products', productsList);

    }catch (error) {
    console.log("🚀 ~ file: app.js:59 ~ socket.on ~ error:", error)
    }
  })

   //****canal de mensajes
   socket.on("message", async (data) => {
    try {
      await chatsModel.create(data);
    } catch (error) {
      console.log("🚀 ~ file: app.js:67 ~ socket.on ~ error:", error)
      
    }
    const info = await chatsModel.find();
    io.emit("messageLogs", info.reverse());
  });



  //****canal de autenticación
  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data);
  });

  //canal de autenticación
  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConected", data);
  });
})


//***************CONFIGURACION HANDLEBARS**************/
//indico que voy a utilizar handlebars
app.engine("handlebars", engine());
//indico que los archivos van a terminar en ".handlebars"
app.set("view engine", "handlebars");
//path.resolve es un metodo que permite concatenar pero rutas relativas
//me genera una ruta absoluta a travez de una ruta relativa
app.set("views", path.resolve(__dirname, "./views"));
//indico que las plantillas que tiene que utilizar handlebars se encuentran el la carpeta "views" 


//rutas de la api
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);




let productsList = [];
const getProducts = async () => {
  try {
    productsList = await productsModel.find();
    return productsList;
  } catch (error) {
    console.error("Error: not product found");
  }
};
getProducts();


//*****   RUTAS DE HANDLEBARS   ******/
app.get("/products", (req, res)=>{
  const mappedProducts = productsList.map((prod) => {
    return {
      title: prod.title,
      description: prod.description,
      price: prod.price,
      code: prod.code,
      stock: prod.stock,
    };
  });
  res.status(200).render("home", {
    title: "APP Coderhouse - Lista de productos",
    products: mappedProducts,
  })
})

app.get("/realtimeproducts", (req, res)=>{
  res.status(200).render("realTimeProducts", {
    title: "APP Coderhouse - Tiempo real"
  })
})

app.get("/chat", (req, res)=>{
  res.status(200).render("chat", {
    title: "APP Coderhouse - Chat"
  })
})



const DB_URL =`mongodb+srv://${DB_USER}:${DB_PASSWORD}@ecommerce.gpx0edf.mongodb.net/?retryWrites=true&w=majority`;


// conección para mongo Atlas

const configConnection = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBconnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log("==========================");
    console.log(
      `======== URL: ${configConnection.url.substring(0, 31)} ========`
    );
    console.log("==========================");
  } catch (error) {
    console.log(
      "🚀 ~ file: mongo.config.js:23 ~ mongoDBconnection ~ error:",
      error
    );
    throw new Error(error);
  }
};

mongoDBconnection()



//TODO: falta el chat completo
// implementar users