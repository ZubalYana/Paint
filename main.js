let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMouseDown = false;
let color = 'black';
let lineWidth = 10;
let cards = [];
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// Add a reference to the pic gallery element
let picGallery = document.getElementById('panel_picGallery');

// Function to save drawings
function saveDrawing() {
    // Clone the canvas to create an image
    let img = new Image();
    img.src = canv.toDataURL();

    // Create a new div element to hold the image
    let imgContainer = document.createElement('div');
    imgContainer.className = 'drawing-container';
    imgContainer.appendChild(img);

    // Append the image container to the pic gallery
    picGallery.appendChild(imgContainer);
}

// Add event listeners for mouse actions
canv.addEventListener('mousedown', function () {
    isMouseDown = true;
});

canv.addEventListener('mouseup', function () {
    isMouseDown = false;
    ctx.beginPath();
    cards.push('mouseup');
});

ctx.lineWidth = lineWidth * 2;
ctx.strokeStyle = color;
ctx.fillStyle = color;

canv.addEventListener('mousemove', function (e) {
    if (isMouseDown) {
        cards.push(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});

// Save button click event listener
let save = document.getElementById('save');
save.addEventListener('click', function () {
    saveDrawing();
});


  
//clear
let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
    clearCanvas();
});
function clearCanvas() {
    ctx.clearRect(0, 0, canv.width, canv.height);
}


//color changing
function replay(){}
let plus = document.getElementById('plus');
let colorpicker = document.getElementById('colorPicker');
let colorpickerContidion = 'close'
plus.addEventListener('click', function(){
    if(colorpickerContidion == 'close'){
        colorpicker.style.display = 'flex';
        plus.style.display = 'none';
        colorpickerContidion = 'open'
    }else{
        colorpicker.style.display = 'none';
        colorpickerContidion = 'close'

    }
})
let colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', function () {
    let selectedColor = colorPicker.value;
    chooseColor(selectedColor);
});
function chooseColor(selectedColor) {
    color = selectedColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
document.querySelectorAll('.panel_color').forEach(function (panelColor) {
    panelColor.addEventListener('click', function () {
        let selectedColor = window.getComputedStyle(panelColor).getPropertyValue('background-color');
        chooseColor(selectedColor);
    });
});


//size changing
let size = document.getElementById('size');
size.addEventListener('input', function(){
    let selectedSize = size.value;
    chooseSize(selectedSize);
})
function chooseSize(selectedSize) {
    lineWidth = selectedSize;
    ctx.lineWidth = lineWidth;
}