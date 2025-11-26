export default class Level {
    constructor(game, levelIndex) {
        this.game = game;
        this.bricks = [];
        this.rows = 6;
        this.cols = 10;
        this.colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff']; // Rainbow

        this.generate();
    }

    generate() {
        this.bricks = [];
        const padding = 10;
        const totalPaddingX = padding * (this.cols + 1);
        const brickWidth = (this.game.gameWidth - totalPaddingX) / this.cols;
        const brickHeight = 25;
        const marginTop = 50;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const x = padding + c * (brickWidth + padding);
                const y = marginTop + r * (brickHeight + padding);
                this.bricks.push({
                    x: x,
                    y: y,
                    width: brickWidth,
                    height: brickHeight,
                    color: this.colors[r % this.colors.length],
                    markedForDeletion: false
                });
            }
        }
    }

    draw(ctx) {
        this.bricks.forEach(brick => {
            if (!brick.markedForDeletion) {
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);

                // Bevel effect
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
    }

    update() {
        // Check collision with ball
        let hitBrick = false;

        this.bricks.forEach(brick => {
            if (!brick.markedForDeletion) {
                if (this.game.ball.checkCollision({ position: { x: brick.x, y: brick.y }, width: brick.width, height: brick.height })) {
                    brick.markedForDeletion = true;
                    this.game.score += 10;
                    hitBrick = true;
                }
            }
        });

        if (hitBrick) {
            this.game.ball.velocity.y = -this.game.ball.velocity.y; // Simple bounce
        }

        // Remove deleted bricks
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

        // Check level completion
        if (this.bricks.length === 0) {
            this.game.levelUp();
        }
    }
}
