import Enemy from "./enemy";
import Sound from "./sound";
import Player from './player.js';
import HPBar from "./hpbar";

class TrainMode {
    constructor(ctx) {
        this.ctx = ctx;
        this.test = 100;
        this.enemy = new Enemy(1000, this.ctx);
        this.kill = 0;
        this.comboSpeed = 0.7;
        this.player = new Player(this.ctx,300,"ken",1);
        this.player.keyboard.movement();
        this.image = new Image();
        this.sound = new Sound();
        this.enemyHp = new HPBar(this.ctx,this.enemy.x, this.enemy.y, 80)
        this.p1Hp = new HPBar(this.ctx,500, 20, 300)
        this.playSound = true;
        this.prob = Math.random();
        this.over = false;
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
        this.test--;
        if (this.test === 0) {
            this.sound.play('./asset/sound/game_finished.wav')
        }
        if (this.test <= 20) {
            this.ctx.fillText(`Total Kill : ${this.kill}`,500,290);
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


    playerToEnemy() {
        if (this.player.keyboard.input.ATTACK || this.player.keyboard.input.KICK) {
            this.enemydead(this.player.x, 90);
        }
        else if (this.player.bullet) {
            this.enemydead(this.player.bullet.x,80);
            this.player.rangeAttack(this.enemy);
        } else {
            this.random();
        }
    }

    enemyToPlayer() {
        if(Math.abs(this.enemy.x - this.player.x) < 100) {
            this.enemy.toggleStatus(10, "attack");
            this.enemy.counter++;
        } else {
            this.enemy.attack = false;
        }
        console.log(this.enemy.x, this.player.x);
        if (this.enemy.attack) {
            if (this.player.keyboard.input.LEFT) {
                if (this.player.x < this.enemy.x) {
                    this.player.block = true;
                    this.p1Hp.block()
                }
            } else if (this.player.keyboard.input.RIGHT) {
                if (this.player.x > this.enemy.x) {
                    this.player.block = true;
                    this.p1Hp.block()
                }
            } else {
                this.p1Hp.hit();
                this.player.stun = true;
            }
        } else {
            this.player.block = false;
        }
    }
    collision() {
        this.playerToEnemy();
        this.enemyToPlayer();
    }


    enemydead(x,range=100) {
        if (Math.abs(x - this.enemy.x) < range) {
            if (this.prop > 0.4) {
                this.enemy.dull = true;
                this.enemyHp.hit();

            } else {
                this.enemy.block(x);
                this.enemyHp.block();
            }
                if (this.enemyHp.len <= 0) {
                    this.enemy.alive = false;
                    this.kill++;
                }
            this.comboTime = 200;
        }
    }

    getRand(x) {
        this.enemy.x = Math.random() > 0.5 ? 0 : 1000;
        return this.enemy.x;
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
        this.p1Hp.draw();
        this.collision();
        this.respawn();
    }

    draw() {
        if (this.p1Hp.len <= 0) {
            this.gameover()
            this.over = true;
        } else {
            this.trainingMode();
        }
    }
}

export default TrainMode
