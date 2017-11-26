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
	
function middleAttackOrWalk(invader){
	//front has an obstacle
	//both grids occupied, use weapon
	if (grids[this.PositionNum-10+1].occupied && grids[this.PositionNum-10+1].occupied)
	{
		obstacleCount=0;
		for(i=0;i<10;i++)
			//retrieve front col from top to bottom
			if (grids[(Math.floor(this.Position/10)*10)+i].occupied) 
				obstacleCount++;
		//use bomb when there are more than 9 obstacle 
		if (obstacleCount>=9||this.BombCount>0)
			invader.useBomb();
		//obstacleCount is 3 to 8
		else invader.useRod();
	}
	//both 1 grid up and downward are empty
	else if (!grids[this.PositionNum-10+1].occupied && !grids[this.PositionNum-10+1].occupied)
	{
		if (this.PositionNum%10>=5) {//more space downwards
			walk(Down);
			walk(Front);
		}
		else{
			walk(Up);
			walk(Front);
		}
	}
	//1 grid upward is empty
	else if (!grids[this.PositionNum-10+1].occupied){
		walk(Up);
		walk(Front);
	}
	//1 grid downward is empty
	else {
		walk(Down);
		walk(Front);
	}
}

function detectFront(invader) {
    //walk if grid in front is empty
    if (!grids[invaders[i].gridIndex].occupied || grids[invaders[i].gridIndex].occupant === "sewage" || grids[invaders[i].gridIndex] == "glue")
        invaders[i].walk(Front);

    //check if top or bot row
    else if (invaders[i].tileY == 0 || invaders[i].tileY == 9)
        topBotAttackOrWalk(invader);
    
    //middle row
    else middleAttackOrWalk(invader);		
}


