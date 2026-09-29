/* =========================
   RECOMENDACIONES DE ALTHEA
   ========================= */


let opciones = document.querySelectorAll(".opciones a");


opciones.forEach(function(opcion) {

    opcion.addEventListener("click", function() {

        let eleccion = opcion.textContent.trim();

        console.log("El usuario eligió:", eleccion);


        let titulo =
            document.getElementById("titulo-recomendacion");

        let texto =
            document.getElementById("texto-recomendacion");

        let enlace =
            document.getElementById("enlace-recomendacion");


        /*
        Si estamos en libros.html,
        estos elementos no existen.
        Por eso comprobamos antes.
        */

        if (!titulo || !texto || !enlace) {
            return;
        }


        /* ENAMORARME */

        if (eleccion.includes("Enamorarme")) {

            titulo.textContent = "El principito";

            texto.textContent =
                "Una historia sobre el amor, los vínculos y aquello que hace especial a una persona.";

            enlace.href = "Principito.html";

        }


        /* SENTIR MIEDO */

        else if (eleccion.includes("Sentir miedo")) {

            titulo.textContent = "La Divina Comedia";

            texto.textContent =
                "Un viaje oscuro y extraordinario a través del infierno, el purgatorio y el paraíso.";

            enlace.href = "Divina.html";

        }


        /* QUEDAR PENSANDO */

        else if (eleccion.includes("Quedar pensando")) {

            titulo.textContent = "Cien años de soledad";

            texto.textContent =
                "Una historia de generaciones, recuerdos y destinos que parecen repetirse.";

            enlace.href = "cien-años.html";

        }


        /* VIVIR UNA AVENTURA */

        else if (eleccion.includes("Vivir una aventura")) {

            titulo.textContent =
                "Don Quijote de la Mancha";

            texto.textContent =
                "Una aventura inolvidable entre imaginación, viajes, ideales y gigantes.";

            enlace.href = "Quijote.html";

        }


        /* SORPRÉNDEME */

        else if (eleccion.includes("Sorpréndeme")) {

            let libros = [

                ["El principito", "Principito.html"],

                ["Cien años de soledad", "cien-años.html"],

                ["Don Quijote de la Mancha", "Quijote.html"],

                ["La Divina Comedia", "Divina.html"]

            ];


            let libro =
                libros[
                    Math.floor(
                        Math.random() * libros.length
                    )
                ];


            titulo.textContent = libro[0];

            texto.textContent =
                "No sabemos qué historia esperabas encontrar. Precisamente por eso la elegimos para ti.";

            enlace.href = libro[1];

        }

    });

});



/* =========================
   BUSCADOR DE ALTHEA
   ========================= */


let buscador =
    document.getElementById("buscar-libro");


let librosCatalogo =
    document.querySelectorAll(".libro");



if (buscador) {


    buscador.addEventListener("input", function() {


        /*
        Convertimos la búsqueda a minúsculas
        y quitamos las tildes.

        Así:

        "Poesía" = "poesia"
        "García" = "garcia"
        */


        let busqueda =
            buscador.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();



        librosCatalogo.forEach(function(libro) {


            let informacion =
                libro.getAttribute("data-busqueda") || "";


            informacion =
                informacion
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");



            /*
            Si la búsqueda está vacía,
            mostramos todos los libros.
            */

            if (
                busqueda === "" ||
                informacion.includes(busqueda)
            ) {

                libro.style.display = "";

            }

            else {

                libro.style.display = "none";

            }

        });

    });

}