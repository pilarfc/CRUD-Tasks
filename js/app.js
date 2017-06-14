
var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}
            
var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
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


var plantillaBotones =  '<button><span class="glyphicon glyphicon-zoom-in"></span></button>' +
          '<button><span class="glyphicon glyphicon-pencil"></span></button>' +
          '<button><span class="glyphicon glyphicon-remove-circle"></span></button>'; 




$(document).ready(cargarPagina);











