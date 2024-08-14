document.addEventListener('DOMContentLoaded', () => {
  // Variables globales
  let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar el carrito desde localStorage

  // Elementos del DOM
  const btnInicio = document.getElementById('btnInicio');
  const btnProductos = document.getElementById('btnProductos');
  const btnContacto = document.getElementById('btnContacto');
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  const contadorCarrito = document.getElementById('contador-carrito');
  const productosLista = document.getElementById('productos-lista');
  const productosMasCompradosLista = document.getElementById('productos-mas-comprados-lista');
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  
  // Función para actualizar la vista del carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
  
    carrito.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      listaCarrito.appendChild(li);
      total += producto.precio;
    });
  
    totalCarrito.textContent = `$${total.toFixed(2)}`;
    contadorCarrito.textContent = carrito.length;
  
    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito(id) {
    fetch('productos.json')
      .then(response => response.json())
      .then(productos => {
        const producto = productos.find(p => p.id === id);
        if (producto && producto.stock > 0) {
          carrito.push({ nombre: producto.nombre, precio: producto.precio });
          producto.stock -= 1; // Disminuir el stock
          actualizarCarrito();
          localStorage.setItem('carrito', JSON.stringify(carrito));
          // Actualizar el stock en el JSON (opcional)
          // Si usas un servidor, actualiza el stock en la base de datos
        } else {
          alert('Producto fuera de stock');
        }
      });
  }

  // Función para mostrar los productos destacados
  function mostrarProductosDestacados() {
    fetch('productos.json')
      .then(response => response.json())
      .then(productos => {
        productos.slice(0, 3).forEach(producto => { // Mostrar solo 3 productos destacados
          const div = document.createElement('div');
          div.classList.add('producto');
          div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
          `;
          productosLista.appendChild(div);
        });
      });
  }

  // Función para mostrar los productos más comprados
  function mostrarProductosMasComprados() {
    fetch('productos.json')
      .then(response => response.json())
      .then(productos => {
        const productosMasComprados = productos.sort((a, b) => {
          const cantidadA = carrito.filter(p => p.nombre === a.nombre).length;
          const cantidadB = carrito.filter(p => p.nombre === b.nombre).length;
          return cantidadB - cantidadA; // Ordenar por cantidad comprada descendente
        }).slice(0, 5); // Mostrar los 5 productos más comprados

        productosMasComprados.forEach(producto => {
          const div = document.createElement('div');
          div.classList.add('producto');
          div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
          `;
          productosMasCompradosLista.appendChild(div);
        });
      });
  }

  // Event listeners para los botones
  btnInicio.addEventListener('click', () => {
    window.location.href = '/index.html'; 
  });

  btnProductos.addEventListener('click', () => {
    window.location.href = '/productos.html';   
  });

  // Evento para el botón de desplazamiento
  scrollDownBtn.addEventListener('click', () => {
    document.getElementById('productos-mas-comprados').scrollIntoView({ behavior: 'smooth' });
  });

  // Llamada a las funciones para mostrar productos destacados y más comprados
  mostrarProductosDestacados();
  mostrarProductosMasComprados();
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
