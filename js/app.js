// Enemies our player must avoid
//ES6 class
class Enemy{
	//this.sprite = 'images/enemy-bug.png';
	constructor(sprite  = 'images/enemy-bug.png'){ //properties
	this.sprite = sprite;
	// Setting the Enemy initial location (you need to implement)
	// Setting the Enemy speed (you need to implement)
	}
	// methods
	update(dt){}
	render(){}
}
							// var Enemy = function() {
								// // Variables applied to each of our instances go here,
								// // we've provided one for you to get started

								// // The image/sprite for our enemies, this uses
								// // a helper we've provided to easily load images
								// this.sprite = 'images/enemy-bug.png';
							// };
enem = new Enemy();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
							// Enemy.prototype.update = function(dt) {
								// // You should multiply any movement by the dt parameter
								// // which will ensure the game runs at the same speed for
								// // all computers.
							// };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
		//do something!
	}
		update(dt){}
	render(){}
	
	
}
player = new Player();
// class Dessert {
  // constructor(calories = 250) {
    // this.calories = calories;
  // }
// }
// class IceCream extends Dessert {
  // constructor(flavor, calories, toppings = []) {
    // super(calories);
    // this.flavor = flavor;
    // this.toppings = toppings;
  // }
  // addTopping(topping) {
    // this.toppings.push(topping);
  // }
// }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
allEnemies.push(enem);


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
