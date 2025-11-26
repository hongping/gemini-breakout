export default class Paddle {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 7;
        this.speed = 0;

        this.reset();
    }

    reset() {
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10
        };
    }

    draw(ctx) {
        ctx.fillStyle = '#00f';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height / 2);
    }

    update(dt) {
        // Keyboard movement is handled by InputHandler calling moveLeft/moveRight
        // which sets this.position.x directly or via speed in a more complex setup.
        // For direct position setting (mouse/touch), we update directly.

        // Boundary checks
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }

    updatePosition(x) {
        this.position.x = x - this.width / 2;
        // Boundary checks immediately for smooth mouse/touch
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }

    moveLeft() {
        this.position.x -= this.maxSpeed;
    }

    moveRight() {
        this.position.x += this.maxSpeed;
    }
}
