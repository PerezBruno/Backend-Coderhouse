import App from "./app.js";

import cartsRoutes from "./routes/carts.routes.js";

import chatRoutes from "./routes/chat.routes.js";

import usersRoutes from "./routes/users.routes.js";

import productsRoutes from "./routes/products.routes.js";

import ViewsRoutes from "./routes/views.routes.js";


const app = new App(
  [
    new cartsRoutes(),
    new usersRoutes(),
    new productsRoutes(),
    new chatRoutes(),
  ],
  [new ViewsRoutes()],
);

app.listen();

//TODO: falta:
// terminar paginación => terminar método get
// la ruta de products/get debe poder recibir opcionalmente: limit(default 10), page (default 1), sort, query
//se podrá buscar productos por categoría o por disponibilidad
// se podran ordenar por el precio de manera ascendente o descendente




//ver temas de views para productos ("/products"), con su respectiva paginación. cada producto debe tener un boton para agregar al carrito sin necesidad de abrir una pagina adicional
// ver el tema views para el carrito ("/carts:cid"), para visualizar el carrito específico dónde se deberan listar sólo los productos que estén en el carrito


