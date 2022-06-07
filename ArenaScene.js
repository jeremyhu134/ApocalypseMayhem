//Create ArenaScene Phaser SubClass
class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        
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
        //Create the player
        gameState.character = this.physics.add.sprite(window.innerWidth/2-16,window.innerHeight/2+16,`${gameState.skin}`);
        gameState.character.body.width = 50;
        
        //Kill Tracker
        var killsImage = this.add.image(950,15,"skull").setOrigin(0,0).setDepth(-100);
        var killsText = this.add.text(killsImage.x+55, killsImage.y+10, `${gameState.kills}`, {
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        /*var bossKillsImage = this.add.image(670,5,"redSkull").setOrigin(0,0).setDepth(-100);
        var bossKillsText = this.add.text(bossKillsImage.x+55, bossKillsImage.y+10, `${gameState.bossSummonKills}`, {
            fill: '#A30000', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);*/
        
        //Coins
        var coinImage = this.add.image(1130,10,"coin").setOrigin(0,0).setDepth(-100).setScale(1.5);
        var coinsText = this.add.text(coinImage.x+50, coinImage.y+10, `${gameState.coins}`, {
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
                    gameState.bossSummonKills = 0;
                    gameState.bossBattle = true;
                    gameState.spawnZombies.paused = true;
                    if(gameState.zombies.getChildren().length > 0){
                        for (var i = 0; i < gameState.zombies.getChildren().length; i++){
                            gameState.zombies.getChildren()[i].health = 0;
                        }
                        gameState.checkBoss.paused = true;
                        this.time.addEvent({
                            delay: 1000,
                            callback: ()=>{
                                gameState.arenaM.setMute(true);
                                gameState.bossM.play(gameState.loopSound);
				                gameState.bossM.setMute(false);
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
        
        
        
        /*this.physics.add.collider(gameState.player, gameState.barriers,(hero,barrier)=>{
            
        });*/
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        //this.input.mouse.disableContextMenu();
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC');
        gameState.bullets = this.physics.add.group();
        gameState.zombies = this.physics.add.group();
        
        var healthImage = this.add.image(20,20,'healthImage').setOrigin(0,0);
        gameState.createHealthBar(this,healthImage.x+35,healthImage.y+2);
       
        gameState.spawnZombies = this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                var rand = Math.ceil(Math.random()*4);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        gameState.createZombie(this,50+(Math.ceil(Math.random()*window.innerWidth-100)),50+(Math.ceil(Math.random()*window.innerHeight-100)),gameState.zombie);
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
        gameState.chracterControls(this,gameState.character,gameState.characterStats);
    }
}