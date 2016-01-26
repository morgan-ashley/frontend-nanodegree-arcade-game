// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
   
    //Used later for collision detection
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;

    // Randomizes speed of bugs
    this.speed = Math.floor(Math.random() * (300)) + 100;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}


// Resets enemy to start of the left side of the canvas
Enemy.prototype.reset = function() {
    this.x = -200; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    // Resets bug once it has reached the right side of the canvas
      if(this.x > 505) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;

    //Used later for collision detection
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y +50;
    this.sprite= 'images/char-cat-girl.png';
};

// Resets player when there is a collision with the enemy
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Updates player and prevents the player going out of bounds of the canvas width and height
Player.prototype.update = function() {
    if (this.x < 5) {
        this.x = 5;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 2) {
        this.y = 5;
        alert("You won!");
        player.reset();
    } else if (this.y > 410) {
        this.y = 410;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enables user to use arrow keys to control the player
Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':
            this.x = this.x - 100;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'up':
            this.y = this.y - 90;
            break;
        case 'down':
            this.y = this.y + 90;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-400, 225);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-100, 60);
var enemy4 = new Enemy(-500, 310);
var enemy5 = new Enemy(-300, 225);
var enemy6 = new Enemy(-600, 60);

// Player object
var player = new Player();

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

// enemy objects our player must avoid!
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
    
// Checks collisions between enemy bug and player
function checkCollisions () {
allEnemies.forEach(function(enemy) {
         if(enemy.x < player.x + 50 &&
            enemy.x + 50 > player.x &&
            enemy.y < player.y + 50 &&
            enemy.y + 50 > player.y) {
                console.log('Ouch!!');
                player.reset();
            }
        });
}