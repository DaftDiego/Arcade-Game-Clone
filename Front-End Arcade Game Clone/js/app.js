// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.width = 60;
    this.height = 60;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {
      this.x = 0;
    }

    // The following checks for collisions. If the player collides with an enemy object,
    // the player goes back to the starting position.
    if ((this.x < player.x + player.width) &&
        (this.x + this.width > player.x) &&
        (this.y < player.y + player.height) &&
        (this.y + this.height > player.y)) {
          player.x = 200;
          player.y = 405;
      }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.x = 200;
  this.y = 405;

  this.width = 60;
  this.height = 60;

  // Player character's sprite image.
  this.sprite = 'images/char-boy.png';
}

// Draw player's character on screen. Do not modify.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Once player wins, score gets updated, and player goes back to starting position.
Player.prototype.update = function () {

   if (this.y < 0) {
     score++;
     this.x = 200;
     this.y = 405;
   }
   // Display's the player's updated score.
   displayedScore['0'].textContent = "Score: " + score;
};

// The following handles user input (arrow keys).
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      if (this.y > 0) {
        this.y -= moveV;
     }
      break;
    case 'down':
      if (this.y < 360) {
        this.y += moveV;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= moveH;
      }
      break;
    case 'right':
      if (this.x < 400) {
        this.x += moveH;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let bugOne = new Enemy(-101, 65, 300);
let bugTwo = new Enemy (-101, 145, 250);
let bugThree = new Enemy(-60, 225, 200);

// Measurements for both vertical and horizontal key presses.
let moveV = 83;
let moveH = 100;
allEnemies.push(bugOne, bugTwo, bugThree);

// Instantiate the player character.
let player = new Player();

// Scoring variables.
let displayedScore = document.querySelectorAll('.score');
let score = 0;

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
