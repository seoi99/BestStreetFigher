
export default class Input {
  constructor() {
      this.restart = false;
      this.input = {
        LEFT: false,
        RIGHT: false,
        DOWN: false,
        ATTACK: false,
        REVIVE: false,
        KICK: false,
        SHOOT: false,
        SPECIAL: false
      };
      this.attack = false;
      this.disable = false;
      this.counter = 0;
  }
  gameControl() {
    this.input.REVIVE = false;
  }

  movement(keys=[65,68,84,89,85]) {
    if (!this.disable) {
    document.addEventListener("keydown", e => {
      const key = e.keyCode;
        switch (key) {
        case keys[0]: this.input.LEFT = true; break;
        case 83:
        case 40:
          this.input.DOWN = true; break;
        case keys[1]: this.input.RIGHT = true; break;
        case keys[2]:
          this.attack = true;
          this.counter++;
          this.counter > 2 ? this.input.ATTACK = false : this.input.ATTACK = true;
        break;
        case keys[3]:
          this.attack = true;
          this.counter++;
          this.counter > 3 ? this.input.KICK = false : this.input.KICK = true;
          break;
          case keys[4]:
          this.input.SPECIAL = true;
          break;
        default:
    }
  });
    document.addEventListener("keyup", e => {
        const key = e.keyCode;
        switch (key) {
          case keys[0]: this.input.LEFT = false; break;
          case 40:
          case 83:
            this.input.DOWN = false; break;
          case keys[1]: this.input.RIGHT = false; break;
          case keys[2]:
            this.attack = false;
            this.input.ATTACK = false;
            this.counter = 0;
           break;
          case keys[3]:
            this.attack = false;
            this.input.KICK = false;
            this.counter = 0;
          break;
          case keys[4]:
            this.input.SPECIAL = false;
        }
    })
    }
  }
}
