var canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 800;

var tileSize = 44.4;

var timerHeight = 30;
var toolBarHeight = 150;
var mapStartX = (innerWidth-canvas.width)/2;
var mapStartY = timerHeight +1 ;
var mapWidth = canvas.width;
var mapHeight = mapWidth/1.8;

var c = canvas.getContext('2d');

var map = new Image();
map.src= "img/tmp_bg.jpg";

var btn = new Image();
btn.src= "img/btn.png";

c.font = "20px Arial";
c.fillStyle = '#DC143C';
c.fillRect(0, 0, mapWidth, timerHeight);

// c.fillRect(100, 100, 100, 100);
// console.log(canvas);
//
// var rectWidth = 100;
// var radius = 50;
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;


// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth*0.7;
//     canvas.height = window.innerHeight;
//
//     init();
// })
//
// function Police(x,y, dx, dy, radius) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;
//
//     this.draw = function() {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         c.strokeStyle = 'blue';
//         c.stroke();
//         c.fill();
//     }
//
//     this.update = function() {
//         if (this.x + radius > innerWidth || this.x - radius <0) {
//             this.dx = -this.dx;
//         }
//
//         if (this.y + radius > innerHeight || this.y - radius < 0) {
//             this.dy = -this.dy;
//         }
//
//         this.x += this.dx;
//         this.y += this.dy;
//
//         //interactivity
//         if (mouse.x - this.x < 50 && mouse.x - this.x > -50
//         && mouse.y - this.y < 50 && mouse.y - this.y > -50
//         ) {
//             if (this.radius <40) {
//                 this.radius += 1;
//             }
//         } else if (this.radius >2) {
//             this.radius -=1;
//         }
//
//         this.draw();
//     }
// }



// var policeArray = [];



