
export default class Input {
  constructor() {
      this.input = {
        LEFT: false,
        RIGHT: false,
        UP: false,
        DOWN: false,
        SPACE: false,
        A: false,
      }
  }

  movement() {
    document.addEventListener("keydown", e => {
      const key = e.keyCode;
      switch (key) {
        case 37: this.input.LEFT = true; break;
        case 38: this.input.UP = true; break;
        case 39: this.input.RIGHT = true; break;
        case 40: this.input.DOWN = true; break;
        case 65: this.input.A = true; break;
        case 32: this.input.SPACE = true; break;
        default: return false;
    }})

    document.addEventListener("keyup", e => {
      const key = e.keyCode;
      switch (key) {
        case 37: this.input.LEFT = false; break;
        case 38: this.input.UP = false; break;
        case 39: this.input.RIGHT = false; break;
        case 40: this.input.DOWN = false; break;
        case 65: this.input.A = false; break;
        case 32: this.input.SPACE = false; break;
        default: return false;
      }})
  }
}
