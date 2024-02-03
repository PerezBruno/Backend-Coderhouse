import mongoose from "mongoose";
import {UsersModel} from "../src/models/users.models.js"
import Assert from "assert";
import { DB_NAME, DB_PASSWORD, DB_USER } from "../src/config/config.js";

const assert = Assert.strict;

await mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.gpx0edf.mongodb.net/?retryWrites=true&w=majority`
);

describe("CRUD Test of Users in the api/users route", function(){
    //previo a comenzar el tes
    before(()=>{
        console.log("Starting the test")
    })
    //previo a arrancar cada test
    beforeEach(()=>{
        console.log("Start test")
    })

    it("Get all users using the GET method", async()=>{
        const users = await UsersModel.find()
        assert.strictEqual(Array.isArray(users), true)
    })
    it("Get a user using the GET method", async()=>{
        const user = await UsersModel.findById("65a5b9a331e278300ab508cb")

        assert.strictEqual(typeof user, "object") //comparo el tipo de dato que arroja el resultado con un objeto

        assert.ok(user._id)// si user existe verifica que contenga el atributo _id  ==> es más preciso

    })

    it("Create a user using the POST method", async()=>{
        const newUser = {
            first_name: "carlos",
            last_name: "House",
            email: "denuevocarlosperez@gmail.com",
            age: 20,
            password: "123456"
        }
        const user = await UsersModel.create(newUser)
        
       // assert.strictEqual(typeof user, "object") //comparo el tipo de dato que arroja el resultado con un objeto

        assert.ok(user._id)// si user existe verifica que contenga el atributo _id  ==> es más preciso

    })

    it("Edit a user using the PUT method", async()=>{
        const updateUser = {
            first_name: "Roberto",
            last_name: "House",
            email: "carlosperez@gmail.com",
            age: 20,
            password: "123456"
        }
        const user = await UsersModel.findOneAndUpdate({email: "carlosperez@gmail.com"}, updateUser)
        
       // assert.strictEqual(typeof user, "object") //comparo el tipo de dato que arroja el resultado con un objeto

        assert.ok(user._id)// si user existe verifica que contenga el atributo _id  ==> es más preciso

    })

    it("Delete a user using the DELETE method", async()=>{

        const result = await UsersModel.findByIdAndDelete("65a602710ddd2f477d07bde6")
        
        assert.strictEqual(typeof result, "object") //comparo el tipo de dato que arroja el resultado con un objeto


    })

})


