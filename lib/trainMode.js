import Enemy from "./enemy";
import Sound from "./sound";
import Player from './player.js';
import HPBar from "./hpbar";

class TrainMode {
    constructor(ctx) {
        this.ctx = ctx;
        this.test = 100;
        this.kill = 0;
        this.player = new Player(this.ctx,300,"ken",1);
        this.enemy = new Enemy(800, this.ctx);
        this.player.keyboard.movement();
        this.image = new Image();
        this.sound = new Sound();
        this.p1Hp = new HPBar(this.ctx, 0, 50, 250);
        this.enemyHp = new HPBar(this.ctx,1000, 50, 250);
        this.playSound = true;
        this.enemyStr = 1;
        this.respTime = 30;
        this.prop = Math.random();
        this.hitChance = 0.3;
        this.sound = new Sound();
        this.splay = true;
        this.start = false;
        this.round = 1;
        this.counter = 0;
    }

    gameover() {
        this.image.src = 'https://static.comicvine.com/uploads/original/11111/111112704/3860536-ron_vs_ken_by_eastmonkey.jpg';
        this.ctx.drawImage(this.image,0, 0, 1000, 500);
        this.ctx.font="40px StreetFighter";
        this.ctx.fillStyle = "black";
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

    playerToEnemy() {
        if (this.player.keyboard.input.ATTACK || this.player.keyboard.input.KICK) {
            this.enemydead(this.player.x, 90);
        }
        else if (this.player.bullet) {
            this.enemydead(this.player.bullet.x,80);
        }
    }

    enemyToPlayer() {
        if(Math.abs(this.enemy.x - this.player.x) < 100) {
            if (this.enemy.dull || this.enemy.blocked) {
                this.enemy.attack = false;
            }
            this.enemy.toggleStatus(this.respTime,"attack");
            this.enemy.counter++;
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
                    this.p1Hp.hit(this.enemyStr);
                    this.player.stun = true;
                }
            }
        }
        else if (this.enemy.bullet) {
            if(Math.abs(this.enemy.bullet.x - this.player.x) < 100) {
                this.enemy.bullet.collide = true;
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
                    this.p1Hp.hit(this.enemyStr);
                    this.player.stun = true;
                }
                this.enemy.bullet = null;
            }
        }
        else {
            this.enemy.attack = false;
            // this.player.stun = false;
        }

    }
    collision() {
        this.playerToEnemy();
        this.enemyToPlayer();
    }


    enemydead(x,range=90) {
        if (Math.abs(x - this.enemy.x) < range) {
            if (this.prop > this.hitChance) {
                this.enemy.dull = true;
                this.enemyHp.hit();
            } else {
                this.enemy.blocked = true;
                this.enemyHp.block();
            }
                if (this.enemyHp.len <= 0) {
                    this.enemy.alive = false;
                }
            if (this.player.keyboard.input.KICK && this.player.keyboard.input.SPECIAL) {
                this.enemy.updateX(this.player.x, 1,-2);
            }
        } else {
            this.prop = Math.random();
        }
    }

    getRand(x) {
        this.enemy.x = Math.random() > 0.5 ? 0 : 1000;
        return this.enemy.x;
    }



    respawn() {
        if (this.enemy.transparent <= 0) {
            this.sound.play('./asset/sound/die.wav');
            this.enemyHp.len = 200;
            this.enemy = new Enemy(800, this.ctx);
            this.enemyStr += 0.1;
            this.respTime--;
            this.hitChance += 0.02;
            this.round++;
        }
    }
    pHp() {
        this.ctx.fillStyle = "red";
        this.p1Hp.draw('yellow');
        this.enemyHp.draw('yellow');
    }

    setup() {
        this.pHp();
        this.player.draw();
        this.enemy.draw(this.player.x);
    }

    update() {
        this.roundText();
        this.player.soundControl(this.enemy);
        this.player.update(this.enemy.x);
        this.collision();
        this.player.keyboard.disable = this.player.stun;

    }
    roundFinished() {
        this.player.win();
        this.start= false;
        if (this.splay) {
            this.sound.play('./asset/sound/youwin.wav');
            this.splay = false;
        }
    }

    roundText() {
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Round ${this.round}`, 500,60,60);
    }

    draw() {
        if (this.p1Hp.len <= 0) {
            this.gameover();
        } else {
            this.setup();
            if (this.enemy.alive) {
                this.update();
            } else {
                this.roundFinished();
            }
            if (this.start) {
                this.enemy.update(this.player.x);
            }
        }
    }
}

export default TrainMode
