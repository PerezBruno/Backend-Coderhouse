const socket = io();
console.log("🚀 ~ file: realTimeProducts.js:2 ~ socket:", socket)

// const btnForm = document.getElementById('btn-form');
// const form = document.getElementById('add-prod');

// const newProd = e => {
// 	e.preventDefault();
// 	const data = new FormData(form);
// 	console.log("🚀 ~ file: realTimeProducts.js:9 ~ newProd ~ data:", data)
// 	const prod = {
// 		title: data.get('title'),
// 		description: data.get('description'),
// 		category: data.get('category'),
// 		price: data.get('price'),
// 		code: Number(data.get('code')),
// 		stock: data.get('stock')
// 	};
// 	socket.emit('addProd', prod);
// 	form.reset();
// };

// const delProd = async e => socket.emit('delProd', e.target.id);

// socket.on('products', (products) => {
// 	const productsContainer = document.getElementById('products-container');
// 	productsContainer.innerHTML = '';
// 	for (const prod of products.reverse()) {
// 		productsContainer.innerHTML += `
// 			<div>
//             	<h2>${prod.title}</h2>
//             	<p><b>Descripción:</b> ${prod.description}</p>
//             	<p><b>Categoría:</b> ${prod.category}</p>
//             	<p><b>Precio: $</b>${prod.price}</p>
//             	<p><b>Código:</b> ${prod.code}</p>
//             	<p><b>Stock:</b> ${prod.stock}</p>
//             	<button id=${prod.id} class='btn-del'>Eliminar</button>
//         	</div>
// 		`;
// 	}
// });

// document.addEventListener('click', e => e.target.matches('.btn-del') && delProd(e));

// btnForm.addEventListener('click', newProd);
