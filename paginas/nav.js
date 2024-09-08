document.addEventListener('DOMContentLoaded', () => {
    // Event listeners para los botones de navegación
    document.getElementById('btnInicio').addEventListener('click', () => {
      window.location.href = '/index.html'; 
    });
  
    document.getElementById('btnProductos').addEventListener('click', () => {
      window.location.href = '/productos.html';   
    });
  
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    if (scrollLeftBtn) {
      scrollLeftBtn.addEventListener('click', () => {
        window.location.href = '/productos.html'; 
      });
    }
  });  