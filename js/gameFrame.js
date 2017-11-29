var frameRate = 50; // 0.05s

function playFaster() {
    //2x
    if (frameRate ==50) {
        frameRate = 25;
    }
    else
        frameRate =50;
}

function newGame() {
    var secondCount = 20;
    setInterval(
        function() {
            c.clearRect(0, 0, innerWidth, innerHeight);
            if (welcome) {
                gameStartAnimation();
            } else {
                if (firstStart == true)
                    startNewGame();

                /*Draw Timer*/
                timer.draw();
                if (secondCount == 0) { //1 second
                    timer.remainingTime--;
                    console.log("rem ", timer.remainingTime);
                    secondCount = 20;
                }

                /*Draw Map*/
                c.drawImage(map, 0, mapStartY, mapWidth, mapHeight);

                /*Draw Tools*/
                if (player_tools.length > 0) {
                    for (i = 0; i < player_tools.length; i++) {
                        player_tools[i].draw();
                    }
                }

                /*Draw Panel*/
                c.fillStyle = '#1f0804';
                c.fillRect(0, mapHeight + timerHeight, mapWidth, toolBarHeight);
                c.strokeStyle = "#ffd802";
                c.lineWidth = 2;
                c.strokeRect(0, mapHeight + timerHeight, mapWidth, toolBarHeight);

                /*Draw Level*/
                var textLine = mapHeight + 50;
                c.textAlign = 'center';
                c.fillStyle = '#ffd700';
                c.fillRect(mapWidth - 100, textLine, 100, 40);

                var sample_text = "Level " + gameLevel;
                var text = sample_text.split("").join("");
                textLine += 25;
                c.font = 'lighter italic 15pt Calibri';
                c.textAlign = 'center';
                c.fillStyle = '#000';
                c.fillText(text, mapWidth - 50, textLine);

                if (timerMode == "setup") {
                    /*Draw fast attack*/
                    var centerX = mapWidth - 50;
                    var centerY = textLine + 60;
                    var radius = 35;

                    c.beginPath();
                    c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    c.fillStyle = '#2FAB0C';
                    c.fill();
                    c.lineWidth = 2;
                    c.strokeStyle = '#003300';
                    c.stroke();

                    if (mouse.x < (centerX + radius * 2 + mapStartX) && mouse.x > (centerX - radius) + mapStartX) {
                        if (mouse.y < (centerY + radius * 2 + mapStartY) && mouse.y > (centerY - radius) + mapStartY) {

                            if (upX < (centerX + radius * 2 + mapStartX) && upX > (centerX - radius) + mapStartX) {
                                if (upY < (centerY + radius * 2 + mapStartY) && upY > (centerY - radius) + mapStartY) {
                                    upX = 0;
                                    upY = 0;
                                    changeMode();
                                    soundPlay("click");
                                }
                            }
                            c.beginPath();
                            c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                            c.fillStyle = '#74dc54';
                            c.fill();
                            c.lineWidth = 2;
                            c.strokeStyle = '#003300';
                            c.stroke();
                        }
                    }

                    c.beginPath();
                    c.moveTo(centerX - 5, centerY - 15);
                    c.lineTo(centerX - 5, centerY + 5);
                    c.lineTo(centerX + 5, centerY - 5);
                    c.fillStyle = '#000';
                    c.fill();
                    c.font = 'lighter italic 8pt Calibri';
                    c.textAlign = 'center';
                    c.fillStyle = '#000';
                    c.fillText("Attack", centerX, centerY + 15);
                } else {
                    /*Draw faster move*/
                    var centerX = mapWidth - 50;
                    var centerY = textLine + 60;
                    var radius = 35;

                    c.beginPath();
                    c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    c.fillStyle = '#C60048';
                    c.fill();
                    c.lineWidth = 2;
                    c.strokeStyle = '#c60048';
                    c.stroke();

                    if (mouse.x < (centerX + radius * 2 + mapStartX) && mouse.x > (centerX - radius) + mapStartX) {
                        if (mouse.y < (centerY + radius * 2 + mapStartY) && mouse.y > (centerY - radius) + mapStartY) {

                            if (upX < (centerX + radius * 2 + mapStartX) && upX > (centerX - radius) + mapStartX) {
                                if (upY < (centerY + radius * 2 + mapStartY) && upY > (centerY - radius) + mapStartY) {
                                    upX = 0;
                                    upY = 0;
                                    //replay = true;
                                    playFaster();
                                    soundPlay("click");
                                }
                            }
                            c.beginPath();
                            c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                            c.fillStyle = '#f69ea1';
                            c.fill();
                            c.lineWidth = 2;
                            c.strokeStyle = '#c60048';
                            c.stroke();
                        }
                    }

                    c.beginPath();
                    c.moveTo(centerX - 5, centerY - 15);
                    c.lineTo(centerX - 5, centerY + 5);
                    c.lineTo(centerX + 5, centerY - 5);
                    c.fillStyle = '#000';
                    c.fill();
                    c.font = 'lighter italic 8pt Calibri';
                    c.textAlign = 'center';
                    c.fillStyle = '#000';
                    c.fillText("Rate", centerX, centerY + 15);
                    var rateNow = 50 / frameRate;
                    c.fillText(rateNow + "x", centerX, centerY + 25);
                }

                if (!gameEnd)
                /*Draw Boxes*/
                    drawAllBoxes();

                /*Draw Active Grid*/
                for (i = 0; i < grids.length; i++) {
                    grids[i].draw();
                }

                if (isDragging) {
                    drawDragging();
                }

                if (timerMode == "attack") {
                    /*Draw Invaders*/
                    drawAllInvaders();

                    if (checkIfAnyInvadersArrived()) {
                        win = false;
                        gameEnd = true;
                    }
                    else if (secondCount == 1) { //1 second
                        for (i = 0; i < invaders.length; i++) {
                            var currentGrid = grids[invaders[i].gridIndex];
                            //if (currentGrid.occupied == true) {
                            if (currentGrid.occupant.toString() == "glue")
                                invaders[i].encounterGlue(currentGrid.occupant);

                            else if (currentGrid.occupant.toString() == "sewage")
                                invaders[i].encounterSewage(currentGrid.occupant);

                            // else if (currentGrid.invaderExists == true)
                            //     detectFront(invaders[i]);
                            //}

                            else
                                detectFront(invaders[i]);
                        }
                    }
                }
                    if (!gameEnd) {
                        secondCount--;
                    }
            if (timer.remainingTime == -1 && timerMode == "attack") {
                if (!checkIfAnyInvadersArrived())
                    win = true;
                gameEnd = true;
            }
            if (gameEnd) {
                gameEndAnimation();
                // determined to replay
                if (replay == true) {
                    //replay
                    if (win == true) {
                        // next lv
                        startNextLv();
                        replay = false;
                        win = false;
                        gameEnd = false;
                    } else {
                        // retry this lv
                        retryThisLv();
                        replay = false;
                        win = false;
                        gameEnd = false;
                    }
                    // win=false;
                    //startNewGame();
                }
            }

            //check if fast end
            if (gameEnd)
                frameRate = 50;
        }}
    , frameRate);

}

newGame();
