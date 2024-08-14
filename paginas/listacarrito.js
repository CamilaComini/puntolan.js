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

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
      // Eliminar el producto del array carrito
      carrito.splice(index, 1);
      // Actualizar el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      // Eliminar el elemento del DOM
      li.remove();
      // Actualizar el total del carrito
      total -= producto.precio;
      totalCarrito.textContent = `$${total.toFixed(2)}`;
      // Actualizar el contador del carrito en la página principal (si existe)
      const contadorCarrito = document.getElementById('contador-carrito');
      if (contadorCarrito) {
        contadorCarrito.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
      }
    });

    li.appendChild(nombre);
    li.appendChild(precio);
    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    // Sumar el precio al total
    total += producto.precio;
  });

  // Mostrar el total del carrito
  totalCarrito.textContent = `$${total.toFixed(2)}`;

  // Actualizar el contador del carrito en la página principal (si existe)
  const contadorCarrito = document.getElementById('contador-carrito');
  if (contadorCarrito) {
    contadorCarrito.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  }
});
