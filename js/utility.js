
/*function i2xy(index) {
    var x = index % mapWidth;
    var y = Math.floor(index/mapWidth);

    return [x,y];
}

function xy2i (x, y, mapWidth) {
    return y*mapWidth +x;
}*/

grids = [];
player_tools = [];
invaders = [];
invaders_bombs = [];
gameLevel = 1;
bomb_img = new Image();
bomb_img.src = "img/bomb.png";
explode_img = new Image();
explode_img.src = "img/explode.png";

function emptyGame() {
   for (var i =0; i< grids.length; i++) {
      var grid = grids[i];
      if (grid.occupied) {
          grid.occupied = false;
          grid.occupant = "none";
      }
    }
    resetMode();
    resetAllBoxes();
   player_tools = [];
   invaders = [];
    generateRandomTool("umbrella",Math.floor(Math.random()*(10-gameLevel))+1);
    generateRandomTool("sewage",Math.floor(Math.random()*(10-gameLevel))+1);
}

function startNewGame() {
    generateRandomTool("umbrella",Math.floor(Math.random()*(10-gameLevel))+1);
    generateRandomTool("sewage",Math.floor(Math.random()*(10-gameLevel))+1);
    generateNewPolice(gameLevel);
    firstStart = false;
}

function startNextLv() {
    emptyGame();
    gameLevel++;
    generateNewPolice(gameLevel);
}

function retryThisLv() {
    emptyGame();
    generateNewPolice(gameLevel);
}

Up=1;
Down=2;
Front=3;

function grid(gridIndex) {
	this.gridIndex = gridIndex;
	this.x = (Math.floor(gridIndex/10)+2)*tileSize;
	this.y = gridIndex%10*tileSize;
	this.occupied = false; //for both player_tools & police

	/*must have 2 separate variable to check if they are overlapped in gameFrame.js*/
	this.occupant = "none"; //only for player_tool
	this.invaderExists = false; //only for invader: whether invader exists

	this.active = false;

	this.draw = function() {
		/*c.font = "20px Arial";
		c.fillStyle = "#000000";
		c.fillText(this.gridIndex, this.x, this.y+mapStartY+20);*/

		/*Draw active grid background*/
		if (mouse.x<(this.x+tileSize+mapStartX) && mouse.x>this.x+mapStartX) {
            if (mouse.y<(this.y+tileSize+mapStartY) && mouse.y>this.y+mapStartY) {
                if (isDragging) {
                	if (this.occupied == false)
                    if (draggingObject!="") {
                        c.fillStyle = "rgba(255, 255, 255, 0.5)";
                        c.fillRect(this.x, this.y+mapStartY, tileSize,tileSize);
                    }
                }
            }
        }

		/*if dragged on*/
        if (upX<(this.x+tileSize+mapStartX) && upX>this.x+mapStartX) {
            if (upY < (this.y + tileSize + mapStartY) && upY > this.y + mapStartY) {
            	if (upObject!="") {
            		if (this.occupied == false) {
            		    used=upObject;
                        this.occupant = upObject;
                        if (this.occupant == "Umbrella")
                            player_tools.push(new Umbrella(this.gridIndex));
                        else if (this.occupant == "Glue")
                            player_tools.push(new Glue(this.gridIndex));
                        else if (this.occupant == "Barrier")
                            player_tools.push(new Barrier(this.gridIndex));
                        else if (this.occupant == "Sewage")
                            player_tools.push(new Sewage(this.gridIndex));
                        this.occupied = true;
                        upObject = "";
                        upX=0;
                        upY=0;
                    }
				}
            }
        }
	};
}

for (var i=0; i<160; i++) {
    grids.push(new grid(i));
}

function Sewage(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
    this.currentFrames = [3];
    this.detectable = false;

    this.sprite = new Sprite("img/sewage.png", 5, 4);


    grids[gridIndex].occupied = true;
    grids[gridIndex].occupant = this;

/*	this.open = function() {
        this.currentFrames = [1];
	};*/

	this.beingAttacked = function() {
		this.currentFrames = [1];
		grids[this.gridIndex].occupied = false;
		grids[this.gridIndex].occupant = "none";
	};

	this.toString = function() {
		return "sewage";
	};

	this.draw = function() {
        this.sprite.drawAnimated(this.tileX * tileSize+5, mapStartY + this.tileY * tileSize+5, this.currentFrames);
	};
}

