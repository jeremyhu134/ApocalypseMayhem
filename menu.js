//menu subclass
class MenuScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'MenuScene' })
	}
    //functions preloads sprites, images, and audio
    preload(){
        this.load.spritesheet('loading','images/loadingSprite.png',{frameWidth: 30,frameHeight:3});
        this.load.image('two','images/two.png');
        //people
        this.load.spritesheet('character','images/character.png',{frameWidth: 120,frameHeight:120});
        this.load.spritesheet('characterDeath','images/characterDeath.png',{frameWidth: 50,frameHeight:50});
        
        
        this.load.spritesheet('merchant','images/merchantSprite.png',{frameWidth: 100,frameHeight:90});
        //zombies
        this.load.spritesheet('zombie','images/zombie.png',{frameWidth: 122,frameHeight:124});
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
        this.load.image('bullet2','images/bullet2.png');
        this.load.image('rocket1','images/rocket1.png');
        this.load.image('bulletTrail','images/bulletTrail.png');
        this.load.image('bulletLaser','images/bulletLaser.png');
        this.load.image('bulletTennis','images/bulletTennis.png');
        this.load.image('bulletSG','images/bulletSG.png');
        this.load.image('bulletGolden','images/bulletGolden.png');
        
        //objects
        this.load.spritesheet('coin','images/coin.png',{frameWidth: 30,frameHeight:32});
        this.load.image('grenadeObj','images/grenadeObj.png');
        this.load.image('gunMagazine','images/gunMagazine.png');
        //weapons
        this.load.spritesheet('assaultRifle','images/assaultRifle.png',{frameWidth: 150,frameHeight:80});
        this.load.spritesheet('minigun','images/minigun.png',{frameWidth: 190,frameHeight:75});
        this.load.spritesheet('rocketLauncher','images/rocketLauncher.png',{frameWidth: 190,frameHeight:75});
        this.load.spritesheet('uzi','images/uzi.png',{frameWidth: 150,frameHeight:80});
        this.load.spritesheet('goldenAssaultRifle','images/goldenAssaultRifle.png',{frameWidth: 100,frameHeight:50});
        
        
        //cosmetics
        this.load.image('susHat','images/susHat.png');
        this.load.image('satvikHat','images/satvikHat.png');
        this.load.image('chadvikHat','images/chadvikHat.png');
        this.load.image('diegoHat','images/diegoHat.png');
        this.load.image('diego2Hat','images/diego2Hat.png');
        this.load.image('helmetHat','images/helmetHat.png');
        this.load.image('partyHat','images/partyHat.png');
        this.load.image('footballHat','images/footballHat.png');
        this.load.image('baseballHat','images/baseballHat.png');
        this.load.spritesheet('burningHelmetHat','images/burningHelmetHat.png',{frameWidth: 55,frameHeight:120});
        this.load.spritesheet('ghastlySkullHat','images/ghastlySkullHat.png',{frameWidth: 65,frameHeight:65});
        this.load.spritesheet('roidRagePhilHat','images/roidRagePhilHat.png',{frameWidth: 60,frameHeight:60});
        
        this.load.spritesheet('background','images/background.png',{frameWidth: 1397,frameHeight:675});
        this.load.image('backgroundCity','images/backgroundCity.png');
        this.load.image('backgroundTrampoline','images/backgroundTrampoline.png');
        this.load.spritesheet('infiniteBulletsImage','images/infiniteBulletsImage.png',{frameWidth: 35,frameHeight:40});
        this.load.spritesheet('grenadeImage','images/grenadeImage.png',{frameWidth: 35,frameHeight:35});
        this.load.spritesheet('medicImage','images/medicImage.png',{frameWidth: 35,frameHeight:35});
        this.load.image('healthBar','images/healthBar.png');
        this.load.image('zombieHealthBar','images/zombieHealthBar.png');
        this.load.image('healthBarBg','images/healthBarBg.png');
        this.load.image('healthImage','images/healthImage.png');
        this.load.image('ammoIcon','images/ammoIcon.png'); 
        this.load.image('sprintIcon','images/sprintIcon.png'); 
        this.load.image('skull','images/skull.png');  
        this.load.image('redSkull','images/redSkull.png');
        this.load.spritesheet('timerSprite','images/timerSprite.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('startButton','images/startButton.png',{frameWidth: 250,frameHeight:70});
        this.load.spritesheet('toursButton','images/toursButton.png',{frameWidth: 250,frameHeight:70});
        this.load.spritesheet('titleImage','images/titleImage.png',{frameWidth: 1200,frameHeight:200});
        this.load.spritesheet('upgradeButton','images/upgradeButton.png',{frameWidth: 70,frameHeight:65});
        this.load.spritesheet('equipButton','images/equipButton.png',{frameWidth: 100,frameHeight:40});
        //cosmet
        this.load.spritesheet('homeIcon','images/homeIcon.png',{frameWidth: 100,frameHeight:80});
        this.load.spritesheet('upgradesButton','images/upgradesButton.png',{frameWidth: 210,frameHeight:60});
        this.load.spritesheet('cosmeticsButton','images/cosmeticsButton.png',{frameWidth: 220,frameHeight:44});
        this.load.spritesheet('lootboxesButton','images/lootboxesButton.png',{frameWidth: 150,frameHeight:45});
        this.load.spritesheet('loadoutButton','images/loadoutButton.png',{frameWidth: 120,frameHeight:45});
        this.load.spritesheet('deleteIcon','images/deleteIcon.png',{frameWidth: 60,frameHeight:60});
        this.load.image('backButton','images/backButton.png');
        this.load.image('backButton2','images/backButton2.png');
        this.load.spritesheet('settingsButton','images/settingsButton.png',{frameWidth: 70,frameHeight:65});
        this.load.spritesheet('assaultRifleIcon','images/assaultRifleIcon.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('minigunIcon','images/minigunIcon.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('rocketLauncherIcon','images/rocketLauncherIcon.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('uziIcon','images/uziIcon.png',{frameWidth: 100,frameHeight:100});
        
        //pause menu
        this.load.image('pauseMainMenuButton','images/pauseMainMenuButton.png');
        this.load.image('pauseMenu','images/pauseMenu.png');
        this.load.image('unlockedMenu','images/unlockedMenu.png');
        //upgrade sprites
        this.load.spritesheet('upgradeOptions','images/upgradeOptions.png',{frameWidth: 400,frameHeight:200});
        //death menu
        this.load.image('deathMenu','images/deathMenu.png');
        
        //Shop icons
        this.load.image('equippedImage','images/equippedImage.png');
        this.load.spritesheet('lootBox','images/lootBox.png',{frameWidth: 400,frameHeight:400});
        this.load.spritesheet('openButton','images/openButton.png',{frameWidth: 282,frameHeight:120});
        
        this.load.image('frame','images/frame.png');
        this.load.image('frame2','images/frame2.png');
        
        //audio
        this.load.audio('menuBgMusic', 'audio/menuBgMusic.mp3');
        this.load.audio('bossMusic', 'audio/bossMusic.mp3');
        this.load.audio('arenaMusic', 'audio/arenaMusic.mp3');
        this.load.audio('tourMusic', 'audio/tourMusic.mp3');
        this.load.audio('death', 'audio/death.mp3');
        //sound affects
        this.load.audio('characterHurt', 'audio/characterHurt.mp3');
        this.load.audio('earthquake', 'audio/earthquake.mp3');
        this.load.audio('shoot', 'audio/gunShootSound.mp3');
        this.load.audio('explode', 'audio/explode.mp3');
        this.load.audio('healed', 'audio/healed.mp3');
        this.load.audio('powerUp', 'audio/powerUp.mp3');
        this.load.audio('purchased', 'audio/purchased.mp3');
        this.load.audio('zombieDeath', 'audio/zombieDeath.mp3');
        this.load.audio('coinSound', 'audio/coinSound.mp3');
        this.load.audio('hitSound', 'audio/hitsound.mp3');
        this.load.audio('killSound', 'audio/killSound.mp3');
        this.load.audio('click', 'audio/click.mp3');
    }
    create() {
        var scene = this;
        //set current scene to variable
        gameState.currentScene = "MenuScene";
        
    //audio
        //config for keeping sound loop
        gameState.loopSound = {
            loop: true,
            volume: .5
        }
        //Create variables for necessary sounds
        gameState.bgM = this.sound.add('menuBgMusic');
        gameState.bgM.setMute(false);
        gameState.bgM.play(gameState.loopSound,true);
        gameState.deathMusic = this.sound.add('death');
        gameState.quake = this.sound.add('earthquake');
        gameState.cHurt = this.sound.add('characterHurt');
        //sounds added directly to the sound object
        this.sound.add('shoot');
        this.sound.add('explode');
        this.sound.add('healed');
        this.sound.add('powerUp');
        this.sound.add('purchased');
        this.sound.add('zombieDeath');
        this.sound.add('coinSound');
        this.sound.add('hitSound');
        this.sound.add('killSound');
        this.sound.add('click');
        //mute music other than background music for menu (only if they are playing)
        if(gameState.bossM){
            gameState.bossM.setMute(true);
        } if (gameState.arenaM){
            gameState.arenaM.setMute(true);
        }if (gameState.tourM){
            gameState.tourM.setMute(true);
        }
        
        gameState.loadSave();
        
        
        //Loading Animation
        this.anims.create({
            key: 'load',
            frameRate: 18,
            frames:this.anims.generateFrameNames('loading',{start: 0,end: 16})
        });
        //Timer sprite
        this.anims.create({
            key: 'moveTime',
            frameRate: .4,
            frames:this.anims.generateFrameNames('timerSprite',{start: 0,end: 16})
        });
        
        //lootboxAnimation
        this.anims.create({
            key: 'lootShine',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('lootBox',{start: 0,end: 8})
        });
        this.anims.create({
            key: 'lootOpen',
            frameRate: 10,
            frames:this.anims.generateFrameNames('lootBox',{start: 8,end: 20})
        });
        
        //character Animations
        this.anims.create({
            key: 'characterIdle',
            frameRate: 4,
            repeat: -1,
            frames:this.anims.generateFrameNames('character',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'characterWalk',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('character',{start: 4,end: 10})
        });
        this.anims.create({
            key: 'characterRun',
            frameRate: 16,
            repeat: -1,
            frames:this.anims.generateFrameNames('character',{start: 4,end: 10})
        });
        this.anims.create({
            key: 'characterDeath',
            frameRate: 10,
            frames:this.anims.generateFrameNames('character',{start: 10,end: 13})
        });
        
        
        
        //skins && cosmetics
        this.anims.create({
            key: 'burningHelmetHatAnimate',
            frameRate: 12,
            repeat: -1,
            frames:this.anims.generateFrameNames('burningHelmetHat',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'ghastlySkullHatAnimate',
            frameRate: 20,
            repeat: -1,
            frames:this.anims.generateFrameNames('ghastlySkullHat',{start: 0,end: 11})
        });
        this.anims.create({
            key: 'roidRagePhilHatAnimate',
            frameRate: 13,
            repeat: -1,
            frames:this.anims.generateFrameNames('roidRagePhilHat',{start: 0,end: 2})
        });
        
        
        
        //title animation
        this.anims.create({
            key: 'moveTitle',
            frameRate: 30,
            frames:this.anims.generateFrameNames('titleImage',{start: 0,end: 11})
        });
        
        
        
        //merchant animation
        this.anims.create({
            key: 'move',
            frameRate: 1,
            repeat: -1,
            frames:this.anims.generateFrameNames('merchant',{start: 0,end: 1})
        });
        
        //zombie
        this.anims.create({
            key: 'zombieWalk',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('zombie',{start: 18,end: 23})
        });
        this.anims.create({
            key: 'zombieStrike',
            frameRate: 15,
            repeat: -1,
            frames:this.anims.generateFrameNames('zombie',{start: 24,end: 28})
        });
        this.anims.create({
            key: 'zombieSpawn',
            frameRate: 16,
            frames:this.anims.generateFrameNames('zombie',{start: 0,end: 16})
        });
        this.anims.create({
            key: 'zombieDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('zombie',{start: 29,end: 40})
        });
        this.anims.create({
            key: 'zombieGoldDeath',
            frameRate: 12,
            frames:this.anims.generateFrameNames('zombie',{start: 29,end: 40})
        });
        this.anims.create({
            key: 'zombieFade',
            frameRate: 12,
            frames:this.anims.generateFrameNames('zombie',{start: 41,end: 45})
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
        
        
        
        
        //assault rifle
        this.anims.create({
            key: 'flash',
            frameRate: 50,
            frames:this.anims.generateFrameNames('assaultRifle',{start: 0,end: 2})
        });
        this.anims.create({
            key: 'flash',
            frameRate: 50,
            frames:this.anims.generateFrameNames('goldAssaultRifle',{start: 0,end: 2})
        });
        
        //minigun
        this.anims.create({
            key: 'minigunflash',
            frameRate: 12,
            frames:this.anims.generateFrameNames('minigun',{start: 1,end: 6})
        });
        this.anims.create({
            key: 'uziflash',
            frameRate: 25,
            frames:this.anims.generateFrameNames('uzi',{start: 1,end: 4})
        });
        //rocketLauncher
        this.anims.create({
            key: 'rocketLauncherflash',
            frameRate: 12,
            frames:this.anims.generateFrameNames('rocketLauncher',{start: 1,end: 4})
        });
        
        
        
        
        this.anims.create({
            key: 'animate',
            frameRate: 24,
            frames:this.anims.generateFrameNames('bulletBlood',{start: 0,end: 4})
        });
        this.anims.create({
            key: 'canimate',
            frameRate: 7,
            repeat: -1,
            frames:this.anims.generateFrameNames('coin',{start: 0,end: 9})
        });
        
        this.anims.create({
            key: 'bganimate',
            frameRate: 3,
            repeat: -1,
            frames:this.anims.generateFrameNames('background',{start: 0,end: 2})
        });
        //shine animation for powerups
        this.anims.create({
            key: 'shine',
            frameRate: 8,
            repeat: -1,
            frames:this.anims.generateFrameNames('infiniteBulletsImage',{start: 0,end: 9})
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
        //sets global scene to variable for inside local functions
        gameState.globalScene = this;
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        //add title
        var title = this.add.sprite(window.innerWidth/2,120,'titleImage').setScale(1);
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                title.anims.play('moveTitle');
            },  
            startAt: 0,
            repeat: -1,
            timeScale: 1
        });
        var two = this.add.image(window.innerWidth/2+80,220,'two').setScale(.4);
        two.setRotation(0.2);
        //Changes cursor icon image
        this.input.setDefaultCursor('url(images/cursor.cur), pointer');
    
        //gameState.loadSave();
	
        //creats button image and interaction to start the game
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
        button.on('pointerover', function(pointer){
            scene.sound.play('click');
            button.setFrame(1);
        });
        button.on('pointerout', function(pointer){
            button.setFrame(0);
        });
        
        var button2 = this.add.image(window.innerWidth/2,window.innerHeight/2+80,'toursButton').setInteractive();
        button2.on('pointerdown', function(pointer){
            button2.destroy();
            var loadingBar = gameState.globalScene.add.sprite(window.innerWidth/2,window.innerHeight/2+80,'loading').setScale(5);
            loadingBar.anims.play('load',true);
            gameState.globalScene.time.addEvent({
                delay: 1000,
                callback: ()=>{
                    gameState.globalScene.scene.start('ToursMenuScene');
                },  
                startAt: 0,
                timeScale: 1
            });
        });
        button2.on('pointerover', function(pointer){
            scene.sound.play('click');
            button2.setFrame(1);
        });
        button2.on('pointerout', function(pointer){
            button2.setFrame(0);
        });
        //Update Characters Stats so upgrades and such apply
        gameState.updateStats();
        //Upgrades Button
        var Ubutton = this.add.image(window.innerWidth/2+60,window.innerHeight/2+280,'upgradeButton').setInteractive();
        Ubutton.on('pointerdown', function(pointer){
            gameState.globalScene.scene.start('UpgradeScene');
        });
        Ubutton.on('pointerover', function(pointer){
            scene.sound.play('click',{volume: 5});
            Ubutton.setFrame(1);
        });
        Ubutton.on('pointerout', function(pointer){
            Ubutton.setFrame(0);
        });
        //SettingsButton
        var Sbutton = this.add.image(window.innerWidth/2-60,window.innerHeight/2+280,'settingsButton').setInteractive();
        Sbutton.on('pointerdown', function(pointer){
            gameState.globalScene.scene.pause("MenuScene");
            gameState.globalScene.scene.launch('PauseScene');
        });
        Sbutton.on('pointerover', function(pointer){
            scene.sound.play('click');
            Sbutton.setFrame(1);
        });
        Sbutton.on('pointerout', function(pointer){
            Sbutton.setFrame(0);
        });
	}
    update(){
        //game loop that constantly runs (not needed for menu)
    }
}





























class ToursMenuScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'ToursMenuScene' })
	}
    preload(){
        //no preloads for this subclass
        
        //previews
        this.load.image('cityTourPreview','images/cityTourPreview.png');
        this.load.image('trampolineTourPreview','images/trampolineTourPreview.png');
    }
    create(){
        var selected = '';
        //mutes menu music
        gameState.bgM.setMute(true);
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        this.physics.add.image(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        
        if(gameState.bossM){
            gameState.bossM.setMute(true);
        } if (gameState.tourM){
            gameState.tourM.setMute(true);
        }
        
        
        var back = this.add.sprite(window.innerWidth-120,0,'homeIcon').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            //gameState.save();
            scene.scene.stop("LoadoutScene");
            scene.scene.start(`MenuScene`);
		});
        back.on('pointerover', () => {
            back.setFrame(1);
		});
        back.on('pointerout', () => {
            back.setFrame(0);
		});
        
        this.add.text(window.innerWidth/2-(window.innerWidth/4), 40, `City Tour`, {
            fill: '#000000', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3).setOrigin(0.5);
        this.add.image(window.innerWidth/2-(window.innerWidth/4),window.innerHeight/2-(window.innerHeight/4)+50,'cityTourPreview').setScale(0.7);
        var tour1 = this.add.image(window.innerWidth/2-(window.innerWidth/4),window.innerHeight/2,'startButton').setInteractive();
        tour1.on('pointerdown', function(pointer){
            tour1.destroy();
            var loadingBar = scene.add.sprite(window.innerWidth/2-(window.innerWidth/4),window.innerHeight/2,'loading').setScale(5);
            loadingBar.anims.play('load',true);
            scene.time.addEvent({
                delay: 800,
                callback: ()=>{
                    gameState.tour = 'city';
                    scene.scene.start('TourScene');
                },  
                startAt: 0,
                timeScale: 1
            });
        });
        tour1.on('pointerover', function(pointer){
            scene.sound.play('click');
            tour1.setFrame(1);
        });
        tour1.on('pointerout', function(pointer){
            tour1.setFrame(0);
        });
        
        
        this.add.text(window.innerWidth/2+(window.innerWidth/4), 40, `Trampoline Tour`, {
            fill: '#000000', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3).setOrigin(0.5);
        this.add.image(window.innerWidth/2+(window.innerWidth/4),window.innerHeight/2-(window.innerHeight/4)+50,'trampolineTourPreview').setScale(0.7);
        var tour2 = this.add.image(window.innerWidth/2+(window.innerWidth/4),window.innerHeight/2,'startButton').setInteractive();
        tour2.on('pointerdown', function(pointer){
            tour2.destroy();
            var loadingBar = scene.add.sprite(window.innerWidth/2+(window.innerWidth/4),window.innerHeight/2,'loading').setScale(5);
            loadingBar.anims.play('load',true);
            scene.time.addEvent({
                delay: 800,
                callback: ()=>{
                    gameState.tour = 'trampoline';
                    scene.scene.start('TourScene');
                },  
                startAt: 0,
                timeScale: 1
            });
        });
        tour2.on('pointerover', function(pointer){
            scene.sound.play('click');
            tour2.setFrame(1);
        });
        tour2.on('pointerout', function(pointer){
            tour2.setFrame(0);
        });
        
        //add gold icon and amound
        this.add.image(20,20,"coin").setOrigin(0,0).setDepth(-100).setScale(2);
        var coinsText = this.add.text(125, 40, `${gameState.thingsToSave.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //merchant and interact
        
    }
    update(){
        //game loop that constantly runs (not needed for upgrades)
    }
}
