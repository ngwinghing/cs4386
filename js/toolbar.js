var boxes = [];

var box1 = new Box("umbrella", 5, 1);
boxes.push(box1);

var box2 = new Box("glue", 9, 2);
boxes.push(box2);

var box3 = new Box("glue", 1, 3);
boxes.push(box3);

function Box(nameOfTools, value, boxNumber) {
    this.name;
    this.type; // limit / time-base
    if (nameOfTools == "umbrella") {
        this.type = "time";
        this.name = "Umbrella";
        this.img = new Image()
        this.img.src = "img/umbrella.png";
    } else {
        this.type = "limit";
        this.name = "Glue";
        this.img = new Image()
        this.img.src = "img/glue.png";
    }

    this.width = 100;
    this.height = 100;

    this.x = 40 * (boxNumber) + 90*(boxNumber -1);
    this.y = mapHeight+50;

    var rectX = this.x;
    var rectY = this.y;
    var rectWidth = 100;
    var rectHeight = 100;
    var cornerRadius = 20;

    var backgroundColor = "#4682b4";

    if (this.type == "time") {
        this.remainingTime = 3;
        this.basicTime = 10;
    } else {
        var remainingValue = value;
        var centerX = rectX + 90;
        var centerY = rectY + 100;
        var radius = 18;
        backgroundColor = "#84211d";
    }

    this.draw = function() {
        c.strokeStyle = backgroundColor;
        c.lineWidth= 1;
        c.lineJoin = "round";
        c.lineWidth = cornerRadius;
        c.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
        c.fillStyle = backgroundColor;
        c.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);

        c.drawImage(this.img, rectX+20, rectY+10, 60,60);

        c.fillStyle = '#dba520';
        c.fillRect(rectX, rectY+70,rectWidth, 25);

        c.fillStyle = '#000000';
        c.font = '18px  Arial';
        c.fillText(this.name, rectX+12, rectY+88);

        if (this.type == "time") {
            if(this.remainingTime != -1) {
                // basic
                c.fillStyle = '#2F4F4F';
                c.fillRect(rectX,rectY+105,this.width, 15);

                // remain time
                c.fillStyle = '#DC143C';
                c.fillRect(rectX,rectY+105,(this.width * this.remainingTime/this.basicTime), 15);

               // this.started = true;
               // this.remainingTime--;
            } else {

            }
        }

        if (this.type == "limit") {
            if(remainingValue != -1) {
                c.beginPath();
                c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                c.fillStyle = '#ffd700';
                c.fill();
                c.lineWidth = 4;
                c.strokeStyle = '#84211d';
                c.stroke();

                c.fillStyle = '#000000';
                c.font = '18px  Arial';
                c.fillText(remainingValue, centerX-5, centerY+5);
            } else {

            }
        }

        if (lastX-mapStartX<(this.x+rectWidth) && lastX-mapStartX>this.x) {
            if (lastY-mapStartY<(this.y+rectHeight) && lastY-mapStartY>this.y) {
                if (isDragging) {
                    draggingObject = this.name;
                    console.log("On Area " + this.name);
                }
            }
        }
    }
    this.drawDragging = function () {
        c.drawImage(this.img, mouse.x-mapStartX-10, mouse.y-mapStartY-5, 40,40);
    }
}

function drawAllBoxes() {
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i]
        box.draw();
    }
}

function drawDragging() {
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (draggingObject == box.name) {
            box.drawDragging();
        }
    }
}
