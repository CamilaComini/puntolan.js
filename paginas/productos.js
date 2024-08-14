document.addEventListener('DOMContentLoaded', () => {
  // Cargar todos los productos
  fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
      mostrarTodosLosProductos(productos);
      actualizarContadorCarrito();
    })
    .catch(error => console.error('Error cargando los productos:', error));
});

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

  if (cantidad <= producto.stock && cantidad > 0) {
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
    actualizarContadorCarrito();
    alert(`${producto.nombre} agregado al carrito.`);
  } else {
    alert('Cantidad no válida o stock insuficiente.');
  }
}

function actualizarContadorCarrito() {
  const contadorCarrito = document.getElementById('contador-carrito');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contadorCarrito.textContent = totalProductos;
}

  // Event listeners para los botones
  btnInicio.addEventListener('click', () => {
    window.location.href = '/index.html'; 
  });

  btnProductos.addEventListener('click', () => {
    window.location.href = '/productos.html';   
  });

  // Función para cargar productos desde el archivo JSON
async function cargarProductos() {
  try {
      const response = await fetch('productos.json');
      const productos = await response.json();

      // Obtener el contenedor donde se mostrarán los productos
      const contenedor = document.getElementById('productos');

      // Limpiar el contenedor antes de agregar nuevos productos
      contenedor.innerHTML = '';

      // Crear elementos para cada producto y agregar al contenedor
      productos.forEach(producto => {
          // Crear un contenedor para el producto
          const productoDiv = document.createElement('div');
          productoDiv.className = 'producto';

          // Crear y agregar la imagen
          const img = document.createElement('img');
          img.src = producto.imagen;
          img.alt = producto.nombre;
          img.width = 150; // Ajusta el tamaño si es necesario
          productoDiv.appendChild(img);

          // Crear y agregar el nombre y el precio del producto
          const nombre = document.createElement('h3');
          nombre.textContent = producto.nombre;
          productoDiv.appendChild(nombre);

          const precio = document.createElement('p');
          precio.textContent = `$${producto.precio}`;
          productoDiv.appendChild(precio);

          // Añadir el producto al contenedor principal
          contenedor.appendChild(productoDiv);
      });
  } catch (error) {
      console.error('Error al cargar los productos:', error);
  }
}

// Llamar a la función cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarProductos);
