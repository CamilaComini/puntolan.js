document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  actualizarContadorCarrito();
});

function cargarProductos() {
  fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
      localStorage.setItem('productos', JSON.stringify(productos)); // Guardar productos en localStorage
      mostrarTodosLosProductos(productos);
    })
    .catch(error => console.error('Error cargando los productos:', error));
}

function mostrarTodosLosProductos(productos) {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.innerHTML = ''; // Limpiar contenedor

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <p>${producto.descripcion}</p>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <p id="stock-${producto.id}">Stock disponible: ${producto.stock}</p>
      <input type="number" id="cantidad-${producto.id}" value="1" min="1" max="${producto.stock}">
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;

    productosContainer.appendChild(productoDiv);
  });
}

function agregarAlCarrito(productId) {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const producto = productos.find(p => p.id === productId);
  const cantidadInput = document.getElementById(`cantidad-${producto.id}`);
  const cantidad = parseInt(cantidadInput.value);

  if (producto && cantidad <= producto.stock && cantidad > 0) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(p => p.id === productId);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }

    producto.stock -= cantidad;

    document.getElementById(`stock-${producto.id}`).textContent = `Stock disponible: ${producto.stock}`;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('productos', JSON.stringify(productos)); // Actualizar el stock en localStorage
    actualizarContadorCarrito();
    Swal.fire({
      position: "relative",
      icon: "success",
      title: "Su producto se agrego al carrito",
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No quedaron mas productos en stock..",
    });
  }
}

function actualizarContadorCarrito() {
  const contadorCarrito = document.getElementById('contador-carrito');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contadorCarrito.textContent = totalProductos;
}
