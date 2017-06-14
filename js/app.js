
var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  mostrarDetalles();
  eliminarFila(); 
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}
            
var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var id = tarea._id; 
//  console.log(id);
  // creamos la fila
  var $tr = $("<tr />");
  $tr.attr("data-id", id); 
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  // creamos la celda de los botones 
  var $botones = $("<td />"); 
  $botones.html(plantillaBotones);
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($botones);
  // agregamos filas a la tabla
  $tasksList.append($tr);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};


var plantillaBotones =  '<button data-toggle="modal" data-target=".bs-example-modal-sm" class="boton-mostrar"><span class="glyphicon glyphicon-zoom-in"></span></button>' +
          '<button><span class="glyphicon glyphicon-pencil"></span></button>' +
          '<button class="borrar"><span class="glyphicon glyphicon-remove-circle"></span></button>'; 



 
// sección botones 

  // mostrar detalles
 var mostrarDetalles = function () {
     var informacion = $(this).closest("tr").data("id"); 
    
  $.getJSON(api.url + informacion , function (textos) {
      var nombre = textos.name;
      var estado = textos.status[0];
      var id = textos._id; 
      var creacion = textos.created_at; 
  });
//    $("#inf-adicional").text("id:" + creado);
 }
 
 
 
 
  
  // eliminar fila sin borrar de la API --> no es lo correcto. 

  var eliminarFila = function () {
      $(document).on("click", ".borrar", function () {
          $(this).closest("tr").remove();  
      }); 
  }
  
 
  
  
  // plantiilla modal mostrar
  
  
/*  var modalMostrar = '<div class="modal fade bs-example-modal-sm"   tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">' +
      '<div class="modal-dialog modal-sm" role="document">' +
        '<div class="modal-content" id="inf-adicional">' +
          '__contenido__' 
        '</div>' +
      '</div>' +
    '</div>';*/




$(document).ready(cargarPagina);











