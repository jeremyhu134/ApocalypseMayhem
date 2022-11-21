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
        var selected = '';
        //mutes menu music
        gameState.bgM.setMute(true);
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.sprite(window.innerWidth/2-50,0,'homeIcon').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            //gameState.save();
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`MenuScene`);
		});
        back.on('pointerover', () => {
            back.setFrame(1);
		});
        back.on('pointerout', () => {
            back.setFrame(0);
		});
        
        var back2 = this.add.sprite(window.innerWidth/2-420,50,'cosmeticsButton').setOrigin(0,0).setInteractive().setScale(35/44);
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
        var image = this.add.sprite(window.innerWidth/2-220,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(0.7);
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
		});
        var back3 = this.add.sprite(window.innerWidth/2+75,45,'loadoutButton').setOrigin(0,0).setInteractive().setScale(1);
        back3.on('pointerup', () => {
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`LoadoutScene`);
		});
        back3.on('pointerover', () => {
            back3.setFrame(1);
		});
        back3.on('pointerout', () => {
            back3.setFrame(0);
		});
        var image = this.add.sprite(window.innerWidth/2-220,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(0.7);
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
		});
        var back4 = this.add.sprite(window.innerWidth/2+220,45,'lootboxesButton').setOrigin(0,0).setInteractive().setScale(1);
        back4.on('pointerup', () => {
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`LootboxesScene`);
		});
        back4.on('pointerover', () => {
            back4.setFrame(1);
		});
        back4.on('pointerout', () => {
            back4.setFrame(0);
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
        
        
        //Upgrade Buttons
        var assaultB = this.add.sprite(window.innerWidth/2-550,150,'assaultRifleIcon').setOrigin(0,0).setInteractive().setScale(1);
        assaultB.on('pointerup', () => {
            gameState.gunType = 'assaultRifle';
            gameState.gunSkin = 'assaultRifle';
            assaultB.setFrame(2);
            selected = 'assaultRifle';
            minigunB.setFrame(0);
            rocketLauncherB.setFrame(0);
            gameState.bulletSkin = 'bullet1';
		});
        assaultB.on('pointerover', () => {
            if(selected !== 'assaultRifle'){
                assaultB.setFrame(1);
            }
		});
        assaultB.on('pointerout', () => {
            if(selected !== 'assaultRifle'){
                assaultB.setFrame(0);
            }
		});
         
        var minigunB = this.add.sprite(window.innerWidth/2-400,150,'minigunIcon').setOrigin(0,0).setInteractive().setScale(1);
        minigunB.on('pointerup', () => {
            gameState.gunType = 'minigun';
            gameState.gunSkin = 'minigun';
            minigunB.setFrame(2);
            selected = 'minigun';
            assaultB.setFrame(0);
            rocketLauncherB.setFrame(0);
            gameState.bulletSkin = 'bullet1';
		});
        minigunB.on('pointerover', () => {
            if(selected !== 'minigun'){
                minigunB.setFrame(1);
            }
		});
        minigunB.on('pointerout', () => {
            if(selected !== 'minigun'){
                minigunB.setFrame(0);
            }
		});
        
        var rocketLauncherB = this.add.sprite(window.innerWidth/2-250,150,'rocketLauncherIcon').setOrigin(0,0).setInteractive().setScale(1);
        rocketLauncherB.on('pointerup', () => {
            gameState.gunType = 'rocketLauncher';
            gameState.gunSkin = 'rocketLauncher';
            rocketLauncherB.setFrame(2);
            selected = 'rocketLauncher';
            assaultB.setFrame(0);
            minigunB.setFrame(0);
            gameState.bulletSkin = 'rocket1';
		});
        rocketLauncherB.on('pointerover', () => {
            if(selected !== 'rocketLauncher'){
                rocketLauncherB.setFrame(1);
            }
		});
        rocketLauncherB.on('pointerout', () => {
            if(selected !== 'rocketLauncher'){
                rocketLauncherB.setFrame(0);
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
            //gameState.save();
            scene.scene.stop("UpgradeScene");
            scene.scene.start(`MenuScene`);
		});
        back.on('pointerover', () => {
            back.setFrame(1);
		});
        back.on('pointerout', () => {
            back.setFrame(0);
		});
        
        var back2 = this.add.sprite(window.innerWidth/2-220,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(0.7);
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
        var back3 = this.add.sprite(window.innerWidth/2+220,45,'lootboxesButton').setOrigin(0,0).setInteractive().setScale(1);
        back3.on('pointerup', () => {
            scene.scene.stop("ShopScene");
            scene.scene.start(`LootboxesScene`);
		});
        back3.on('pointerover', () => {
            back3.setFrame(1);
		});
        back3.on('pointerout', () => {
            back3.setFrame(0);
		});
        var back4 = this.add.sprite(window.innerWidth/2+75,45,'loadoutButton').setOrigin(0,0).setInteractive().setScale(1);
        back4.on('pointerup', () => {
            scene.scene.stop("ShopScene");
            scene.scene.start(`LoadoutScene`);
		});
        back4.on('pointerover', () => {
            back4.setFrame(1);
		});
        back4.on('pointerout', () => {
            back4.setFrame(0);
		});
        var image2 = this.add.sprite(window.innerWidth/2-220,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(0.7);
        image2.on('pointerup', () => {
            scene.scene.stop("ShopScene");
            scene.scene.start(`UpgradeScene`);
		});
        image2.on('pointerover', () => {
            image2.setFrame(1);
		});
        image2.on('pointerout', () => {
            image2.setFrame(0);
		});
        var image = this.add.sprite(window.innerWidth/2-420,50,'cosmeticsButton').setOrigin(0,0).setInteractive().setScale(35/44);
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
		});
        //add gold icon and amound
        this.add.image(20,20,"coin").setOrigin(0,0).setDepth(-100).setScale(2);
        var coinsText = this.add.text(125, 40, `${gameState.thingsToSave.coins}`, {
            fill: '#ADD8E6', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        this.time.addEvent({
            delay: 10,
            callback: ()=>{
                coinsText.setText(gameState.thingsToSave.coins);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
       
        
        
        //skins
        gameState.selected = ' ';
        gameState.display = this.add.sprite(-1999,-1999,'character').setOrigin(0.5).setDepth(2).setScale(2.7);
        var charac = this.add.sprite(20,140,'character').setOrigin(0,0).setDepth(1).setScale(2.5);
        charac.anims.play("characterIdle");
        
        var equip = this.add.sprite(window.innerWidth/2-535,window.innerHeight/2+150,'equipButton').setOrigin(0,0).setDepth(1).setScale(1.5).setInteractive();
        equip.on('pointerup', () => {
            gameState.selected = gameState.pick;
            if(gameState.selected == null){
                gameState.selected = ' ';
            }
		});
        equip.on('pointerover', () => {
            
		});
        equip.on('pointerout', () => {
            
		});
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(gameState.selected == gameState.pick){
                    equip.setFrame(1);
                }else {
                    equip.setFrame(0);
                }
            },  
            startAt: 0,
            repeat: -1,
            timeScale: 1,
        });
        
        var frame = this.add.image(50,120,'frame').setOrigin(0,0).setDepth(0).setScale(1.2);
        gameState.loadCosmetics(this,350,120);
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
            else if(gameState.thingsToSave.coins< 10000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: The Golden Gun is yours!");
                gameState.globalScene.sound.play('purchased');
                gameState.thingsToSave.coins -= 10000;
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
            else if(gameState.thingsToSave.coins < 1500){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: Your Sus now!");
                gameState.globalScene.sound.play('purchased');
                gameState.thingsToSave.coins -= 1500;
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
            else if(gameState.thingsToSave.coins < 2000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: Welcome to the Empire!");
                gameState.globalScene.sound.play('purchased');
                gameState.thingsToSave.coins -= 2000;
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
            else if(gameState.thingsToSave.coins < 1000){
                alert("Merchant: Can't buy that lad!");
            }else {
                alert("Merchant: The god himself...");
                gameState.globalScene.sound.play('purchased');
                gameState.thingsToSave.coins -= 1000;
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































//upgrade subclass 
class LootboxesScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'LootboxesScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        var opening = false;
        //mutes menu music
        gameState.bgM.setMute(true);
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.sprite(window.innerWidth/2-50,0,'homeIcon').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            //gameState.save();
            if (opening == false){
                scene.scene.stop("LootboxesScene");
                scene.scene.start(`MenuScene`);
            }
		});
        back.on('pointerover', () => {
            back.setFrame(1);
		});
        back.on('pointerout', () => {
            back.setFrame(0);
		});
        
        var back2 = this.add.sprite(window.innerWidth/2-420,50,'cosmeticsButton').setOrigin(0,0).setInteractive().setScale(35/44);
        back2.on('pointerup', () => {
            if (opening == false){
                scene.scene.stop("UpgradeScene");
                scene.scene.start(`ShopScene`);
            }
		});
        back2.on('pointerover', () => {
            back2.setFrame(1);
		});
        back2.on('pointerout', () => {
            back2.setFrame(0);
		});
        var image = this.add.sprite(window.innerWidth/2+220,45,'lootboxesButton').setOrigin(0,0).setInteractive().setScale(1);
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
		});
        var back3 = this.add.sprite(window.innerWidth/2-220,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(0.7);
        back3.on('pointerup', () => {
            if (opening == false){
                scene.scene.stop("LootboxesScene");
                scene.scene.start(`UpgradeScene`);
            }
		});
        back3.on('pointerover', () => {
            back3.setFrame(1);
		});
        back3.on('pointerout', () => {
            back3.setFrame(0);
		});
        var back4 = this.add.sprite(window.innerWidth/2+75,45,'loadoutButton').setOrigin(0,0).setInteractive().setScale(1);
        back4.on('pointerup', () => {
            if (opening == false){
                scene.scene.stop("LootboxesScene");
                scene.scene.start(`LoadoutScene`);
            }
		});
        back4.on('pointerover', () => {
            back4.setFrame(1);
		});
        back4.on('pointerout', () => {
            back4.setFrame(0);
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
        
        var crate = this.add.sprite(window.innerWidth/2, window.innerHeight/2,'lootBox').setScale(1).setDepth(2);
        crate.anims.play('lootShine');
        var count = this.add.text(window.innerWidth/2+150, window.innerHeight/2+140,`x ${gameState.thingsToSave.numLootboxes}`,{
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 2,
        });
        
        var open = this.add.sprite(window.innerWidth-320, window.innerHeight-150,'openButton').setOrigin(0,0).setInteractive();
        open.on('pointerup', () => {
            if(gameState.thingsToSave.numLootboxes > 0 && opening == false){
                opening = true;
                crate.anims.play('lootOpen');
                gameState.thingsToSave.numLootboxes --;
                count.setText(`x ${gameState.thingsToSave.numLootboxes}`);
                
                
                var rand = Math.ceil(Math.random()*gameState.skins.length)-1;
                var prizeText = this.add.text(window.innerWidth/2, window.innerHeight/2+200,``,{
                    fill: 'WHITE', 
                    fontSize: `50px`,
                    fontFamily: 'Qahiri',
                    strokeThickness: 2,
                }).setOrigin(0.5);
                
                var loot;
                if(gameState.skins[rand].owned == 0){
                    loot = this.add.sprite(window.innerWidth/2, window.innerHeight/2,`${gameState.skins[rand].name}`).setScale(2).setDepth(1);
                    gameState.skins[rand].owned = 1;
                    if(gameState.skins[rand].animate == true){
                        loot.anims.play(`${gameState.skins[rand].name}Animate`);
                    }
                    scene.time.addEvent({
                        delay: 2000,
                        callback: ()=>{
                            prizeText.setText(`${gameState.skins[rand].displayName}`);
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }else {
                    var rand2 = Math.ceil(Math.random()*400)+100;
                    loot = this.add.sprite(window.innerWidth/2, window.innerHeight/2,`coin`).setScale(2).setDepth(1);
                    gameState.thingsToSave.coins += rand2;
                    scene.time.addEvent({
                        delay: 2000,
                        callback: ()=>{
                            prizeText.setText(`${rand2} coins`);
                            coinsText.setText(`${gameState.thingsToSave.coins}`);
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }      
                
                scene.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        opening = false;
                        gameState.save();
                        crate.anims.play('lootShine');
                        loot.destroy();
                        prizeText.setText(``);
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
		});
        open.on('pointerover', () => {
            if(gameState.thingsToSave.numLootboxes > 0){
                open.setFrame(1);
            }
		});
        open.on('pointerout', () => {
            open.setFrame(0);
		});
    }
    update(){
        //game loop that constantly runs (not needed for upgrades)
    }
}

























class LoadoutScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'LoadoutScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        var selected = '';
        //mutes menu music
        gameState.bgM.setMute(true);
        //create and animate background
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100);
        bg.anims.play('bganimate','true');
        
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        var back = this.add.sprite(window.innerWidth/2-50,0,'homeIcon').setOrigin(0,0).setInteractive();
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
        
        var back2 = this.add.sprite(window.innerWidth/2-420,50,'cosmeticsButton').setOrigin(0,0).setInteractive().setScale(35/44);
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
        
        
        var back3 = this.add.sprite(window.innerWidth/2+75,45,'loadoutButton').setOrigin(0,0).setInteractive().setScale(1);
        back3.on('pointerover', () => {
            back3.setFrame(1);
		});
        back3.on('pointerout', () => {
            back3.setFrame(0);
		});
        
        var back4 = this.add.sprite(window.innerWidth/2+220,45,'lootboxesButton').setOrigin(0,0).setInteractive().setScale(1);
        back4.on('pointerup', () => {
            scene.scene.stop("LoadoutScene");
            scene.scene.start(`LootboxesScene`);
		});
        back4.on('pointerover', () => {
            back4.setFrame(1);
		});
        back4.on('pointerout', () => {
            back4.setFrame(0);
		});
        
        
        var image = this.add.sprite(window.innerWidth/2-220,45,'upgradesButton').setOrigin(0,0).setInteractive().setScale(0.7);
        image.on('pointerup', () => {
            scene.scene.stop("LoadoutScene");
            scene.scene.start(`UpgradeScene`);
		});
        image.on('pointerover', () => {
            image.setFrame(1);
		});
        image.on('pointerout', () => {
            image.setFrame(0);
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
