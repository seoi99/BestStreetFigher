import Game from './game.js';
import Player from './player.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas");
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  const image = document.getElementById('idle');
  const player = new Player(ctx);
  setInterval(() => {
    player.draw();
    player.update();
  }, 1000/15)
})
