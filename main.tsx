let resultado = 0;

// Calculadora
const number1Input = document.getElementById("number1") as HTMLInputElement | null;
const number2Input = document.getElementById("number2") as HTMLInputElement | null;
const resultadoInput = document.getElementById("resultado") as HTMLInputElement | null;

if (!number1Input || !number2Input || !resultadoInput) {
  throw new Error("Los elementos de entrada no se encontraron en el DOM.");
}

number1Input.value = "0";
number2Input.value = "0";
resultadoInput.value = "0";

const sumarButton = document.getElementById("sumar") as HTMLButtonElement | null;
const restarButton = document.getElementById("restar") as HTMLButtonElement | null;
const multiplicarButton = document.getElementById("multiplicar") as HTMLButtonElement | null;
const dividirButton = document.getElementById("dividir") as HTMLButtonElement | null;

if (!sumarButton || !restarButton || !multiplicarButton || !dividirButton) {
  throw new Error("Uno o más botones no se encontraron en el DOM.");
}

sumarButton.addEventListener("click", () => {
  const result = parseFloat(number1Input.value) + parseFloat(number2Input.value);
  resultadoInput.value = result.toString();
});

restarButton.addEventListener("click", () => {
  const result = parseFloat(number1Input.value) - parseFloat(number2Input.value);
  resultadoInput.value = result.toString();
});

multiplicarButton.addEventListener("click", () => {
  const result = parseFloat(number1Input.value) * parseFloat(number2Input.value);
  resultadoInput.value = result.toString();
});

dividirButton.addEventListener("click", () => {
  const result = parseFloat(number1Input.value) / parseFloat(number2Input.value);
  resultadoInput.value = result.toString();
});

function restar() {
  const number1Input = (document.getElementById("number1") as HTMLInputElement).value.trim();
  const number2Input = (document.getElementById("number2") as HTMLInputElement).value.trim();
  const result = parseFloat(number1Input) - parseFloat(number2Input);
  resultado = result;
}
// Fondo de estrellas
const sky = document.getElementById("sky") as HTMLElement | null;
const numStars = 125;

if (sky) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    sky.appendChild(star);
  }
}

// Lista de cualidades
const lista = document.querySelector("ul") as HTMLUListElement | null;
if (lista) {
  const items = lista.querySelectorAll("li") as NodeListOf<HTMLLIElement>;
  items.forEach((item, index) => {
    alert(`Cualidad ${index + 1}: ${item.textContent}`);
  });
}

// To Do List
function agregarTareaKanban(event: MouseEvent): void {
  event.preventDefault();

  const input = document.getElementById("nueva-tarea") as HTMLInputElement | null;
  const descripcion = document.getElementById("descripcion-tarea") as HTMLTextAreaElement | null;

  if (!input || !descripcion) return;

  const textoTarea = input.value.trim();
  const textoDescripcion = descripcion.value.trim();

  if (textoTarea === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  const tarea = document.createElement("div");
  tarea.className = "kanban-tarea pendiente";
  tarea.draggable = true;
  tarea.innerHTML = `<strong>${textoTarea}</strong><br><span>${textoDescripcion}</span>`;

  tarea.addEventListener("dragstart", (e: DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("kanban-tarea", tarea.outerHTML);
      setTimeout(() => (tarea.style.display = "none"), 0);
    }
  });

  tarea.addEventListener("dragend", () => {
    tarea.style.display = "";
  });

  const pendientes = document.getElementById("pendientes");
  if (!pendientes) {
    throw new Error("El contenedor de pendientes no se encontró en el DOM.");
  }

  pendientes.appendChild(tarea);
  input.value = "";
  descripcion.value = "";
}

// Drag & Drop
function allowDrop(ev: DragEvent): void {
  ev.preventDefault();
}

function drop(ev: DragEvent): void {
  ev.preventDefault();
  const data = ev.dataTransfer?.getData("kanban-tarea");

  if (!data) return;
  const allTareas: Array<HTMLElement> = [];
  const tareas = document.querySelectorAll<HTMLElement>(".kanban-tarea");
  for (const tarea of tareas) {
    allTareas.push(tarea);
  }
  let tareaOriginal: HTMLElement | null = null;

  for (const tarea of allTareas) {
    if (tarea.style.display === "none") {
      tareaOriginal = tarea;
      break;
    }
  }

  if (tareaOriginal?.parentNode) {
    tareaOriginal.parentNode.removeChild(tareaOriginal);
  }

  const temp = document.createElement("div");
  temp.innerHTML = data;
  const tarea = temp.firstChild as HTMLElement;

  if (tarea) {
    tarea.addEventListener("dragstart", (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData("kanban-tarea", tarea.outerHTML);
        setTimeout(() => (tarea.style.display = "none"), 0);
      }
    });

    tarea.addEventListener("dragend", () => {
      tarea.style.display = "";
    });

    tarea.classList.remove("pendiente", "progreso", "completado");

    const target = ev.currentTarget as HTMLElement;
    if (target.id === "pendientes") {
      tarea.classList.add("pendiente");
    } else if (target.id === "en-proceso") {
      tarea.classList.add("progreso");
    } else if (target.id === "completadas") {
      tarea.classList.add("completado");
    }

    target.appendChild(tarea);
  }
}
(window as any).restar = restar;
