var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth*0.7;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var map = new Image();
map.src= "img/tmp_bg.jpg";


// c.fillRect(100, 100, 100, 100);
// console.log(canvas);
//
// var rectWidth = 100;
// var radius = 50;
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth*0.7;
    canvas.height = window.innerHeight;

    init();
})
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

function Timer(type) {
    var basicTime;
    if (type == "attack") {
        basicTime = 30;
    } else {
        // prepare
        basicTime = 60;
    }

    this.width = canvas.width;
    this.height = canvas.width/25;

    this.draw = function(time) {
        this.time = time;

        // basic
        c.fillStyle = '#2F4F4F';
        c.fillRect(0,0,this.width, this.height);

        // remain time
        c.fillStyle = '#DC143C';
        c.fillRect(0,0,(this.width * this.time/basicTime), this.height);
    }
}

// var policeArray = [];

var timer = new Timer("attack");

function init() {
    // policeArray = [];
    //
    // for (var i = 0; i < 100; i++) {
    //     var radius = 50;
    //     var x = Math.random() * (innerWidth - radius * 2) + radius;
    //     var y = Math.random() * (innerHeight - radius * 2) + radius;
    //     var dx = (Math.random() - 0.5) * 8;
    //     var dy = (Math.random() - 0.5) * 8;
    //     policeArray.push(new Police(x, y, dx, dy, radius));
    // }

    // var police = new Police(200, 200, 4, 4, 60);

    function animate() {
        requestAnimationFrame(animate);

        c.clearRect(0, 0, innerWidth, innerHeight);

        // c.fillRect(100,100, 100, 100);

        timer.draw(9);
        c.drawImage(map,0, timer.height+1, canvas.width, canvas.width/1.8);

        // for (var i = 0; i < policeArray.length; i++) {
        //     policeArray[i].update();
        // }
    }
    animate();
}

init();