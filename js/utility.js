
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
	this.occupied = false; //only for player_tools, not police
	this.occupant = "none"; //player_tool: 1) sewage 2)glue

	this.draw = function() {
		c.font = "20px Arial";
		c.fillStyle = "#000000";
		c.fillText(grids[i].gridIndex, this.x, this.y+mapStartY+20);
	};
}

/*function setGrids()  {

}
*/
function Sewage(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
    this.currentFrames = [3];

    this.sprite = new Sprite("img/sewage.png", 5, 4);

	this.open = function() {
        this.currentFrames = [1];
	};

	this.beingAttacked = function() {
		// var index = player_tools.indexOf(this);
		// player_tools.splice(index, 1);
		// this.img.src = "covered_sewage";
		grids[this.gridIndex].occupied = false;
		grids[this.gridIndex].occupant = "none";
	};

	this.toString = function() {
		return "sewage";
	};

	this.draw = function() {
        this.sprite.drawAnimated(this.tileX * tileSize, mapStartY + this.tileY * tileSize, this.currentFrames);
	};

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
}

function Barrier(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 3;
	//this.img = ??

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
		//c.drawImage(this.img, );
	};

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
}

function Glue(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 3;
	//this.img = ??

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
		//c.drawImage(this.img, );
	};

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
}

function Umbrella(gridIndex) {
	this.gridIndex = gridIndex;
	this.tileX = Math.floor(gridIndex/10)+2;
	this.tileY = gridIndex%10;
	this.life = 1;

    this.img = new Image()
	this.img.src = "img/umbrella.png";

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
		c.drawImage(this.img, this.tileX * tileSize, mapStartY + this.tileY * tileSize, 32, 32);
	};

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
	//console.log(grids[gridIndex].occupant);
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
            c.fillText(this.remainingTime, 5, 22);

            this.started = true;
        }

        else if (secondStage == true) {
        	timer = new Timer("play");
        	// genarate invaders
			generateNewPolice(3);

        	secondStage = false;
        }
    }
}

for (var i=0; i<160; i++) {
   	grids.push(new grid(i));
}
