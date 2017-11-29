
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

                if(!gameEnd)
                /*Draw Boxes*/
                drawAllBoxes();

                /*Draw Active Grid*/
                for (i = 0; i < grids.length; i++) {
                    grids[i].draw();
                }

                if (isDragging) {
                    drawDragging();
                }

                /*Draw Invaders*/
                drawAllInvaders();

                if (checkIfAnyInvadersArrived()) {
                    gameEnd = true;
                }
                else if (secondCount == 0 && timer.started == true) { //1 second
                    for (i = 0; i < invaders.length; i++) {
                        if (grids[invaders[i].gridIndex].occupied == true) {
                            if (grids[invaders[i].gridIndex].occupant.toString() == "glue")
                                invaders[i].encounterGlue(grids[invaders[i].gridIndex].occupant);

                            else if (grids[invaders[i].gridIndex].occupant.toString() == "sewage")
                                invaders[i].encounterSewage(grids[invaders[i].gridIndex].occupant);
                        } else {
                            detectFront(invaders[i]);
                        }
                    }
                }

               if (!gameEnd)
                    secondCount--;
            }
            if (timer.remainingTime==-1 && timerMode=="attack") {
                if (!checkIfAnyInvadersArrived())
                    win=true;
                gameEnd = true;
            }
            if (gameEnd) {
                gameEndAnimation();
                // determined to replay
                if (replay==true) {
                    //replay
                    if (win==true) {
                        // next lv
                        startNextLv();
                        replay = false;
                        gameEnd = false;
                    } else {
                        // retry this lv
                    }
                   // win=false;
                    //startNewGame();
                }
            }
        }
    , 50);
}

newGame();
