var canvasOffset = canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var isDragging = false;
var lastX = 0;
var lastY = 0;

var mouse = { //current mouse coordinates
    x: undefined,
    y: undefined
}

function handleMouseDown(e){
    mouse.x=parseInt(e.clientX-offsetX);
    mouse.y=parseInt(e.clientY-offsetY);
    // set the drag flag
    isDragging=true;
}

function handleMouseUp(e){
    mouse.x=parseInt(e.clientX-offsetX);
    mouse.y=parseInt(e.clientY-offsetY);
    // clear the drag flag
    isDragging=false;
}

function handleMouseOut(e){
    mouse.x=parseInt(e.clientX-offsetX);
    mouse.y=parseInt(e.clientY-offsetY);
    // user has left the canvas, so clear the drag flag
    isDragging=false;
}

function handleMouseMove(e){
    if (!isDragging) {
        return;
    }
    mouse.x=parseInt(e.clientX-offsetX);
    mouse.y=parseInt(e.clientY-offsetY);
    // if the drag flag is set, clear the canvas and draw the image

    // mousemove stuff here
    for (var i = 0; i < ships.length; i++) {
        var ship = ships[i];
        drawShip(ship);
        if (ctx.isPointInPath(lastX, lastY)) {
            ship.x += (mouseX - lastX);
            ship.y += (mouseY - lastY);
            ship.right = ship.x + ship.width;
            ship.bottom = ship.y + ship.height;
        }
    }
    lastX = mouse.x;
    lastY = mouse.y;
    drawAllShips();
}

canvas.mousedown(function(e){handleMouseDown(e);});
canvas.mousemove(function(e){handleMouseMove(e);});
canvas.mouseup(function(e){handleMouseUp(e);});
canvas.mouseout(function(e){handleMouseOut(e);});

window.addEventListener('mousedown', function(e){handleMouseDown(e)})
window.addEventListener('mousemove', function(e){handleMouseMove(e);})
window.addEventListener('mouseup', function(e){handleMouseUp(e);})
window.addEventListener('mouseout', function(e){handleMouseOut(e)})
