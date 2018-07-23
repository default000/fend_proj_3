// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    speeds = [50, 75, 100, 150, 200, 250];
    rows = [58, 141, 224];
    cols = [-505, -404, -303, -202, -101];
    wait = [1000, 2000, 3000, 4000, 5000];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.setLocation();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Move enemy to the left once they've gone far enough right
    if (this.x >= 500){
        this.setLocation();
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Collision detection
Enemy.prototype.checkCollision = function() {
    if (this.x <= player.x + 40 && this.x >= player.x - 70)
        if (this.y <= player.y + 30 && this.y >= player.y - 30) {
            player.reset();
            player.resetCounter();
        }
}

// Set enemy locaiton to random row/col value & speed
Enemy.prototype.setLocation = function() {
    this.speed = speeds[Math.floor(Math.random() * speeds.length)];
    this.x = cols[Math.floor(Math.random() * cols.length)];
    this.y = rows[Math.floor(Math.random() * rows.length)];
}

// Gem
class Gem {
    constructor(color) {
        if (color === 'blue')
            this.sprite = 'images/Gem Blue.png';
        else if (color === 'green')
            this.sprite = 'images/Gem Green.png';
        else if (color === 'orange')
            this.sprite = 'images/Gem Orange.png';

        this.speed = 250;
        this.color = color;
        this.x = gcols[Math.floor(Math.random() * gcols.length)];
        this.y = grows[Math.floor(Math.random() * grows.length)];
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        this.x += this.speed * dt;

        // Move gem to left after going far enough right
        if (this.x > 5000) {
            this.x = gcols[Math.floor(Math.random() * gcols.length)];
            if (player.touched === this.color)
                player.touched = '';
        }

        this.checkCollision();
    }

    // Check collision between gem and player
    // Change players sprite if collision detected
    checkCollision() {
        if (player.touched != this.color)
            if (this.x <= player.x + 40 && this.x >= player.x - 70)
                if (this.y <= player.y + 30 && this.y >= player.y - 30) {
                    player.touched = this.color;
                    player.changeChar();
                }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.char = 0;
        this.reset();
        this.touched = '';
        this.counter = document.querySelector('p.score');
    }

    update() {
        // reset when reaching water
        // increase consecutive counter
        if (this.y <= 0) {
            this.x = 202;
            this.y = 390;
            this.incrementCounter();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(dir) {
        if (dir === 'up' && this.y > -25)
            this.y -= 83;
        else if (dir === 'down' && this.y < 390)
            this.y += 83;
        else if (dir === 'left' && this.x >= 100)
            this.x -= 101;
        else if (dir === 'right' && this.x < 404)
            this.x += 101;
    }

    reset(){
        this.char = 0;
        this.sprite = chars[this.char];
        this.x = 202;
        this.y = 390;
    }

    resetCounter() {
        this.counter.textContent = '0';
    }

    incrementCounter() {
        this.counter.textContent = parseInt(this.counter.textContent) + 1;
    }

    changeChar() {
        this.char++;

        if (this.char === chars.length)
            this.char = 0;

        this.sprite = chars[this.char];
    }
}

let grows = [58, 141, 224];
let gcols = [-2010, -3020, -4030];

let chars = ['images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

for (let i = 0; i < 8; i++)
    allEnemies.push(new Enemy());

let player = new Player();

let gems = [];

gems.push(new Gem('blue'));
gems.push(new Gem('green'));
gems.push(new Gem('orange'));


let score = document.createElement('p');
let canvas = document.querySelector('canvas');


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
