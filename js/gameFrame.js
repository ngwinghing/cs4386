//timer = new Timer("play");

secondCount = 0;

function topBotAttackOrWalk(invader){
    //front has an obstacle
    if (invader.tileY==0 && !grids[invader.gridIndex+1].occupied &&
        !grids[invader.gridIndex-10+1].occupied) 
        invader.walk(Down);

    //check if bot row
    else if (invader.tileY==9 && !grids[invader.gridIndex-1].occupied &&
        !grids[invader.gridIndex-10-1].occupied)
        invader.walk(Up);
    
    else
        invader.useRod();
}
    
function middleAttackOrWalk(invader) {
    //front has an obstacle
    //both grids occupied, use weapon
    var obstacleCount = 0;
    if (grids[invader.gridIndex-9].occupied && grids[invader.gridIndex-11].occupied) {
        for(i=0;i<10;i++)
            //retrieve front col from top to bottom
            if (grids[(Math.floor(invader.gridIndex/10)*10)+i].occupied) 
                obstacleCount++;

        /*-----------original code-----------
        //use bomb when there are more than 9 obstacle 
        if (obstacleCount >= 9 && invader.numberOfBomb > 0)
            invader.useBomb();
        //obstacleCount is 3 to 8
        else invader.useRod();
        -----------------------------------*/
        invader.useRod();
    }

    //both 1 grid up and downward are empty
    else if (!grids[invader.gridIndex-9].occupied && !grids[invader.gridIndex-11].occupied) {
        if (invader.tileY >= 5) //more space downwards
            invader.walk(Down);

        else
            invader.walk(Up);
    }
    //1 grid upward is empty
    else if (grids[invader.gridIndex-9].occupied)
        invader.walk(Up);

    //1 grid downward is empty
    else 
        invader.walk(Down);
}

function detectFront(invader) {
    //walk if grid in front is empty
    if (!grids[invader.gridIndex-10].occupied)
        invader.walk(Front);

    //check if top or bottom row
    else if (invader.tileY == 0 || invader.tileY == 9)
        topBotAttackOrWalk(invader);
    
    //middle rows
    else 
        middleAttackOrWalk(invader);        
}

function newGame() {
    // policeArray = [];
    //
    // for (var i = 0; i < 100; i++) {
    //     var radius = 50;
    //     var x = Math.random() * (innerWidth - radius * 2) + radius;
    //     var y = Math.random() * (innerHeight - radius * 2) + radius;
    //     var dx = (Math.random() - 0.5) * 8;
    //     var dy = (Math.random() - 0.5) * 8;
    //     policeArray.push(new Police(x, y, dx, dy, radius));
    // }

    // var police = new Police(200, 200, 4, 4, 60);

    setInterval(
        function() {
            //requestAnimationFrame(animate);

            //c.clearRect(0, 0, innerWidth, innerHeight);

            // c.fillRect(100,100, 100, 100);
            if (secondCount == 0) { //1 second
                timer.draw();
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
            var box1 = new Box("umbrella");
            box1.draw();

            // for (i=0; i<grids.length; i++) {
            //     grids[i].draw();
            // }

            if (player_tools.length > 0)
                for(i=0; i<player_tools.length; i++) {
                    player_tools[i].draw();
                }


            if (invaders.length > 0)
                for(i=0; i<invaders.length; i++) {
                    invaders[i].draw();
                }

            if (secondCount == 20 && timer.started == true) //0.5 second
                for(i=0; i<invaders.length; i++) {
                    if (grids[invaders[i].gridIndex].occupied == true) {
                        if (grids[invaders[i].gridIndex].occupant.toString() == "glue")
                            invaders[i].encounterGlue(grids[invaders[i].gridIndex].occupant);

                        else if (grids[invaders[i].gridIndex].occupant.toString() == "sewage")
                            invaders[i].encounterSewage(grids[invaders[i].gridIndex].occupant);
                    }

                    else 
                        detectFront(invaders[i]);
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