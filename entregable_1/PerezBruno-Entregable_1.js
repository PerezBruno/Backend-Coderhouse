class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
  }
  addProducts({ title, description, price, thumbnail, code, stock, id }) {
    id = this.id;
    const verificarCode = this.products.some((product) => {
      return product.code === code;
    });
    if (verificarCode){
      console.log("El valor de code ya se encuentra asignado a otro producto")
    }else if (
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
    ){
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
    } else {
      console.log("Todos los parametros son requeridos");
    }
  }
  getProducts(){
    return this.products
  }

  getProductsById(id){
    const resultadoId = this.products.find(e => e.id === id)
    if(resultadoId){
      return resultadoId
    }else {
      return "Not found"
    }
  }
}


//****************Proceso de Testing*****************

//Se creará una instancia de la clase “ProductManager”

const adminProduct = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(adminProduct.getProducts());



/*
Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25
 */

adminProduct.addProducts({
	title: 'producto prueba',
	description: 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 25
})


//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(adminProduct.getProducts());


// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

adminProduct.addProducts({
	title: 'producto prueba',
	description: 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 25
})


//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

console.log(adminProduct.getProductsById(1));

console.log(adminProduct.getProductsById(8));



//**********EXTRAS*********** */

//Caso 1: Al objeto le faltan elementos

adminProduct.addProducts({
	title: 'producto prueba',
	//description: 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc1234',
	stock: 25
})


//Caso 2: El objeto tiene una "Key" de valor indefinido

adminProduct.addProducts({
	title: 'producto prueba',
	description: "",  // quitamos 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc1234',
	stock: 25
})
