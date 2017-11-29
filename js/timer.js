var timer = new Timer();

var timerMode = "setup";
function Timer() {
    var basicTime;

    if (timerMode == "setup") {
        basicTime = 1; //should be 30
    } else {
        // attack
        basicTime = 20;
    }

    this.remainingTime = basicTime;
    this.started = false;

    this.width = canvas.width;
    this.height = timerHeight;

    this.draw = function() {
        if(this.remainingTime != -1) {
            // basic
            c.fillStyle = '#2F4F4F';
            c.fillRect(0,0,this.width, this.height);

            // remain time
            c.fillStyle = '#DC143C';
            c.fillRect(0,0,(this.width * this.remainingTime/basicTime), this.height);

            c.fillStyle = '#000000';
            c.fillText(this.remainingTime, 15, 22);

            this.started = true;
        }

        else {
            if (timerMode == "setup") {
                timerMode = "attack";
                startNewGame();
            } else {
                timerMode = "setup";
            }
        }
    }
}