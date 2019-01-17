import Player from './player.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const player = new Player(ctx);
  player.draw();
})
