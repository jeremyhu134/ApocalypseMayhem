class ChooseHeroScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ChooseHeroScene' })
	}
    preload(){
        //this.load.image('menubg','tf2arenaimages/menubg.png');
        
        //this.load.spritesheet('redscout','tf2arenaimages/redscout.png',{frameWidth: 33,frameHeight:53});
    }
    create(){
        
    }
    update(){
        
    }
}

class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        
    }
    create(){
        gameState.globalScene = this;
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        gameState.character = this.physics.add.sprite(window.innerWidth/2-16,window.innerHeight/2+16,'character');
        gameState.character.body.width = 50;
        
        //Kill Tracker
        this.add.image(1025,5,"skull").setOrigin(0,0).setDepth(-100);
        this.add.image(1025,60,"redSkull").setOrigin(0,0).setDepth(-100);
        var killsText = this.add.text(1085, 10, `${gameState.kills}`, {
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        var bossKillsText = this.add.text(1085, 65, `${gameState.bossSummonKills}`, {
            fill: '#A30000', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        gameState.checkBoss = this.time.addEvent({
            delay: 10,
            callback: ()=>{
                killsText.setText(gameState.kills);
                bossKillsText.setText(gameState.bossSummonKills);
                if (gameState.kills >= gameState.bossSummonKills){
                    gameState.spawnZombies.paused = true;
                    if(gameState.zombies.getChildren().length > 0){
                        for (var i = 0; i < gameState.zombies.getChildren().length; i++){
                            gameState.zombies.getChildren()[i].health = 0;
                            gameState.kills = gameState.bossSummonKills;
                        }
                        gameState.checkBoss.paused = true;
                        this.time.addEvent({
                            delay: 1000,
                            callback: ()=>{
                                gameState.bossSummonKills += 50*(gameState.bossSummonKills/50);
                                gameState.createSarmsZombie(this,window.innerWidth/2,window.innerHeight/2);
                                console.log(gameState.kills);
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
        gameState.barriers = this.physics.add.group();
        
        gameState.createHealthBar(this,10,10);
       
        this.physics.add.collider(gameState.zombies, gameState.barriers);
        gameState.spawnZombies = this.time.addEvent({
            delay: 4000,
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