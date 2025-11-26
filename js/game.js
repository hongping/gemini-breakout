import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Level from './level.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    VICTORY: 5
};

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;

        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.input = new InputHandler(canvas, this.paddle);

        this.lives = 3;
        this.score = 0;
        this.currentLevel = 1;
        this.maxLevels = 5;

        this.level = new Level(this, this.currentLevel);

        // UI Elements
        this.scoreEl = document.getElementById('score');
        this.livesEl = document.getElementById('lives');
        this.levelEl = document.getElementById('level');
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.victoryScreen = document.getElementById('victory-screen');

        // Bind click to start
        this.startScreen.addEventListener('click', () => this.startGame());
        this.startScreen.addEventListener('touchstart', () => this.startGame());

        this.gameOverScreen.addEventListener('click', () => this.restartGame());
        this.gameOverScreen.addEventListener('touchstart', () => this.restartGame());

        this.victoryScreen.addEventListener('click', () => this.restartGame());
        this.victoryScreen.addEventListener('touchstart', () => this.restartGame());
    }

    start() {
        this.lastTime = 0;
        requestAnimationFrame(this.loop.bind(this));
    }

    startGame() {
        if (this.gamestate === GAMESTATE.MENU) {
            this.gamestate = GAMESTATE.RUNNING;
            this.startScreen.classList.add('hidden');
        }
    }

    restartGame() {
        this.lives = 3;
        this.score = 0;
        this.currentLevel = 1;
        this.gamestate = GAMESTATE.RUNNING;
        this.paddle.reset();
        this.ball.reset(this.currentLevel);
        this.level = new Level(this, this.currentLevel);

        this.gameOverScreen.classList.add('hidden');
        this.victoryScreen.classList.add('hidden');
    }

    resetTurn() {
        if (this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
            this.gameOverScreen.classList.remove('hidden');
        } else {
            this.ball.reset(this.currentLevel);
            this.paddle.reset();
            this.gamestate = GAMESTATE.RUNNING; // Or PAUSED waiting for input? Let's keep running for now or add a small delay
        }
    }

    levelUp() {
        if (this.currentLevel >= this.maxLevels) {
            this.gamestate = GAMESTATE.VICTORY;
            this.victoryScreen.classList.remove('hidden');
            return;
        }

        this.currentLevel++;
        this.ball.reset(this.currentLevel);
        this.paddle.reset();
        this.level = new Level(this, this.currentLevel);
    }

    loop(timestamp) {
        let dt = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.VICTORY) return;

        this.input.update();
        this.paddle.update(dt);
        this.ball.update(dt);
        this.level.update();

        // Update UI
        this.scoreEl.innerText = this.score;
        this.livesEl.innerText = this.lives;
        this.levelEl.innerText = this.currentLevel;
    }

    draw() {
        // Clear screen
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.level.draw(this.ctx);
    }
}
