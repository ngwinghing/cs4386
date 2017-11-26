//move to gameFream.js already

/*function topBotAttackOrWalk(invader){
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

		-----------original code-----------
		//use bomb when there are more than 9 obstacle 
		if (obstacleCount >= 9 && invader.numberOfBomb > 0)
			invader.useBomb();
		//obstacleCount is 3 to 8
		else invader.useRod();
		-----------------------------------
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
}*/