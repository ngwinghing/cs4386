/**
 * Created by ngwinghing on 25/11/2017.
 */

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
	this.occupied = false;
	this.occupant; player_tool: //1) sewage 2)glue

	this.draw = function() {
		c.font = "20px Arial";
		c.fillStyle = "#000000"; 
		c.fillText(grids[i].gridIndex, grids[i].x, grids[i].y+mapStartY+20);
	}
}

function sewage(tileX, tileY) {
	this.gridIndex = (tileX-2)*10+tileY;
	this.tileX = tileX;
	this.tileY = tileY;
	//this.sprite = ??

	this.open = function() {
		//change img
	};

	this.beingAttacked = function() {
		player_tools.pop(this);
		grids[girdNumber].occupied = false;
	};

	this.toString = function() {
		return "sewage";
	};

	this.draw = function() {

	};

	player_tools.push(this);
}

function barrier(tileX, tileY) {
	this.gridIndex = (tileX-2)*10+tileY;
	this.tileX = tileX;
	this.tileY = tileY;
	this.life = 3;
	//this.img = ??

	this.beingAttacked = function() {
		this.life--;

		if (this.life == 0) {
			player_tools.pop(this);
			grids[girdNumber].occupied = false;

		}
	};

	this.toString = function() {
		return "barrier";
	};	

	this.draw = function() {
		c.drawImage(this.img, );
	};

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
	player_tools.push(this);
}

function glue(tileX, tileY) {
	this.gridIndex = (tileX-2)*10+tileY;
	this.tileX = tileX;
	this.tileY = tileY;
	this.life = 3;
	//this.img = ??

	this.beingAttacked = function() {
		this.life--;

		if (this.life == 0) {
			player_tools.pop(this);
			grids[girdNumber].occupied = false;
		}

	};

		this.toString = function() {
		return "glue";
	};

	this.draw = function() {
		c.drawImage(this.img, );
	};	

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
	player_tools.push(this);
}

function umbrella(tileX, tileY) {
	this.gridIndex = (tileX-2)*10+tileY;
	this.tileX = tileX;
	this.tileY = tileY;
	this.life = 1;

	this.beingAttacked = function() {
		this.life--;

		if (this.life == 0) {
			player_tools.pop(this);
			grids[girdNumber].occupied = false;
		}
	};

	this.toString = function() {
		return "umbrella";
	};

	this.draw = function() {
		c.drawImage(this.img, );
	};

	grids[gridIndex].occupied = true;
	grids[gridIndex].occupant = this;
	player_tools.push(this);
}


/*function bomb(gridIndex) {
	//this.frames = [??];
	this.area = [gridIndex-11, gridIndex-10, gridIndex-9, gridIndex-1, gridIndex, gridIndex+1];

	this.draw = function() {

	};
}*/

function Invader(tileY) {
	this.gridIndex = 150+tileY;
	this.tileX = 17;
	this.tileY = tileY;
	this.currentFrames = [1,2,3,4]; //stand
	this.numberOfBomb = 2;

	this.sprite = new Sprite("img/officer.png", 5, 7);

	this.walk = function(direction) {
		grids[this.gridIndex].occupied = 0;
		if (direction == Up){
			this.gridIndex--;
			this.tileY--;
			//grids[this.PositionNum].occupant="police";
		}
		else if (direction == Down){
			this.gridIndex++;
			this.tileY++;
			//grids[this.PositionNum].occupant="police";
		}
		else{ //Front
			this.gridIndex-=10;
			this.tileX--;
			//grids[this.PositionNum].occupant="police";
		}

		this.currentFrames = [15,16,17,18];
	}

	this.stay = function() {

	};

	function useBomb(){
		for(i=0;i<2;i++){
			for(j=0;j<3;j++){
				grids[this.gridIndex-10*(i+1)-1+j].occupied = true;

				//grids[this.gridIndex-10*(i+1)-1+j].occupant="none";
			}
		}

		this.numberOfBomb--;
	}

	function useRod(){
		//get life
		//life = grids[this.PositionNum-10].occupant.life;
		grids[this.PositionNum-10].occupant="none";
		walk(Front);
	}

	this.encounterGlue = function(glue) {
		glue.life--;
        invaders[i].stay();
	};

	this.encounterSewage = function(sewage) {
		player_tools.pop(sewage);
		invaders.pop(this);
		grids[girdNumber].occupied = false;
		invaders.push(new Invader(Math.floor(Math.random()*10)));
	};

	this.draw = function() {
        if (this.tileX >= 2 && this.tileX <= 17) {
        	if (this.tileY>=0 && this.tileY<=9)
        	this.sprite.drawAnimated(this.tileX * tileSize, mapStartY + this.tileY * tileSize, this.currentFrames); // jump
            // c.fillStyle = 'rgba(255,0,0,0.3)';
            // c.fillRect(tilemapX * tileSize, mapStartY + tilemapY * tileSize, tileSize, tileSize);
        }

        console.log(this.tileX, this.tileY);
	};
}

function Timer(type) {
    var basicTime;
    if (type == "setup") {
        basicTime = 1; //should be 30
    } else {
        // prepare
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
            this.remainingTime--;
        }

        else if (secondStage == true) {
        	timer = new Timer("play");

        	random1 = Math.floor(Math.random()*10);
        	random2 = random1;
        	random3 = random1;

        	do {
        		random2 = Math.floor(Math.random()*10);
        	} while (random2 == random1)
        		

        	do {
        		random3 = Math.floor(Math.random()*10);
        	} while (random3 == random1 || random3 == random2)
        		
        	invaders.push(new Invader(random1));
        	invaders.push(new Invader(random2));
        	invaders.push(new Invader(random3));
        	console.log(random1);
        	console.log(random2);
        	console.log(random3);

        	timer = new Timer("play");

        	secondStage = false;
        }
    }
}

for (var i=0; i<160; i++) {
	grids.push(new grid(i));
}
