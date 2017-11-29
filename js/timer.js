var timer = new Timer();

var timerMode = "setup";
function Timer() {
    var basicTime = 10;

    this.remainingTime = basicTime;
    this.started = false;

    this.width = canvas.width;
    this.height = timerHeight;

    this.draw = function () {
        if (this.remainingTime == -1) { //use all time
            changeMode();
            this.remainingTime = basicTime;
        }
        // basic
        c.fillStyle = '#2F4F4F';
        c.fillRect(0, 0, this.width, this.height);

        // remain time
        c.fillStyle = '#DC143C';
        c.fillRect(0, 0, (this.width * this.remainingTime / basicTime), this.height);

        c.fillStyle = '#000000';
        c.fillText(timerMode + ": " + this.remainingTime, 40, 22);

        this.started = true;
    }
}
function changeMode() {
    if (timerMode == "setup") {
        timerMode = "attack";
        timer.basicTime = 40;
    } else {
        timerMode = "setup";
        timer.basicTime = 10;
    }
}

function resetMode() {
    timerMode = "setup";
    timer.basicTime = 10;
    timer.remainingTime=10;
}