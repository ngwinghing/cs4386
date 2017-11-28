var isDragging = false;
var draggingObject;
var lastX = 0;
var lastY = 0;

var mouse = { //current mouse coordinates
    x: undefined,
    y: undefined
}

function handleMouseDown(e){
    mouse.x=e.x;
    mouse.y=e.y;
    // set the drag flag
    isDragging=true;
    lastX = mouse.x;
    lastY = mouse.y;
    console.log("handleMouseDown " + isDragging +" "+lastX +" "+lastY);
}

function handleMouseUp(e){
    mouse.x=e.x;
    mouse.y=e.y;
    // clear the drag flag
    isDragging=false;
    console.log("up" + isDragging);
}

function handleMouseOut(e){
    mouse.x=e.x;
    mouse.y=e.y;
    // user has left the canvas, so clear the drag flag
    isDragging=false;
    console.log("out");
}

function handleMouseMove(e){
    if (!isDragging) {
        return;
    }
    mouse.x=e.x;
    mouse.y=e.y;
    // if the drag flag is set, clear the canvas and draw the image

    // mousemove stuff here
/*    for (var i = 0; i < ships.length; i++) {
        var ship = ships[i];
        drawShip(ship);
        if (ctx.isPointInPath(lastX, lastY)) {
            ship.x += (mouseX - lastX);
            ship.y += (mouseY - lastY);
            ship.right = ship.x + ship.width;
            ship.bottom = ship.y + ship.height;
        }
    }*/
    console.log("move " + isDragging);
}

window.addEventListener('mousedown', function(e){handleMouseDown(e);})
window.addEventListener('mousemove', function(e){handleMouseMove(e);})
window.addEventListener('mouseup', function(e){handleMouseUp(e);})
window.addEventListener('mouseout', function(e){handleMouseOut(e)})
