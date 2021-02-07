import Shoot from './shoot.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, element) {
        
        super(scene, x, y, 'slime-' + element);

        scene.add.existing(this);

        this.scene = scene;
        this.life = 1;
        this.x_position = x;
        this.y_position = y;
        this.x_detection = 400;
        this.y_detection = 100;

        this.fire_rate = 2000;
        this.bullet_velocity = 300;

        this.lastTime = 0;

        this.element = element;
        
        // //animations
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('slime-' + this.element, { start: 8, end: 10}),
            frameRate:10,
            skipMissedFrames: true,
            repeat: -1
        });

        this.setFlip(true, false);

        this.anims.play('idle', true);
    }

    adjustSpriteBody() {
        this.setBodySize(64, 40, true);
    }

    update() {
        super.update();
        let time = this.scene.time.now;
        
        //super.update();
        let player = this.scene.player.sprite;

        if(player.x - this.x < this.x_detection &&
            player.x - this.x > -this.x_detection &&
            player.y - this.y < this.y_detection &&
            player.y - this.y > -this.y_detection) {
                if(player.x - this.x < 0) {//left
                    if(time - this.lastTime > this.fire_rate) {
                        this.lastTime = time;
                        let bullet = new Shoot(this.scene, this.x, this.y, 'shoot-' + this.element);
                        this.scene.enemies_bullets.add(bullet);
                        bullet.setFlip(true, false);
                        bullet.setVelocityX(-this.bullet_velocity);
                        bullet.body.setAllowGravity(false);
                        bullet.setBodySize(40,25,true);
                        bullet.setScale(0.9,0.9);
                    }
                } else if(player.x - this.x > 0) {
                    if(time - this.lastTime > this.fire_rate) {//right
                        this.lastTime = time;
                        let bullet = new Shoot(this.scene, this.x, this.y, 'shoot-' + this.element);
                        this.scene.enemies_bullets.add(bullet);
                        bullet.setFlip(false, false);
                        bullet.setVelocityX(this.bullet_velocity);
                        bullet.body.setAllowGravity(false);
                        bullet.setBodySize(40,25,true);
                        bullet.setScale(0.9,0.9);
                    }
                }
                //atirar
        }
    }
}
