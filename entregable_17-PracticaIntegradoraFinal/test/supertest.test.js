import { expect } from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { DB_NAME, DB_PASSWORD, DB_USER } from "../src/config/config.js";

const requester = supertest("http://localhost:8080")
await mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.gpx0edf.mongodb.net/?retryWrites=true&w=majority`
);

describe("CRUD Test of products in the api/products route", function(){
    it("POST method in the api/products route", async()=>{
        const newProduct = {
            title: "The name of the rose",
            description: "Novel written by Humberto Eco",
            price: 10000,
            thumbnail: [],
            code: "lrcxgfnn9989",
            stock: 250,
            category: "Historical novel",
        }

        const {statusCode, _body, ok} = await requester.post("/api/products").send(newProduct)

        //expect(statusCode).to.be.equal(200)
        //expect(_body.status).to.be.equal("success")TODO: ver por queeste no funciona
        expect(ok).to.be.ok
        // console.log("🚀 ~ it ~ ok:", ok)
        // console.log("🚀 ~ it ~ _body:", _body)
        // console.log("🚀 ~ it ~ statusCode:", statusCode)
    })


    it("GET method in the api/products route", async()=>{

        const { ok } = await requester.get("/api/products")

        //expect(statusCode).to.be.equal(200)
        //expect(_body.status).to.be.equal("success")TODO: ver por queeste no funciona
        expect(ok).to.be.ok

    })

    it("PUT method in the api/products route", async()=>{
        const id = "65a2d80de3d4f7503e1b416b"
        const updateProduct = {
            title: "Updated name ",
            description: "A real story of Lorem",
            price: 10000,
            stock: 250,
            category: "Historical novel",
        }

        const {ok} = await requester.put(`/api/products/${id}`).send(updateProduct)

        //expect(statusCode).to.be.equal(200)
        //expect(_body.status).to.be.equal("success")TODO: ver por queeste no funciona
        expect(ok).to.be.ok
        // console.log("🚀 ~ it ~ ok:", ok)
        // console.log("🚀 ~ it ~ _body:", _body)
        // console.log("🚀 ~ it ~ statusCode:", statusCode)
    })

    it("DELETE method in the api/products route", async()=>{
        const id = "65a2d80de3d4f7503e1b416b"

        const {ok} = await requester.delete(`/api/products/${id}`)

        expect(ok).to.be.ok

    })
})



//llegue hasta 2:10