function Barrier(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 3;
	this.detectable = true;

    this.img = new Image()
    this.img.src = "img/barrier.png";

    grids[gridIndex].occupied = true;
    grids[gridIndex].occupant = this;

	this.beingAttacked = function() {
		this.life--;

		if (this.life == 0) {
			var index = player_tools.indexOf(this);
			player_tools.splice(index, 1);
			grids[this.gridIndex].occupied = false;
			grids[this.gridIndex].occupant = "none";
		}
	};

	this.toString = function() {
		return "barrier";
	};

	this.draw = function() {
        c.drawImage(this.img, this.tileX * tileSize, mapStartY+5 + this.tileY * tileSize+5, 32, 32);
	};
}

function Glue(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 3;
	this.detectable = false;
    this.img = new Image();
    this.img.src = "img/glue.png";

    grids[gridIndex].occupied = true;
    grids[gridIndex].occupant = this;

	this.beingAttacked = function() {
		this.life--;

		if (this.life == 0) {
			var index = player_tools.indexOf(this);
			player_tools.splice(index, 1);
			grids[this.gridIndex].occupied = false;
			grids[this.gridIndex].occupant = "none";
		}

	};

	this.toString = function() {
		return "glue";
	};

	this.draw = function() {
        c.drawImage(this.img, this.tileX * tileSize+5, mapStartY + this.tileY * tileSize+5, 32, 32);
	};
}

function Umbrella(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 1;
	this.detectable = true;

    this.img = new Image();
	this.img.src = "img/umbrella.png";

    grids[gridIndex].occupied = true;
    grids[gridIndex].occupant = this;

	this.beingAttacked = function() {
		var index = player_tools.indexOf(this);
		player_tools.splice(index, 1);
		grids[this.gridIndex].occupied = false;
		grids[this.gridIndex].occupant = "none";
	};

	this.toString = function() {
		return "umbrella";
	};

	this.draw = function() {
		c.drawImage(this.img, this.tileX * tileSize, mapStartY + this.tileY * tileSize+5, 32, 32);
	};
}


function Bomb(gridIndex) { //invaders_bombs

	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.area = [gridIndex-11, gridIndex-10, gridIndex-9, gridIndex-1, gridIndex, gridIndex+1];
	this.drawArea = [[this.tileX-1, this.tileY-1], [this.tileX-1, this.tileY], [this.tileX-1, this.tileY+1], [this.tileX, this.tileY-1], [this.tileX, this.tileY], [this.tileX, this.tileY+1]];
	
	c.drawImage(bomb_img, this.drawArea[4][0] * tileSize+5, mapStartY + this.drawArea[4][1] * tileSize+5, 32, 32);

	for (var i=0; i<6; i++) {
		c.drawImage(explode_img, this.drawArea[i][0] * tileSize+5, mapStartY + this.drawArea[i][1] * tileSize+5, 32, 32);
	}


	for(var i=0; i<6; i++) {
		var affected_player_tool = grids[this.area[i]].occupant;

		if (affected_player_tool.toString() != "none") {
			var index = player_tools.indexOf(affected_player_tool);
			player_tools.splice(index, 1);
			grids[this.area[i]].occupied = false;
			grids[this.area[i]].occupant = "none";
		}
	}
}

function generateRandomTool(toolName,quantity) {
    var random;
    var previous=[];
    for (var i=0; i<grids.length;i++) {
        if (grids[i].occupied)
            previous.push(i);
    }
    var exist = false;

    for (var i = 0; i<quantity; i++) {
        do {
            exist = false;
            random = Math.floor(Math.random() * (grids.length-20));
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
        if (toolName == "umbrella")
            player_tools.push(new Umbrella(random));
        else if (toolName == "sewage")
            player_tools.push(new Sewage(random));

    }
}
