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
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(-100).setInteractive();
        bg.anims.play('bganimate','true');
        bg.on('pointerdown', () => {
            gameState.equipButton.x = 6000;
            gameState.deleteButton.y = 6000;
		});
        gameState.input = this.input;
        
        //Reference scene in local variable and create a back button
        var scene = this;
        
        gameState.equipButton = this.add.sprite(6000,600,'menuB1').setOrigin(0,0).setInteractive().setDepth(5);
        gameState.equipButton.on('pointerup', () => {
            //gameState.save();
            if(gameState.pick.type == 'cosmetic'){
                gameState.selected = gameState.pick;
                if(gameState.selected == null){
                    gameState.selected = ' ';
                } 
            }else if (gameState.pick.type == 'weapon'){
                gameState.gunSkin = gameState.pick.name;
                gameState.bulletSkin = gameState.pick.name+'bullet';
            }
            gameState.deleteButton.x = 6000;
            gameState.equipButton.x = 6000;
		});
        gameState.equipButton.on('pointerover', () => {
            gameState.equipButton.setFrame(1);
		});
        gameState.equipButton.on('pointerout', () => {
            gameState.equipButton.setFrame(0);
		});
        gameState.deleteButton = this.add.sprite(6000,600,'menuB2').setOrigin(0,0).setInteractive().setDepth(5);
        gameState.deleteButton.on('pointerup', () => {
            //gameState.save();
            var hat = gameState.inventory.indexOf(gameState.pick);
                gameState.inventory.splice(hat,1);
                scene.scene.restart();
                gameState.save();
                gameState.pick = null;
                gameState.selected = '';
            gameState.deleteButton.x = 6000;
            gameState.equipButton.x = 6000;
		});
        gameState.deleteButton.on('pointerover', () => {
            gameState.deleteButton.setFrame(1);
		});
        gameState.deleteButton.on('pointerout', () => {
            gameState.deleteButton.setFrame(0);
		});
        
        
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
        gameState.pick = null;
        gameState.display = this.add.sprite(-1999,-1999,'character').setOrigin(0.5).setDepth(2).setScale(1.5);
        gameState.itemStats = this.add.text(175, 300, ``, {
            fill: '#000000', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
            wordWrap: { width: 250 }
        }).setDepth(2).setOrigin(0.5);
        
        
        
        
        var frame = this.add.image(50,120,'frame').setOrigin(0,0).setDepth(0).setScale(1.2);
        gameState.loadCosmetics(this,350,70);
        
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
                
                
                var rand = Math.ceil(Math.random()*gameState.items.length)-1;
                var prizeText = this.add.text(window.innerWidth/2, window.innerHeight/2+200,``,{
                    fill: 'WHITE', 
                    fontSize: `50px`,
                    fontFamily: 'Qahiri',
                    strokeThickness: 2,
                }).setOrigin(0.5);
                
                var loot;
                if(gameState.inventory.length < 40){
                    var rand1 = Math.ceil(Math.random()*100);
                    var rarity = '';
                    if(rand1 <=83){
                        rarity = 'common'
                    }else if(rand1 <=  93){
                        rarity = 'rare'
                    }else if(rand1 <= 99){
                        rarity = 'epic'
                    }else if(rand1 == 100){
                        rarity = 'legendary'
                    }
                    var found = false;
                    while(found == false){
                        if(gameState.items[rand].rarity == rarity){
                            loot = this.add.sprite(window.innerWidth/2, window.innerHeight/2,`${gameState.items[rand].name}`).setScale(2).setDepth(1);
                            gameState.items[rand].owned = 1;
                            gameState.inventory.push(gameState.items[rand]);
                            if(gameState.items[rand].animate == true){
                                loot.anims.play(`${gameState.items[rand].name}Animate`);
                            }
                            scene.time.addEvent({
                                delay: 2000,
                                callback: ()=>{
                                    prizeText.setText(`${gameState.items[rand].displayName}`);
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            found = true;
                        }else {
                            rand = Math.ceil(Math.random()*gameState.items.length)-1;
                        }
                    }
                    
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
        var assaultB = this.add.sprite(window.innerWidth/2-550,150,'assaultRifleIcon').setOrigin(0,0).setInteractive().setScale(1);
        assaultB.on('pointerup', () => {
            gameState.gunType = 'assaultRifle';
            gameState.gunSkin = 'assaultRifle';
            assaultB.setFrame(2);
            selected = 'assaultRifle';
            minigunB.setFrame(0);
            uziB.setFrame(0);
            rocketLauncherB.setFrame(0);
            sniperRifleB.setFrame(0);
            shotgunB.setFrame(0);
            gameState.bulletSkin = 'assaultRiflebullet';
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
            uziB.setFrame(0);
            sniperRifleB.setFrame(0);
            shotgunB.setFrame(0);
            gameState.bulletSkin = 'minigunbullet';
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
            uziB.setFrame(0);
            sniperRifleB.setFrame(0);
            shotgunB.setFrame(0);
            gameState.bulletSkin = 'rocketLauncherbullet';
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
        
        
        var uziB = this.add.sprite(window.innerWidth/2-100,150,'uziIcon').setOrigin(0,0).setInteractive().setScale(1);
        uziB.on('pointerup', () => {
            gameState.gunType = 'uzi';
            gameState.gunSkin = 'uzi';
            uziB.setFrame(2);
            selected = 'uzi';
            assaultB.setFrame(0);
            minigunB.setFrame(0);
            rocketLauncherB.setFrame(0);
            sniperRifleB.setFrame(0);
            shotgunB.setFrame(0);
            gameState.bulletSkin = 'uzibullet';
		});
        uziB.on('pointerover', () => {
            if(selected !== 'uzi'){
                uziB.setFrame(1);
            }
		});
        uziB.on('pointerout', () => {
            if(selected !== 'uzi'){
                uziB.setFrame(0);
            }
		});
        
        var sniperRifleB = this.add.sprite(window.innerWidth/2+50,150,'sniperRifleIcon').setOrigin(0,0).setInteractive().setScale(1);
        sniperRifleB.on('pointerup', () => {
            gameState.gunType = 'sniperRifle';
            gameState.gunSkin = 'sniperRifle';
            sniperRifleB.setFrame(2);
            selected = 'sniperRifle';
            assaultB.setFrame(0);
            minigunB.setFrame(0);
            rocketLauncherB.setFrame(0);
            uziB.setFrame(0);
            shotgunB.setFrame(0);
            gameState.bulletSkin = 'sniperRiflebullet';
		});
        sniperRifleB.on('pointerover', () => {
            if(selected !== 'sniperRifle'){
                sniperRifleB.setFrame(1);
            }
		});
        sniperRifleB.on('pointerout', () => {
            if(selected !== 'sniperRifle'){
                sniperRifleB.setFrame(0);
            }
		});
        
        var shotgunB = this.add.sprite(window.innerWidth/2+200,150,'shotgunIcon').setOrigin(0,0).setInteractive().setScale(1);
        shotgunB.on('pointerup', () => {
            gameState.gunType = 'shotgun';
            gameState.gunSkin = 'shotgun';
            shotgunB.setFrame(2);
            selected = 'shotgun';
            assaultB.setFrame(0);
            minigunB.setFrame(0);
            rocketLauncherB.setFrame(0);
            uziB.setFrame(0);
            sniperRifleB.setFrame(0);
            gameState.bulletSkin = 'shotgunbullet';
		});
        shotgunB.on('pointerover', () => {
            if(selected !== 'shotgun'){
                shotgunB.setFrame(1);
            }
		});
        shotgunB.on('pointerout', () => {
            if(selected !== 'shotgun'){
                shotgunB.setFrame(0);
            }
		});
    }
    update(){
        //game loop that constantly runs (not needed for upgrades)
    }
}
