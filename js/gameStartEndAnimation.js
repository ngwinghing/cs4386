gameStart = false;
gameEnd = false;
win = false;
firstStart = true;

var welcome = true;
var howToPlay = false;
var replay = false;

var gra1= 0;
var gra2= 0.6;
var gra3= 1.0;
var delay = 1;

function gameStartAnimation() {
    var middle = 400;
    var textStart = tileSize*2;
    var textEnd = 800-tileSize*2;
    var textLine = tileSize+80;

    c.moveTo(textStart,textLine);
    c.lineTo(textEnd,textLine);
    c.fillStyle = 'rgba(255, 255, 255, .25)';
    c.strokeStyle="#cfcfcf";
    c.lineWidth=1;
    c.stroke();

    textLine+=5;
    c.moveTo(textStart,textLine);
    c.lineTo(textEnd,textLine);
    c.fillStyle = 'rgba(255, 255, 255, .25)';
    c.strokeStyle="#cfcfcf";
    c.lineWidth=1;
    c.stroke();

    var sample_text = "WHILE THERE IS LIFE THERE IS HOPE";
    var text = sample_text.split("").join(" ");
    textLine+=30;
    c.font = 'lighter 15pt Calibri';
    c.textAlign = 'center';
    c.fillStyle = '#cfcfcf';
    c.fillText(text, middle, textLine);

    var sample_text = "PROTECT OUR SQUARE";
    var text = sample_text.split("").join("");
    textLine+=80;
    c.font = 'bold 40pt Arial';
    c.textAlign = 'center';
    var gradient = c.createLinearGradient(0, 0,800, 0);
    gradient.addColorStop(gra1, "#ff6600");
    gradient.addColorStop(gra2, "#ffa64d");
    gradient.addColorStop(gra3, "#ffff33");
    c.fillStyle = gradient;
    c.fillText(text, middle, textLine);
    if (delay==0) {
    if (gra3==1.0) {
        gra1 +=0.2;
        gra2 += 0.2;
        gra3 = 0;
    } else if (gra2==1.0) {
        gra1 += 0.2;
        gra3 += 0.2;
        gra2 = 0;
    } else if (gra1==1.0) {
        gra2 += 0.2;
        gra3 += 0.2;
        gra1 = 0;
    } else {
        gra2 += 0.2;
        gra3 += 0.2;
        gra1 += 0.2;
    }
        delay = 2;
    } else {
        delay--;
    }

    var sample_text = "— SAVE YOUR OWN LAND —";
    var text = sample_text.split("").join("  ");
    textLine+=50;
    c.font = 'lighter italic 15pt Calibri';
    c.textAlign = 'center';
    c.fillStyle = '#cfcfcf';
    c.fillText(text, middle, textLine);

    textLine+=30;
    c.moveTo(textStart,textLine);
    c.lineTo(textEnd,textLine);
    c.fillStyle = 'rgba(255, 255, 255, .25)';
    c.strokeStyle="#cfcfcf";
    c.lineWidth=1;
    c.stroke();

    textLine+=5;
    c.moveTo(textStart,textLine);
    c.lineTo(textEnd,textLine);
    c.fillStyle = 'rgba(255, 255, 255, .25)';
    c.strokeStyle="#cfcfcf";
    c.lineWidth=1;
    c.stroke();

    textLine+=60;
    c.textAlign = 'center';
    c.fillStyle = '#ffd700';
    c.fillRect(middle-75, textLine,150,50);

    var sample_text = "Start";
    var text = sample_text.split("").join(" ");
    textLine+=30;
    c.font = 'lighter italic 15pt Calibri';
    c.textAlign = 'center';
    c.fillStyle = '#000';
    c.fillText(text, middle, textLine);

    textLine-=30;
    if (mouse.x<(mapStartX+middle+75) && mouse.x>(mapStartX+middle-175)) {
        if (mouse.y<(textLine+50) && mouse.y>textLine) {
            if (lastX<(mapStartX+middle+75) && lastX>(mapStartX+middle-175)){
                if (lastY<(textLine+50) && lastY>textLine) {
                    upX=0;
                    upY=0;
                    welcome=false;
                    soundPlay("click");
                }
            }
            c.textAlign = 'center';
            c.fillStyle = '#c60048';
            c.fillRect(middle-75, textLine,150,50);

            var sample_text = "Start";
            var text = sample_text.split("").join(" ");
            textLine+=30;
            c.font = 'lighter italic 15pt Calibri';
            c.textAlign = 'center';
            c.fillStyle = '#fff';
            c.fillText(text, middle, textLine);
            textLine-=30;
        }
    }
    // intro
    textLine+=60;

    var sample_text = "How To Play";
    var text = sample_text.split("").join("");
    textLine+=30;
    c.font = 'lighter italic 15pt Calibri';
    c.textAlign = 'center';
    c.fillStyle = '#fff';
    c.fillText(text, middle, textLine);

    textLine-=30;
    if (mouse.x<(mapStartX+middle+75) && mouse.x>(mapStartX+middle-175)) {
        if (mouse.y<(textLine+30) && mouse.y>textLine) {
            if (upX<(mapStartX+middle+55) && upX>(mapStartX+middle-145)){
                if (upY<(textLine+30) && upY>textLine) {
                    upX=0;
                    upY=0;
                    howToPlay=true;
                    soundPlay("click");
                }
            }
            c.textAlign = 'center';
            c.fillStyle = '#000';
            c.fillRect(middle-75, textLine,150,50);

            var sample_text = "How To Play";
            var text = sample_text.split("").join("");
            textLine+=30;
            c.font = 'Bold italic 15pt Calibri';
            c.textAlign = 'center';
            c.fillStyle = '#fff';
            c.fillText(text, middle, textLine);
        }
    }
}

