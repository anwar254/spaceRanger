// core variables
var  widthX = window.innerWidth;
var  heightY = window.innerHeight-20;
var enemies, spaceShip, gunsound;
var y = 0;
var enemNo = 20;
var scores = 0;

var enem = new Array();
var detectcol;
var gameStatus = "Game Over";
var range = [100, 160];

function Enemies(y){
	this.x = Math.floor(Math.random() * width);
	this.y = 0 ;
	this.dy = random(0.5, 2);

	this.draw = function(){
		// fill(0, 0, 255);
		// ellipse(this.x, this.y, 30, 30);

		image(enemie, this.x, this.y);
	}

	this.update = function(){
		this.y += this.dy;
	}

	return this.y;
}

var player = {
	diameter: 30,
	x : widthX / 2,
	y : heightY - 65 ,
	dy : 1,

	draw : function(){
		// fill(0, 255, 0);
		// ellipse(this.x, this.y, this.diameter, this.diameter);
		image(spaceShip, this.x, this.y);
	}
}


var shoot = new Array();

// Bullet object
function Shoot(I){
	I.active = true;
	I.x = player.x + player.diameter / 2;
	I.y = player.y + player.diameter / 2;
	I.Height= 5;
	I.Width = 3;
	I.yVelocity=10;
	I.inBound = () => {
		return I.y >=0 && I.y <= window.innerHeight - I.Height;
	}
	I.draw = () => {
		 fill(255, 0, 0);
		 ellipse(I.x, I.y, I.Width, I.Height);

	}
	I.update = function (){
		I.activate = I.activate && I.inBound;
		I.y -= I.yVelocity;
	}

	return I;
}
//initializing p5 js
function setup(){
  	var cnv = createCanvas(widthX, heightY);
  	const bdy =  document.querySelector('body');

  	bdy.style.margin = 0;
  	bdy.style.padding = 0;

	spaceShip = loadImage("script/images/spaceShip.png");
	enemie = loadImage("script/images/enemies.png");

	// soundFormats('mp3', 'ogg');
	//
	// gunsound = loadSound("script/sounds/Shooting An MP5-SoundBible.com-704967207.mp3")

	for (var i=0; i<enemNo; i++) {
    	enem.push(new Enemies(y));
  	}

}

//drawing the shape on the canvas
function draw() {
  background(52);

	player.draw();

	for (var i=0; i<enem.length; i++) {
		enem[i].update();
		enem[i].draw();

		if(enem[i].y + player.diameter >= height){
			background(255, 0, 0);
			fill(255, 255, 255);
			textSize(30);
			text(gameStatus + "!!", width /2  -30, height / 2);
			textSize(15);
			text("Your score is:"+" "+scores, width /2 , height / 2 + 40);

			var el = enem.draw();
			el.remove();

			return enem[i].y;
		}

	}

	if(keyIsDown(37)){
		if(player.x - 10 > 0){
			player.x -= 10;
		}else{
			player.x = 0;
		}
	}

	if (keyIsDown(39)){
		if(player.x + 10 <= window.innerWidth){
			player.x += 10;
		}
	}

	if(keyIsDown(32)){
		shoot.push(Shoot({}));
	}


	shoot = shoot.filter(function(shoot){return shoot.active});

	shoot.forEach(function(shoot){
		shoot.update();
		shoot.draw();

		if(gameStatus){
				shoot.draw();
				// console.log("no update");
		}

		for (var i=0; i<enem.length; i++){
			const d = dist(shoot.x, shoot.y, enem[i].x, enem[i].y);

			if(d <= 5){
				enem.splice(i, 1);
				scores += 1;
			}
		}

	});



	fill(0, 255, 0);
	rect(10, 10, 200, 50);
	fill(255, 255, 255);
	textSize(15);
	text("Score:" + " " + scores, 70, 40);
}
