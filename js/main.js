//  LOCAL STORAGE INICIAL

if (localStorage.getItem("anchura") === null) {
  localStorage.setItem("anchura", 31);
}
if (localStorage.getItem("altura") === null) {
  localStorage.setItem("altura", 12);
}
if (localStorage.getItem("minas") === null) {
  localStorage.setItem("minas", 50);
}
if (localStorage.getItem("tema") === null) {
  localStorage.setItem("tema", "clasico");
}
if (localStorage.getItem("temporizador") === null) {
  localStorage.setItem("temporizador", "true");
}

// CONTADOR DE MINAS
let minasStorage = localStorage.getItem("minas");
if (minasStorage !== null) {
  if (minasStorage < 10) {
    document.getElementById("minas").innerHTML = "00" + minasStorage;
  } else if (minasStorage < 100) {
    document.getElementById("minas").innerHTML = "0" + minasStorage;
  }
}

window.addEventListener("load", draw);
let jugar = document.getElementById("jugarBtn");
jugar.addEventListener("click", draw);

let widthCanvas = localStorage.getItem("anchura") * 41.5;
let heightCanvas = localStorage.getItem("altura") * 41.5;

let anchura = localStorage.getItem("anchura");
let altura = localStorage.getItem("altura");

let canvas = document.getElementById("buscaminas");

function Cell(mine, flag, clear) {
  this.mine = mine;
  this.flag = flag;
  this.clear = clear;
}

const minaImg = document.getElementById("minaImg");

const ctx = canvas.getContext("2d");
const cellWidth = 41.5;
const cellHeight = 41.5;
let board;

let contadorSegundos = document.getElementById("tiempo");
function draw() {
  seconds = 0;
  hasPerdido = false;
  ctx.clearRect(0, 0, widthCanvas, heightCanvas);

  let horizontal = Number(localStorage.getItem("anchura"));
  let vertical = Number(localStorage.getItem("altura"));

  ctx.fillStyle = "#808080";

  const img = new Image();
  ctx.fillRect(0, 0, 40 * horizontal, 40 * vertical);

  drawBoard(vertical, horizontal);
  generateMines(vertical, horizontal);

  ctx.stroke();
}

// CONTADOR DE SEGUNDOS
let contador;
if (localStorage.getItem("temporizador") !== null) {
  if (localStorage.getItem("temporizador") == "true") {
    contador = true;
  } else {
    contador = false;
  }
} else {
  contador = true;
}

let hasPerdido = false;

canvas.addEventListener("mousedown", function (event) {
  contadorSegundos = document.getElementById("tiempo");
  if (hasPerdido) {
    this.removeEventListener("mousedown", myHandler);
  }

  // CONTADOR DE SEGUNDOS
  if (contador) {
    setInterval(countUpTimer, 999);
  }
  let seconds = 0;

  function countUpTimer() {
    contador = false;
    ++seconds;
    if (seconds < 10) {
      contadorSegundos.innerHTML = "00" + seconds;
    } else if (seconds < 100) {
      contadorSegundos.innerHTML = "0" + seconds;
    } else {
      contadorSegundos.innerHTML = seconds;
    }
  }

  const boundingRect = canvas.getBoundingClientRect();
  const x = event.clientX - boundingRect.left;
  const y = event.clientY - boundingRect.top;
  const row = Math.floor(x / cellWidth);
  const col = Math.floor(y / cellHeight);

  if (event.button == 0) {
    // Left click

    clearCell(col, row);
  } else if (event.button == 2) {
    // Right click

    printFlag(col, row);
  }
});

function getColorNumber(number) {
  switch (number) {
    case 1:
      return "Blue";
    case 2:
      return "Green";
    case 3:
      return "Red";
    case 4:
      return "Purple";
    case 5:
      return "Maroon";
    case 6:
      return "Turquoise";
    case 7:
      return "Black";
    case 8:
      return "Gray";
    default:
      return "White";
  }
}

