// Calculadora
var number1Input = document.getElementById("number1");
var number2Input = document.getElementById("number2");
var resultadoInput = document.getElementById("resultado");
if (!number1Input || !number2Input || !resultadoInput) {
    throw new Error("Los elementos de entrada no se encontraron en el DOM.");
}
number1Input.value = "0";
number2Input.value = "0";
resultadoInput.value = "0";
var sumarButton = document.getElementById("sumar");
var restarButton = document.getElementById("restar");
var multiplicarButton = document.getElementById("multiplicar");
var dividirButton = document.getElementById("dividir");
if (!sumarButton || !restarButton || !multiplicarButton || !dividirButton) {
    throw new Error("Uno o más botones no se encontraron en el DOM.");
}
sumarButton.addEventListener("click", function () {
    var result = parseFloat(number1Input.value) + parseFloat(number2Input.value);
    resultadoInput.value = result.toString();
});
restarButton.addEventListener("click", function () {
    var result = parseFloat(number1Input.value) - parseFloat(number2Input.value);
    resultadoInput.value = result.toString();
});
multiplicarButton.addEventListener("click", function () {
    var result = parseFloat(number1Input.value) * parseFloat(number2Input.value);
    resultadoInput.value = result.toString();
});
dividirButton.addEventListener("click", function () {
    var result = parseFloat(number1Input.value) / parseFloat(number2Input.value);
    resultadoInput.value = result.toString();
});
// Fondo de estrellas
var sky = document.getElementById("sky");
var numStars = 125;
if (sky) {
    for (var i = 0; i < numStars; i++) {
        var star = document.createElement("div");
        star.className = "star";
        star.style.left = "".concat(Math.random() * window.innerWidth, "px");
        star.style.top = "".concat(Math.random() * window.innerHeight, "px");
        sky.appendChild(star);
    }
}
// Lista de cualidades
var lista = document.querySelector("ul");
if (lista) {
    var items = lista.querySelectorAll("li");
    items.forEach(function (item, index) {
        alert("Cualidad ".concat(index + 1, ": ").concat(item.textContent));
    });
}
// To Do List
function agregarTareaKanban(event) {
    event.preventDefault();
    var input = document.getElementById("nueva-tarea");
    var descripcion = document.getElementById("descripcion-tarea");
    if (!input || !descripcion)
        return;
    var textoTarea = input.value.trim();
    var textoDescripcion = descripcion.value.trim();
    if (textoTarea === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }
    var tarea = document.createElement("div");
    tarea.className = "kanban-tarea pendiente";
    tarea.draggable = true;
    tarea.innerHTML = "<strong>".concat(textoTarea, "</strong><br><span>").concat(textoDescripcion, "</span>");
    tarea.addEventListener("dragstart", function (e) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("kanban-tarea", tarea.outerHTML);
            setTimeout(function () { return (tarea.style.display = "none"); }, 0);
        }
    });
    tarea.addEventListener("dragend", function () {
        tarea.style.display = "";
    });
    var pendientes = document.getElementById("pendientes");
    if (!pendientes) {
        throw new Error("El contenedor de pendientes no se encontró en el DOM.");
    }
    pendientes.appendChild(tarea);
    input.value = "";
    descripcion.value = "";
}
// Drag & Drop
function allowDrop(ev) {
    ev.preventDefault();
}
function drop(ev) {
    var _a;
    ev.preventDefault();
    var data = (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("kanban-tarea");
    if (!data)
        return;
    var allTareas = document.querySelectorAll(".kanban-tarea");
    var tareaOriginal = null;
    for (var _i = 0, allTareas_1 = allTareas; _i < allTareas_1.length; _i++) {
        var tarea_1 = allTareas_1[_i];
        if (tarea_1.style.display === "none") {
            tareaOriginal = tarea_1;
            break;
        }
    }
    if (tareaOriginal === null || tareaOriginal === void 0 ? void 0 : tareaOriginal.parentNode) {
        tareaOriginal.parentNode.removeChild(tareaOriginal);
    }
    var temp = document.createElement("div");
    temp.innerHTML = data;
    var tarea = temp.firstChild;
    if (tarea) {
        tarea.addEventListener("dragstart", function (e) {
            if (e.dataTransfer) {
                e.dataTransfer.setData("kanban-tarea", tarea.outerHTML);
                setTimeout(function () { return (tarea.style.display = "none"); }, 0);
            }
        });
        tarea.addEventListener("dragend", function () {
            tarea.style.display = "";
        });
        tarea.classList.remove("pendiente", "progreso", "completado");
        var target = ev.currentTarget;
        if (target.id === "pendientes") {
            tarea.classList.add("pendiente");
        }
        else if (target.id === "en-proceso") {
            tarea.classList.add("progreso");
        }
        else if (target.id === "completadas") {
            tarea.classList.add("completado");
        }
        target.appendChild(tarea);
    }
}
