const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 1;
ctx.strokeStyle = "#000000";
ctx.fillStyle = "#808080";
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let x = 1; x < 1000; x += 100) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1000);
}
for (let y = 1; y < 1000; y += 100) {
    ctx.moveTo(0, y);
    ctx.lineTo(1000, y);
}

ctx.stroke();


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}


canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 12, 12);

})

