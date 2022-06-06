//Create UpgradeScene Phaser SubClass
class UpgradeScene extends Phaser.Scene {
    constructor() {
		super({ key: 'UpgradeScene' })
	}
    preload(){
        
    }
    create(){
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.image(window.innerWidth-75,10,'backButton').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            gameState.save();
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`${gameState.currentScene}`);
		});
        
        var back2 = this.add.image(window.innerWidth-70,window.innerHeight-70,'backButton2').setOrigin(0,0).setInteractive();
        back2.flipX = true;
        back2.on('pointerup', () => {
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`ShopScene`);
		});
        
        //add gold icon and amound
        this.add.image(20,20,"coin").setOrigin(0,0).setDepth(-100).setScale(2);
        var coinsText = this.add.text(125, 40, `${gameState.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        
        //merchant and interact
        var merch = this.add.sprite(window.innerWidth/2,100,'merchant').setInteractive().setScale(2.5);
        merch.anims.play('move');
        merch.on('pointerup', () => {
            alert("Merchant: Each upgrade be 100 coins lad.");
		});
        
        //Upgrade Buttons
        
            //Health Upgrade Button
        var health = this.add.sprite(window.innerWidth/4,window.innerHeight/4+100,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.health-100; i += 20){
            this.add.rectangle(window.innerWidth/4+33+(i/20*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
        }
        health.anims.play('health');
        health.on('pointerup', () => {
            var cost = gameState.upgradeCosts(gameState.characterStats.health,100,20);
            if(gameState.coins >= gameState.upgradeCosts(gameState.characterStats.health,100,20) && gameState.characterStats.health < 200){
                gameState.coins -= gameState.upgradeCosts(gameState.characterStats.health,100,20);
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.health += 20;
                gameState.save();
                for (var i = 0; i < gameState.characterStats.health-100; i += 20){
                    this.add.rectangle(window.innerWidth/4+33+(i/20*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
                }
                alert("Merchant: Additional Health PURCHASED");
            } else{
                if(cost > 500){
                    alert(`Merchant: SOLD OUT!`);
                }else {
                    alert(`Merchant: Need ${gameState.upgradeCosts(gameState.characterStats.health,100,20)} coins!`);
                }
            }
		});
        
            //Damage Upgrade Button
        var damage = this.add.sprite(window.innerWidth/2+window.innerWidth/4,window.innerHeight/4+100,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.damage-25; i += 5){
            this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
        }
        damage.anims.play('damage');
        damage.on('pointerup', () => {
            var cost = gameState.upgradeCosts(gameState.characterStats.damage,25,5);
            if(gameState.coins >= cost && gameState.characterStats.damage < 50){
                gameState.coins -= cost;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.damage += 5;
                gameState.save();
                for (var i = 0; i < gameState.characterStats.damage-25; i += 5){
                    this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/4+153, 15, 15, 0x39FF14);
                }
                alert("Merchant: Additional Damage PURCHASED");
            } else{
                if(cost > 500){
                    alert(`Merchant: SOLD OUT!`);
                }else {
                    alert(`Merchant: Need ${gameState.upgradeCosts(gameState.characterStats.damage,25,5)} coins!`);
                }
            }
		});
        var speed = this.add.sprite(window.innerWidth/4,window.innerHeight/2+window.innerHeight/4,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.speed-150; i += 5){
            this.add.rectangle(window.innerWidth/4+33+(i/5*18), window.innerHeight/2+window.innerHeight/4+54, 15, 15, 0x39FF14);
        }
        speed.anims.play('speed');
        speed.on('pointerup', () => {
            var cost = gameState.upgradeCosts(gameState.characterStats.speed,150,5);
            if(gameState.coins >= cost && gameState.characterStats.speed < 175){
                gameState.coins -= cost;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.speed += 5;
                gameState.save();
                for (var i = 0; i < gameState.characterStats.speed-150; i += 5){
                    this.add.rectangle(window.innerWidth/4+33+(i/5*18), window.innerHeight/2+window.innerHeight/4+54, 15, 15, 0x39FF14);
                }
                alert("Merchant: Increased Speed PURCHASED");
            } else{
                if(cost > 500){
                    alert(`Merchant: SOLD OUT!`);
                }else {
                    alert(`Merchant: Need ${gameState.upgradeCosts(gameState.characterStats.speed,150,5)} coins!`);
                }
            }
		});
        var ammoCap = this.add.sprite(window.innerWidth/2+window.innerWidth/4,window.innerHeight/2+window.innerHeight/4,'upgradeOptions').setInteractive();
        for (var i = 0; i < gameState.characterStats.ammo-25; i += 5){
            this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/2+window.innerHeight/4+54, 15, 15, 0x39FF14);
        }
        ammoCap.anims.play('ammocap');
        ammoCap.on('pointerup', () => {
            var cost = gameState.upgradeCosts(gameState.characterStats.ammo,25,5);
            if(gameState.coins >= cost && gameState.characterStats.ammo < 50){
                gameState.coins -= cost;
                coinsText.setText(`${gameState.coins}`);
                gameState.characterStats.ammo += 5;
                gameState.save();
                for (var i = 0; i < gameState.characterStats.ammo-25; i += 5){
                    this.add.rectangle(window.innerWidth/2+window.innerWidth/4+33+(i/5*18), window.innerHeight/2+window.innerHeight/4+54, 15, 15, 0x39FF14);
                }
                alert("Merchant: Increased Ammo Capacity PURCHASED");
            } else{
                if(cost > 500){
                    alert(`Merchant: SOLD OUT!`);
                }else {
                    alert(`Merchant: Need ${gameState.upgradeCosts(gameState.characterStats.ammo,25,5)} coins!`);
                }
            }
		});
    }
    update(){
        
    }
}














class ShopScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ShopScene' })
	}
    preload(){
        
    }
    create(){
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.image(window.innerWidth-75,10,'backButton').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            gameState.save();
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`${gameState.currentScene}`);
		});
        
        var back2 = this.add.image(20,window.innerHeight-70,'backButton2').setOrigin(0,0).setInteractive();
        back2.on('pointerup', () => {
            scene.scene.stop("ShopScene");
            scene.scene.start(`UpgradeScene`);
		});
        //add gold icon and amound
        this.add.image(20,20,"coin").setOrigin(0,0).setDepth(-100).setScale(2);
        var coinsText = this.add.text(125, 40, `${gameState.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        this.time.addEvent({
            delay: 10,
            callback: ()=>{
                coinsText.setText(gameState.coins);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        
        //merchant and interact
        var merch = this.add.sprite(window.innerWidth/2,100,'merchant').setInteractive().setScale(2.5);
        merch.anims.play('move');
        merch.on('pointerup', () => {
            alert("Merchant: Weapon Skins for Sale!");
		});
        
        
        //skins
        var equipped;
        
        var goldenGunIcon = this.add.image(window.innerWidth/2,250,'goldenGunShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.goldenGun.name){
            equipped = this.add.image(window.innerWidth/2,250,'equippedImage');
        }
        goldenGunIcon.on('pointerup', () => {
            if(gameState.weaponSkins.goldenGun.owned == 1){
                gameState.skin = gameState.weaponSkins.goldenGun.name;
                gameState.bulletSkin = gameState.weaponSkins.goldenGun.nameB;
                alert("Equipped"); 
                equipped = this.add.image(window.innerWidth/2,250,'equippedImage');
            }
            else if(gameState.coins< 10000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: The Golden Gun is yours!");
                gameState.coins -= 10000;
                gameState.weaponSkins.goldenGun.owned = 1;
                gameState.skin = gameState.weaponSkins.goldenGun.name;
                gameState.bulletSkin = gameState.weaponSkins.goldenGun.nameB;
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
        gameState.checkBoss = this.time.addEvent({
            delay: 10,
            callback: ()=>{
                killsText.setText(gameState.kills);
                coinsText.setText(gameState.coins);
                if (gameState.kills >= gameState.bossSummonKills){
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
                                gameState.kills = 0;
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
        gameState.barriers = this.physics.add.group();
        
        var healthImage = this.add.image(20,20,'healthImage').setOrigin(0,0);
        gameState.createHealthBar(this,healthImage.x+35,healthImage.y+2);
       
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
