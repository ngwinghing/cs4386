var isDragging = false;
var draggingObject= "";
var lastX = 0;
var lastY = 0;
var upX = 0;
var upY = 0;
var upObject;

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
}

function handleMouseUp(e){
    mouse.x=e.x;
    mouse.y=e.y;
    // clear the drag flag
    isDragging=false;
    if (draggingObject!="") {
        upX=e.x;
        upY=e.y;
        upObject= draggingObject;
        draggingObject = "";
    }
}

function handleMouseOut(e){
    mouse.x=e.x;
    mouse.y=e.y;
    // user has left the canvas, so clear the drag flag
    isDragging=false;
}

function handleMouseMove(e){
    // if (!isDragging) {
    //     return;
    // }
    mouse.x=e.x;
    mouse.y=e.y;
}

window.addEventListener('mousedown', function(e){handleMouseDown(e);})
window.addEventListener('mousemove', function(e){handleMouseMove(e);})
window.addEventListener('mouseup', function(e){handleMouseUp(e);})
window.addEventListener('mouseout', function(e){handleMouseOut(e)})
