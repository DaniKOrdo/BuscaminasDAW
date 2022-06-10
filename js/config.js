let anchura = document.getElementById("anchura");
let altura = document.getElementById("altura");
let minas = document.getElementById("minas");
let tema = document.getElementById("tema");
let temporizador = document.getElementById("temporizador");
let guardar = document.getElementById("guardar");

// Si están guardadas en localStorage que salga en el value
window.addEventListener("load", function (event) {
  if (localStorage.getItem("anchura") !== null) {
    anchura.value = localStorage.getItem("anchura");
  }
  if (localStorage.getItem("altura") !== null) {
    altura.value = localStorage.getItem("altura");
  }
  if (localStorage.getItem("minas") !== null) {
    minas.value = localStorage.getItem("minas");
  }
  if (localStorage.getItem("tema") !== null) {
    tema.value = localStorage.getItem("tema");
  }
  if (localStorage.getItem("temporizador") !== null) {
    if (localStorage.getItem("temporizador") == "true") {
      emporizador.checked = true;
    } else {
      temporizador.checked = false;
    }
  }
});

// Funcion guardar
guardar.addEventListener("click", function saveLocalStorage() {
  console.log(temporizador.checked);
  localStorage.setItem("anchura", anchura.value);
  localStorage.setItem("altura", altura.value);
  localStorage.setItem("minas", minas.value);
  localStorage.setItem("tema", tema.value);
  localStorage.setItem("temporizador", temporizador.checked);
  console.log(localStorage.getItem("temporizador"));

  document.getElementById("saveMessage").classList.remove("hide-message");
  document.getElementById("saveMessage").style.visibility = "visible";

  setTimeout(function () {
    document.getElementById("saveMessage").classList.add("hide-message");
  }, 1000);
});

// Funciones de los botones MAS y MENOS
let moreAnchura = document.getElementById("moreAnchura");
moreAnchura.addEventListener("click", moreAnchuraFunc);
function moreAnchuraFunc() {
  if (anchura.value < 100) {
    anchura.value++;
  }
}

let moreAltura = document.getElementById("moreAltura");
moreAltura.addEventListener("click", moreAlturaFunc);
function moreAlturaFunc() {
  if (anchura.value < 100) {
    altura.value++;
  }
}

let moreMina = document.getElementById("moreMina");
moreMina.addEventListener("click", moreMinaFunc);
function moreMinaFunc() {
  if (anchura.value < 100) {
    minas.value++;
  }
}

let lessAnchura = document.getElementById("lessAnchura");
lessAnchura.addEventListener("click", lessAnchuraFunc);
function lessAnchuraFunc() {
  if (anchura.value > 5) {
    anchura.value--;
  }
}

let lessAltura = document.getElementById("lessAltura");
lessAltura.addEventListener("click", lessAlturaFunc);
function lessAlturaFunc() {
  if (altura.value > 5) {
    altura.value--;
  }
}

let lessMina = document.getElementById("lessMina");
lessMina.addEventListener("click", lessMinaFunc);
function lessMinaFunc() {
  if (minas.value > 1) {
    minas.value--;
  }
}
