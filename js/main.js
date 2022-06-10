// CONTADOR DE MINAS
let minasStorage = localStorage.getItem('minas');
if (minasStorage !== null) {
    if(minasStorage < 10) {
        document.getElementById("minas").innerHTML = "00" + minasStorage;
    } else if (minasStorage < 100){
        document.getElementById("minas").innerHTML = "0" + minasStorage;
    }   
}

window.addEventListener("load", draw);
let jugar = document.getElementById("jugarBtn");
jugar.addEventListener('click', draw);


let widthCanvas = localStorage.getItem('anchura') * 40;
let heightCanvas = localStorage.getItem('altura') * 40;

let anchura = localStorage.getItem('anchura');
let altura = localStorage.getItem('altura');

let canvas = document.getElementById("buscaminas");


function Cell(mine, flag, clear) {
    this.mine = mine;
    this.flag = flag;
    this.clear = clear;
}

const minaImg = document.getElementById("minaImg")

const ctx = canvas.getContext("2d");
const cellWidth = 41.5;
const cellHeight = 41.5;
let board;

function draw() {
    ctx.clearRect(0, 0, widthCanvas, heightCanvas);

    let horizontal = Number(localStorage.getItem("anchura"));
    let vertical = Number(localStorage.getItem("altura"));
    
    ctx.fillStyle = "#808080";

    const img = new Image();
    //img.src = 'data:image/gif;base64,R0lGODdhEAAQAPEAAHt7e729vf///wAAACwAAAAAEAAQAAACKpSPGckXYIKcVAIoqn541xt5E5iJVmdyoUmmasmi8Sq2Kchd+q7n/A8oAAA7';
    //ctx.drawImage(img, 0, 0, 40 * horizontal, 40 * vertical);
    ctx.fillRect(0, 0, 40 * horizontal, 40 * vertical);

    console.log(vertical, horizontal);

    drawBoard(vertical, horizontal);
    generateMines(vertical, horizontal);

    ctx.stroke();
}

let contador = true;

canvas.addEventListener("mousedown", function (event) {
    // CONTADOR DE SEGUNDOS 
    if(contador) setInterval(countUpTimer, 999);
    var seconds = 0;

    function countUpTimer() {
        contador = false;
        ++seconds;
        if(seconds < 10) {
            document.getElementById("tiempo").innerHTML = "00" + seconds;
        } else if(seconds < 100) {
            document.getElementById("tiempo").innerHTML = "0" + seconds;
        } else {
            document.getElementById("tiempo").innerHTML = seconds;
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

let bucleLoseGame = true;
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

function getColorNumber(number) {
    switch (number) {
        case 1:
          return "Blue"
        case 2:
            return "Green"
        case 3:
            return "Red"
        case 4:
            return "Purple"
        case 5:
            return "Maroon"
        case 6:
            return "Turquoise"
        case 7:
            return "Black"
        case 8:
            return "Gray"
        default:
            return "White"
      }

}

function loseGame() {
    bucleLoseGame = false;
    for (let i = 0; i <= anchura; i++) {
        for (let j = 0; j <= altura; j++) {
            ctx.fillStyle = "#bdbdbd";
            ctx.fillRect(j * 40 + 1, i * 40 + 1, 38, 38);
            ctx.fillStyle = "rgb(255, 153, 0)";

            board[i][j].clear = true;
            // Si es una mina
            if (board[i][j].mine == true) {
                ctx.drawImage(minaImg, j * 40, i * 40, 40, 40);
            } else {
                let adjacentMines = countMines(i, j);

                if (adjacentMines == 0) {
                    clearAdjacentMines(i, j);
                } else {
                    ctx.font = "30px Common Pixel";
                    ctx.fillStyle = getColorNumber(adjacentMines);
                    ctx.strokeText(adjacentMines, j * 40 + 10, i * 40 + 30);
                }
            }
        }
    }
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

function countMines(col, row) {
    // col - 1 > col + 1
    // row - 1 > row + 1
    let count = Number(0);

    for (let i = col - 1; i <= col + 1; i++) {
        for (let j = row - 1; j <= row + 1; j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
                if (board[i][j].mine == true) count++;
            }
        }
    }

    return count;
}

function printFlag(col, row) {
    if (board[col][row].clear == false) {
        if (board[col][row].flag == false) {
            board[col][row].flag = true;
            ctx.drawImage(flag, row * 40 + 1, col * 40 + 1, 38, 38);
        } else {
            board[col][row].flag = false;
            ctx.fillRect(row * 40 + 1, col * 40 + 1, 38, 38);
        }
    }
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});


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

function generateMines(vertical, horizontal) {
    let nMinas = Number(localStorage.getItem("minas"));

    console.log("Numero de minas: " + nMinas);
    console.log(vertical, horizontal);

    board = Array(vertical).fill().map(() =>
        Array(horizontal).fill().map(() =>
            new Cell(false, false, false)
        )
    );

    console.log(board);

    for (let i = 0; i < nMinas; i++) {
        var row = Math.floor(Math.random() * horizontal);
        var column = Math.floor(Math.random() * vertical);

        console.log(column, row);

        if (board[column][row].mine == false) {
            board[column][row].mine = true;
        } else {
            i--;
        }
    }

    console.log(board);
}