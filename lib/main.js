import Game from './game.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  game.animate();
})
