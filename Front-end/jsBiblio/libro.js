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
                var celdaGenero = document.createElement("td");
                var celdaIsbn = document.createElement("td");
                var celdanumEjemdisponibles = document.createElement("td");
                var celdanumEjemocupados = document.createElement("td");
                var celdaAcciones = document.createElement("td");

                // Asignar valores a las celdas
                celdaId.innerText = libro.id;  // Asegúrate de que el campo id sea correcto
                celdaTitulo.innerText = libro.titulo;
                celdaAutor.innerText = libro.autor;
                celdaGenero.innerText = libro.genero;
                celdaIsbn.innerText = libro.isbn;
                celdanumEjemdisponibles.innerText = libro.numEjemdisponibles;  // Asegúrate de que el campo sea correcto
                celdanumEjemocupados.innerText = libro.numEjemocupados;  // Asegúrate de que el campo sea correcto

                // Crear botones de acción
                var botonActualizarLibro = document.createElement("button");
                botonActualizarLibro.innerText = "Actualizar";
                botonActualizarLibro.className = "btn btn-warning actualizar_Libro";
                botonActualizarLibro.onclick = function () {
                    $('#modalLibro').modal('show');
                    consultarLibroID(libro.id);  // Asegúrate de que estás pasando el ID correcto
                };

                var botonEliminar = document.createElement("button");
                botonEliminar.innerText = "Eliminar";
                botonEliminar.className = "btn btn-danger eliminar";
                botonEliminar.onclick = function () {
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "¡No podrás revertir esto!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, eliminarlo'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarLibro(libro.id);  // Asegúrate de que estás pasando el ID correcto
                        }
                    });
                };

                var botonDetalles = document.createElement("button");
                botonDetalles.innerText = "Detalles";
                botonDetalles.className = "btn btn-primary detalles_libro";
                botonDetalles.onclick = function () {
                    mostrarDetallesLibro(libro);
                };

                // Contenedor para los botones
                var divBotones = document.createElement("div");
                divBotones.className = "btn-group";
                divBotones.appendChild(botonActualizarLibro);
                divBotones.appendChild(botonEliminar);
                divBotones.appendChild(botonDetalles);

                // Añadir el contenedor de botones a la celda de acciones
                celdaAcciones.appendChild(divBotones);

                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTitulo);
                trRegistro.appendChild(celdaAutor);
                trRegistro.appendChild(celdaGenero);
                trRegistro.appendChild(celdaIsbn);
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