function clearCell(col, row) {
  if (board[col][row].flag == false) {
    if (board[col][row].clear == false) {
      ctx.fillStyle = "#bdbdbd";
      ctx.fillRect(row * 40 + 1, col * 40 + 1, 38, 38);
      ctx.fillStyle = "rgb(255, 153, 0)";

      board[col][row].clear = true;
      // Si es una mina
      if (board[col][row].mine == true) {
        ctx.drawImage(minaImg, row * 40, col * 40, 40, 40);
        loseGame();
      } else {
        let adjacentMines = countMines(col, row);

        if (adjacentMines == 0) {
          clearAdjacentMines(col, row);
        } else {
          ctx.font = "30px Common Pixel";
          ctx.fillStyle = getColorNumber(adjacentMines);
          ctx.fillText(adjacentMines, row * 40 + 10, col * 40 + 30);
        }
      }
    }
  }
}

function loseGame() {
  hasPerdido = true;
  ctx.fillStyle = "rgba(10, 10, 10, 0.5)";
  ctx.fillRect(0, 0, widthCanvas, heightCanvas);
  canvas.removeEventListener("mousedown", function (event) {}, false);
  ctx.font = "70px Common Pixel";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("You Lose", widthCanvas / 2, heightCanvas / 2);
  contadorSegundos = document.getElementById("nada");
}

function clearAdjacentMines(col, row) {
  for (let i = col - 1; i <= col + 1; i++) {
    for (let j = row - 1; j <= row + 1; j++) {
      if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
        clearCell(i, j);
      }
    }
  }
}

function drawBoard(vertical, horizontal) {
  ctx.moveTo(0, 0);
  ctx.lineTo(0, vertical * 40);
  ctx.lineTo(horizontal * 40, vertical * 40);
  ctx.lineTo(horizontal * 40, 0);
  ctx.lineTo(0, 0);

  for (let i = 0; i < horizontal - 1; i++) {
    let drawDistance = i * 40 + 40;
    ctx.moveTo(drawDistance, 0);
    ctx.lineTo(drawDistance, vertical * 40);
  }

  for (let i = 0; i < vertical - 1; i++) {
    let drawDistance = i * 40 + 40;
    ctx.moveTo(0, drawDistance);
    ctx.lineTo(horizontal * 40, drawDistance);
  }
}

function countMines(col, row) {
  let count = 0;

  for (let i = col - 1; i <= col + 1; i++) {
    for (let j = row - 1; j <= row + 1; j++) {
      if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
        if (board[i][j].mine == true) count++;
      }
    }
  }

  return count;
}

function generateMines(vertical, horizontal) {
  let nMinas = Number(localStorage.getItem("minas"));

  board = Array(vertical)
    .fill()
    .map(() =>
      Array(horizontal)
        .fill()
        .map(() => new Cell(false, false, false))
    );

  for (let i = 0; i < nMinas; i++) {
    var row = Math.floor(Math.random() * horizontal);
    var column = Math.floor(Math.random() * vertical);

    if (board[column][row].mine == false) {
      board[column][row].mine = true;
    } else {
      i--;
    }
  }
}

const gris = document.getElementById("gris");
function printFlag(col, row) {
  if (board[col][row].clear == false) {
    if (board[col][row].flag == false) {
      minasStorage--;
      if (minasStorage < 10) {
        document.getElementById("minas").innerHTML = "00" + minasStorage;
      } else if (minasStorage < 100) {
        document.getElementById("minas").innerHTML = "0" + minasStorage;
      }
      board[col][row].flag = true;
      ctx.drawImage(flag, row * 40 + 1, col * 40 + 1, 38, 38);
    } else {
      minasStorage++;
      if (minasStorage < 10) {
        document.getElementById("minas").innerHTML = "00" + minasStorage;
      } else if (minasStorage < 100) {
        document.getElementById("minas").innerHTML = "0" + minasStorage;
      }
      board[col][row].flag = false;
      ctx.drawImage(gris, row * 40 + 1, col * 40 + 1, 38, 38);
    }
  }
}

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
