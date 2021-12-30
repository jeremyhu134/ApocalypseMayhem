class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.spritesheet('character','images/character.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('zombie','images/zombie.png',{frameWidth: 44,frameHeight:65});
        this.load.spritesheet('gunFlash','images/gunFlash.png',{frameWidth: 20,frameHeight:20});
        this.load.spritesheet('bulletBlood','images/bulletBlood.png',{frameWidth: 20,frameHeight:20});
        this.load.image('bullet1','images/bullet1.png');
        this.load.image('gunMagazine','images/gunMagazine.png');
        this.load.spritesheet('background','images/background.png',{frameWidth: 1397,frameHeight:675});
        this.load.image('healthBar','images/healthBar.png');
        this.load.image('healthBarBg','images/healthBarBg.png');
        
        //audio
        this.load.audio('gunShootSound', 'audio/gunShootSound.mp3');
    }
    create() {
        //audio
        
        //character Animations
        this.anims.create({
            key: 'characterIdle',
            frameRate: 1,
            repeat: -1,
            frames:this.anims.generateFrameNames('character',{start: 0,end: 0})
        });
        this.anims.create({
            key: 'characterWalk',
            frameRate: 25,
            repeat: -1,
            frames:this.anims.generateFrameNames('character',{start: 0,end: 11})
        });
        this.anims.create({
            key: 'zombieWalk',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('zombie',{start: 0,end: 5})
        });
        this.anims.create({
            key: 'zombieStrike',
            frameRate: 15,
            repeat: -1,
            frames:this.anims.generateFrameNames('zombie',{start: 6,end: 14})
        });
        this.anims.create({
            key: 'zombieSpawn',
            frameRate: 13,
            frames:this.anims.generateFrameNames('zombie',{start: 15,end: 25})
        });
        this.anims.create({
            key: 'flash1',
            frameRate: 1,
            frames:this.anims.generateFrameNames('gunFlash',{start: 0,end: 0})
        });
        this.anims.create({
            key: 'flash2',
            frameRate: 1,
            frames:this.anims.generateFrameNames('gunFlash',{start: 1,end: 1})
        });
        this.anims.create({
            key: 'flash3',
            frameRate: 1,
            frames:this.anims.generateFrameNames('gunFlash',{start: 2,end: 2})
        });
        this.anims.create({
            key: 'animate',
            frameRate: 24,
            frames:this.anims.generateFrameNames('bulletBlood',{start: 0,end: 4})
        });
        
        this.anims.create({
            key: 'bganimate',
            frameRate: 3,
            repeat: -1,
            frames:this.anims.generateFrameNames('background',{start: 0,end: 2})
        });
        
        this.scene.start('ArenaScene');
	}
    update(){
        
    }
}