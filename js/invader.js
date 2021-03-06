function Invader(tileY) {
    this.gridIndex = 150+tileY;
    this.tileX = 17;
    this.tileY = tileY;
    this.currentFrames = [1,2,3,4]; //stand
    this.numberOfBomb = 2;

    this.sprite = new Sprite("img/officer.png", 5, 7);

    this.walk = function(direction) {
        grids[this.gridIndex].occupied = false;
        grids[this.gridIndex].invaderExists = false;

        if (direction == Up){
            this.gridIndex--;
            this.tileY--;
        }

        else if (direction == Down){
            this.gridIndex++;
            this.tileY++;
        }

        else{ //Front
            this.gridIndex-=10;
            this.tileX--;
        }

        grids[this.gridIndex].occupied = true;
        grids[this.gridIndex].invaderExists = true;
        this.currentFrames = [50, 51, 52, 53];
    }

    this.stay = function() {
        //do nothing
    };

    this.useBomb = function() {
       var bomb = new Bomb(this.gridIndex-10);
        this.numberOfBomb--;
    };

    this.useRod = function (){
        grids[this.gridIndex-10].occupant.beingAttacked();
        this.currentFrames = [57,58,59,60];
        soundPlay("crashing");
    };

    this.encounterGlue = function(glue) {
        glue.beingAttacked();
        this.currentFrames = [98,99,100,101];
        this.stay();
        soundPlay("glue_stuck");
    };

    this.encounterSewage = function(sewage) {
        sewage.beingAttacked();
        var index = invaders.indexOf(this);
        invaders.splice(index, 1, new Invader(this.tileY));
        soundPlay("falling_sewage");
    };

    this.toString = function() {
        return "invader";
    };

    this.draw = function() {
        if (this.tileX >= 2 && this.tileX <= 17) {
            if (this.tileY>=0 && this.tileY<=9)
                this.sprite.drawAnimated(this.tileX * tileSize, mapStartY + this.tileY * tileSize, this.currentFrames);
        }
    }
}

function generateNewPolice(numberOfPolice){
    var random;
    var previous=[];
    var exist = false;

    for (var i = 0; i<numberOfPolice; i++) {
        do {
            exist = false;
            random = Math.floor(Math.random() * 10);
            if (previous.length >0) {
                for (var j = 0; j < previous.length; j++) {
                    var pointer = previous[j];
                    if (random === pointer) {
                        exist = true;
                    }
                }
            }
        } while (exist);
        previous.push(random);
        invaders.push(new Invader(random));
    }
}

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
    if (grids[invader.gridIndex-9].occupied && grids[invader.gridIndex-11].occupied ||
        grids[invader.gridIndex-1].occupied && grids[invader.gridIndex+1].occupied) {
        for(i=0;i<10;i++)
            //retrieve front col from top to bottom
            if (grids[(Math.floor(invader.gridIndex/10)*10-10)+i].occupied)
                obstacleCount++;
        console.log(obstacleCount);

        var random=Math.floor(10*Math.random()); //Random number for below probability calculation.
        var random2=Math.floor(10*Math.random());

        //use bomb when there are more than 9 obstacle
         if ((obstacleCount >= 5 && invader.numberOfBomb > 0)) { //Match specific requirement + 60% (0-5/10) probability.
            invader.useBomb();
            console.log("bomb");
         }
         //obstacleCount is 1 to 8
         else if(random2<8){invader.useRod();}  //80% probability of using rod.

    }

    //both 1 grid up and downward are empty
    else if (!grids[invader.gridIndex-9].occupied && !grids[invader.gridIndex-11].occupied) {
        if (invader.tileY < 5 && !grids[invader.gridIndex+1].occupied)
            if (!grids[invader.gridIndex+1].occupant.detectable) //more space downwards and path is available
                invader.walk(Down);

        else if (!grids[invader.gridIndex-1].occupied)
            if(!grids[invader.gridIndex-1].occupant.detectable)
            invader.walk(Up);

        else invader.useRod();
    }
    //1 grid upward is empty
    else if (!grids[invader.gridIndex-11].occupied && !grids[invader.gridIndex-1].occupied)
        if (!grids[invader.gridIndex-1].occupant.detectable)
        invader.walk(Up);

    //1 grid upward is empty
    else invader.useRod();
}

/*function middleAttackOrWalk(invader) {
    //front has an obstacle
    //both grids occupied, use weapon
    var obstacleCount = 0;
    var occupiedGirdCount = 0;

    if (grids[invader.gridIndex-9].occupied) occupiedGirdCount++;
    if (grids[invader.gridIndex-11].occupied) occupiedGirdCount++;
    if (grids[invader.gridIndex+1].occupied) occupiedGirdCount++;
    if (grids[invader.gridIndex-1].occupied) occupiedGirdCount++;

    if (occupiedGirdCount > 1) {
        for(i=0;i<10;i++)
            //retrieve front col from top to bottom
            if (grids[(Math.floor(invader.gridIndex/10)*10-10)+i].occupied) {
                obstacleCount++;
                console.log("obsCount: "+obstacleCount);
            }


        //-----------original code-----------
         //use bomb when there are more than 9 obstacle
        var random=Math.floor(10*Math.random());

        if ((obstacleCount > 8 && invader.numberOfBomb > 0)&& random<6) { //Match specific requirement + 60% 0-6/10 probability.
            invader.useBomb();
        }

         //obstacleCount is 1 to 8
        else
            invader.useRod();
         //-----------------------------------
        //invader.useRod();
    }

    else if (!grids[invader.gridIndex-9].occupied && !grids[invader.gridIndex-11].occupied) {
        if (invader.tileY > 4) { //more space downwards and path is available
            if (!grids[invader.gridIndex-1].occupied)
                invader.walk(Up);
            else
                invader.walk(Down);
        }

        else {
            if (!grids[invader.gridIndex+1].occupied)
                invader.walk(Down);
            else
                invader.walk(Up);
        }
    }

    else if (!grids[invader.gridIndex+1].occupied && !grids[invader.gridIndex-1].occupied) {
        if (!grids[invader.gridIndex-9].occupied)
            invader.walk(Down);

        else if (!grids[invader.gridIndex-11].occupied)
            invader.walk(Up);
    }

    // //1 grid downward is empty
    // else if (!grids[invader.gridIndex-11].occupied && !grids[invader.gridIndex+1].occupied)
    //     invader.walk(Up);

    // //1 grid upward is empty
    // else
    //     invader.walk(Down);
}*/

function detectFront(invader) {
    //walk if grid in front is empty
    var frontGrid = grids[invader.gridIndex-10];
    if (!frontGrid.occupied)
        invader.walk(Front);

    else if (frontGrid.occupied)
        if (!frontGrid.occupant.detectable)
            invader.walk(Front);

    //check if top or bottom row
    else if (invader.tileY == 0 || invader.tileY == 9)
        topBotAttackOrWalk(invader);

    //middle rows
    else
        middleAttackOrWalk(invader);
}

function drawAllInvaders() {
    for (var i = 0; i < invaders.length; i++) {
        var invader = invaders[i]
        invader.draw();
    }
}

function checkIfAnyInvadersArrived() {
    if (invaders.length >0) {
    for (var i = 0; i < invaders.length; i++) {
        var invader = invaders[i]
        if (invader.gridIndex <10)
            return true;
    }
    }
    return false;
}

