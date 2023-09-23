import App from "./app.js";

import cartsRoutes from "./routes/carts.routes.js";

import chatRoutes from "./routes/chat.routes.js";

import usersRoutes from "./routes/users.routes.js";

import productsRoutes from "./routes/products.routes.js";

import ViewsRoutes from "./routes/views.routes.js";

import SessionRoutes from "./routes/session.routes.js";


const app = new App(
  [
    new cartsRoutes(),
    new usersRoutes(),
    new productsRoutes(),
    new chatRoutes(),
  ],
  [new ViewsRoutes()],
  [new SessionRoutes()],
);

app.listen();


//TODO:
// falta:
// terminar el manager de usuarios
// readaptar el userRoutes
// crear las rutas y demases para el login
// llegue hasta 03:03:00 video clase 10