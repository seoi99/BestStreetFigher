import Game from './game.js';



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas");
  canvas.width = 1000;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  const play = setInterval(() => game.play(), 1000/15)
})
