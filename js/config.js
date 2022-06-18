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
      temporizador.checked = true;
    } else {
      temporizador.checked = false;
    }
  }

  selectTemaFunc()
});

// Funcion guardar
guardar.addEventListener("click", function saveLocalStorage() {

  localStorage.setItem("anchura", anchura.value);
  localStorage.setItem("altura", altura.value);
  localStorage.setItem("minas", minas.value);
  localStorage.setItem("tema", tema.value);
  localStorage.setItem("temporizador", temporizador.checked);

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


let selectTema = document.getElementById("tema");
selectTema.addEventListener("click", selectTemaFunc);
function selectTemaFunc() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  if(tema.value == "clasico") {
    var img1 = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/1200px-Minesweeper_flag.svg.png', main);
    var img2 = loadImage('https://esraa-alaarag.github.io/Minesweeper/images/bomb.png', main);
  } else if(tema.value == "moderno") {
    var img1 = loadImage('https://png.pngtree.com/element_our/20190530/ourmid/pngtree-fluttering-red-flag-illustration-image_1242074.jpg', main);
    var img2 = loadImage('https://img2.freepng.es/20180325/zcq/kisspng-minesweeper-pro-classic-mine-sweeper-minesweeper-p-bomb-5ab79213e17688.7006295415219799239235.jpg', main);
  } else if(tema.value == "floral") {
    var img1 = loadImage('https://w7.pngwing.com/pngs/745/675/png-transparent-cherry-blossom-flower-cherry-blossoms-watercolor-painting-heart-flower.png', main);
    var img2 = loadImage('https://img2.freepng.es/20180409/lsq/kisspng-black-rose-photography-black-rose-5acbcd8f73baf7.9515671715233058714741.jpg', main);
  } else if(tema.value == "oceano") {
    var img1 = loadImage('https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-marine-buoy-isometric-icon-png-image_1975111.jpg', main);
    var img2 = loadImage('https://img1.freepng.es/20180702/tgp/kisspng-tsunami-earthquake-clip-art-5b3ace8a046692.697193891530580618018.jpg', main);
  }
 


  var imagesLoaded = 0;
  function main() {
      imagesLoaded += 1;

      if(imagesLoaded == 2) {
          // composite now
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img1, 0, 0, 200, 200);
          ctx.drawImage(img2, 200, 0, 200, 200);
          ctx.drawImage(img1, 200, 200, 200, 200);
          ctx.drawImage(img2, 0, 200, 200, 200);
      }
  }

  function loadImage(src, onload) {
      // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
      var img = new Image();
      
      img.onload = onload;
      img.src = src;

      return img;
  }
}