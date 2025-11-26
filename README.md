# Gemini Breakout 🧱

A classic Breakout arcade game built with Vanilla JavaScript and HTML5 Canvas. This project was created using **Antigravity**, an advanced AI coding assistant from Google DeepMind.

## 🎮 Play Now

[Play the Game](https://hongping.github.io/gemini-breakout/)

## ✨ Features

- **Classic Gameplay**: Destroy bricks, collect points, and don't let the ball drop!
- **Responsive Design**: Fully playable on Desktop (Mouse/Keyboard) and Mobile (Touch).
- **Advanced Physics**:
    - Ball speed increases with every level.
    - Paddle reflection angle depends on impact point (center = straight, sides = angled).
- **Progression**: 5 Levels with increasing difficulty and rainbow-colored brick layouts.
- **Mobile Optimized**: "Direct Touch" controls allow the paddle to instantly follow your finger.

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules).
- **Rendering**: HTML5 Canvas API.
- **Deployment**: GitHub Actions (Automated deployment to GitHub Pages).

## 🤖 Created with Antigravity

This entire project, from planning to implementation and deployment configuration, was built with the help of **Antigravity**.

### Workflow
1.  **Planning**: Antigravity drafted a detailed implementation plan, covering game mechanics, mobile support, and file structure.
2.  **Implementation**: The AI wrote the core game engine, including the game loop, collision detection, and entity management (Ball, Paddle, Bricks).
3.  **Refinement**: Features like "Direct Touch" for mobile and specific brick layouts were added based on user feedback.
4.  **Deployment**: Antigravity generated the GitHub Actions workflow to automatically host the game on GitHub Pages.

## 🚀 How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/hongping/gemini-breakout.git
    ```
2.  Navigate to the directory:
    ```bash
    cd gemini-breakout
    ```
3.  Start a local server (required for ES Modules):
    ```bash
    python3 -m http.server 8000
    ```
4.  Open `http://localhost:8000` in your browser.

## 📜 License

MIT
