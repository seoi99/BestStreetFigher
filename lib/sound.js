class Sound {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
  }

  play(src) {
    this.sound.src = src;
    this.sound.play().then(r => console.log(r));
  }

  stop() {
    this.sound.pause();
  }
}

export default Sound;
