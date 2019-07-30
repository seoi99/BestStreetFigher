
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
      this.height = 1;
      this.maxWidth = 3;
      this.xSpeed = 0;
      this.ySpeed = 1;
      this.stop = 0;
      this.speed = 5;
      this.flip = 1;
      this.movement = this.movement.bind(this);
  }

  movement() {
    document.addEventListener("keydown", e => {
      const key = e.keyCode;
      switch (key) {
        case 40:
        case 38:
        e.preventDefault(); break;
        case 37:
          this.input.LEFT = true;
          this.height = 3;
          this.maxWidth = 3;
          this.flip = -1;
          this.xSpeed = -this.speed;
          break;
        case 39: this.input.RIGHT = true;
          this.flip = 1;
          this.height = 3;
          this.maxWidth = 3;
          this.xSpeed = Math.abs(this.speed)
          break;
        case 65: this.input.A = true;
        this.height = 2;
        this.maxWidth = 2;
        break;
        default:
        this.height = 1; break;
    }})

    document.addEventListener("keyup", e => {
      const key = e.keyCode;
      this.height = 1;
      this.maxWidth = 3;
      this.xSpeed = this.stop
      switch (key) {
        case 38:
            this.input.UP = false;
          break;
        default:

      }
    })
  }
}
