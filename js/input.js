export default class InputHandler {
    constructor(canvas, paddle) {
        this.canvas = canvas;
        this.paddle = paddle;
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false
        };
        this.touchX = null;

        // Keyboard listeners
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.keys[e.key] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.keys[e.key] = false;
            }
        });

        // Mouse listener (for desktop mouse control)
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            this.paddle.updatePosition(mouseX);
        });

        // Touch listeners (Direct Touch)
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouch(e), { passive: false });
        this.canvas.addEventListener('touchend', () => {
            this.touchX = null;
        });
    }

    handleTouch(e) {
        e.preventDefault(); // Prevent scrolling
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left;
        this.paddle.updatePosition(touchX);
    }

    update() {
        // Keyboard fallback if no mouse/touch interaction
        if (this.keys.ArrowLeft) {
            this.paddle.moveLeft();
        }
        if (this.keys.ArrowRight) {
            this.paddle.moveRight();
        }
    }
}
