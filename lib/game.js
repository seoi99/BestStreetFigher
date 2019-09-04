import vsMode from './vsMode.js';
import Background from './background.js';
import trainMode from './trainMode.js';
import Input from './input.js';
import VsMode from "./vsMode";
import Sound from "./sound";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    this.play = this.play.bind(this);
    this.input = new Input();
    this.fps = 0;
    this.image = new Image();
    this.image.src = 'https://i.pinimg.com/originals/f6/c4/51/f6c4516c11809f1b3550e0c68abfef89.gif';
    this.test = 70;
    this.time = 60;
    this.training = false;
    this.vs = false;
    this.vsMode = null;
    this.trainMode = null;
    this.round = 1;
    this.box = [];
    this.canvas = document.getElementById("MyCanvas");
    this.transparent = 1;
    this.textX = 1000;
    this.sound = new Sound();
    this.sControl = false;
  }

  intro() {
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, 1000, 500);
      this.ctx.font = "40px StreetFigther";
      this.ctx.fillStyle = "black";
      this.ctx.textAlign = "center";
      this.ctx.fillText(`Best Street Fighter`, 500, 200);
      this.ctx.font = "20px Acme";
      this.setup();
    }
  }

  mouseEvent() {
    this.canvas.addEventListener("mousemove", e => {
      this.canvas.style.cursor = "default";
      this.box.forEach(obj => {
        if (e.layerX >= obj.x - obj.w && e.layerX <= obj.x + obj.w &&
          e.layerY >= obj.y - obj.h && e.layerY <= obj.y + obj.h) {
          if (!this.input.restart) {
            this.canvas.style.cursor = "pointer"
          }
        }
      })
    }, false);
  }
  clickEvent() {
    this.canvas.addEventListener("click", e => {
      this.box.forEach(obj => {
        if (e.layerX >= obj.x - obj.w && e.layerX <= obj.x + obj.w &&
            e.layerY >= obj.y - obj.h && e.layerY <= obj.y + obj.h) {
          if (!this.input.restart) {
            if (obj.mode === "vs") {
              this.vs = true;
              this.input.restart = true;
              this.vsMode = new VsMode(this.ctx);
            } else if (obj.mode === "train") {
              this.trainMode = new trainMode(this.ctx);
              this.input.restart = true;
              this.training = true;
            }
          }
        }
      })
    }, false)
  }
  createBox(text,x,y,h, mode) {
    this.ctx.font = "20px StreetFighter";
    this.ctx.fillText(text, x,y);
    let w = this.ctx.measureText(text).width / 2;
    const boxObj = {
      x,y,h,w,mode
    };
    this.box.push(boxObj)
  }

  setup() {
    this.createBox("1 Player Mode", 500, 300, 20, "train");
    this.createBox("2 Player Mode", 500, 350, 20, "vs");
  }

  clock() {
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "red";
    this.ctx.font="40px Acme";
    this.fps++;
    if (this.fps > 70) {
      this.time--;
      this.fps = 0;
    }
    this.ctx.fillText(`${this.time}`,500,60);
  }


  roundStart() {
    this.ctx.save();
    this.ctx.font = "70px StreetFighter";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(` Round ${this.round} Start`, this.textX,150);
    this.textX-= 10;
    this.ctx.restore();
    if (this.textX <= 0) {
      if (this.training) {
      this.trainMode.start = true;
      }
    } else {
      this.sControl = true;
    }
    // this.transparent-= 0.01;
  }


  play() {
    if (this.input.restart) {
      this.clock();
      this.background.draw();
      this.roundStart();
      if (this.training) {
        if (this.trainMode.round > this.round) {
          this.round = this.trainMode.round;
          this.textX = 1000;
        }
        this.trainMode.draw();
      }
      else if (this.vs) {
        this.vsMode.gamefun();
      }
    }

    requestAnimationFrame(this.play);
  }

}

export default Game;
