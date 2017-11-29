var timer = new Timer();

var timerMode = "setup";
function Timer() {
    this.basicTime = 10;

    this.remainingTime = this.basicTime;
    this.started = false;

    this.width = canvas.width;
    this.height = timerHeight;

    this.draw = function () {
        if (this.remainingTime == -1) { //use all time
            changeMode();
        }
        // basic
        c.fillStyle = '#2F4F4F';
        c.fillRect(0, 0, this.width, this.height);

        // remain time
        c.fillStyle = '#DC143C';
        c.fillRect(0, 0, Math.floor(this.width * (this.remainingTime / this.basicTime)), this.height);

        c.fillStyle = '#000000';
        c.fillText(timerMode + ": " + this.remainingTime, 40, 22);
    }
}
function changeMode() {
    if (timerMode == "setup") {
        timerMode = "attack";
        timer.basicTime = 40;
        timer.remainingTime = timer.basicTime;
        soundPlay("attack_bg");
    } else {
        timerMode = "setup";
        timer.basicTime = 10;
        timer.remainingTime = timer.basicTime;
        soundPlay("pre_bg");
    }
}

function resetMode() {
    timerMode = "setup";
    timer.basicTime = 10;
    timer.remainingTime=10;
    soundPlay("pre_bg");
}