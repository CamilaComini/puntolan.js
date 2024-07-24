// Variables globales
  let carrito = []; // Array para los productos en el carrito

  // Elementos del DOM
const btnInicio = document.getElementById('btnInicio');
const btnProductos = document.getElementById('btnProductos');
const btnContacto = document.getElementById('btnContacto');
const header = document.querySelector('header')

  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  const contadorCarrito = document.getElementById('contador-carrito');
  
 // Event listeners para los botones
btnInicio.addEventListener('click', () => {
    alert('¡Has clickeado en Inicio!');
  });
  
  btnProductos.addEventListener('click', () => {
    alert('¡Has clickeado en Productos!');
  });
  
  btnContacto.addEventListener('click', () => {
    alert('¡Has clickeado en Contacto!');
  });

  // Función para agregar un producto al carrito
  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
  }
  
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
  
    // Guardar el carrito en localStorage (opcional)
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  // Evento para el enlace del carrito
  const carritoLink = document.getElementById('carrito-link');
  carritoLink.addEventListener('click', () => {
    // Puedes redirigir a la página del carrito aquí
    // Y pasar los datos del carrito a través de localStorage o parámetros de URL
    // Por ejemplo:
    // localStorage.setItem('carrito', JSON.stringify(carrito));
  });

  // Ejemplo de uso
  agregarAlCarrito('Laptop', 1200);
  agregarAlCarrito('Mouse', 50);
  agregarAlCarrito('Teclado', 100);
  
// Función para mostrar el logo de la empresa en el header
function mostrarLogo() {
    const logoContainer = document.querySelector('.logo');
  
    // Verifica si ya hay un logo dentro del contenedor
    if (logoContainer.querySelector('img')) {
      return; // Si ya existe un logo, no hace nada
    }
  
    // Crea el elemento de imagen del logo
    const logoImg = document.createElement('img');
    logoImg.src = 'logo/1.png'; 
    logoImg.alt = 'Logo de la empresa';
    logoImg.style.maxWidth = '50px'; 
    
    // Inserta el logo dentro del contenedor del logo
    logoContainer.appendChild(logoImg);
  }
  
// Llamada a la función mostrarLogo() para mostrar el logo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarLogo();
  });