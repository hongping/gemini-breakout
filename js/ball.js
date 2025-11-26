export default class Ball {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.size = 10; // Radius
        this.baseSpeed = 5;
        this.maxBounceAngle = Math.PI / 3; // 60 degrees

        this.reset(1);
    }

    reset(level) {
        this.speed = this.baseSpeed + (level - 1) * 0.5;
        this.position = {
            x: this.gameWidth / 2,
            y: this.gameHeight - 40 // Start just above paddle
        };
        this.velocity = {
            x: 0, // Start moving straight up? Or random? Let's do random X
            y: -this.speed
        };
        // Randomize start angle slightly
        const angle = (Math.random() - 0.5) * (Math.PI / 4);
        this.velocity.x = this.speed * Math.sin(angle);
        this.velocity.y = -this.speed * Math.cos(angle);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }

    update(dt) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Wall collisions
        if (this.position.x + this.size > this.gameWidth || this.position.x - this.size < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y - this.size < 0) {
            this.velocity.y = -this.velocity.y;
        }

        // Bottom wall (Game Over condition handled in Game class, but here we just check bounds)
        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.game.resetTurn();
        }

        // Paddle Collision
        if (this.checkCollision(this.game.paddle)) {
            // Calculate reflection angle
            const paddle = this.game.paddle;
            const relativeIntersectX = (paddle.position.x + (paddle.width / 2)) - this.position.x;
            const normalizedRelativeIntersectionX = (relativeIntersectX / (paddle.width / 2));
            const bounceAngle = normalizedRelativeIntersectionX * this.maxBounceAngle;

            // Update velocity based on angle, keeping speed constant
            // Note: We need to ensure Y velocity is always negative (going up) after hitting paddle
            this.velocity.x = -this.speed * Math.sin(bounceAngle);
            this.velocity.y = -this.speed * Math.cos(bounceAngle);
        }
    }

    checkCollision(gameObject) {
        // Simple AABB collision for now, but ball is a circle.
        // Let's treat paddle as a rect and ball as a point for simplicity or circle-rect

        let testX = this.position.x;
        let testY = this.position.y;

        if (this.position.x < gameObject.position.x) testX = gameObject.position.x;
        else if (this.position.x > gameObject.position.x + gameObject.width) testX = gameObject.position.x + gameObject.width;

        if (this.position.y < gameObject.position.y) testY = gameObject.position.y;
        else if (this.position.y > gameObject.position.y + gameObject.height) testY = gameObject.position.y + gameObject.height;

        const distX = this.position.x - testX;
        const distY = this.position.y - testY;
        const distance = Math.sqrt((distX * distX) + (distY * distY));

        return distance <= this.size;
    }
}
