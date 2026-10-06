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

        alert("Libro agregado al carrito.");

    });

});