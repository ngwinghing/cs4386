
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

function Invader(tileY) {
	this.gridIndex = 150+tileY;
	this.tileX = 17;
	this.tileY = tileY;
	this.currentFrames = [1,2,3,4]; //stand
	this.numberOfBomb = 2;

	this.sprite = new Sprite("img/officer.png", 5, 7);

	this.walk = function(direction) {
		grids[this.gridIndex].occupied = false;
		
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

		//grids[this.gridIndex].occupied = true;
		//grids[this.gridIndex].occupant = this;
		this.currentFrames = [50, 51, 52, 53];
	}

	this.stay = function() {
		//do nothing
	};

	this.useBomb = function() {
		for(i=0;i<2;i++){
			for(j=0;j<3;j++){
				grids[this.gridIndex-10*(i+1)-1+j].occupied = true;

				//grids[this.gridIndex-10*(i+1)-1+j].occupant="none";
			}
		}

		this.numberOfBomb--;
	};

	this.useRod = function (){
		grids[this.gridIndex-10].occupant.beingAttacked();
		this.currentFrames = [57,58,59,60];
	};

	this.encounterGlue = function(glue) {
		grids[this.gridIndex-10].occupant.beingAttacked();
		this.currentFrames = [57];
        invaders[i].stay();
	};

	this.encounterSewage = function(sewage) {
		grids[this.gridIndex-10].occupant.beingAttacked();
		invaders.push(new Invader(Math.floor(Math.random()*10)));
	};

/*	this.toString = function() {
		return "invader";
	};*/

	this.draw = function() {
        if (this.tileX >= 2 && this.tileX <= 17) {
        	if (this.tileY>=0 && this.tileY<=9)
        	this.sprite.drawAnimated(this.tileX * tileSize, mapStartY + this.tileY * tileSize, this.currentFrames);
        }

        console.log(this.tileX, this.tileY);
	};
}

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

function Box(nameOfTools, value, boxNumber) {
    var name;
    var type; // limit / time-base
    if (nameOfTools == "umbrella") {
        type = "time";
        this.name = "Umbrella";
        this.img = new Image()
        this.img.src = "img/umbrella.png";
    } else {
        type = "limit";
        this.name = "Glue";
        this.img = new Image()
        this.img.src = "img/glue.png";
    }

    this.width = 100;
    this.height = 100;

    this.x = 40 * (boxNumber) + 90*(boxNumber -1);
    this.y = mapHeight+50;

    var rectX = this.x;
    var rectY = this.y;
    var rectWidth = 100;
    var rectHeight = 100;
    var cornerRadius = 20;

    var backgroundColor = "#4682b4";

    if (type == "time") {
        var timer;
        this.remainingTime = value;
        this.basicTime = 10;
        this.started = false;
    } else {
        var remainingValue = value;
        var centerX = rectX + 90;
        var centerY = rectY + 100;
        var radius = 18;
        backgroundColor = "#84211d";
    }

    this.draw = function() {
		c.strokeStyle = backgroundColor;
		c.lineWidth= 1;
		c.lineJoin = "round";
		c.lineWidth = cornerRadius;
		c.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
		c.fillStyle = backgroundColor;
		c.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);

		c.drawImage(this.img, rectX+20, rectY+10, 60,60);

        c.fillStyle = '#dba520';
        c.fillRect(rectX, rectY+70,rectWidth, 25);

        c.fillStyle = '#000000';
        c.font = '18px  Arial';
        c.fillText(this.name, rectX+12, rectY+88);

        if (type == "time") {
            if(this.remainingTime != -1) {
                // basic
                c.fillStyle = '#2F4F4F';
                c.fillRect(rectX,rectY+105,this.width, 15);

                // remain time
                c.fillStyle = '#DC143C';
                c.fillRect(rectX,rectY+105,(this.width * this.remainingTime/this.basicTime), 15);

                this.started = true;
                this.remainingTime--;
            } else {

			}
		}

        if (type == "limit") {
            if(remainingValue != -1) {
                c.beginPath();
                c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                c.fillStyle = '#ffd700';
                c.fill();
                c.lineWidth = 4;
                c.strokeStyle = '#84211d';
                c.stroke();

                c.fillStyle = '#000000';
                c.font = '18px  Arial';
                c.fillText(remainingValue, centerX-5, centerY+5);
            } else {

            }
        }

		if (lastX<(this.x+100) && lastX>this.x) {
            if (lastY<(this.y+100) && lastY>this.y) {

            }
		}

    }
}

for (var i=0; i<160; i++) {
   	grids.push(new grid(i));
}