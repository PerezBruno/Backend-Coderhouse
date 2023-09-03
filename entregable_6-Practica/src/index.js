import App from "./app.js";

//import  BaseRoute  from "./routes/base.routes.js";

import  usersRoutes from "./routes/users.routes.js"

//import  StudentsRoutes  from "./routes/students.routes.js";

//import  ViewsRoutes  from "./routes/views.routes.js";

const app = new App([
 // new BaseRoute(),
  new usersRoutes(),
  //new StudentsRoutes(),
  //new ViewsRoutes(),
]);


app.listen();