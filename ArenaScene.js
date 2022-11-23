//Create ArenaScene Phaser SubClass
class ArenaScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'ArenaScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        //Variables to reference the scene globally
        gameState.currentScene = "ArenaScene";
        gameState.globalScene = this;
        //Background image and animation start
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        //background music
        gameState.bgM.setMute(true);
        gameState.arenaM = this.sound.add('arenaMusic');
        gameState.arenaM.play(gameState.loopSound);
	    gameState.bossM = this.sound.add('bossMusic');
        //A pause button for exiting
        gameState.Sbutton = this.add.image(window.innerWidth-30,window.innerHeight-30,'settingsButton').setInteractive().setScale(.7);
        gameState.Sbutton.on('pointerdown', function(pointer){
            //ADD SAVE
            gameState.globalScene.scene.pause("ArenaScene");
            gameState.globalScene.scene.launch('PauseScene');
        });
        gameState.Sbutton.on('pointerover', function(pointer){
            gameState.globalScene.sound.play('click');
            gameState.Sbutton.setFrame(1);
        });
        gameState.Sbutton.on('pointerout', function(pointer){
            gameState.Sbutton.setFrame(0);
        });
        //Create the player
        gameState.character = this.physics.add.sprite(window.innerWidth/2-16,window.innerHeight/2+16,`${gameState.skin}`).setDepth(0).setScale(0.7);
        gameState.character.setSize(60,100);
        if(gameState.selected !== ' '){
            gameState.cosmetic = this.add.sprite(gameState.character.x,gameState.character.y,`${gameState.selected.name}`).setScale(0.7);
            if(gameState.selected.animate == true){
               gameState.cosmetic.anims.play(`${gameState.selected.name}Animate`,true);
            }
        }
        
        if(gameState.gunType == 'assaultRifle'){
            gameState.fireRate = 150;
            gameState.damage = gameState.characterStats.damage;
            gameState.ammo = gameState.characterStats.ammo;
            gameState.speed = gameState.characterStats.speed;
        }
        else if(gameState.gunType == 'minigun'){
            gameState.fireRate = 75;
            gameState.damage = gameState.characterStats.damage*0.6;
            gameState.ammo = gameState.characterStats.ammo *8;
            gameState.speed = gameState.characterStats.speed*0.8;
        }
        else if(gameState.gunType == 'rocketLauncher'){
            gameState.fireRate = 700;
            gameState.damage = gameState.characterStats.damage*3;
            gameState.ammo = Math.ceil(gameState.characterStats.ammo/4.17);
            gameState.speed = gameState.characterStats.speed*0.85;
        }
        gameState.current = gameState.speed;
        gameState.currentRate = gameState.fireRate;
        
        gameState.gun = this.add.sprite(gameState.character.x,gameState.character.y,`${gameState.gunSkin}`).setDepth(gameState.character.y+1).setScale(0.8);
        
        var sprintIcon = this.add.image(820,15,"sprintIcon").setOrigin(0,0).setDepth(-100).setScale(0.6);
        gameState.createSprintBar(this, 0);
        
        
        //Kill Tracker
        var killsImage = this.add.image(690,15,"skull").setOrigin(0,0).setDepth(-100).setScale(0.5);
        var killsText = this.add.text(killsImage.x+55, killsImage.y+10, `${gameState.kills}`, {
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
       
        //Coins icon and text
        var coinImage = this.add.image(20,window.innerHeight-70,"coin").setOrigin(0,0).setDepth(-100).setScale(1.5);
        var coinsText = this.add.text(coinImage.x+50, coinImage.y+10, `${gameState.thingsToSave.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //Ammo display
        var ammoImage = this.add.image(570,15,"ammoIcon").setOrigin(0,0).setDepth(-100).setScale(0.5);
        gameState.ammoText = this.add.text(ammoImage.x+50, ammoImage.y+10, `${gameState.ammo}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //Phaser loop to constantly check for kills and summon random boss
        gameState.bossBattle = false;
        gameState.checkBoss = this.time.addEvent({
            delay: 10,
            callback: ()=>{
                killsText.setText(gameState.kills);
                coinsText.setText(gameState.thingsToSave.coins);
                if (gameState.bossSummonKills >= 50){
                    //resets kills for boss and stops zombies from summoning
                    gameState.bossSummonKills = 0;
                    gameState.bossBattle = true;
                    gameState.spawnZombies.paused = true;
                    if(gameState.zombies.getChildren().length > 0){
                        //kill all zombies before boss spawns
                        for (var i = 0; i < gameState.zombies.getChildren().length; i++){
                            gameState.zombies.getChildren()[i].health = 0;
                        }
                        gameState.checkBoss.paused = true;
                        this.time.addEvent({
                            delay: 1000,
                            callback: ()=>{
                                //mutes all sounds except boss music
                                gameState.arenaM.setMute(true);
                                gameState.bossM.play(gameState.loopSound);
				                gameState.bossM.setMute(false);
                                //generate random number to choose which boss to fight
                                var rand = Math.ceil(Math.random()*3);
                                if (rand == 1){
                                    gameState.createSarmsZombie(this,window.innerWidth/2,window.innerHeight/2);
                                } else if (rand == 2){
                                    gameState.createCloneZombie(this,window.innerWidth/2,window.innerHeight/2);
                                }else {
                                    gameState.createQuadZombie(this,window.innerWidth/2,window.innerHeight/2);
                                }
                            },
                            startAt: 0,
                            timeScale: 1
                        });
                    }
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        
        //create block scope variables for mouse so the coordinates can be accessed everywhere
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        //disables right click menu
        //this.input.mouse.disableContextMenu();
        //assigns cursors to track mouse
        gameState.cursors = this.input.keyboard.createCursorKeys();
        //assigns instances for the keys listed
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC');
        //creats phaser type of lists that make managing and creating zombies and bullets easy
        gameState.bullets = this.physics.add.group();
        gameState.zombies = this.physics.add.group();
        
        //create health icon and health bar
        var healthImage = this.add.image(20,20,'healthImage').setOrigin(0,0);
        gameState.createHealthBar(this,healthImage.x+35,healthImage.y+2);
       
        //loop that spawns zombies every 3 seconds
        gameState.spawnZombies = this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                var rand = Math.ceil(Math.random()*6);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        //creates zombie randomly on screen
                        gameState.createZombie(this,50+(Math.ceil(Math.random()*window.innerWidth-100)),50+(Math.ceil(Math.random()*window.innerHeight-100)),gameState.zombie);
                        console.log(50+(Math.ceil(Math.random()*window.innerWidth-100)),50+(Math.ceil(Math.random()*window.innerHeight-100)));
                    },
                    startAt: 0,
                    timeScale: 1,
                    repeat: (rand-1)
                });
            },
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        //this.physics.add.overlap(gameState.blueprint, gameState.buildings)
    }
    update(){
        //constantly loops these functions to the keyboard input is constantly tracked
        gameState.chracterControls(this,gameState.character,gameState.characterStats);
        //constantly checking for achievement completions
        gameState.achievmentTracker(this);
    }
}



















//Create ArenaScene Phaser SubClass
class TourScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'TourScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        //Variables to reference the scene globally
        gameState.currentScene = 'TourScene';
        gameState.globalScene = this;
        //Background image and animation start
        if(gameState.tour == 'city'){
             var bg = this.physics.add.sprite(0,0,'backgroundCity').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        }else if (gameState.tour == 'trampoline'){
            var bg = this.physics.add.sprite(0,0,'backgroundTrampoline').setOrigin(0,0).setScale(window.innerWidth/1400).setDepth(-100);
        }
       
        //bg.anims.play('bganimate','true');
        //background music
        gameState.bgM.setMute(true);
        gameState.tourM = this.sound.add('tourMusic');
        gameState.tourM.play(gameState.loopSound);
	    gameState.bossM = this.sound.add('bossMusic');
        //A pause button for exiting
        gameState.Sbutton = this.add.image(window.innerWidth-30,window.innerHeight-30,'settingsButton').setInteractive().setScale(.7);
        gameState.Sbutton.on('pointerdown', function(pointer){
            //ADD SAVE
            gameStae.currentScene.scene.pause("TourScene");
            gameStae.currentScene.scene.launch('PauseScene');
        });
        gameState.Sbutton.on('pointerover', function(pointer){
            gameStae.currentScene.sound.play('click');
            gameState.Sbutton.setFrame(1);
        });
        gameState.Sbutton.on('pointerout', function(pointer){
            gameState.Sbutton.setFrame(0);
        });
        //Create the player
        gameState.character = this.physics.add.sprite(window.innerWidth/2-16,window.innerHeight/2+16,`${gameState.skin}`).setDepth(0).setScale(0.7);
        gameState.character.setSize(60,100);
        if(gameState.selected !== ' '){
            gameState.cosmetic = this.add.sprite(gameState.character.x,gameState.character.y,`${gameState.selected.name}`).setScale(0.7);
            if(gameState.selected.animate == true){
               gameState.cosmetic.anims.play(`${gameState.selected.name}Animate`,true);
            }
        }
        
        if(gameState.gunType == 'assaultRifle'){
            gameState.fireRate = 150;
            gameState.damage = gameState.characterStats.damage;
            gameState.ammo = gameState.characterStats.ammo;
            gameState.speed = gameState.characterStats.speed;
        }
        else if(gameState.gunType == 'minigun'){
            gameState.fireRate = 75;
            gameState.damage = gameState.characterStats.damage*0.6;
            gameState.ammo = gameState.characterStats.ammo *8;
            gameState.speed = gameState.characterStats.speed*0.8;
        }
        else if(gameState.gunType == 'rocketLauncher'){
            gameState.fireRate = 700;
            gameState.damage = gameState.characterStats.damage*3;
            gameState.ammo = Math.ceil(gameState.characterStats.ammo/4.17);
            gameState.speed = gameState.characterStats.speed*0.85;
        }
        gameState.current = gameState.speed;
        gameState.currentRate = gameState.fireRate;
        
        gameState.gun = this.add.sprite(gameState.character.x,gameState.character.y,`${gameState.gunSkin}`).setDepth(gameState.character.y+1).setScale(0.8);
        
        var sprintIcon = this.add.image(820,15,"sprintIcon").setOrigin(0,0).setDepth(-100).setScale(0.6);
        gameState.createSprintBar(this, 0);
        
        
        //Kill Tracker
        var killsImage = this.add.image(690,15,"skull").setOrigin(0,0).setDepth(-100).setScale(0.5);
        var killsText = this.add.text(killsImage.x+55, killsImage.y+10, `${gameState.kills}`, {
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
       
        //Coins icon and text
        var coinImage = this.add.image(20,window.innerHeight-70,"coin").setOrigin(0,0).setDepth(-100).setScale(1.5);
        var coinsText = this.add.text(coinImage.x+50, coinImage.y+10, `${gameState.thingsToSave.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //Ammo display
        var ammoImage = this.add.image(570,15,"ammoIcon").setOrigin(0,0).setDepth(-100).setScale(0.5);
        gameState.ammoText = this.add.text(ammoImage.x+50, ammoImage.y+10, `${gameState.ammo}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //Phaser loop to constantly check for kills and summon random boss
        gameState.bossBattle = false;
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                if(gameState.tour == 'city'){
                    gameState.createCloneZombie(this,100,window.innerHeight/2);
                    gameState.createCloneZombie(this,window.innerWidth-100,window.innerHeight/2);
                }else if (gameState.tour == 'trampoline'){
                    gameState.createQuadZombie(this,window.innerWidth/2-100,window.innerHeight/2);
                    this.time.addEvent({
                        delay: 1500,
                        callback: ()=>{
                            gameState.createQuadZombie(this,window.innerWidth/2+100,window.innerHeight/2);
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }
                gameState.checkBoss = this.time.addEvent({
                    delay: 10,
                    callback: ()=>{
                        killsText.setText(gameState.kills);
                        coinsText.setText(gameState.thingsToSave.coins);
                        if(gameState.zombies.getChildren().length <= 0){
                            gameState.globalScene.scene.stop("TourScene");
                            gameState.globalScene.scene.start('ToursMenuScene');
                            if(gameState.tour == 'city'){
                                gameState.skins[6].owned = 1;
                            }else if (gameState.tour == 'trampoline'){
                                gameState.skins[7].owned = 1;
                            }
                            gameState.save();
                        }
                    },  
                    startAt: 0,
                    timeScale: 1,
                    repeat: -1
                });
            },  
            startAt: 0,
            timeScale: 1
        });
        
        
        //create block scope variables for mouse so the coordinates can be accessed everywhere
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        //disables right click menu
        //this.input.mouse.disableContextMenu();
        //assigns cursors to track mouse
        gameState.cursors = this.input.keyboard.createCursorKeys();
        //assigns instances for the keys listed
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC');
        //creats phaser type of lists that make managing and creating zombies and bullets easy
        gameState.bullets = this.physics.add.group();
        gameState.zombies = this.physics.add.group();
        
        //create health icon and health bar
        var healthImage = this.add.image(20,20,'healthImage').setOrigin(0,0);
        gameState.createHealthBar(this,healthImage.x+35,healthImage.y+2);
       
        //loop that spawns zombies every 3 seconds
        gameState.spawnZombies = this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                var rand = Math.ceil(Math.random()*3);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        //creates zombie randomly on screen
                        gameState.createZombie(this,50+(Math.ceil(Math.random()*window.innerWidth-100)),50+(Math.ceil(Math.random()*window.innerHeight-100)),gameState.zombie);
                        console.log(50+(Math.ceil(Math.random()*window.innerWidth-100)),50+(Math.ceil(Math.random()*window.innerHeight-100)));
                    },
                    startAt: 0,
                    timeScale: 1,
                    repeat: (rand-1)
                });
            },
            startAt: 0,
            timeScale: 1,
            repeat: 10
        });
        //this.physics.add.overlap(gameState.blueprint, gameState.buildings)
    }
    update(){
        //constantly loops these functions to the keyboard input is constantly tracked
        if(gameState.health !== -1000){
            gameState.chracterControls(this,gameState.character,gameState.characterStats);
        }
        //constantly checking for achievement completions
        gameState.achievmentTracker(this);
    }
}