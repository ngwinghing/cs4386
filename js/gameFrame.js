secondCount = 0;

function newGame() {
    setInterval(
        function() {
            c.clearRect(0, 0, innerWidth, innerHeight);
            if (!gameStart) {
                gameStartAnimation();
            }
            else {
                /*Draw Timer*/
                timer.draw();
                if (secondCount == 0) { //1 second
                    timer.remainingTime--;
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
                    c.fillRect(100, 100, 100, 100);
                    gameEnd = true;
                }

                else if (secondCount == 20 && timer.started == true) { //1 second
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

                if (!gameEnd)
                    secondCount--;
            }

        }
    , 50);
}

newGame();
