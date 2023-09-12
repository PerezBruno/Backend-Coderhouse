const socket = io();

console.log("socket conectado desd JS")
//const btnFormAdd = document.getElementById('btn-formCreate');
const AddForm = document.getElementById('addForm')
const deleteForm = document.getElementById('deleteForm')



socket.on('products', products => {
	const productsContainer = document.getElementById('products-container');
	productsContainer.innerHTML = '';
	for (const prod of products.reverse()) {
		productsContainer.innerHTML += `
			<div>
            	<h2>${prod.title}</h2>
            	<p><b>Descripción:</b> ${prod.description}</p>
            	<p><b>Categoría:</b> ${prod.category}</p>
            	<p><b>Precio: $</b>${prod.price}</p>
            	<p><b>Código:</b> ${prod.code}</p>
            	<p><b>Stock:</b> ${prod.stock}</p>
        	</div>
		`;
	}
});

// const newProd = e => {
// 	e.preventDefault();
// 	const data = new FormData(form);
// 	console.log("🚀 ~ file: realTimeProducts.js:26 ~ newProd ~ data:", data)
// 	const prod = {
// 		title: data.get('title'),
// 		description: data.get('description'),
// 		category: data.get('category'),
// 		price: data.get('price'),
// 		code: data.get('code'),
// 		stock: data.get('stock')
// 	};
// 	console.log("🚀 ~ file: realTimeProducts.js:35 ~ newProd ~ prod:", prod)
// 	//socket.emit('addProd', prod);
// 	//form.reset();
// };




AddForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) //Me genera un objeto iterador
    const newProd = Object.fromEntries(datForm) //De un objeto iterable genero un objeto simple
    await socket.emit('addProd', newProd)
    //await socket.emit('products');
    e.target.reset()
})


deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const code = deleteForm.elements["code"].value;
    await socket.emit('deleteProduct', { code })
    e.target.reset()
})

//btnFormAdd.addEventListener('click', newProd);