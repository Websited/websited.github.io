Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
};

// Enemies our player must avoid
class Enemy {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        this.x = (Math.floor(Math.random() * (-1000)) - 10);
        this.y = [60, 140, 220].sample();
        this.spaceX = [];
        this.spaceY = [];
        this.speed = (Math.floor(Math.random() * (300 - 150 + 1) + 150));
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x < 500 ? this.x += this.speed * dt : (this.y = [58, 142, 225].sample(), this.x = (Math.floor(Math.random() * (-2000)) - 10), this.speed = (Math.floor(Math.random() * (300 - 150 + 1) + 150)));
        this.spaceX = [];
        this.spaceY = [];
        this.spaceX.push(this.x - 50);
        this.spaceX.push(this.x + 50);
        this.spaceY.push(this.y - 20);
        this.spaceY.push(this.y + 20);


    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
    }
    update() {
        for (let i = 0; i < allEnemies.length; i++) {
            if ((player.x >= allEnemies[i].spaceX[0] && player.x <= allEnemies[i].spaceX[1]) && (player.y >= allEnemies[i].spaceY[0] && player.y <= allEnemies[i].spaceY[1])) {
                player.resetPosition();
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyPressed) {
        switch (keyPressed) {
            case 'left':
                this.x >= 50 ? this.x -= 100 : this.x = this.x;
                break;
            case 'right':
                this.x <= 300 ? this.x += 100 : this.x = this.x;
                break;
            case 'up':
                this.y > 60 ? this.y -= 80 : this.resetPosition();
                break;
            case 'down':
                this.y <= 300 ? this.y += 80 : this.y = this.y;
                break;
        }
    }
    resetPosition() {
        this.y = [300, 380].sample(), this.x = [0, 100, 200, 300, 400].sample()
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

(function createEnemies() {
    for (let i = 7; i > 0; i--) {
        let enemy = new Enemy;
        allEnemies.push(enemy);
    }
})();

// Place the player object in a variable called player
const player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
