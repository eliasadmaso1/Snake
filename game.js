import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeHitHimself,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById("game-board");

let lastRenderTime = 0;
let game_over = false;

function main(currentTime) {
  if (game_over) {
    if (confirm("Game Over! Press Ok To Restart")) {
      window.location = "https://eliasadmaso1.github.io/Snake/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 100;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;
  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  gameOver();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function gameOver() {
  game_over = outsideGrid(getSnakeHead()) || snakeHitHimself();
}