function gameHowToPlayAnimation() {
    c.drawImage(howToPlayImg,0,0,canvas.width, canvas.width/1.44);
    if (mouse.x<(mapStartX+canvas.width) && mouse.x>(mapStartX)) {
        if (mouse.y < canvas.height && mouse.y > 0) {
            if (upX < (mapStartX+canvas.width) && upX > (mapStartX)) {
                if (upY < canvas.height && upY > 0) {
                    upX = 0;
                    upY = 0;
                    howToPlay = false;
                    soundPlay("click");
                }
            }
        }
    }
}

function gameEndAnimation() {
    var middle = 400;

    /*Draw rgba*/
    c.fillStyle = "rgba(255, 255, 255, 0.8)";
    c.fillRect(0, 0, canvas.height, canvas.height);

    if (win==false) { //lose
        var sample_text = "— You are Arrested —";
        var text = sample_text.split("").join("  ");
        var textLine = 300;
        c.font = 'lighter italic 15pt Calibri';
        c.textAlign = 'center';
        c.fillStyle = '#c60048';
        c.fillText(text, middle, textLine);

        // retry level btn

        textLine+=60;
        c.textAlign = 'center';
        c.fillStyle = '#ffd700';
        c.fillRect(middle-75, textLine,150,50);

        var sample_text = "Retry";
        var text = sample_text.split("").join(" ");
        textLine+=30;
        c.font = 'lighter italic 15pt Calibri';
        c.textAlign = 'center';
        c.fillStyle = '#000';
        c.fillText(text, middle, textLine);

        textLine-=30;
        if (mouse.x<(mapStartX+middle+75) && mouse.x>(mapStartX+middle-175)) {
            if (mouse.y<(textLine+50) && mouse.y>textLine) {

                if (upX<(mapStartX+middle+75) && upX>(mapStartX+middle-175)){
                    if (upY<(textLine+50) && upY>textLine) {
                        upX = 0;
                        upY = 0;
                        replay = true;
                        soundPlay("click");
                        console.log("Lose Click");
                    }
                }
                c.textAlign = 'center';
                c.fillStyle = '#c60048';
                c.fillRect(middle-75, textLine,150,50);

                var sample_text = "Retry";
                var text = sample_text.split("").join(" ");
                textLine+=30;
                c.font = 'lighter italic 15pt Calibri';
                c.textAlign = 'center';
                c.fillStyle = '#fff';
                c.fillText(text, middle, textLine);
            }
        }
    }
    else {
        //win
        var sample_text = "— You are Free —";
        var text = sample_text.split("").join("  ");
        var textLine = 300;
        c.font = 'lighter italic 15pt Calibri';
        c.textAlign = 'center';
        c.fillStyle = '#2fab0c';
        c.fillText(text, middle, textLine);

        // replay or next level btn
        textLine+=60;
        c.textAlign = 'center';
        c.fillStyle = '#2fab0c';
        c.fillRect(middle-75, textLine,150,50);

        var sample_text = "Next";
        var text = sample_text.split("").join(" ");
        textLine+=30;
        c.font = 'lighter italic 15pt Calibri';
        c.textAlign = 'center';
        c.fillStyle = '#000';
        c.fillText(text, middle, textLine);

        textLine-=30;
        if (mouse.x<(mapStartX+middle+75) && mouse.x>(mapStartX+middle-175)) {
            if (mouse.y<(textLine+50) && mouse.y>textLine) {

                if (upX<(mapStartX+middle+75) && upX>(mapStartX+middle-175)){
                    if (upY<(textLine+50) && upY>textLine) {
                        upX = 0;
                        upY = 0;
                        replay = true;
                        soundPlay("click");
                        console.log("Win Click");
                    }
                }
                c.textAlign = 'center';
                c.fillStyle = '#ffd700';
                c.fillRect(middle-75, textLine,150,50);

                var sample_text = "Next";
                var text = sample_text.split("").join(" ");
                textLine+=30;
                c.font = 'lighter italic 15pt Calibri';
                c.textAlign = 'center';
                c.fillStyle = '#fff';
                c.fillText(text, middle, textLine);
            }
        }
    }

}