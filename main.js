let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMoseDown = false;
let color = 'orange';
let lineWidth = 10;
let cards = [];


canv.width = window.innerWidth;
canv.height = window.innerHeight;

// paint 
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

function save(){
    localStorage.setItem( 'cards', JSON.stringify(cards))
}
function clear(){}
function replay(){}