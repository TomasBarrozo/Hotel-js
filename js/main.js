
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

    // Configuración de swipers utilizados
    //inicio swiper

var swiper = new Swiper(".inicio-slider", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

    // swiper de habitaciones

var swiper = new Swiper(".habitaciones-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});

    //swiper de galeria

var swiper = new Swiper(".galeria-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
    },
});

    //swiper de reseñas

var swiper = new Swiper(".reseñas-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

    // configuración acordeon

let acordeones = document.querySelectorAll('.faqs .row .content .box');

acordeones.forEach(acco =>{
    acco.onclick = () =>{
        acordeones.forEach(subAcco => {subAcco.classList.remove('active')});
        acco.classList.add('active');
    }})





document.addEventListener("DOMContentLoaded", () => {
    let productos = [];
    let carritoProductos = [];
    
    // Recuperar el carrito almacenado en localStorage al cargar 
    const carritoLocalStorage = localStorage.getItem('carrito');
    if (carritoLocalStorage) {
        carritoProductos = JSON.parse(carritoLocalStorage);
    }
    
    // Obtener los productos desde "productos.json"
    fetch("js/productos.json")
        .then((response) => response.json())
        .then((data) => {
            productos = data; 
    
            const botonesReservar = document.querySelectorAll(".btn[data-room-id]");
    
            botonesReservar.forEach((boton) => {
                boton.addEventListener("click", (event) => {
                    event.preventDefault();
                    const roomId = event.target.getAttribute("data-room-id");
                    const productoSeleccionado = productos.find((producto) => producto.id === roomId);
    
                    if (productoSeleccionado) {
                        carritoProductos.push(productoSeleccionado);
                        actualizarVistaCarrito();
    // Guardar el carrito actualizado en localStorage
                        localStorage.setItem('carrito', JSON.stringify(carritoProductos));
                    }
                });
            });
    
    // Llama a la función para mostrar el carrito inicialmente
            actualizarVistaCarrito();
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
        });
    
    const botonCarrito = document.getElementById("boton-carrito");
    const vistaCarrito = document.getElementById("vista-carrito");
    const productosCarrito = document.getElementById("productos-carrito");
    const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
    
    // Mostrar carrito al hacer clic 
    botonCarrito.addEventListener("click", () => {
        vistaCarrito.style.display = "block";
    
    // Verificar si hay productos en el carrito
        if (carritoProductos.length > 0) {
            productosCarrito.style.display = "block";
        } else {
            productosCarrito.style.display = "none";
        }
    });
    
    // Cerrar carrito al hacer clic en el botón de cerrar
    cerrarCarritoBtn.addEventListener("click", () => {
        vistaCarrito.style.display = "none";
    });
    
    function actualizarVistaCarrito() {
        const listaCarrito = document.getElementById("productos-carrito");
        listaCarrito.innerHTML = ""; // Limpia la lista antes de actualizar
    
        carritoProductos.forEach((producto) => {
            const itemCarrito = document.createElement("li");
            itemCarrito.innerHTML = `
                <span>${producto.titulo}</span>
                <span>${producto.precio}$</span>
                <button class="btn-eliminar" data-producto-id="${producto.id}">Eliminar</button>
            `;
            listaCarrito.appendChild(itemCarrito);
        });
    
    // Actualiza el número de productos en el carrito
        const numeritoCarrito = document.querySelector(".numerito");
        numeritoCarrito.textContent = carritoProductos.length;
    
    // Muestra u oculta el mensaje de carrito vacío
        if (carritoProductos.length === 0) {
            productosCarrito.style.display = "none";
        } else {
            productosCarrito.style.display = "block";
        }
    
    // Agregar un evento para eliminar productos del carrito
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (event) => {
                const productoId = event.target.getAttribute("data-producto-id");
                const indiceProducto = carritoProductos.findIndex((producto) => producto.id === productoId);
                if (indiceProducto !== -1) {
                    carritoProductos.splice(indiceProducto, 1);
                    actualizarVistaCarrito();
    
    // Actualizar el carrito en localStorage al eliminar un producto
                    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
                }
            });
        });
    }
});

