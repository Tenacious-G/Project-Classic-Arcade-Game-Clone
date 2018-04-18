'use strict';

const preset = {
    Xpos: [0,40,70,100,140,180],
    Ypos: [73,157,241], //top, middle or bottom paved lane
    speeds: [800,1000,2000],
    score: 0,
    leftHandSide: 0,
    rightHandSide: 400,
    startPositionX: 200,
    startPositionY: 325,
    waterPositionY: 0,
    safeDistance: 100,
}

let allEnemies = [];
let enemyImage  = 'images/enemy-bug.png'; //leaving "enemyImage" outside preset array for readability
let playerImage  = 'images/char-boy.png'; //may offer player chance to change his/her sprite in future
let x = 300; //horizontal co-ordinate of sprites
let y = 300; //vertical co-ordinate of sprites
let speed = 800; //enemy speed across screen
let distanceApart = 0; //distance between the player and an enemy
let accelerator = 1; //factor which could be used to alter enemy speeds

const tally = document.querySelector('.score');

/**
*@constructor sprites are images of the enemies and the player
*@parameter spriteImage
*@parameter x, y Co-ordinates
*@parameter speed
*@returns moves sprites around screen, calls on engine.js to render the sprites
*/
class Sprite{
    //The image for our sprites uses a helper to quickly load images
    constructor(spriteImage  = 'images/enemy-bug.png', x= 100, y=preset.Ypos[0], speed = 1000){
    //properties
    this.spriteImage = spriteImage;
    this.x = x;
    this.y = y;
    this.speed = speed;
    }
    //multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
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

/**
*@constructor Enemies our player must avoid
*@parameter enemyImage
*@parameter x, y Co-ordinates
*@parameter speed
*@returns moves enemies across screen, calls on engine.js to render the enemies
*/
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
    //multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
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

/**
*@constructor move the player around the screen
*@parameter playerImage
*@parameter x, y Co-ordinates
*@parameter speed
*@returns calls on engine.js to render the player image. updates the score, calls for a modal on game completion
*/
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
    case 'left': if(this.x > preset.leftHandSide){this.x -= 103;} //move left one block
        break;
    case 'up': this.y -= 84; //move up one block. {update() function deals with player reaching the water}
        break;
    case 'right': if(this.x < preset.rightHandSide){this.x += 103;} //move right one block
        break;
    case 'down': if(this.y < preset.rightHandSide){this.y += 84;} //move down one block
        break;
    default:
    }
    }
    update(dt){ //engine calls update(dt) for allEnemies, calls update() for player
        //player reaches the water
        if (this.y < preset.waterPositionY){
            //reset player's initial position
            resetPlayer(x,y);
            //increase score
            preset.score++;
            //display latest score
            tally.innerHTML = 'Get to five to win! Your score: ' + preset.score;
            //has player won game?
            if (preset.score === 5){
                openModal();
            }
            addEnemies();
        }
    //check for collisions
    //move the player back to the starting position if a collision occurs
    //all sprites have a (x,y) co-ordinate. Using trigonometry, can find out the distance between a player and all enemies at any given time
    //distance squared is (difference in x-co-ordinates) squared + (difference in y-co-ordinates) squared
    //player has to be in same lane as enemy for collision to take place
    //collisionCheck(x,y);
        for(let index=0;index<allEnemies.length;index++){
            let enemyX = allEnemies[index].x;
            let enemyY  = allEnemies[index].y;
            let playerX = this.x;
            let playerY = this.y;
            distanceApart = Math.sqrt((enemyX - playerX)*(enemyX - playerX)+(enemyY - playerY)*(enemyY - playerY));
            //if close and in same lane
            if ((distanceApart<preset.safeDistance)&&(enemyY === playerY)){
                //collision has taken place
                resetPlayer(x,y);
            }
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
    }
}

// Place the player object in a variable called player
let player = new Player();

/**
*@description place player in starting position, use after collisions and when player reaches the water
*@parameters x, y Co-ordinates
*/
function resetPlayer(x,y){
    player.x = preset.startPositionX;
    player.y = preset.startPositionY;
}

//place two enemies onto screen at start of game
addEnemies();
addEnemies();

/**
*@description Place all enemy objects in an array called allEnemies
*@parameter preset.Xpos random x-co-ordinates
*@parameter preset.Ypos randomly selects top, middle or bottom paved lane
*@parameter speeds randomly selects one of three speeds
*@parameter accelerator could be used to speed up/slow down enemies
*/
function addEnemies(){
    //create new enemy with random positions and speeds
    let newEnemy = new Enemy(enemyImage, preset.Xpos[getRandomInt(0,5)], preset.Ypos[getRandomInt(0,3)], preset.speeds[getRandomInt(0,3)]*accelerator);
    //place each new enemy into the allEnemies array
    allEnemies.push(newEnemy);
}

/**
*@description generate a random integer, adapted from Math.random() on MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*@parameter min, max
*@returns a whole number between "min" and "max minus one"
*/
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min))+min;
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

/**
*@description When the user completes the game, open the modal
*@returns restarts the game or returns to previous webpage
*/
function openModal(){
    if (confirm("You won, well done!\nWould you like to play again?")){
        //player wants to restart the game
        window.location.reload();
    }else
        //player wants to leave the game, load the previous webpage
        history.go(-1);
}

