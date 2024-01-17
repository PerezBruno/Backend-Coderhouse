import {expect} from "chai"
import mongoose from "mongoose";
import { UsersModel } from "../src/models/users.models.js";
import { DB_NAME, DB_PASSWORD, DB_USER } from "../src/config/config.js";

//const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.gpx0edf.mongodb.net/?retryWrites=true&w=majority`
);

describe("CRUD Test of Users in the api/users route", function () {
    it("Get all users using the GET method", async()=>{
        const users = await UsersModel.find()

        //expect(Array.isArray(users)).to.be.ok // verdadero sería OK

        //expect(users).equal([]) //********si espero un array vacío */

        //expect(users).to.be.deep.equal([])//*****analiza en profundidad si el array que recibo es igual a un array vacío */

        expect(users).not.to.be.deep.equal([])//*****analiza en profundidad si el array que recibo "NO" es igual a un array vacío */

    })

    it("Get a user using the GET method", async()=>{
        const user = await UsersModel.findById("65a5b9a331e278300ab508cb")

        expect(user).to.have.property("_id")

    })

    it("Create a user using the POST method", async()=>{
        const newUser = {
            first_name: "Bruno",
            last_name: "Perez",
            email: "chaiperezbruno@gmail.com",
            age: 20,
            password: "123456"
        }
        const user = await UsersModel.create(newUser)
        
        expect(user).to.have.property("_id")//mi expectativa es que haya un objeto con el atributo _id

    })

    it("Edit a user using the PUT method", async()=>{
        const updateUser = {
            first_name: "Bondiola",
            last_name: "Rodriguez",
            email: "chaiperezbruno@gmail.com",
            age: 600,
            password: "userUpdated"
        }
        const user = await UsersModel.findOneAndUpdate({email: "chaiperezbruno@gmail.com"}, updateUser)
        
        expect(user).to.have.property("_id")

    })

    
    it("Delete a user using the DELETE method", async()=>{

        const result = await UsersModel.findByIdAndDelete("65a5b9a331e278300ab508cb")
        
        expect(result).to.be.ok


    })
});
