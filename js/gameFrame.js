/**
 * Created by ngwinghing on 25/11/2017.
 */
function init() {
    var police = new Sprite("img/officer.png");
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
        function animate() {
            requestAnimationFrame(animate);

            c.clearRect(0, 0, innerWidth, innerHeight);

            // c.fillRect(100,100, 100, 100);

            timer.draw(9);
            c.drawImage(map, 0, mapStartY, mapWidth, mapHeight);

            var tilemapX = Math.floor((mouse.x - mapStartX) / tileSize);
            var tilemapY = Math.floor((mouse.y - mapStartY) / tileSize);
            console.log(tilemapX, tilemapY);

            if (tilemapX>=2 && tilemapY<=9 && tilemapY>=0) {
                police.drawAnimated(tilemapX * tileSize,mapStartY + tilemapY * tileSize,[15,16,17,18]); // jump
                // c.fillStyle = 'rgba(255,0,0,0.3)';
               // c.fillRect(tilemapX * tileSize, mapStartY + tilemapY * tileSize, tileSize, tileSize);
            }

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
    ),60;
}

init();