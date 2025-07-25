//calculadora
const number1Input = document.getElementById("number1");
const number2Input = document.getElementById("number2");
const resultadoInput = document.getElementById("resultado");

document.getElementById("sumar").addEventListener("click", function () {
  const result = parseFloat(number1Input.value) + parseFloat(number2Input.value);
  resultadoInput.value = result;
});

document.getElementById("restar").addEventListener("click", function () {
  const result = parseFloat(number1Input.value) - parseFloat(number2Input.value);
  resultadoInput.value = result;
});

document.getElementById("multiplicar").addEventListener("click", function () {
  const result = parseFloat(number1Input.value) * parseFloat(number2Input.value);
  resultadoInput.value = result;
});

document.getElementById("dividir").addEventListener("click", function () {
  const result = parseFloat(number1Input.value) / parseFloat(number2Input.value);
  resultadoInput.value = result;
});

//fondo de estrellas
const sky = document.getElementById('sky');
const numStars = 125;
for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  sky.appendChild(star);
}
//for para iterar sobre una lista de cualidades de Puky
const lista = document.querySelector('ul');
const items = lista.querySelectorAll('li');

for (let i = 0; i < items.length; i++) {
  alert(`cualidad ${i + 1}: ${items[i].textContent}`);
}
// To Do List

function agregarTareaKanban(event) {
  event.preventDefault();

  const input = document.getElementById("nueva-tarea");
  const descripcion = document.getElementById("descripcion-tarea");
  const textoTarea = input.value.trim();
  const textoDescripcion = descripcion.value.trim();

  if (textoTarea === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  // Crear la tarjeta de tarea
  const tarea = document.createElement("div");
  tarea.className = "kanban-tarea pendiente";
  tarea.draggable = true;
  tarea.innerHTML = `<strong>${textoTarea}</strong><br><span>${textoDescripcion}</span>`;

  // Eventos drag & drop
  tarea.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("kanban-tarea", tarea.outerHTML);
    setTimeout(() => tarea.style.display = "none", 0);
  });

  tarea.addEventListener("dragend", function () {
    tarea.style.display = "";
  });

  // Agregar la tarea a "pendientes"
  document.getElementById("pendientes").appendChild(tarea);

  // Limpiar inputs
  input.value = "";
  descripcion.value = "";
}

// Drag & Drop para columnas
function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("kanban-tarea");
  if (data) {
    // Buscar la tarea original que está oculta (display: none)
    const allTareas = document.querySelectorAll('.kanban-tarea');
    let tareaOriginal = null;
    for (let tarea of allTareas) {
      if (tarea.style.display === "none") {
        tareaOriginal = tarea;
        break;
      }
    }
    // Si la encontró, la elimina del DOM
    if (tareaOriginal) {
      tareaOriginal.parentNode.removeChild(tareaOriginal);
    }

    // Crear un nuevo elemento desde el HTML arrastrado
    const temp = document.createElement("div");
    temp.innerHTML = data;
    const tarea = temp.firstChild;

    // Volver a agregar los eventos drag & drop
    tarea.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", null);
      e.dataTransfer.setData("kanban-tarea", tarea.outerHTML);
      setTimeout(() => tarea.style.display = "none", 0);
    });
    tarea.addEventListener("dragend", function () {
      tarea.style.display = "";
    });

    // Cambiar color según la columna
    tarea.classList.remove("pendiente", "progreso", "completado");
    if (ev.currentTarget.id === "pendientes") {
      tarea.classList.add("pendiente");
    } else if (ev.currentTarget.id === "en-proceso") {
      tarea.classList.add("progreso");
    } else if (ev.currentTarget.id === "completadas") {
      tarea.classList.add("completado");
    }
    ev.currentTarget.appendChild(tarea);
  }
}