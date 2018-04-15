const preset = {
	Xpos: [0,40,70,100,140,180],
	Ypos: [60,145,230], //top, middle or bottom paved lane
	speeds: [800,1000,2000],
}

let allEnemies = [];
let enemyImage  = 'images/enemy-bug.png'; //leaving "enemyImage" outside preset array for readability
let playerImage  = 'images/char-boy.png'; //may offer player chance to change his/her sprite in future
let x = 300; //horizontal co-ordinate of sprites
let y = 300; //vertical co-ordinate of sprites
let speed = 800; 

//sprites are images of the enemies and the player
class Sprite{
		//The image for our sprites uses a helper to quickly load images
	constructor(spriteImage  = 'images/enemy-bug.png', x= 100, y=preset.Ypos[0], speed = 1000){
	//properties
	this.spriteImage = spriteImage;
	this.x = x;
	this.y = y;
	this.speed = speed;		
	}
	//multiply any movement by the dt parameter	which will ensure the game runs at the same speed for all computers.
	//Parameter: dt, a time delta between ticks
	update(dt){
	if (this.x < 600){
		this.x = this.x + Math.round((dt * this.speed)/10);
		}
	else{//return enemy to left side of screen
		this.x = 0;
		}
	}
	//Draw the enemy on the screen
	render(){
		ctx.drawImage(Resources.get(this.spriteImage), this.x, this.y);
	}
}

// Enemies our player must avoid
class Enemy extends Sprite{
	//The image for our enemies uses a helper to quickly load images
	constructor(enemyImage  = 'images/enemy-bug.png', x= 100, y=preset.Ypos[0], speed = 1000){
	//properties
	super(enemyImage, x, y, speed);//must call super constructor  -call the parent class "Sprite"
	this.enemyImage = enemyImage;
	this.x = x;
	this.y = y;
	this.speed = speed;		
	}
	//multiply any movement by the dt parameter	which will ensure the game runs at the same speed for all computers.
	//Parameter: dt, a time delta between ticks
		update(dt){
		if (this.x < 600){
			this.x = this.x + Math.round((dt * this.speed)/10);
			}
		else{//return enemy to left side of screen
			this.x = 0;
			}
		}
		//Draw the enemy on the screen
		render(){
			ctx.drawImage(Resources.get(this.enemyImage), this.x, this.y);
		}
	}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Sprite{
	constructor(){ //properties
	super(playerImage, x=200, y=325, speed);//must call super constructor  -call the parent class "Sprite"
	this.playerImage = playerImage;
	this.x = x;
	this.y = y;
	this.speed = speed;	
	}
	// methods
	handleInput(keypress){
	//move the player depending on which key gets pressed
	//if statements prevent moving the player off screen
	switch (keypress){
	case 'left': if(this.x > 0){this.x -= 103}; //alert('move left one block');
		break;
	case 'up': this.y -= 84; //alert('move up one block');
	//alert("player co-ords are " + player.x + ", " + player.y);
		break;
	case 'right': if(this.x < 400){this.x += 103;} //alert('move right one block');
		break;
	case 'down': if(this.y < 400){this.y += 84;} //alert('move down one block');
		break;
	default:
	}
	}
	update(dt){ //engine calls update(dt) for allEnemies, calls update() for player
		//player reaches the water
		if (this.y < 0){
			//player has reached water, please move player to starting position
			//set player's initial position
			this.x = 200;
			this.y = 325;
		}
	}
	render(){
		ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
	}	
}

// Now instantiate your objects.

// Place the player object in a variable called player
player = new Player();

//place player in starting position
//use after collisions and when player reaches the water
// function resetPlayer(){
	// player(sprite,x=200, y=325,speed);
// }

// Place all enemy objects in an array called allEnemies

//return a whole number between "min" and "max minus one" //MDN 
function getRandomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max-min))+min;
}

let playerStatus = 7; //will start with playerStatus as "1"
//speed up the game the longer it goes on for
//TODO: will develop this further after creating the player's movements
let accelerator = 3;

//the higher the player's ability, the more enemies are created
for(let ind=0;ind<playerStatus;ind++)
	{
		//create new enemy with random positions and speeds
		let newEnemy = new Enemy(enemyImage, preset.Xpos[getRandomInt(0,5)], preset.Ypos[getRandomInt(0,3)], preset.speeds[getRandomInt(0,3)]*accelerator);
		//place each new enemy into the allEnemies array
		allEnemies.push(newEnemy);
	}

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
