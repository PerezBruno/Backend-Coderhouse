import App from "./app.js";

import cartsRoutes from "./routes/carts.routes.js";

import chatRoutes from "./routes/chat.routes.js";

import usersRoutes from "./routes/users.routes.js";

import productsRoutes from "./routes/products.routes.js";

import ViewsRoutes from "./routes/views.routes.js";

import SessionRoutes from "./routes/session.routes.js";

import mocksRoutes from "./routes/mockRoutes.js";

import logginRoutes from "./routes/loggin.routes.js";

const app = new App(
  [
    new logginRoutes(),
    new cartsRoutes(),
    new usersRoutes(),
    new productsRoutes(),
    new chatRoutes(),
    new SessionRoutes(),
    new mocksRoutes()
  ],
  [new ViewsRoutes()]
);

app.listen();


//TODO:
//llegue hasta  03:27:00
