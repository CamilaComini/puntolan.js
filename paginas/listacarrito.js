document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');

  // Recuperar el carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  let total = 0;

  // Limpiar el contenido actual de la lista
  listaCarrito.innerHTML = '';

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('carrito-item'); // Añadir clase para estilos personalizados

    // Crear elementos para mostrar detalles del producto
    const nombre = document.createElement('span');
    nombre.textContent = producto.nombre;

    const precio = document.createElement('span');
    precio.textContent = `$${producto.precio.toFixed(2)}`;

    const cantidad = document.createElement('span');
    cantidad.textContent = `Cantidad: ${producto.cantidad || 1}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
      // Verificar si hay más de una unidad del producto
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        total -= producto.precio;
      } else {
        carrito.splice(index, 1); // Eliminar el producto del array si la cantidad es 1 o menos
        li.remove(); // Eliminar el elemento del DOM
        total -= producto.precio;
      }

      // Actualizar el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      
      // Actualizar el total del carrito
      totalCarrito.textContent = `$${total.toFixed(2)}`;

      // Actualizar el contador del carrito en la página principal
      const contadorCarrito = document.getElementById('contador-carrito');
      if (contadorCarrito) {
        contadorCarrito.textContent = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
      }

      // Actualizar la cantidad mostrada en el DOM
      cantidad.textContent = `Cantidad: ${producto.cantidad || 1}`;
    });

    li.appendChild(nombre);
    li.appendChild(precio);
    li.appendChild(cantidad);
    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    // Sumar el precio total del producto multiplicado por su cantidad
    total += producto.precio * (producto.cantidad || 1);
  });

  // Mostrar el total del carrito
  totalCarrito.textContent = `$${total.toFixed(2)}`;

  // Actualizar el contador del carrito en la página principal
  const contadorCarrito = document.getElementById('contador-carrito');
  if (contadorCarrito) {
    const totalCantidad = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    contadorCarrito.textContent = totalCantidad;
  }
});

// Event listeners para los botones
btnInicio.addEventListener('click', () => {
  window.location.href = '/index.html'; 
});

btnProductos.addEventListener('click', () => {
  window.location.href = '/productos.html';   
});
