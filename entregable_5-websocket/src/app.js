import express from "express";
import { ProductManager } from "../src/ProductManager.js"
import productRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import { Server } from "socket.io"


const PORT = 8080;
const app = express();
const pathJson = "./products/products.json"
const productManager = new ProductManager(pathJson);
const server = app.listen(PORT, () => {
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

  socket.emit('products', listProducts);

	socket.on('addProd', async prod => {
    try {
     return await productManager.addProducts(prod)
    } catch (error) {
      console.log("🚀 ~ file: app.js:39 ~ io.on ~ error:", error)
      
    }
	})
	socket.on('delProd', async id => await productManager.deleteProduct(id));
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

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);



let listProducts = [];
const cargarProd = async () => {
  try {
    listProducts = await productManager.getProducts();
  } catch (error) {
    console.error("Error: not product found");
  }
};
cargarProd();

app.get("/home", (req, res)=>{
  res.status(200).render("home", {
    title: "APP Coderhouse - Lista de productos",
    products: listProducts,
  })
})

app.get("/realtimeproducts", (req, res)=>{
  res.status(200).render("realTimeProducts", {
    title: "APP Coderhouse - Tiempo real"
  })
})


