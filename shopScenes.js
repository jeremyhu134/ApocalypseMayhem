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
        var equipped = this.add.image(-1000,-1000,'equippedImage').setDepth(1);
        
        var goldenGunIcon = this.add.image(window.innerWidth/2,250,'goldenGunShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.goldenGun.name){
            equipped.x = window.innerWidth/2;
            equipped.y = 250;
        }
        goldenGunIcon.on('pointerup', () => {
            if(gameState.weaponSkins.goldenGun.owned == 1){
                gameState.skin = gameState.weaponSkins.goldenGun.name;
                gameState.bulletSkin = gameState.weaponSkins.goldenGun.nameB;
                alert("Equipped"); 
                equipped.x = window.innerWidth/2;
                equipped.y = 250;
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
        
        var susIcon = this.add.image(window.innerWidth/2,330,'susShop').setInteractive();
        if(gameState.skin == gameState.weaponSkins.sus.name){
            equipped.x = window.innerWidth/2;
            equipped.y = 330;
        }
        susIcon.on('pointerup', () => {
            if(gameState.weaponSkins.sus.owned == 1){
                gameState.skin = gameState.weaponSkins.sus.name;
                gameState.bulletSkin = 'bullet1';
                alert("Equipped"); 
                equipped.x = window.innerWidth/2;
                equipped.y = 330;
            }
            else if(gameState.coins < 1500){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: Your Sus now!");
                gameState.coins -= 1500;
                gameState.weaponSkins.sus.owned = 1;
                gameState.skin = gameState.weaponSkins.sus.name;
                gameState.bulletSkin = 'bullet1';
            }
		});
    }
    update(){
        
    }
}
