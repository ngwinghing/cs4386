/**
 * Created by ngwinghing on 25/11/2017.
 */

//timer = new Timer("play");

secondCount = 0;

//console.log(random);

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

            c.drawImage(map, 0, mapStartY, mapWidth, mapHeight);

/*            for (i=0; i<grids.length; i++) {
                grids[i].draw();
            }*/

            if (invaders.length > 0)
                for(i=0; i<invaders.length; i++) {
                    invaders[i].draw();
                }            

            if (player_tools.length > 0)
                for(i=0; i<player_tools.length; i++) {
                    play_tools[i].draw();
                }

            if (secondCount == 10 && timer.started == true) //0.5 second
                for(i=0; i<invaders.length; i++) {
                    if (grids[invaders[i].gridIndex].occupied == true) {
                        if (grids[invaders[i].gridIndex].occupant.toString() === "glue")
                            invaders[i].encounterGlue(grids[invaders[i].gridIndex].occupant);

                        else if (grids[invaders[i].gridIndex].occupant.toString() === "sewage")
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