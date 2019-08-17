

export default class Sprite {
  constructor(char) {
    this.char = char;
    this.image = new Image();
    this.image.src = `./asset/${this.char}/idle.png`;
    this.frame = 0;
    this.maxFrame = 3;
    this.image.onload = () => {
      this.w = this.image.width / (this.maxFrame + 1);
      this.h = this.image.height;
    }

  }

  update(action) {
    if (this.char === "ken") {
      switch (action) {
        case "kick":
        case "moving":
          this.maxFrame = 4;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "stun":
          this.maxFrame = 3;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "punch":
          this.maxFrame = 2;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "shot":
          this.maxFrame = 1;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "block":
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
        case "moving":
          this.maxFrame = 4;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "kick":
        case "punch":
        case "shot":
        case "stun":
          this.maxFrame = 2;
          this.image.src = `./asset/${this.char}/${action}.png`;
          break;
        case "block":
          this.maxFrame = 0;
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
