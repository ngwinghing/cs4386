/**
 * Created by ngwinghing on 25/11/2017.
 */

var Sprite = function(fn) {
    this.image = null;
    this.is_pattern = false;
    this.pattern = null;
    this.pattern_x_times = 0;
    this.load = function(filename) { this.image = new Image(); this.image.src = filename;}
    this.to_pattern = function(x_time) { this.pattern_x_times = x_times;}

    this.animationDelay = 0;
    this.animationIndexCounter = 0;
    this.animationCurrentFrame = 0;

    // load sprite
    if (fn != undefined && fn !="" && fn!= null) {
        this.load(fn);
        console.log("Load sprite" +fn);
    } else {
        console.log("Unable to load sprite: " +fn);
    }

    // normal draw
    this.draw = function (x, y) {
        c.drawImage(this.image, x, y, BLOCK_W, BLOCK_H);
    }

    this.drawAnimated = function (x, y, spriteSheetIndex) {
        if (spriteSheetIndex.length != undefined) {
            if (this.animationDelay++ >= 10) {
                this.animationDelay = 0;
                this.animationIndexCounter++;
                if (this.animationIndexCounter >= spriteSheetIndex.length) {
                    this.animationIndexCounter = 0;
                }
                this.animationCurrentFrame = spriteSheetIndex[this.animationIndexCounter];
            }
            var spriteSheetX = this.animationCurrentFrame % 7;
            var spriteSheetY = Math.floor(this.animationCurrentFrame / 7);
            c.drawImage(this.image, spriteSheetX*32, spriteSheetY*32, 32, 32,
            x, y, 32, 32
            );
        }
    }
}