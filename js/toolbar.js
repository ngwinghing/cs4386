var boxes = [];

var box1 = new Box("umbrella", 2, 1);
boxes.push(box1);

var box2 = new Box("glue", 10, 2);
boxes.push(box2);

var box3 = new Box("barrier", 10, 3);
boxes.push(box3);

function Box(nameOfTools, value, boxNumber) {
    this.name;
    this.type; // limit / time-base
    this.coolingTime;
    if (nameOfTools == "umbrella") {
        this.type = "time";
        this.name = "Umbrella";
        this.img = new Image()
        this.img.src = "img/umbrella.png";
        this.coolingTime= value;
    } else if (nameOfTools == "barrier") {
        this.type = "limit";
        this.name = "Barrier";
        this.img = new Image()
        this.img.src = "img/barrier.png";
        this.limit=value;
    } else {
        this.type = "limit";
        this.name = "Glue";
        this.img = new Image()
        this.img.src = "img/glue.png";
        this.limit=value;
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

    this.timeCounter = this.coolingTime/0.05;
    var used = false;
    this.ableToDrag = true;

    if (this.type == "time") {
        this.remainingTime = 0;
        this.basicTime = this.coolingTime;
    } else {
        this.remainingValue = value;
        var centerX = rectX + 90;
        var centerY = rectY + 100;
        var radius = 18;
        backgroundColor = "#84211d";
    }

    this.draw = function() {
        c.strokeStyle = backgroundColor;
        c.lineWidth = 1;
        c.lineJoin = "round";
        c.lineWidth = cornerRadius;
        c.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
        c.fillStyle = backgroundColor;
        c.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);

        c.drawImage(this.img, rectX + 20, rectY + 10, 60, 60);

        c.fillStyle = '#dba520';
        c.fillRect(rectX, rectY + 70, rectWidth, 25);

        c.fillStyle = '#000000';
        c.font = '18px  Arial';
        c.fillText(this.name, rectX + 45, rectY + 88);

        console.log("this remaining " +this.remainingTime );
        if (this.type == "time") {
            if (this.remainingTime !=0) {
                this.ableToDrag = false;
                if (used == true) {
                    //timer start and count 2s
                    if (this.timeCounter != -1)
                        this.timeCounter--;
                    else {
                        used == false;
                        this.remainingTime--;
                    }
                }
            } else {
                //reset
                this.remainingTime = 10;
                this.basicTime = 10;
            }
            // basic
            c.fillStyle = '#2F4F4F';
            c.fillRect(rectX, rectY + 105, this.width, 15);

            // remain time
            c.fillStyle = '#DC143C';
            c.fillRect(rectX, rectY + 105, (this.width * this.remainingTime / this.basicTime), 15);

            // this.started = true;
            // this.remainingTime--;
        }

        if (this.type == "limit") {
            if (this.remainingValue != 0) {
                this.ableToDrag = true;
                //this.remainingValue--;
            } else {
            }
            c.beginPath();
            c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            c.fillStyle = '#ffd700';
            c.fill();
            c.lineWidth = 4;
            c.strokeStyle = '#84211d';
            c.stroke();

            c.fillStyle = '#000000';
            c.font = '18px  Arial';
            c.fillText(this.remainingValue, centerX - 5, centerY + 5);
        }
        if (this.ableToDrag) {
            if (downX - mapStartX < (this.x + rectWidth) && downX - mapStartX > this.x)
                if (downY - mapStartY < (this.y + rectHeight) && downY - mapStartY > this.y) {
                    downX = 0;
                    downY = 0;
                    soundPlay("click");
                }

            if (lastX - mapStartX < (this.x + rectWidth) && lastX - mapStartX > this.x) {
                if (lastY - mapStartY < (this.y + rectHeight) && lastY - mapStartY > this.y) {
                    if (isDragging) {
                        draggingObject = this.name;
                    }
                }
            }

            if (upX - mapStartX < (this.x + rectWidth) && upX - mapStartX > this.x) {
                if (upY - mapStartY < (this.y + rectHeight) && upY - mapStartY > this.y) {
                    used = true;
                }
            }
        } else {
            c.fillStyle = "rgba(255, 255, 255, 0.5)";
            c.fillRect(this.x, this.y, this.width,this.height);
        }

        if (used == true) {
            if (this.type == "time"){
                this.remainingTime = this.coolingTime;
            } else{
                this.remainingValue--;
            }
            used = false;
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

function resetAllBoxes() {
    boxes = [];

    box1 = new Box("umbrella", 2, 1);
    boxes.push(box1);

    box2 = new Box("glue", 10, 2);
    boxes.push(box2);

    box3 = new Box("barrier", 10, 3);
    boxes.push(box3);
}

function drawDragging() {
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (draggingObject == box.name) {
            box.drawDragging();
        }
    }
}
