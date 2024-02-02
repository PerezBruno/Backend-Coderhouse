import { UsersModel } from "../models/users.models.js";
import { sendRecoveryMail } from "../config/nodemailer.js";
import crypto from "crypto";
import { PORT, RANDOM_KEY } from "../config/config.js";
import { createHashValue } from "../utils/bcrypt.js";

const recoveryLinks = {};

export default class UserController {
  constructor() {}


 //********************* Esta ruta trae a todos los usuarios completos *****************
  async getUsers(req, res) {
    try {
      const users = await UsersModel.find({});
      if (users) {
        return res.status(200).send({
          message: "Get all users successfully",
          users: users,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "error getting users",
        error: error,
      });
    }
  }


  //********************* Esta ruta trae a todos los usuarios mapeados *****************
  //********************* Solo trae Nombre, Apellido y correo ****************
  // async getUsers(req, res) {
  //   try {
  //     const users = await UsersModel.find({});
  //     if (users.length > 0) {
  //       const data = users.map(user => ({
  //         first_name: user.first_name,
  //         last_name: user.last_name,
  //         email: user.email,
  //         role: user.role
  //     }));
  //       return res.status(200).send({
  //         message: "Get all users successfully",
  //         users: data,
  //       });
  //     }
  //   } catch (error) {
  //     res.status(400).send({
  //       message: "error getting users",
  //       error: error,
  //     });
  //   }
  // }


  //********************* Esta ruta trae a un usuario por su Id *****************
  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await UsersModel.findById(userId);
      if (user) {
        res.status(200).send({
          message: `get user info to id ${userId} successfully`,
          user,
        });
      } else {
        res.status(404).send({
          message: `user with id ${userId} not found`,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "error getting user",
        error: error,
      });
    }
  }


  //********************* Esta ruta edita a un usuario por su Id *****************
  async updateUserById(req, res) {
    const { userId } = req.params;
    const { first_name, last_name, age, email, password } = req.body;
    try {
      const user = await UsersModel.findByIdAndUpdate(userId, {
        first_name,
        last_name,
        age,
        email,
        password,
      });
      if (user) {
        return res.status(200).send({
          message: `updated user`,
          users: user,
        });
      } else {
        return res.status(404).send({
          message: `user with id ${userId} not found`,
        });
      }
    } catch (error) {
      return res.status(400).send({
        message: "error updating user",
        error: error,
      });
    }
  }


  //********************* Esta ruta elimina a un usuario mediante su Id *****************
  async deleteUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await UsersModel.findByIdAndDelete(userId);
      if (user) {
        res.status(200).send({
          message: `user whith id ${userId} removed successfully`,
          user,
        });
      } else {
        res.status(404).send({
          message: `user with id ${userId} not found`,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: users.routes.js:124 ~ userRoutes ~ this.userRouter.put ~ error:",
        error
      );
      res.status(400).send({
        message: "error deleting user",
        error,
      });
    }
  }

  async deleteAllUsersUser(req, res){
    try {
      await UsersModel.deleteMany({"role":"User"})
      res.status(200).send({message: `users deleted successfully`});
    } catch (error) {
      res.status(500).send({message: `error deleting users - ${error}`});
      
    }
  }



  // const recoveryLinks = {};
  async recoveryPassword(req, res) {
    const { email } = req.body;
    try {
      const token = crypto.randomBytes(Number(RANDOM_KEY)).toString("hex");

      recoveryLinks[token] = { email, timestamp: Date.now() };

      const recoverylink = `http://localhost:${PORT}/api/users/reset-password/${token}`;

      sendRecoveryMail(email, recoverylink);

      res.status(200).send(`The verification email was sent successfully`);
    } catch (error) {
      res.status(500).send(`error sending email - ${error}`);
    }
  }

  async resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword, newPassword2 } = req.body;
    try {
      const linkData = recoveryLinks[token];
      if (linkData && Date.now() - linkData.timestamp <= 3_600_000) {
        const { email } = linkData;
        const newPasswordHash = createHashValue(newPassword);
        if (newPassword == newPassword2) {
          //Modificando la contraseña del usuario
          delete recoveryLinks[token];
          await UsersModel.findOneAndUpdate(
            { email: email },
            { password: newPasswordHash }
          );
          res.status(200).send(`Password changed successfully`);
        } else {
          res.status(400).send(`Passwords must be the same`);
        }
      } else {
        res
          .status(400)
          .send(`Invalid or expired token. Please request a new link`);
      }
    } catch (error) {
      res.status(500).send({message: `error resetting password - ${error}`});
    }
  }


}
