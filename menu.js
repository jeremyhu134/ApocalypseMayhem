class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.spritesheet('loading','images/loadingSprite.png',{frameWidth: 30,frameHeight:3});
        //people
        this.load.spritesheet('character','images/character.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('characterSkeletonGun','images/characterSkeletonGun.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('characterSus','images/characterSus.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('characterGoldenGun','images/characterGoldenGun.png',{frameWidth: 50,frameHeight:50});
        
        this.load.spritesheet('merchant','images/merchantSprite.png',{frameWidth: 100,frameHeight:90});
        //zombies
        this.load.spritesheet('zombie','images/zombie.png',{frameWidth: 44,frameHeight:65});
        this.load.spritesheet('sarmsZombie','images/sarmsZombie.png',{frameWidth: 70,frameHeight:70});
        
        this.load.spritesheet('quadZombie','images/quadZombie.png',{frameWidth: 44,frameHeight:80});
        this.load.spritesheet('quadZombieAbility','images/quadZombieAbility.png',{frameWidth: 200,frameHeight:200});
        this.load.spritesheet('zombieClone','images/zombieClone.png',{frameWidth: 50,frameHeight:50});
        
        //Items
        this.load.spritesheet('gunFlash','images/gunFlash.png',{frameWidth: 20,frameHeight:20});
        this.load.spritesheet('explosion','images/explosion.png',{frameWidth: 75,frameHeight:75});
        this.load.spritesheet('bulletBlood','images/bulletBlood.png',{frameWidth: 20,frameHeight:20});
        //bullets
        this.load.image('bullet1','images/bullet1.png');
        this.load.image('bulletSG','images/bulletSG.png');
        this.load.image('bulletGolden','images/bulletGolden.png');
        
        this.load.spritesheet('coin','images/coin.png',{frameWidth: 30,frameHeight:32});
        this.load.image('gunMagazine','images/gunMagazine.png');
        this.load.spritesheet('background','images/background.png',{frameWidth: 1397,frameHeight:675});
        this.load.spritesheet('infiniteBulletsImage','images/infiniteBulletsImage.png',{frameWidth: 35,frameHeight:35});
        this.load.spritesheet('grenadeImage','images/grenadeImage.png',{frameWidth: 35,frameHeight:35});
        this.load.spritesheet('medicImage','images/medicImage.png',{frameWidth: 35,frameHeight:35});
        this.load.image('healthBar','images/healthBar.png');
        this.load.image('zombieHealthBar','images/zombieHealthBar.png');
        this.load.image('healthBarBg','images/healthBarBg.png');
        this.load.image('healthImage','images/healthImage.png');
        this.load.image('barrier','images/barrier.png');    
        this.load.image('skull','images/skull.png');  
        this.load.image('redSkull','images/redSkull.png');
        this.load.image('startButton','images/startButton.png');
        this.load.image('titleImage','images/titleImage.png');
        this.load.image('upgradeButton','images/upgradeButton.png');
        this.load.image('backButton','images/backButton.png');
        this.load.image('backButton2','images/backButton2.png');
        this.load.image('settingsButton','images/settingsButton.png');
        //pause menu
        this.load.image('pauseMainMenuButton','images/pauseMainMenuButton.png');
        this.load.image('pauseMenu','images/pauseMenu.png');
        //upgrade sprites
        this.load.spritesheet('upgradeOptions','images/upgradeOptions.png',{frameWidth: 400,frameHeight:200});
        //death menu
        this.load.image('deathMenu','images/deathMenu.png');
        
        this.load.image('grenadeObj','images/grenadeObj.png');
        
        //Shop icons
        this.load.image('equippedImage','images/equippedImage.png');
        this.load.image('susShop','images/susShop.png');
        this.load.image('goldenGunShop','images/goldenGunShop.png');
        
        //audio
        this.load.audio('menuBgMusic', 'audio/menuBgMusic.mp3');
        this.load.audio('bossMusic', 'audio/bossMusic.mp3');
        this.load.audio('arenaMusic', 'audio/arenaMusic.mp3');
    }
    create() {
        //set current scene to variable
        gameState.currentScene = "MenuScene";
        
    //audio
        //config for keeping sound loop
        gameState.loopSound = {
            loop: true,
            volume: 100
        }
        gameState.bgM = this.sound.add('menuBgMusic');
        gameState.bgM.play(gameState.loopSound);
        //mute music other than background music for menu
        if(gameState.bossM){
            gameState.bossM.setMute(true);
        } if (gameState.arenaM){
            gameState.arenaM.setMute(true);
        }
        
        
        
        //Loading Animations
        this.anims.create({
            key: 'load',
            frameRate: 18,
            frames:this.anims.generateFrameNames('loading',{start: 0,end: 16})
        });
        
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
        //skins
        this.anims.create({
            key: 'characterSusIdle',
            frameRate: 1,
            repeat: -1,
            frames:this.anims.generateFrameNames('characterSus',{start: 0,end: 0})
        });
        this.anims.create({
            key: 'characterSusWalk',
            frameRate: 25,
            repeat: -1,
            frames:this.anims.generateFrameNames('characterSus',{start: 0,end: 11})
        });
        this.anims.create({
            key: 'characterSkeletonGunIdle',
            frameRate: 1,
            repeat: -1,
            frames:this.anims.generateFrameNames('characterSkeletonGun',{start: 0,end: 0})
        });
        this.anims.create({
            key: 'characterSkeletonGunWalk',
            frameRate: 25,
            repeat: -1,
            frames:this.anims.generateFrameNames('characterSkeletonGun',{start: 0,end: 11})
        });
        this.anims.create({
            key: 'characterGoldenGunIdle',
            frameRate: 1,
            repeat: -1,
            frames:this.anims.generateFrameNames('characterGoldenGun',{start: 0,end: 0})
        });
        this.anims.create({
            key: 'characterGoldenGunWalk',
            frameRate: 25,
            repeat: -1,
            frames:this.anims.generateFrameNames('characterGoldenGun',{start: 0,end: 11})
        });
        
        
        
        
        
        
        
        
        //merchant animation
        this.anims.create({
            key: 'move',
            frameRate: 1,
            repeat: -1,
            frames:this.anims.generateFrameNames('merchant',{start: 0,end: 11})
        });
        
        //zombie
        this.anims.create({
            key: 'zombieWalk',
            frameRate: 5,
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
            key: 'zombieDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('zombie',{start: 26,end: 29})
        });
        this.anims.create({
            key: 'zombieGoldDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('zombie',{start: 30,end: 33})
        });
        
        //sarmszombie
        this.anims.create({
            key: 'sarmsZombieWalk',
            frameRate: 6,
            repeat: -1,
            frames:this.anims.generateFrameNames('sarmsZombie',{start: 4,end: 11})
        });
        this.anims.create({
            key: 'sarmsZombieRun',
            frameRate: 20,
            repeat: -1,
            frames:this.anims.generateFrameNames('sarmsZombie',{start: 5,end: 11})
        });
        this.anims.create({
            key: 'sarmsZombieStrike',
            frameRate: 30,
            repeat: -1,
            frames:this.anims.generateFrameNames('sarmsZombie',{start: 12,end: 20})
        });
        this.anims.create({
            key: 'sarmsZombieBreathe',
            frameRate: 4,
            repeat: -1,
            frames:this.anims.generateFrameNames('sarmsZombie',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'sarmsZombieSpawn',
            frameRate: 13,
            frames:this.anims.generateFrameNames('sarmsZombie',{start: 0,end: 0})
        });
        this.anims.create({
            key: 'sarmsZombieDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('sarmsZombie',{start: 21,end: 25})
        });
        
        //quad zombie
        this.anims.create({
            key: 'quadZombieBend',
            frameRate: 6,
            frames:this.anims.generateFrameNames('quadZombie',{start: 0,end: 5})
        });
        this.anims.create({
            key: 'quadZombieLaunch',
            frameRate: 20,
            frames:this.anims.generateFrameNames('quadZombie',{start: 6,end: 12})
        });
        this.anims.create({
            key: 'quadZombieSpawn',
            frameRate: 30,
            frames:this.anims.generateFrameNames('quadZombie',{start: 13,end: 23})
        });
        this.anims.create({
            key: 'quadZombieDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('quadZombie',{start: 24,end: 27})
        });
        this.anims.create({
            key: 'quadZombieQuake',
            frameRate: 23,
            frames:this.anims.generateFrameNames('quadZombieAbility',{start: 10,end: 16})
        });
        this.anims.create({
            key: 'quadZombieTarget',
            frameRate: 17,
            frames:this.anims.generateFrameNames('quadZombieAbility',{start: 0,end: 9})
        });
        
        //clone zombie
        this.anims.create({
            key: 'cloneZombieMove',
            frameRate: 14,
            repeat: -1,
            frames:this.anims.generateFrameNames('zombieClone',{start: 11,end: 22})
        });
        this.anims.create({
            key: 'cloneZombieSpawn',
            frameRate: 13,
            frames:this.anims.generateFrameNames('zombieClone',{start: 0,end: 10})
        });
        this.anims.create({
            key: 'cloneZombieDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('zombieClone',{start: 23,end: 26})
        });
        
        
        
        //Upgrade options spritesheet
        this.anims.create({
            key: 'health',
            frameRate: 0,
            frames:this.anims.generateFrameNames('upgradeOptions',{start: 2,end: 2})
        });
        this.anims.create({
            key: 'ammocap',
            frameRate: 0,
            frames:this.anims.generateFrameNames('upgradeOptions',{start: 1,end: 1})
        });
        this.anims.create({
            key: 'speed',
            frameRate: 0,
            frames:this.anims.generateFrameNames('upgradeOptions',{start: 3,end: 3})
        });
        this.anims.create({
            key: 'damage',
            frameRate: 18,
            frames:this.anims.generateFrameNames('upgradeOptions',{start: 0,end: 0})
        });
        
        //objects
        this.anims.create({
            key: 'explode',
            frameRate: 12,
            frames:this.anims.generateFrameNames('explosion',{start: 0,end: 6})
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
            key: 'canimate',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('coin',{start: 0,end: 3})
        });
        
        this.anims.create({
            key: 'bganimate',
            frameRate: 3,
            repeat: -1,
            frames:this.anims.generateFrameNames('background',{start: 0,end: 2})
        });
        //shine animation for specials
        this.anims.create({
            key: 'shine',
            frameRate: 11,
            repeat: -1,
            frames:this.anims.generateFrameNames('infiniteBulletsImage',{start: 0,end: 7})
        });
        this.anims.create({
            key: 'shine2',
            frameRate: 11,
            repeat: -1,
            frames:this.anims.generateFrameNames('grenadeImage',{start: 0,end: 7})
        });
        this.anims.create({
            key: 'shine3',
            frameRate: 7,
            repeat: -1,
            frames:this.anims.generateFrameNames('medicImage',{start: 0,end: 6})
        });
        
        gameState.globalScene = this;
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        //add title
        this.add.sprite(window.innerWidth/2,100,'titleImage').setScale(1.5);
        
        //Changes cursor icon image
        this.input.setDefaultCursor('url(images/cursor.cur), pointer');
    
        gameState.loadSave();
	
        
        var button = this.add.image(window.innerWidth/2,window.innerHeight/2,'startButton').setInteractive();
        button.on('pointerdown', function(pointer){
            button.destroy();
            var loadingBar = gameState.globalScene.add.sprite(window.innerWidth/2,window.innerHeight/2,'loading').setScale(5);
            loadingBar.anims.play('load',true);
            gameState.globalScene.time.addEvent({
                delay: 1000,
                callback: ()=>{
                    gameState.globalScene.scene.start('ArenaScene');
                },  
                startAt: 0,
                timeScale: 1
            });
        });
        //Update Characters Stats so upgrades and such apply
        gameState.updateStats();
        //Upgrades Button
        var Ubutton = this.add.image(window.innerWidth/2+60,window.innerHeight/2+60,'upgradeButton').setInteractive();
        Ubutton.on('pointerdown', function(pointer){
            gameState.globalScene.scene.start('UpgradeScene');
        });
        //SettingsButton
        var Sbutton = this.add.image(window.innerWidth/2-60,window.innerHeight/2+60,'settingsButton').setInteractive();
        Sbutton.on('pointerdown', function(pointer){
            gameState.globalScene.scene.pause("MenuScene");
            gameState.globalScene.scene.launch('PauseScene');
        });
	}
    update(){
        
    }
}