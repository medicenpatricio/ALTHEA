let opciones = document.querySelectorAll(".opciones a");

opciones.forEach(function(opcion) {

    opcion.addEventListener("click", function() {

        let eleccion = opcion.textContent.trim();

        console.log("El usuario eligió:", eleccion);

        let titulo = document.getElementById("titulo-recomendacion");
        let texto = document.getElementById("texto-recomendacion");
        let enlace = document.getElementById("enlace-recomendacion");

        if (eleccion.includes("Enamorarme")) {

            titulo.textContent = "El principito";
            texto.textContent =
                "Una historia sobre el amor, los vínculos y aquello que hace especial a una persona.";
            enlace.href = "Principito.html";

        } else if (eleccion.includes("Sentir miedo")) {

            titulo.textContent = "La Divina Comedia";
            texto.textContent =
                "Un viaje oscuro y extraordinario a través del infierno, el purgatorio y el paraíso.";
            enlace.href = "Divina.html";

        } else if (eleccion.includes("Quedar pensando")) {

            titulo.textContent = "Cien años de soledad";
            texto.textContent =
                "Una historia de generaciones, recuerdos y destinos que parecen repetirse.";
            enlace.href = "cien-años.html";

        } else if (eleccion.includes("Vivir una aventura")) {

            titulo.textContent = "Don Quijote de la Mancha";
            texto.textContent =
                "Una aventura inolvidable entre imaginación, viajes, ideales y gigantes.";
            enlace.href = "Quijote.html";

        } else if (eleccion.includes("Sorpréndeme")) {

            let libros = [
                ["El principito", "Principito.html"],
                ["Cien años de soledad", "cien-años.html"],
                ["Don Quijote de la Mancha", "Quijote.html"],
                ["La Divina Comedia", "Divina.html"]
            ];

            let libro = libros[Math.floor(Math.random() * libros.length)];

            titulo.textContent = libro[0];
            texto.textContent =
                "No sabemos qué historia esperabas encontrar. Precisamente por eso la elegimos para ti.";
            enlace.href = libro[1];
        }

    });

});

/* =========================
   BUSCADOR DE LIBROS
   ========================= */

const buscador = document.getElementById("buscarLibro");
const libros = document.querySelectorAll(".libro");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");

if (buscador) {

    buscador.addEventListener("input", function() {

        const busqueda = buscador.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        let encontrados = 0;

        libros.forEach(function(libro) {

            const titulo = libro.querySelector("h2").textContent
                .toLowerCase();

            const autor = libro.querySelector(".autor").textContent
                .toLowerCase();

            const genero = libro.querySelector(".genero").textContent
                .toLowerCase();

            const informacion =
                `${titulo} ${autor} ${genero}`
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            if (informacion.includes(busqueda)) {

                libro.style.display = "";

                encontrados++;

            } else {

                libro.style.display = "none";

            }

        });

        if (busqueda === "") {

            mensajeBusqueda.textContent = "";

        } else if (encontrados === 0) {

            mensajeBusqueda.textContent =
                "No encontramos esa historia.";

        } else if (encontrados === 1) {

            mensajeBusqueda.textContent =
                "1 historia encontrada.";

        } else {

            mensajeBusqueda.textContent =
                encontrados + " historias encontradas.";

        }

    });

}

/* =========================
   CARRITO DE COMPRAS
   ========================= */

const botonesComprar = document.querySelectorAll(".comprar");

botonesComprar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const libro = {
            id: boton.dataset.id,
            titulo: boton.dataset.titulo,
            precio: Number(boton.dataset.precio),
            imagen: boton.dataset.imagen,
            cantidad: 1
        };

let carrito = JSON.parse(localStorage.getItem("carritoALTHEA")) || [];

const libroExistente = carrito.find(function(item) {
return item.id === libro.id;
});

if (libroExistente) {
libroExistente.cantidad++;
} else {
carrito.push(libro);
}

