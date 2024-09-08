document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
  const formularioCompra = document.getElementById('formularioCompra');
  const formCompra = document.getElementById('formCompra');
  const mensajeError = document.getElementById('mensajeError');
  const btnCancelar = document.getElementById('btnCancelar');
  
  // Recuperar el carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  let total = 0;

  // Limpiar el contenido actual de la lista
  listaCarrito.innerHTML = '';

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('carrito-item'); 

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
        carrito.splice(index, 1); 
        li.remove(); 
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

  // Mostrar el formulario cuando se hace clic en "Finalizar La Compra"
  btnFinalizarCompra.addEventListener('click', () => {
    formularioCompra.style.display = 'block';
  });

  // Cancelar el formulario
  btnCancelar.addEventListener('click', () => {
    formularioCompra.style.display = 'none';
  });

  // Enviar el formulario
  formCompra.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const medioPago = document.getElementById('medioPago').value;

    if (!nombre || !apellido || !telefono || !email || !medioPago) {
      mensajeError.style.display = 'block';
    } else {
      mensajeError.style.display = 'none';
      Swal.fire({
        title: "Muchas Gracias Por Su Compra",
        text: "En breve le llegara el pedido..",
        imageUrl: "/logo/perro.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "imagen de agrado"
      });
      formularioCompra.style.display = 'none';
      localStorage.removeItem('carrito'); 
      listaCarrito.innerHTML = '';
      totalCarrito.textContent = '$0.00';
    }
  });
});
//Boton para volver a la tienda
document.getElementById('btnInicio').addEventListener('click', () => {
  window.location.href = '/index.html'; 
});