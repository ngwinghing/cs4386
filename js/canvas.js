var canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 800;

var tileSize = 44.4;

var timerHeight = 30;
var toolBarHeight = 150;
var mapStartX = (innerWidth-canvas.width)/2;
var mapStartY = timerHeight +1 ;
var mapWidth = canvas.width;
var mapHeight = mapWidth/1.8;

var c = canvas.getContext('2d');

var map = new Image();
map.src= "img/tmp_bg.jpg";

var howToPlayImg = new Image();
howToPlayImg.src= "img/howToPlay_final.png";

//soundBackground
var soundBackground = document.getElementById("soundBackground");;

var soundEffect = document.getElementById("soundEffect");;
var soundClick = "./mp3/click.mp3";
var soundPreBg = "./mp3/pretime_background.mp3";
var soundAttackBg = "./mp3/attack_background.mp3";
var soundCrashing = "./mp3/crashing.mp3";
var soundFallingSewage = "./mp3/falling_sewage.mp3";
var soundGlue_stuck = "./mp3/glue_stuck.mp3";
