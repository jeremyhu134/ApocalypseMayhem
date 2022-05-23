//Create UpgradeScene Phaser SubClass
class UpgradeScene extends Phaser.Scene {
    constructor() {
		super({ key: 'UpgradeScene' })
	}
    preload(){
        
    }
    create(){
        //create background
        this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.image(window.innerWidth-75,10,'backButton').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`${gameState.currentScene}`);
		});
        //add gold icon and amound
        this.add.image(20,20,"coin").setOrigin(0,0).setDepth(-100).setScale(2);
        var coinsText = this.add.text(125, 40, `${gameState.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //Upgrade Buttons
        
            //Health Upgrade Button
        var health = this.add.sprite(window.innerWidth/4,window.innerHeight/4+100,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.health-100; i += 20){
            this.add.rectangle(window.innerWidth/4+33+(i/20*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
        }
        health.anims.play('health');
        health.on('pointerup', () => {
            if(gameState.coins >= 100 && gameState.characterStats.health < 200){
                gameState.coins -= 100;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.health += 20;
                for (var i = 0; i < gameState.characterStats.health-100; i += 20){
                    this.add.rectangle(window.innerWidth/4+33+(i/20*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
                }
                alert("Additional Health : PURCHASED");
            } else{
                alert("Can't do that");
            }
		});
        
            //Damage Upgrade Button
        var damage = this.add.sprite(window.innerWidth/2+window.innerWidth/4,window.innerHeight/4+100,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.damage-25; i += 5){
            this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
        }
        damage.anims.play('damage');
        damage.on('pointerup', () => {
            if(gameState.coins >= 100 && gameState.characterStats.damage < 50){
                gameState.coins -= 100;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.damage += 5;
                for (var i = 0; i < gameState.characterStats.damage-25; i += 5){
                    this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
                }
                alert("Additional Damage : PURCHASED");
            } else{
                alert("Can't do that");
            }
		});
        var speed = this.add.sprite(window.innerWidth/4,window.innerHeight/2+window.innerHeight/4,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.speed-150; i += 5){
            this.add.rectangle(window.innerWidth/4+33+(i/5*18), window.innerHeight/4+402, 15, 15, 0x39FF14);
        }
        speed.anims.play('speed');
        speed.on('pointerup', () => {
            if(gameState.coins >= 100 && gameState.characterStats.damage < 50){
                gameState.coins -= 100;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.speed += 5;
                for (var i = 0; i < gameState.characterStats.speed-150; i += 5){
                    this.add.rectangle(window.innerWidth/4+33+(i/5*18), window.innerHeight/4+402, 15, 15, 0x39FF14);
                }
                alert("Increased Speed : PURCHASED");
            } else{
                alert("Can't do that");
            }
		});
        var ammoCap = this.add.sprite(window.innerWidth/2+window.innerWidth/4,window.innerHeight/2+window.innerHeight/4,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.ammo-25; i += 5){
            this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/4+402, 15, 15, 0x39FF14);
        }
        ammoCap.anims.play('ammocap');
        ammoCap.on('pointerup', () => {
            if(gameState.coins >= 100 && gameState.characterStats.ammo < 50){
                gameState.coins -= 100;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.ammo += 5;
                for (var i = 0; i < gameState.characterStats.ammo-25; i += 5){
                    this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/4+402, 15, 15, 0x39FF14);
                }
                alert("Increased Ammo Capacity : PURCHASED");
            } else{
                alert("Can't do that");
            }
		});
    }
    update(){
        
    }
}













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
        //Create the player
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
        //Coins
        this.add.image(1140,25,"coin").setOrigin(0,0).setDepth(-100).setScale(2);
        var coinsText = this.add.text(1220, 40, `${gameState.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        //Phaser loop to constantly check for kills and summon random boss
        gameState.checkBoss = this.time.addEvent({
            delay: 10,
            callback: ()=>{
                killsText.setText(gameState.kills);
                coinsText.setText(gameState.coins);
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