
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
secondStage = true;

timer = new Timer("setup");

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
                        this.occupant = upObject;
                        if (this.occupant == "Umbrella")
                            player_tools.push(new Umbrella(this.gridIndex));
                        else if (this.occupant == "Glue")
                            player_tools.push(new Glue(this.gridIndex));
                        else if (this.occupant == "Barrier")
                            player_tools.push(new Barrier(this.gridIndex));
                        this.occupied = true;
                        upObject = "";
                    }
				}
            }
        }
	};
}

for (var i=0; i<160; i++) {
    grids.push(new grid(i));
}

/*function setGrids()  {

}
*/
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
	console.log(grids[gridIndex].occupied);
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 1;
	this.detectable = true;

    this.img = new Image()
	this.img.src = "img/umbrella.png";

    grids[gridIndex].occupied = true;
    grids[gridIndex].occupant = this;
    console.log(grids[gridIndex].occupant);

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
		c.drawImage(this.img, this.tileX * tileSize, mapStartY+5 + this.tileY * tileSize+5, 32, 32);
	};
}


/*function bomb(gridIndex) {
	//this.frames = [??];
	this.area = [gridIndex-11, gridIndex-10, gridIndex-9, gridIndex-1, gridIndex, gridIndex+1];

	this.draw = function() {

	};
}*/

function Timer(type) {
    var basicTime;
    if (type == "setup") {
        basicTime = 1; //should be 30
    } else {
        // attack
        basicTime = 60;
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

        else if (secondStage == true) {
        	timer = new Timer("play");
        	// genarate invaders
			generateNewPolice(1);

        	secondStage = false;
        }
    }
}