localStorage.setItem("carritoALTHEA", JSON.stringify(carrito));

// Actualizar el carrito solo si sus elementos existen en esta página
if (listaCarritoFlotante && totalCarritoFlotante) {
mostrarCarrito();
}

mostrarAviso("Tu libro se guardo en el carrito.");

function mostrarAviso(mensaje) {

    const aviso = document.createElement("div");

    aviso.className = "aviso-althea";

    aviso.textContent = "✓ " + mensaje;

    document.body.appendChild(aviso);

    setTimeout(function() {
        aviso.classList.add("mostrar");
    }, 10);

    setTimeout(function() {
        aviso.classList.remove("mostrar");

        setTimeout(function() {
            aviso.remove();
        }, 400);

    }, 2500);
}
        

    });

});

/* =========================
   CARRITO FLOTANTE
   ========================= */

const abrirCarrito = document.getElementById("abrirCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const listaCarritoFlotante = document.getElementById("listaCarritoFlotante");
const totalCarritoFlotante = document.getElementById("totalCarritoFlotante");


/* MOSTRAR CARRITO */

function mostrarCarrito() {

    let carrito =
        JSON.parse(localStorage.getItem("carritoALTHEA")) || [];

    listaCarritoFlotante.innerHTML = "";

    if (carrito.length === 0) {

        listaCarritoFlotante.innerHTML =
            "<p>Tu carrito está vacío.</p>";

        totalCarritoFlotante.textContent = "$0";

        return;
    }

    let total = 0;

    carrito.forEach(function(libro) {

        total += libro.precio * libro.cantidad;

        const elemento = document.createElement("div");

        elemento.className = "producto-carrito";

        elemento.innerHTML = `
            <div>
                <strong>${libro.titulo}</strong>
                <p>$${libro.precio.toLocaleString("es-CO")}</p>
            </div>

            <div class="controles-cantidad">

                <button class="menos" data-id="${libro.id}">
                    −
                </button>

                <span>${libro.cantidad}</span>

                <button class="mas" data-id="${libro.id}">
                    +
                </button>

            </div>
        `;

        listaCarritoFlotante.appendChild(elemento);

    });

    totalCarritoFlotante.textContent =
        "$" + total.toLocaleString("es-CO");
}


/* ABRIR CARRITO */

if (abrirCarrito && ventanaCarrito) {

    abrirCarrito.addEventListener("click", function(event) {

        event.preventDefault();

        mostrarCarrito();

        ventanaCarrito.style.display = "block";

    });

}


/* CERRAR CARRITO */

if (cerrarCarrito && ventanaCarrito) {

    cerrarCarrito.addEventListener("click", function() {

        ventanaCarrito.style.display = "none";

    });

}


/* AUMENTAR O DISMINUIR CANTIDAD */

if (listaCarritoFlotante) {

    listaCarritoFlotante.addEventListener("click", function(event) {

        const boton = event.target;

        if (
            !boton.classList.contains("mas") &&
            !boton.classList.contains("menos")
        ) {
            return;
        }

        const id = boton.dataset.id;

        let carrito =
            JSON.parse(localStorage.getItem("carritoALTHEA")) || [];

        const libro = carrito.find(function(item) {

            return item.id === id;

        });

        if (!libro) {
            return;
        }


        if (boton.classList.contains("mas")) {

            libro.cantidad++;

        }


        if (boton.classList.contains("menos")) {

            libro.cantidad--;

            if (libro.cantidad <= 0) {

                carrito = carrito.filter(function(item) {

                    return item.id !== id;

                });

            }

        }


        localStorage.setItem("carritoALTHEA", JSON.stringify(carrito));

mostrarCarrito();

ventanaCarrito.style.display = "block";


    });

}

/* =========================
   CARRITO MOVIBLE
   ========================= */

const cabeceraCarrito =
    document.querySelector(".cabecera-carrito");

let moviendo = false;
let posicionX = 0;
let posicionY = 0;

if (cabeceraCarrito && ventanaCarrito) {

    cabeceraCarrito.addEventListener("mousedown", function(event) {

        moviendo = true;

        posicionX =
            event.clientX - ventanaCarrito.offsetLeft;

        posicionY =
            event.clientY - ventanaCarrito.offsetTop;

    });

    document.addEventListener("mousemove", function(event) {

        if (!moviendo) {
            return;
        }

        ventanaCarrito.style.left =
            (event.clientX - posicionX) + "px";

        ventanaCarrito.style.top =
            (event.clientY - posicionY) + "px";

        ventanaCarrito.style.right = "auto";

    });

    document.addEventListener("mouseup", function() {

        moviendo = false;

    });

}

/* =========================
   PROCESAR COMPRA
   ========================= */

   /* IR A LA PÁGINA DE COMPRA */

const finalizarCompraFlotante =
    document.getElementById("finalizarCompraFlotante");

if (finalizarCompraFlotante) {
    finalizarCompraFlotante.addEventListener("click", function() {
        window.location.href = "carrito.html";
    });
}

const finalizarCompra =
    document.getElementById("finalizarCompra");

const formularioCompra =
    document.getElementById("formularioCompra");

    console.log("Botón:", finalizarCompra);
console.log("Formulario:", formularioCompra);

if (finalizarCompra && formularioCompra) {

    finalizarCompra.addEventListener("click", function() {

        const carrito =
            JSON.parse(localStorage.getItem("carritoALTHEA")) || [];

        if (carrito.length === 0) {

            alert("Tu carrito está vacío.");
            return;

        }

        formularioCompra.style.display = "block";

        formularioCompra.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}

/* =========================
   MOSTRAR CARRITO EN carrito.html
   ========================= */

function mostrarCarritoPagina() {

    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    // Si no estamos en carrito.html, no hacemos nada
    if (!listaCarrito || !totalCarrito) {
        return;
    }

    const carrito =
        JSON.parse(localStorage.getItem("carritoALTHEA")) || [];

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            '<p class="carrito-vacio">Tu carrito está vacío.</p>';

        totalCarrito.textContent = "$0";

        return;
    }

    let total = 0;

    carrito.forEach(function(libro) {

        const subtotal = libro.precio * libro.cantidad;

        total += subtotal;

        const producto = document.createElement("div");

        producto.className = "producto-pagina";

        producto.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p>Precio: $${libro.precio.toLocaleString("es-CO")}</p>
            <p>Cantidad: ${libro.cantidad}</p>
            <p>Subtotal: $${subtotal.toLocaleString("es-CO")}</p>
        `;

        listaCarrito.appendChild(producto);
    });

    totalCarrito.textContent =
        "$" + total.toLocaleString("es-CO");
}

mostrarCarritoPagina();

/* =========================
NAVEGACIÓN EXPERIENCIA ALTHEA
========================= */

const seccionesExperiencia = document.querySelectorAll(
".experiencia .pregunta"
);

if (seccionesExperiencia.length > 0) {

document.querySelectorAll(
    ".experiencia .opciones a"
).forEach(function(enlace) {

    enlace.addEventListener("click", function(event) {

        const destino = enlace.getAttribute("href");

        // Los enlaces a otras páginas funcionan normalmente
        if (!destino || !destino.startsWith("#")) {
            return;
        }

        const siguiente = document.querySelector(destino);

        // Comprobar que el destino exista
        if (!siguiente || !siguiente.classList.contains("pregunta")) {
            return;
        }

        event.preventDefault();

        // Ocultar todas las preguntas
        seccionesExperiencia.forEach(function(seccion) {
            seccion.classList.remove("activa");
        });

        // Mostrar únicamente la pregunta seleccionada
        siguiente.classList.add("activa");

    });

});

}
