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
// poner fecha y hora a los mensajes del chat
// hacer el chat
// terminar todos los managers 
// utilizar los managers en las rutas

