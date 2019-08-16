import Sound from './sound.js'

export default class Input {
  constructor() {
      this.maxWidth = 3;
      this.xSpeed = 10;
      this.ySpeed = 1;
      this.stop = 0;
      this.speed = 5;
      this.flip = 1;
      this.restart = false;
      this.revive = 5;
      this.input = {
        LEFT: false,
        RIGHT: false,
        ATTACK: false,
        REVIVE: false,
        SHOOT: false,
      };
      this.direction = "RIGHT";
      this.counter = 0;
      this.m = true;
      this.sound = new Sound();
  }
  gameControl() {
    this.input.REVIVE = false;
  }


  movement(keys=[37,39,75,76]) {

    document.addEventListener("keydown", e => {
      const key = e.keyCode;
      switch (key) {
        case keys[0]: this.input.LEFT = true; break;
        case keys[1]:
        this.input.RIGHT = true; break;
        case keys[2]:
          this.counter++;
          this.counter > 2 ? this.input.ATTACK = false : this.input.ATTACK = true;
        break;
        case keys[3]:
          this.counter++;
          this.counter > 3 ? this.input.SHOOT = false : this.input.SHOOT = true;
        break;
        default:
    }
    this.m = false;

  });
    document.addEventListener("keyup", e => {
        const key = e.keyCode;
        this.m = true;
        switch (key) {
          case keys[0]: this.input.LEFT = false; break;
          case keys[1]: this.input.RIGHT = false; break;
          case keys[2]:
            this.input.ATTACK = false;
            this.counter = 0;
           break;
          case keys[3]:
            this.input.SHOOT = false;
            this.counter = 0;
          break;
        }
    })


  }
}
