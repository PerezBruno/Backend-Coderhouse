import { fakeProductsModel } from "../models/fakeProducts.models.js";
import { faker } from "@faker-js/faker";
import {generateProduct} from "../utils/generateFakeProducts.js"

export default class FakeProductsController {
  constructor() {}

  async createFakeProducts(req, res) {
      try {
      for (let i = 0; i < 100; i++) {
        const createdProduct = await fakeProductsModel.create(generateProduct());
        console.log("🚀 ~ file: fakeProducts.controllers.js:27 ~ FakeController ~ createFakeProducts ~ createdProduct:", createdProduct)
    } 
    res.status(200).send({
      message: "successfully created products"
    })
  }catch (error) {
  console.log("🚀 ~ file: fakeProducts.controllers.js:31 ~ FakeController ~ createFakeProducts ~ error:", error)
  }
  }
}
