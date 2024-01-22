let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMoseDown = false;
let color = 'black';
let lineWidth = 10;
let cards = [];
canv.width = window.innerWidth;
canv.height = window.innerHeight;


//closing the panel
let xmark = document.getElementById('xmark'); 
let panel = document.getElementsByClassName('panel')[0]; 
let panelClosed = false;
xmark.addEventListener('click', () => {
    if(panelClosed == false){
        panel.style.marginLeft = '-200px';
        panelClosed = true;
    }else{
        panel.style.marginLeft = '0px';
        panelClosed = false;
    }
});


//paint 
canv.addEventListener('mousedown', function () {
    isMoseDown = true;
});
canv.addEventListener('mouseup', function () {
    isMoseDown = false;
    ctx.beginPath();
    cards.push('mouseup');
})
ctx.lineWidth = lineWidth * 2;
ctx.strokeStyle = color;
ctx.fillStyle = color;
canv.addEventListener('mousemove', function (e) {
    if (isMoseDown) {
        cards.push(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2)
        ctx.fill();
        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY)
    }
})

//save
let savedDrawing = JSON.parse(localStorage.getItem('cards')) || [];
let save = document.getElementById('save');
save.addEventListener('click', () => {
    localStorage.setItem('cards', JSON.stringify(cards));
    alert('Drawing saved!');
});

// show saved pictures
let gallery = document.getElementById('gallery');
let picturesGallery = document.getElementById('panel_picGallery');
gallery.addEventListener('click', () => {
    showSavedDrawings()
    picturesGalleryOpen = false;

    if (picturesGalleryOpen == false) {
        panel_picGallery.style.display = 'flex';
        picturesGalleryOpen = true;
    } else {
        panel_picGallery.style.display = 'none';
        picturesGalleryOpen = false;
    };
});

function showSavedDrawings() {
    $('#panel_picGallery').empty();
    savedDrawing.forEach((drawing) => {
        const drawingElement = document.createElement('div');
        drawingElement.textContent = drawing;
        $('#panel_picGallery').append(drawingElement);
    });
}
  
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