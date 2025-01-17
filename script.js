// const canvas = document.getElementById('drawingCanvas');
// const ctx = canvas.getContext('2d');
// const colorPicker = document.getElementById('colorPicker');
// const brushSize = document.getElementById('brushSize');
// const eraserButton = document.getElementById('eraserButton');
// const clearButton = document.getElementById('clearButton');
// const undoButton = document.getElementById('undoButton');

// let drawing = false;
// let isErasing = false;
// let drawingHistory = [];
// let historyIndex = -1;

// // Set canvas dimensions
// canvas.width = 800;
// canvas.height = 600;

// // Set initial brush settings
// ctx.lineWidth = brushSize.value;
// ctx.lineCap = 'round';
// ctx.strokeStyle = colorPicker.value;

// function saveState() {
//     if (historyIndex < drawingHistory.length - 1) {
//         drawingHistory = drawingHistory.slice(0, historyIndex + 1);
//     }
//     drawingHistory.push(canvas.toDataURL());
//     historyIndex++;
// }

// function startDrawing(event) {
//     drawing = true;
//     draw(event);
// }

// function stopDrawing() {
//     drawing = false;
//     ctx.beginPath();
//     saveState(); // Save state after finishing a stroke
// }

// function draw(event) {
//     if (!drawing) return;

//     ctx.lineWidth = brushSize.value;
//     ctx.strokeStyle = isErasing ? '#ffffff' : colorPicker.value;

//     ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
// }

// function handleMouseMove(event) {
//     draw(event);
// }

// function handleTouchMove(event) {
//     event.preventDefault();
//     draw(event.touches[0]);
// }

// function toggleEraser() {
//     isErasing = !isErasing;
//     eraserButton.textContent = isErasing ? 'Brush' : 'Eraser';
// }

// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawingHistory = []; // Clear history
//     historyIndex = -1;
// }

// function undo() {
//     if (historyIndex > 0) {
//         historyIndex--;
//         const previousState = drawingHistory[historyIndex];
//         const img = new Image();
//         img.src = previousState;
//         img.onload = function() {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.drawImage(img, 0, 0);
//         };
//     } else if (historyIndex === 0) {
//         clearCanvas(); // Clear canvas if no history
//     }
// }

// colorPicker.addEventListener('input', () => {
//     if (!isErasing) {
//         ctx.strokeStyle = colorPicker.value;
//     }
// });

// brushSize.addEventListener('input', () => {
//     ctx.lineWidth = brushSize.value;
// });

// eraserButton.addEventListener('click', toggleEraser);
// clearButton.addEventListener('click', clearCanvas);
// undoButton.addEventListener('click', undo);

// canvas.addEventListener('mousedown', startDrawing);
// canvas.addEventListener('mouseup', stopDrawing);
// canvas.addEventListener('mousemove', handleMouseMove);

// canvas.addEventListener('touchstart', startDrawing);
// canvas.addEventListener('touchend', stopDrawing);
// canvas.addEventListener('touchmove', handleTouchMove);

// canvas.addEventListener('mouseleave', stopDrawing); // Ensure drawing stops if mouse leaves the canvas

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');
const undoButton = document.getElementById('undoButton');

let drawing = false;
let isErasing = false;
let drawingHistory = [];
let historyIndex = -1;

// Adjust canvas size to fit the screen
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8; // 80% of viewport width
    canvas.height = window.innerHeight * 0.6; // 60% of viewport height
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Set initial brush settings
ctx.lineWidth = brushSize.value;
ctx.lineCap = 'round';
ctx.strokeStyle = colorPicker.value;

// Save the current state of the canvas
function saveState() {
    if (historyIndex < drawingHistory.length - 1) {
        drawingHistory = drawingHistory.slice(0, historyIndex + 1);
    }
    drawingHistory.push(canvas.toDataURL());
    historyIndex++;
}

// Start drawing or erasing
function startDrawing(event) {
    drawing = true;
    draw(event);
}

// Stop drawing or erasing
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
    saveState(); // Save state after finishing a stroke
}

// Draw or erase based on the current mode
function draw(event) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const y = (event.clientY || event.touches[0].clientY) - rect.top;

    ctx.lineWidth = brushSize.value;
    ctx.strokeStyle = isErasing ? '#ffffff' : colorPicker.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Handle mouse and touch events for drawing
function handleMouseMove(event) {
    draw(event);
}

function handleTouchMove(event) {
    event.preventDefault();
    draw(event.touches[0]);
}

// Toggle between brush and eraser modes
// function toggleEraser() {
//     isErasing = !isErasing;
//     eraserButton.classList.toggle('active', isErasing);
//     ctx.strokeStyle = isErasing ? '#ffffff' : colorPicker.value; // Change stroke color based on mode
// }
function toggleEraser() {
    isErasing = !isErasing;
    eraserButton.textContent = isErasing ? 'Brush' : 'Eraser';
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingHistory = []; // Clear history
    historyIndex = -1;
}

// Undo the last action
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        const previousState = drawingHistory[historyIndex];
        const img = new Image();
        img.src = previousState;
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    } else if (historyIndex === 0) {
        clearCanvas(); // Clear canvas if no history
    }
}

colorPicker.addEventListener('input', () => {
    if (!isErasing) {
        ctx.strokeStyle = colorPicker.value;
    }
});

brushSize.addEventListener('input', () => {
    ctx.lineWidth = brushSize.value;
});

eraserButton.addEventListener('click', toggleEraser);
clearButton.addEventListener('click', clearCanvas);
undoButton.addEventListener('click', undo);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', handleMouseMove);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', handleTouchMove);

canvas.addEventListener('mouseleave', stopDrawing); // Ensure drawing stops if mouse leaves the canvas
