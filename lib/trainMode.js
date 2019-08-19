import Enemy from "./enemy";
import Sound from "./sound";
import Player from './player.js';
import HPBar from "./hpbar";

class TrainMode {
    constructor(ctx) {
        this.ctx = ctx;
        this.test = 100;
        this.enemy = new Enemy(Math.floor(Math.random() * 5) * 150 + 100, this.ctx);
        this.kill = 0;
        this.comboSpeed = 0.7;
        this.combo = 1;
        this.maxCombo = 0;
        this.comboTime = 200;
        this.player = new Player(this.ctx,300,"ken",1);
        this.player.keyboard.movement();
        this.image = new Image();
        this.sound = new Sound();
        this.enemyHp = new HPBar(this.ctx,this.enemy.x, this.enemy.y, 80)
        this.playSound = true;
        this.prob = Math.random();
    }

    gameover() {
        this.image.src = 'https://static.comicvine.com/uploads/original/11111/111112704/3860536-ron_vs_ken_by_eastmonkey.jpg';
        this.ctx.drawImage(this.image,0, 0, 1000, 500);
        this.ctx.font="40px Acme";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over",500,150);
        this.totalScore();
    }
    totalScore() {
        let score = this.maxCombo * this.kill * 10;
        this.test--;
        if (this.test === 0) {
            this.sound.play('./asset/sound/game_finished.wav')
        }
        if (this.test <= 50) {
            this.ctx.fillText(`Best Combo : ${this.maxCombo}`,500,250);
        }
        if (this.test <= 20) {
            this.ctx.fillText(`Total Kill : ${this.kill}`,500,290);
        }
        if (this.test <= 0) {
            this.ctx.fillStyle = "red";
            this.ctx.fillText(`Your score is ${score}`,500,350);
        }
    }

    miss() {
        this.ctx.font="20px Acme";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Miss!`,this.player.x + 60,this.player.y - 20);
        this.firsthit = true;
    }

    random() {
        this.prop = Math.random();
    }
    collision() {
        let prob = 0.3;
        if (this.player.keyboard.attack) {
            this.enemydead(this.player.x, 90);
        }
        else if (this.player.bullet) {
            this.enemydead(this.player.bullet.x,5);
            this.player.rangeAttack(this.enemy);
        } else {
            this.random();
        }
        this.player.stun = false;
        this.player.block = false;
        if (this.enemy.attack) {
            if (this.player.x < this.enemy.x) {
                if (this.player.keyboard.input.LEFT) {
                    this.player.block = true;
                }
            } else {

                if (this.player.keyboard.input.RIGHT) {
                    this.player.block = true;
                }
            }
            this.player.stun = true;
        }
        this.maxCombo = Math.max(this.combo, this.maxCombo)
    }


    enemydead(x,range=100) {
        if (Math.abs(x - this.enemy.x) < range) {
                this.combo++;
                this.kill++;
            if (this.prop > 0.4) {
                this.enemy.stun(x);
                this.enemyHp.hit();
            } else {
                this.enemy.block(x);
                this.enemyHp.block();
            }
            this.enemy.slide(x);
                if (this.enemyHp.len <= 0) {
                    this.enemy.alive = false;
                }
            this.comboTime = 200;
        }
    }

    getRand(x) {
        while (x === this.enemy.x) {
            this.enemy.x = Math.random() > 0.5 ? 0 : 1000;
        }
        return this.enemy.x
    }

    respawn() {
        if (this.enemy.transparent <= 0) {
            this.enemy.alive = true;
            this.enemyHp.len = 80;
            this.enemy.transparent = 1;
            this.enemy.x = this.getRand(this.enemy.x);
        }
    }


    comboContainer() {
        this.ctx.fillStyle = "green";
        this.ctx.font="12px Acme";
        this.ctx.fillText(`Combo GAUGE`,500,60);
        if (this.comboTime <= 100) {
            this.ctx.fillStyle = "yellow"
        }
        if (this.comboTime <= 50) {
            this.ctx.fillStyle = "red"
        }
        this.ctx.fillRect(400,70, this.comboTime, 20);
    }

    clock() {
        this.ctx.textAlign = "center";
        this.ctx.font="40px Acme";
        if (this.time <= 5) {
            this.ctx.fillStyle = "red"
        }
        this.ctx.fillText(`Timer ${this.time}`,500,30);
    }

    trainingMode() {
        this.clock();
        this.comboContainer();
        this.player.draw();
        this.enemy.draw(this.player.x);
        this.player.meleeAttack(this.enemy);
        this.enemyHp.enemyhp(this.enemy.x,this.enemy.y,10);
        this.player.update(this.enemy.x);
        this.player.switchDir();
        this.collision();
        this.respawn();
    }

    draw() {
        // if (this.time <= 0 || this.comboTime <= 0) {
        //     this.gameover()
        // } else {
            this.trainingMode();
        // }
    }
}

export default TrainMode