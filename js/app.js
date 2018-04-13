const preset = {
	Ytop: 60,
	Ymiddle: 145,
	Ybottom: 230,
	Ypos: [60,145,230],
}

class Enemy{
	constructor(sprite  = 'images/enemy-bug.png', x= 100, y=preset.Ypos[0], speed = 1000){
	//properties
	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.speed = speed;		
	}
		update(dt){
			if (this.x < 600){
			this.x = this.x + Math.round((dt * this.speed)/10);
			// alert("x, y is currently..."+ ".."+ this.x + ".." + this.y);
			}else{//place bug back to left side of screen
				this.x = 0;
				}
		}
		render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}

// Enemies our player must avoid
//ES6 class


							// var Enemy = function() {
								// // Variables applied to each of our instances go here,
								// // we've provided one for you to get started

								// // The image/sprite for our enemies, this uses
								// // a helper we've provided to easily load images
								// this.sprite = 'images/enemy-bug.png';
							// };


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
							// Enemy.prototype.update = function(dt) {
								// // You should multiply any movement by the dt parameter
								// // which will ensure the game runs at the same speed for
								// // all computers.
							// };

							// // Draw the enemy on the screen, required method for game
							// Enemy.prototype.render = function() {
								// ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
							// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
						// var player = function(){
							// alert('trying to load canvas at start, created a player variable.');
						// }
//use ES6 classes
class Player {
	constructor(){ //properties
	}
	// methods
	handleInput(){
		//move the player depending on which key gets pressed
	}
		update(dt){}
	render(){}
	
	
}
player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enem = new Enemy();
let sprite  = 'images/enemy-bug.png';
let x = 100;
let arrayIndex = getRandomInt(0,3);
//return a whole number between "min" and "max minus one" //MDN 
function getRandomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max-min))+min;
}
//alert("getRandomInt is "+ getRandomInt(0,3));

let yFast = preset.Ypos[getRandomInt(0,3)];
let yMedium = preset.Ypos[getRandomInt(0,3)];
let speed = 1000;
slowEnemy = new Enemy(sprite, x= 100, preset.Ypos[arrayIndex], speed = 800);
mediumEnemy = new Enemy(sprite, x= 200, yMedium, speed = 1000);
fastEnemy = new Enemy(sprite, x= 300, yFast, speed = 3000);
let allEnemies = [];
allEnemies.push(slowEnemy);
allEnemies.push(mediumEnemy);

allEnemies.push(fastEnemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
