//upgrade subclass 
class UpgradeScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'UpgradeScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        //mutes menu music
        gameState.bgM.setMute(true);
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.sprite(window.innerWidth/2-50,0,'homeIcon').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            gameState.save();
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`${gameState.currentScene}`);
		});
        back.on('pointerover', () => {
            back.setFrame(1);
		});
        back.on('pointerout', () => {
            back.setFrame(0);
		});
        
        var back2 = this.add.sprite(window.innerWidth/2+70,50,'cosmeticsButton').setOrigin(0,0).setInteractive().setScale(60/44);
        back2.on('pointerup', () => {
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`ShopScene`);
		});
        back2.on('pointerover', () => {
            back2.setFrame(1);
		});
        back2.on('pointerout', () => {
            back2.setFrame(0);
		});
        var image = this.add.sprite(window.innerWidth/2-320,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(1.2);
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
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
                gameState.globalScene.sound.play('purchased');
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
                gameState.globalScene.sound.play('purchased');
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
                gameState.globalScene.sound.play('purchased');
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
                gameState.globalScene.sound.play('purchased');
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
        //game loop that constantly runs (not needed for upgrades)
    }
}













//shop subclass 
class ShopScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'ShopScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.sprite(window.innerWidth/2-50,0,'homeIcon').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            gameState.save();
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`${gameState.currentScene}`);
		});
        back.on('pointerover', () => {
            back.setFrame(1);
		});
        back.on('pointerout', () => {
            back.setFrame(0);
		});
        
        var back2 = this.add.sprite(window.innerWidth/2-320,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(1.2);
        back2.on('pointerup', () => {
            scene.scene.stop("ShopScene");
            scene.scene.start(`UpgradeScene`);
		});
        back2.on('pointerover', () => {
            back2.setFrame(1);
		});
        back2.on('pointerout', () => {
            back2.setFrame(0);
		});
        var image = this.add.sprite(window.innerWidth/2+70,50,'cosmeticsButton').setOrigin(0,0).setInteractive().setScale(60/44);
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
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
       
        
        
        //skins
        var equipped = this.add.image(-1000,-1000,'equippedImage').setDepth(1);
        
        /*
        var goldenGunIcon = this.add.image(window.innerWidth/2,250,'goldenGunShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.goldenGun.name){
            equipped.x = goldenGunIcon.x;
            equipped.y = goldenGunIcon.y;
        }
        goldenGunIcon.on('pointerup', () => {
            if(gameState.weaponSkins.goldenGun.owned == 1){
                gameState.skin = gameState.weaponSkins.goldenGun.name;
                gameState.bulletSkin = gameState.weaponSkins.goldenGun.nameB;
                alert("Equipped"); 
                equipped.x = goldenGunIcon.x;
                equipped.y = goldenGunIcon.y;
            }
            else if(gameState.coins< 10000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: The Golden Gun is yours!");
                gameState.globalScene.sound.play('purchased');
                gameState.coins -= 10000;
                gameState.weaponSkins.goldenGun.owned = 1;
                gameState.skin = gameState.weaponSkins.goldenGun.name;
                gameState.bulletSkin = gameState.weaponSkins.goldenGun.nameB;
            }
		});
        
        var susIcon = this.add.image(110,330,'susShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.sus.name){
            equipped.x = susIcon.x;
            equipped.y = susIcon.y;
        }
        susIcon.on('pointerup', () => {
            if(gameState.weaponSkins.sus.owned == 1){
                gameState.skin = gameState.weaponSkins.sus.name;
                gameState.bulletSkin = 'bullet1';
                alert("Equipped"); 
                equipped.x = susIcon.x;
                equipped.y = susIcon.y;
            }
            else if(gameState.coins < 1500){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: Your Sus now!");
                gameState.globalScene.sound.play('purchased');
                gameState.coins -= 1500;
                gameState.weaponSkins.sus.owned = 1;
                gameState.skin = gameState.weaponSkins.sus.name;
                gameState.bulletSkin = 'bullet1';
            }
		});
        
        var laserTrooperIcon = this.add.image(susIcon.x+220,330,'laserTrooperShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.laserTrooper.name){
            equipped.x = laserTrooperIcon.x;
            equipped.y = laserTrooperIcon.y;
        }
        laserTrooperIcon.on('pointerup', () => {
            if(gameState.weaponSkins.laserTrooper.owned == 1){
                gameState.skin = gameState.weaponSkins.laserTrooper.name;
                gameState.bulletSkin = 'bulletLaser';
                alert("Equipped"); 
                equipped.x = laserTrooperIcon.x;
                equipped.y = laserTrooperIcon.y;
            }
            else if(gameState.coins < 2000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: Welcome to the Empire!");
                gameState.globalScene.sound.play('purchased');
                gameState.coins -= 2000;
                gameState.weaponSkins.laserTrooper.owned = 1;
                gameState.skin = gameState.weaponSkins.laserTrooper.name;
                gameState.bulletSkin = 'bulletLaser';
            }
		});
        
        var satvikIcon = this.add.image(laserTrooperIcon.x+220,330,'satvikShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.satvik.name){
            equipped.x = satvikIcon.x;
            equipped.y = satvikIcon.y;
        }
        satvikIcon.on('pointerup', () => {
            if(gameState.weaponSkins.satvik.owned == 1){
                gameState.skin = gameState.weaponSkins.satvik.name;
                gameState.bulletSkin = 'bulletTennis';
                alert("Equipped"); 
                equipped.x = satvikIcon.x;
                equipped.y = satvikIcon.y;
            }
            else if(gameState.coins < 1000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: The god himself...");
                gameState.globalScene.sound.play('purchased');
                gameState.coins -= 1000;
                gameState.weaponSkins.satvik.owned = 1;
                gameState.skin = gameState.weaponSkins.satvik.name;
                gameState.bulletSkin = 'bulletTennis';
            }
		});
        
        var skeletonGunIcon = this.add.image(satvikIcon.x+220,330,'skeletonGunShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.SkeletonGun.name){
            equipped.x = skeletonGunIcon.x;
            equipped.y = skeletonGunIcon.y;
        }
        skeletonGunIcon.on('pointerup', () => {
            if(gameState.weaponSkins.SkeletonGun.owned == 1){
                gameState.skin = gameState.weaponSkins.SkeletonGun.name;
                gameState.bulletSkin = `${gameState.weaponSkins.SkeletonGun.nameB}`;
                alert("Equipped"); 
                equipped.x = skeletonGunIcon.x;
                equipped.y = skeletonGunIcon.y;
            }else {
                alert("Merchant: Unlocks through Achievement!");
            }
		});
        */
    }
    update(){
        //game loop that constantly runs (not needed for buying charcater and weapon skins)
    }
}
