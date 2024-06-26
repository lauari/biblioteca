var url = "http://localhost:8080/api/v1/libro/";


// Función para listar los libros
// Función para listar los libros
function listaLibro() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            console.log(result);
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            result.forEach(function (libro) {
                var trRegistro = document.createElement("tr");

                // Crear celdas y añadir los datos
                var celdaId = document.createElement("td");
                var celdaTitulo = document.createElement("td");
                var celdaAutor = document.createElement("td");
                var celdaIsbn = document.createElement("td");
                var celdaGenero = document.createElement("td");
                var celdanumEjemdisponibles = document.createElement("td");
                var celdanumEjemocupados = document.createElement("td");
                var celdaAcciones = document.createElement("td");

                // Asignar valores a las celdas
                celdaId.innerText = libro.idLibro;  // Asegúrate de que el campo id sea correcto
                celdaTitulo.innerText = libro.titulo;
                celdaAutor.innerText = libro.autor;
                celdaIsbn.innerText = libro.isbn;
                celdaGenero.innerText = libro.genero;
                celdanumEjemdisponibles.innerText = libro.numEjemdisponibles;  // Asegúrate de que el campo sea correcto
                celdanumEjemocupados.innerText = libro.numEjemocupados;  // Asegúrate de que el campo sea correcto



                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTitulo);
                trRegistro.appendChild(celdaAutor);
                trRegistro.appendChild(celdaIsbn);
                trRegistro.appendChild(celdaGenero);
                trRegistro.appendChild(celdanumEjemdisponibles);
                trRegistro.appendChild(celdanumEjemocupados);
                trRegistro.appendChild(celdaAcciones);

                // Añadir el registro a la tabla
                cuerpoTabla.appendChild(trRegistro);
            });
        },
        error: function (error) {
            console.error("Error en la petición:", error);
            alert("Error en la petición: " + error.statusText);
        }
    });
}


// Función para agregar un libro
function agregarLibro() {
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let genero = document.getElementById("genero").value;
    let ISBN = document.getElementById("ISBN").value;
    let numEjemdisponibles = document.getElementById("numEjemdisponibles").value;
    let numEjemocupados = document.getElementById("numEjemocupados").value;

    // Datos del formulario
    let formData = {
        "titulo": titulo,
        "autor": autor,
        "genero": genero,
        "ISBN": ISBN,
        "numEjemdisponibles": numEjemdisponibles,
        "numEjemocupados": numEjemocupados
    };

    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Se guardó correctamente",
                icon: "success"
            });
            limpiarFormulario();
        },
        error: function (error) {
            Swal.fire({
                title: "Error",
                text: "Error al guardar el libro",
                icon: "error"
            });
        }
    });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ISBN").value = "";
    document.getElementById("numEjemdisponibles").value = "";
    document.getElementById("numEjemocupados").value = "";
}






