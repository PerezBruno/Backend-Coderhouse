import { promises as fs } from 'fs'
//const fs = require("fs");

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 11;
  }

  async addProducts({ title, description, price, thumbnail, code, stock, id }) {
    id = this.id;
    const verificarCode = this.products.some((product) => {
      return product.code === code;
    });
    if (verificarCode) {
      console.log("El valor de code ya se encuentra asignado a otro producto");
    } else if (
      title != "" &&
      description != "" &&
      price != "" &&
      thumbnail != "" &&
      stock != "" &&
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      stock != undefined &&
      code != "" &&
      code != undefined
    ) {
      try {
        console.log("producto cargado correctamente");
        this.products.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id,
        });

        this.id = this.id + 1;
        await fs.writeFile(this.path, JSON.stringify(this.products));
      } catch (error) {
      console.log("🚀 ~ file: ProductManager.js:46 ~ ProductManager ~ addProducts ~ error:", error)
      }
    } else {
      console.log("Todos los parametros son requeridos");
    }
  }

  async getProducts() {
    try {
      const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
      //console.log("🚀 ~ file: ProductManager.js:60 ~ ProductManager ~ getProducts ~ data:", data)
      return data;
    } catch (error) {
      console.log("🚀 ~ file: ProductManager.js:59 ~ ProductManager ~ getProducts ~ error:", error)
      ;
    }
  }

  getProductById = async (id) => {
    this.products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const resultadoId = this.products.find((e) => e.id === id);
    if (resultadoId) {
      return resultadoId;
    } else {
      return { message: "Product Not Found" };
    }
  };

  updateProduct = async (id, data) => {
    try {
      let productoAActualizar = await this.getProductById(id);
      let productoIndex = this.products.findIndex((e) => e.id === id);
      this.products[productoIndex] = {
        ...productoAActualizar,
        ...data,
        id: id,
      };
      await fs.writeFile(this.path, JSON.stringify(this.products));
      console.log("Producto editado correctamente");
    } catch (error) {
    console.log("🚀 ~ file: ProductManager.js:84 ~ ProductManager ~ updateProduct= ~ error:", error)
    }
  };

  deleteProduct = async (id) => {
    try {
      this.products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      this.products = this.products.filter((prod) => prod.id !== id);
      await fs.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log("🚀 ~ file: ProductManager.js:99 ~ ProductManager ~ deleteProduct ~ error:", error);
    }
  };
}


// export * from ProductManager;
// //module.exports = ProductManager;

// const productManager = new ProductManager("../products/products.json");
// productManager.getProductById(3)