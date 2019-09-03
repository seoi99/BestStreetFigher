
import { customs } from './CustomSprite.js'

export default class Sprite {
  constructor(char) {
    this.char = char;
    this.image = new Image();
    this.maxFrame = 3;
    this.image.src = `./asset/${this.char}/idle.png`;

    this.frame = 0;
    this.image.onload = () => {
      this.w = this.image.width / (this.maxFrame + 1);
      this.h = this.image.height;
      this.x = this.frame * this.w;
      this.y = 0;
    }
  }

  posUpdate(obj) {
      this.w = obj[this.frame].width;
      this.h = obj[this.frame].height;
      this.x = obj[this.frame].x;
      this.y = obj[this.frame].y;
  }

  posUpdateRegular() {
    this.w = this.image.width / (this.maxFrame + 1);
    this.h = this.image.height;
    this.x = this.frame * this.w;
    this.y = 0;
  }
  update(action) {

    this.posUpdateRegular();
    if (this.char === "ken") {
      switch (action) {
        case "jump":
          this.posUpdate(customs.ken.jump);
          this.maxFrame = 6;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "forward_jump":
          this.posUpdate(customs.ken.forward_jump);
          this.maxFrame = 6;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "special_kick":
          this.posUpdate(customs.ken.special_kick);
          this.maxFrame = 8;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "kick":
        case "moving":

          this.maxFrame = 4;
          this.image.src = `./asset/${this.char}/${action}.png`;

          break;
        case "stun":
        case "dead":
          this.posUpdate(customs.ken.stun);
          this.maxFrame = 3;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "fly_kick":
          this.maxFrame = 2;
          this.posUpdate(customs.ken.fly_kick);
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "punch":
        case "win":

          this.maxFrame = 2;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "shot":

          this.maxFrame = 1;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "block":
        case "fly_punch":

          this.maxFrame = 0;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        default:

          this.maxFrame = 3;
          this.image.src = `./asset/${this.char}/idle.png`;

          break;
      }
    }
    if (this.char === "ryu") {

      switch (action) {
        case "special_kick":
          this.maxFrame = 5;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "moving":
          this.maxFrame = 4;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "kick":
          this.posUpdate(customs.ryu.kick)
          this.maxFrame = 2;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "punch":
        case "shot":
        case "stun":
        case "win":
          this.maxFrame = 2;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "block":
          this.maxFrame = 0;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "dead":
          this.maxFrame = 3;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        default:
          this.maxFrame = 3;
          this.image.src = `./asset/${this.char}/idle.png`;

          break;
      }
    }
  }

}
