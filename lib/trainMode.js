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
        // this.player.keyboard.movement();
        this.image = new Image();
        this.sound = new Sound();
        this.p1Hp = new HPBar(this.ctx, 0, 50, 250);
        this.enemyHp = new HPBar(this.ctx,1000, 50, 250);
        this.playSound = true;
        this.enemyStr = 1;
        this.respTime = 30;
        this.prop = Math.random();
        this.hitChance = 0.6;
        this.sound = new Sound();
        this.splay = true;
        this.start = false;
        this.round = 1;
        this.fps = 0;
        this.count = 0;
        this.pWin = 0;
        this.eWin = 0;
        this.hasWinner = false;
        this.over = false;
        this.whoWon = "";
    }

    gameover() {
        this.image.src = 'https://static.comicvine.com/uploads/original/11111/111112704/3860536-ron_vs_ken_by_eastmonkey.jpg';
        this.ctx.drawImage(this.image,0, 0, 1000, 500);
        this.ctx.font="40px StreetFighter";
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
            this.ctx.fillText(`Thank you for playing ${this.whoWon}`,500,290);
        }
    }

    enemydead(x,range=90) {
        if (Math.abs(x - this.enemy.x) < range) {
            if (this.prop > this.hitChance) {
                this.enemy.dull = true;
                this.hitChance += 0.01;
                this.enemyHp.hit();
            } else {
                this.enemy.blocked = true;
                this.hitChance -= 0.001;
                this.enemyHp.block();
            }
            if (this.player.bullet) {
                this.player.bullet.collide = true;
                this.player.bullet = null;
            }

            if (this.player.keyboard.input.KICK && this.player.keyboard.input.SPECIAL) {
                this.enemy.updateX(this.player.x, 1,-2);
            }
        } else {
            this.hitChance = 0.6;
            this.prop = Math.random();
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

    bulltobull() {
        if (Math.abs(this.player.bullet.x - this.enemy.bullet.x) < 20) {
            this.player.bullet.collide = true;
            this.enemy.bullet.collide = true;
            this.player.bullet = null;
            this.enemy.bullet = null;
        }
    }
    enemyToPlayer(atype) {
        if (atype && Math.abs(atype.x - this.player.x) < 80 && Math.abs(this.enemy.y - this.player.y) < 10) {
            if (atype.collide !== undefined) {
                atype.collide = true;
                if (this.fps > 20) {
                    this.enemy.bullet = null;
                    this.fps = 0;
                }
                this.fps++;
            }
            if (this.enemy.dull || this.enemy.blocked) {
                this.enemy.attack = false;
            }
            if (this.enemy.attack || this.enemy.bullet) {
                if (this.player.keyboard.input.LEFT) {
                    if (this.player.x < atype.x) {
                        this.player.block = true;
                        this.p1Hp.block()
                    }
                } else if (this.player.keyboard.input.RIGHT) {
                    if (this.player.x > atype.x) {
                        this.player.block = true;
                        this.p1Hp.block()
                    }
                } else {
                    this.p1Hp.hit(this.enemyStr);
                    this.player.stun = true;
                }
            }
        } else {
            this.enemy.attack = false;
        }
    }

    moveControl() {
        if (Math.abs(this.player.x - this.enemy.x) <= 80 && Math.abs(this.player.y - this.enemy.y) <= 10) {
            if (this.player.x > this.enemy.x) {
                this.player.keyboard.input.LEFT = false;
            } else {
                this.player.keyboard.input.RIGHT = false;
            }
        }
    }

    enemyRandomInterval() {
        this.count++;
        if (this.count > 50){
            this.enemy.random = Math.random();
            this.count = 0;
        }
    }

    collision() {
        this.enemyRandomInterval();
        this.moveControl();
        this.playerToEnemy();
        if (this.player.bullet && this.enemy.bullet) {
            this.bulltobull();
        }
        if (this.enemy.bullet) {
            this.enemyToPlayer(this.enemy.bullet);
        }
        this.enemyToPlayer(this.enemy);

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

    }

    roundFinished() {
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
    reset() {
        this.p1Hp = new HPBar(this.ctx, 0, 50, 250);
        this.enemyHp = new HPBar(this.ctx,1000, 50, 250);

        this.player = new Player(this.ctx,300,"ken",1);
        this.enemy = new Enemy(800, this.ctx);
        this.hasWinner = false;
    }

    winner() {
        if (this.enemyHp.len <= 0) {
            this.player.over('win');
            this.enemy.die();
            this.enemy.alive = false;
            this.hasWinner = true;
            if (this.splay) {
                this.pWin++;
                this.sound.play('./asset/sound/youwin.wav');
                this.splay = false;
            }

        }

        if (this.p1Hp.len <= 0) {
            this.player.over('dead');
            this.enemy.win();
            this.enemy.alive = false;
            this.hasWinner = true;
            if (this.splay) {
                this.eWin++;
                this.sound.play('./asset/sound/youlose.wav');
                this.splay = false;
            }
        }

        if (this.eWin >= 2 ) {
            this.over = true;
            this.whoWon = 'You Win'
        }
        if (this.pWin >= 2) {
            this.over = true;
            this.whoWon = 'You Lost';
        }
    }


    draw() {
        if (!this.over) {
        this.setup();
        this.winner();
        if (!this.hasWinner) {
                this.update();
                this.enemy.update(this.player.x);
                this.p1Hp.winCount(this.pWin);
                this.enemyHp.winCount(this.eWin);

        } else {
                if (this.fps > 150) {
                    this.round++;
                    this.reset();
                    this.fps = 0;
                    this.splay = true;
                }
                this.fps++;
            }
        } else {
            this.gameover();
        }


    }
}

export default TrainMode
