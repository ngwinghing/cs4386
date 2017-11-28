secondCount = 0;

function newGame() {
    setInterval(
        function() {
            c.clearRect(0, 0, innerWidth, innerHeight);

            /*Draw Timer*/
            timer.draw();
            if (secondCount == 0) { //1 second
                timer.remainingTime--;
                secondCount=20;
            }

            /*Draw Map*/
            c.drawImage(map, 0, mapStartY, mapWidth, mapHeight);

            /*Draw Panel*/
            c.fillStyle = '#1f0804';
            c.fillRect(0,mapHeight+timerHeight,mapWidth, toolBarHeight);
            c.strokeStyle = "#ffd802";
            c.lineWidth= 2;
            c.strokeRect(0,mapHeight+timerHeight,mapWidth, toolBarHeight);

            /*Draw Boxes*/
            drawAllBoxes();

            if (isDragging) {
                drawDragging();
            }

            for (i=0; i<grids.length; i++) {
                grids[i].draw();
            }

            if (player_tools.length > 0)
                for(i=0; i<player_tools.length; i++) {
                    player_tools[i].draw();
                }

            /*Draw Invaders*/
            drawAllInvaders();

            if (secondCount == 20 && timer.started == true) { //1 second
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

            secondCount--;
            // animated
            //police.drawAnimated(100,100,[1,2,3,4]); //stand
            //police.drawAnimated(400,400,[8,9,10,11]); // walk
            //police.drawAnimated(400,400,[15,16,17,18]); // jump

            // btn.update();
            // btn.render();

            // // Mouse coordinates fall inside dog sprite
            // if (dog.pointInside(Mouse.x, Mouse.y))
            //     DoSomething();

            // if (A.intersect(B) == DO_INTERSECT) {
            //     var px = window.int_x;
            //     var py = window.int_y;
            // }
            // for (var i = 0; i < policeArray.length; i++) {
            //     policeArray[i].update();
            // }

        }
    , 50);
}

newGame();
