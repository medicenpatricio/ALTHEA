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
            enlace.href = "principito.html";

        } else if (eleccion.includes("Sentir miedo")) {

            titulo.textContent = "La Divina Comedia";
            texto.textContent =
                "Un viaje oscuro y extraordinario a través del infierno, el purgatorio y el paraíso.";
            enlace.href = "divina.html";

        } else if (eleccion.includes("Quedar pensando")) {

            titulo.textContent = "Cien años de soledad";
            texto.textContent =
                "Una historia de generaciones, recuerdos y destinos que parecen repetirse.";
            enlace.href = "cien-anos.html";

        } else if (eleccion.includes("Vivir una aventura")) {

            titulo.textContent = "Don Quijote de la Mancha";
            texto.textContent =
                "Una aventura inolvidable entre imaginación, viajes, ideales y gigantes.";
            enlace.href = "quijote.html";

        } else if (eleccion.includes("Sorpréndeme")) {

            let libros = [
                ["El principito", "principito.html"],
                ["Cien años de soledad", "cien-anos.html"],
                ["Don Quijote de la Mancha", "quijote.html"],
                ["La Divina Comedia", "divina.html"]
            ];

            let libro = libros[Math.floor(Math.random() * libros.length)];

            titulo.textContent = libro[0];
            texto.textContent =
                "No sabemos qué historia esperabas encontrar. Precisamente por eso la elegimos para ti.";
            enlace.href = libro[1];
        }

    });

});