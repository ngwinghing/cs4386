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

var btn = new Image();
btn.src= "img/btn.png";

var start_1 = new Image();
start_1.src= "img/start_1.jpg";

var soundEffect = document.getElementById("soundEffect");;
var soundClick = "./mp3/click.mp3";
