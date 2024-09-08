document.addEventListener('DOMContentLoaded', () => {
  // Variables globales
  let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar el carrito desde localStorage

  // Elementos del DOM
  const btnInicio = document.getElementById('btnInicio');
  const btnProductos = document.getElementById('btnProductos');
  const productosLista = document.getElementById('productos-lista');
  const productosMasCompradosLista = document.getElementById('productos-mas-comprados-lista');
  const scrollLeftBtn = document.getElementById('scroll-left-btn');


  // Función para mostrar los productos destacados de forma aleatoria
  function mostrarProductosDestacados() {
    fetch('productos.json')
      .then(response => response.json())
      .then(productos => {
        // Limpiar el contenedor antes de agregar nuevos productos
        productosLista.innerHTML = '';

        // Ordenar los productos de manera aleatoria
        const productosAleatorios = productos.sort(() => 0.5 - Math.random());

        // Filtrar los productos destacados
        const productosDestacados = productosAleatorios.filter(producto => producto.destacado === true);

        // Limitar a los primeros 6 productos destacados
        const productosAmostrar = productosDestacados.slice(0, 6);

        // Mostrar el título y los productos destacados
        productosLista.innerHTML = '<h2>Productos Destacados</h2>';
        productosAmostrar.forEach(producto => {
          const div = document.createElement('div');
          div.classList.add('producto');

          // Agregar imagen, nombre y precio del producto
          div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
          `;

          // Añadir el producto al contenedor
          productosLista.appendChild(div);
        });
      })
      .catch(error => console.error('Error al cargar los productos destacados:', error));
  }

  // Llamada a la función cuando la página esté lista
  mostrarProductosDestacados();

  // Event listeners para los botones
  btnInicio.addEventListener('click', () => {
    window.location.href = '/index.html'; 
  });

  btnProductos.addEventListener('click', () => {
    window.location.href = '/productos.html';   
  });

  // Evento para el botón de desplazamiento
  scrollLeftBtn.addEventListener('click', () => {
    window.location.href = '/productos.html'; 
  });
});