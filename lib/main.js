import Game from './game.js';
import Music from './music.js'


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas");
  canvas.width = 1000;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  const music = new Music();
  music.musicAction();
  const play = setInterval(() => game.play(), 1000/15);
})
