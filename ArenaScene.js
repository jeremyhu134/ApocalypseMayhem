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
        gameState.gunSkin = 'assaultRifle';
        
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
        var coinsText = this.add.text(coinImage.x+50, coinImage.y+10, `${gameState.coins}`, {
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
                coinsText.setText(gameState.coins);
                if (gameState.bossSummonKills >= 30){
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
                var rand = Math.ceil(Math.random()*4);
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