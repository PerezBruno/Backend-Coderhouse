import { UsersModel } from "../models/users.models.js";

class UserManager {


    async getAllUsers(){
        try {
            const users = await UsersModel.find();
            return users
        } catch (error) {
            console.log("🚀 ~ file: usersManager.js:10 ~ UserManager ~ getAllUsers ~ error:", error)
        }
    }

    async getUserById(userId){
        try {
            const user = await UsersModel.findById(userId)
            return user
        } catch (error) {
            console.log("🚀 ~ file: usersManager.js:19 ~ UserManager ~ getUserById ~ error:", error)
        }
    }

    async addUser({ first_name, last_name, age, email, password }){
        try {
            const newUser = await UsersModel.create({first_name, last_name, age, email, password});
            return newUser
        } catch (error) {
            console.log("🚀 ~ file: usersManager.js:28 ~ UserManager ~ addUser ~ error:", error)
        }
    }
}

export default UserManager;
