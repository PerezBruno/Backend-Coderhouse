import { userDeletionNotice } from "../config/nodemailer.js";
import { UsersModel } from "../models/users.models.js";
import { createHashValue, validatePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export default class SessionsController {
  constructor() {}

  async postLogin(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "incorrect data" });
      } else {
        // si no manejamos session este codigo se elimina
        // req.session.user = {
        //   role: req.user.role,
        //   first_name: req.user.first_name,
        //   last_name: req.user.last_name,
        //   email: req.user.email,
        //   age: req.user.age,
        // };
        let test2 = Date.now();

        let user = await UsersModel.findByIdAndUpdate(req.user._id, {
          last_connection: test2,
        });
        const token = generateToken(req.user);
        res.cookie("cookieToken", token, {
          maxAge: 43200000, //tiempo de expiración en milisegundos??? => sería 12 hs
          httpOnly: true,
        });
        res.status(200).send({ token: token });

        //res.status(200).json({ message: "login success", payload: req.user });
        // res.status(200).render("profile", {
        //   role: req.session?.user?.role || user.role,
        //   first_name: req.session?.user?.first_name || user.first_name,
        //   last_name: req.session?.user?.last_name || user.last_name,
        //   email: req.session?.user?.email || email,
        //   age: req.session?.user?.age || user.age,
        // });
      }
    } catch (error) {
      res.status(500).json({
        message: "Login error",
        error,
      });
    }
  }
  async getLogout(req, res) {
    try {
      res.clearCookie("cookieToken");
      res.status(200).send({ message: "Successful logout" });
    } catch (error) {
      res.status(400).send({ error: `Logout error ${error}` });
    }
  }

  async postRegister(req, res) {
    try {
      res.status(200).send({ message: "Successfully registered user" });
    } catch (error) {
      console.log(
        "🚀 ~ file: sessions.controller.js:54 ~ SessionsController ~ postRegister ~ error:",
        error
      );
      res.status(400).send({
        message: "error creating user",
        error: error,
      });
    }
  }

  async postUpdatePassword(req, res) {
    try {
      const { old_password, new_password, repeat_new_password, email } =
        req.body;

      const newPswHashed = createHashValue(new_password);
      const user = await UsersModel.findOne(email);
      //validando usuario
      if (!user) {
        res.status(404).json({
          message: "Incorrect data",
        });
      }
      //validando contraseña
      const isValidComparePsw = validatePassword(old_password, user.password);
      if (!isValidComparePsw || new_password !== repeat_new_password) {
        return res.status(401).json({ message: `incorrect data` });
      }

      const updateUser = UsersModel.findByIdAndUpdate(user._id, {
        password: newPswHashed,
      });

      if (!updateUser) {
        res.json({
          message: "error updating password",
        });
      }
      return res.render("login");
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:138 ~ router.post ~ error:",
        error
      );
    }
  }

  async getGithubCallback(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "incorrect data" });
      }
      req.session.user = req.user;
      res.render("profile", {
        role: req.session?.user?.role || user.role,
        first_name: req.session?.user?.first_name || user.first_name,
        last_name: req.session?.user?.last_name || user.last_name,
        email: req.session?.user?.email || email,
        age: req.session?.user?.age || user.age,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:146 ~ SessionRoutes ~ this.router.get ~ error:",
        error
      );
      res.status(500).json({
        message: "Login error",
      });
    }
  }

  async deleteOfflineUsers(req, res) {
    // const users = await UsersModel.findById("65bac184a5d3939fb03699e6")
    // console.log("🚀 ~ SessionsController ~ deleteOfflineUsers ~ users:", users)
try {
  const users = await UsersModel.find({});
  for (let user of users) {
    const now = Date.now();
    let lastConnection = user.last_connection;
    let data = (now - lastConnection) / (1000 * 60 * 60); //devuelve el tiempo de desconexion en horas
    // console.log("🚀 ~ deleteOfflineUsers ~ data:", data);
    // console.log("🚀 ~ deleteOfflineUsers ~ data:", user.first_name)
    if (data > 48) {
      let userId = `${user._id}`;
      let email = user.email
      //console.log("🚀 ~ SessionsController ~ deleteOfflineUsers ~ email:", email)
      const deleteUser = await UsersModel.findByIdAndDelete(user._id);
      userDeletionNotice(email)
    }
  }
  return res
    .status(200)
    .send({
      message: "Users removed and notified correctly",
    });
} catch (error) {
  return res.status(500).send({message: "Error deleting inactive", error})
}
    
  }
}
