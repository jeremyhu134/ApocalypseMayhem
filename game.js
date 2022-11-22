//The configuration of your game that is a parameter of the Phaser.Game function
const config = {
    type: Phaser.AUTO,
    width : window.innerWidth-10,
    height: window.innerHeight-10,
    backgroundColor: "#999999",
    audio: {
        disableWebAudio: false 
      },
    //allows modification of the games physics
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true
            //debug: true
        }
    },
    //subclass scenes 
    scene:[MenuScene,PauseScene,ArenaScene,UpgradeScene,DeathScene,ShopScene,UnlockScene,LoadoutScene,LootboxesScene,ToursMenuScene,TourScene],
    //phasers scale system to fit into the brower
    scale: {
        zoom: 1,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

//creats a game game object with the configuration
const game = new Phaser.Game(config);

//create a block-scoped object that stores variables that can be accessed in any scene
let gameState = {
    
    coinsAdd: 3,
    //character stats constants
    characterStats: {
        speed : 125,
        health: 100,
        ammo: 25,
        fireRate: 175,
        damage: 25,
        bulletSpeed: 1500,
        fireReady: true,
        sprint: 100
    },
    //character stats that changes
    speed : 125,
    health: 100,
    ammo: 25,
    fireRate: 175,
    damage: 25,
    bulletSpeed: 1500,
    kills: 0,
    highestKills:0,
    bossSummonKills: 0,
    disableReload: false,
    sprint: 100,
    sprintlock: 0,
    
    selected: ' ',
    pick: null,
    //current sprite for bullet and player
    skin: 'character',
    bulletSkin: 'bullet1',
    
    gunType: 'assaultRifle',
    gunSkin: 'assaultRifle',
    //unlocked skins and their names and bullet sprites
    skins: [
        {
            owned: 0,
            name: 'satvikHat',
            displayName: 'Satvik',
            animate: false,
            rarity: 'rare'
        },
        {
            owned: 0,
            name: 'susHat',
            displayName: 'Sus',
            animate: false,
            rarity: 'common'
        },
        {
            owned: 0,
            name: 'helmetHat',
            displayName: 'Helmet',
            animate: false,
            rarity: 'common'
        },
        {
            owned: 0,
            name: 'diegoHat',
            displayName: 'Happy Diego',
            animate: false,
            rarity: 'common'
        },
        {
            owned: 0,
            name: 'diego2Hat',
            displayName: 'Rambo Diego',
            animate: false,
            rarity: 'rare'
        },
        {
            owned: 0,
            name: 'burningHelmetHat',
            displayName: 'Burning Helmet',
            animate: true,
            rarity: 'epic'
        },
        {
            owned: 0,
            name: 'ghastlySkullHat',
            displayName: 'Ghastly Skull',
            animate: true,
            rarity: 'epic'
        }
    ],
    
    
    //calculates upgrade cost for upgrades
    upgradeCosts: function(current, max, factor){
        var cost;
        cost = (((current-max)+factor)/factor)*100;
        return cost;
    },
    
    //resets stats after death or when exiting to menu
    updateStats: function(){
        //resets players stats
        gameState.coinsAdd = 3;
        gameState.speed = gameState.characterStats.speed;
        gameState.health = gameState.characterStats.health;
        gameState.ammo = gameState.characterStats.ammo;
        gameState.fireRate = gameState.characterStats.fireRate;
        gameState.damage = gameState.characterStats.damage;
        gameState.kills = 0;
        gameState.characterStats.fireReady = true;
        gameState.disableReload = false;
        gameState.once = false;
        
        //reset zombie stats
        gameState.zombie.speed =  75;
        gameState.zombie.health =  100;
        gameState.bossSummonKills = 0;
    },
    
    thingsToSave: {
        numLootboxes: 3,
        coins: 100,
    },
    //saves variable values to local storage
    save: function(){
        window.localStorage.setItem("skins", JSON.stringify(gameState.skins));
        window.localStorage.setItem("thingsToSave", JSON.stringify(gameState.thingsToSave));
    },
    //loads variable values from localstorage
    loadSave: function(){
        if(JSON.parse(window.localStorage.getItem("skins")) !== null){
            var lol = JSON.parse(window.localStorage.getItem("skins"));
            console.log(lol);
            if(gameState.skins.length == lol.length){
                gameState.skins = lol;
            }else {
                for (var i = lol.length; i < gameState.skins.length; i++){
                    lol.push(gameState.skins[i]);
                }
                gameState.skins = lol;
                gameState.save();
            }
        }
        if(JSON.parse(window.localStorage.getItem("thingsToSave")) !== null){
            gameState.thingsToSave = JSON.parse(window.localStorage.getItem("thingsToSave"));
        }
    },
    
    createSlot: function(scene,hat,num){
        scene.add.image(hat.x,hat.y,`frame2`).setDepth(-1);
        if(gameState.skins[num].animate == true){
            hat.anims.play(`${gameState.skins[num].name}Animate`,true);
        }
        console.log(gameState.skins[num].name);
        hat.on('pointerup', () => {
            gameState.display.x = 170;
            gameState.display.y = 215;
            gameState.display.setTexture(`${gameState.skins[num].name}`);
            gameState.pick = gameState.skins[num];
            if(gameState.skins[num].animate == true){
                gameState.display.anims.play(`${gameState.skins[num].name}Animate`);
            }else {
                gameState.display.anims.pause();
            }
        });
        hat.on('pointerover', () => {
            //hat.setFrame(1);
        });
        hat.on('pointerout', () => {
            //hat.setFrame(0);
        });
    },
    loadCosmetics: function(scene,x,y){
        var count = 0;
        for (var j = 1; j <= 6; j++){
            if(gameState.skins[j-1].owned == 1){
                var hat = scene.add.sprite(x+125*j,y+100,`${gameState.skins[j-1].name}`).setScale(60/60).setInteractive();
                gameState.createSlot(scene,hat,j-1);
            }
        }
        for (var j = 1; j <= 1; j++){
            if(gameState.skins[(j-1)+6].owned == 1){
                var hat = scene.add.sprite(x+125*j,y+250,`${gameState.skins[(j-1)+6].name}`).setScale(60/60).setInteractive();
                gameState.createSlot(scene,hat,(j-1)+6);
            }
        }
    },
    //variable to make sure the death commands happen only once
    once: false,
    //controls that constantly are looped in the Arena Screen
    chracterControls : function(scene){
        if(gameState.health > 0){
            gameState.character.depth = gameState.character.y-50;
            gameState.character.body.checkWorldBounds();
            if(gameState.character.body.velocity.x == 0 && gameState.character.body.velocity.y == 0){
                gameState.character.anims.play(`${gameState.skin}`+'Idle',true);
            }
            
            if(gameState.keys.D.isDown && gameState.keys.S.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(gameState.speed*.7);
                gameState.character.setVelocityY(gameState.speed*.7);
            }
            else if(gameState.keys.D.isDown && gameState.keys.W.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(gameState.speed*.7);
                gameState.character.setVelocityY(-gameState.speed*.7);
            }
            else if(gameState.keys.A.isDown && gameState.keys.W.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(-gameState.speed*.7);
                gameState.character.setVelocityY(-gameState.speed*.7);
            }
            else if(gameState.keys.A.isDown && gameState.keys.S.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(-gameState.speed*.7);
                gameState.character.setVelocityY(gameState.speed*.7);
            }
            else if(gameState.keys.W.isDown){
                gameState.character.setVelocityX(0);
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityY(-gameState.speed);
            }
            else if(gameState.keys.S.isDown){
                gameState.character.setVelocityX(0);
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityY(gameState.speed);
            }
            else if(gameState.keys.A.isDown){
                gameState.character.setVelocityY(0);
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(-gameState.speed);
            }
            else if(gameState.keys.D.isDown){
                gameState.character.setVelocityY(0);
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(gameState.speed);
            }
            else {
                gameState.character.setVelocityY(0);
                gameState.character.setVelocityX(0);
            }
            gameState.sprintlock += 1;
            if(gameState.keys.SHIFT.isDown && gameState.sprint > 0.8){
                gameState.sprint -= 0.8;
                gameState.speed = gameState.current*2;
                gameState.sprintlock = 0;
                gameState.speedState = 'Run';
            }else {
                gameState.speedState = 'Walk';
                if(!gameState.keys.SPACE.isDown){
                    gameState.speed = gameState.current;
                }
                gameState.speed = gameState.current;
                if(gameState.sprint < gameState.characterStats.sprint && gameState.sprintlock > 30){
                    gameState.sprint += 0.5;
                }
            }
            if(gameState.input.x > gameState.character.x){
                gameState.character.flipX = false;
                gameState.gun.flipY = false;
                gameState.gun.x = gameState.character.x-6;
                gameState.gun.y = gameState.character.y-3;
                if(gameState.cosmetic){
                    gameState.cosmetic.flipX = false;
                }
            }
            else {
                gameState.character.flipX = true;
                gameState.gun.flipY = true;
                gameState.gun.x = gameState.character.x+6;
                gameState.gun.y = gameState.character.y-3;
                if(gameState.cosmetic){
                    gameState.cosmetic.flipX = true;
                }
            }
            gameState.gun.depth = gameState.character.y+5;
            gameState.gun.setRotation(Phaser.Math.Angle.Between(gameState.gun.x,gameState.gun.y,scene.input.x,scene.input.y)); 
            if (gameState.keys.SPACE.isDown && gameState.ammo > 0 && gameState.characterStats.fireReady == true){
                if(gameState.gunType == 'assaultRifle'){
                    gameState.assaultRifleShoot(scene);
                }else if (gameState.gunType == "minigun"){
                    gameState.minigunShoot(scene);
                    gameState.speed = gameState.characterStats.speed*0.2;
                }else if (gameState.gunType == "rocketLauncher"){
                    gameState.rocketLauncherShoot(scene);
                }
            }else {
                if(gameState.gunType == 'minigun' && !gameState.keys.SHIFT.isDown){
                    gameState.speed = gameState.characterStats.speed*0.8;
                    gameState.gun.setFrame(0);
                }
            }
            if (gameState.keys.R.isDown){
                gameState.reload(scene);
                
            }
            else {
                if(gameState.ammo<= 0){
                    gameState.reload(scene);
                }
            }
            if(gameState.cosmetic){
                gameState.cosmetic.x = gameState.character.x;
                gameState.cosmetic.y = gameState.character.y-20;
                gameState.cosmetic.depth = gameState.character.y+1;
            }
        }
        else {
            if(gameState.once == false){
                gameState.once = true;
                gameState.character.anims.play('characterDeath',true);
                gameState.gun.destroy();
                if(gameState.cosmetic){
                    gameState.cosmetic.destroy();
                }
                gameState.character.setVelocityX(0);
                gameState.character.setVelocityY(0);
                gameState.spawnZombies.destroy();
                if(gameState.bossM){
                    gameState.bossM.setMute(true);
                }
                gameState.arenaM.setMute(true);
                scene.physics.pause();
                if(gameState.Sbutton){
                    gameState.Sbutton.destroy();
                }
                scene.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        gameState.Sbutton.destroy();
                        gameState.globalScene.scene.pause("ArenaScene");
                        gameState.globalScene.scene.launch('DeathScene');
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        }
    },
    //functions to reload ammo
    reload: function (scene){
        if(gameState.characterStats.fireReady == true && gameState.disableReload == false){
            gameState.characterStats.fireReady = false;
            var clip = scene.physics.add.image(gameState.character.x+5, gameState.character.y+12, 'gunMagazine').setGravityY(1000);
            if (gameState.character.x > scene.input.x){
                clip.flipX = true;
            }
            clip.depth = clip.y +1;
            var time = 0;
            if(gameState.gunType == 'assaultRifle'){
                gameState.ammo = gameState.characterStats.ammo;
                time = 1500
            }else if(gameState.gunType == 'minigun'){
                gameState.ammo = gameState.characterStats.ammo*8;
                time = 4000
            }
            else if(gameState.gunType == 'rocketLauncher'){
                gameState.ammo = Math.ceil(gameState.characterStats.ammo/4.17)
                time = 2500
            }
            
            scene.time.addEvent({
                delay: time,
                callback: ()=>{
                    gameState.ammoText.setText(gameState.ammo);
                    gameState.characterStats.fireReady = true;
                },  
                startAt: 0,
                timeScale: 1
            });
            scene.time.addEvent({
                delay: 200,
                callback: ()=>{
                    clip.setGravityY(0);
                    clip.setVelocityY(0);
                    scene.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            clip.destroy();
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                },  
                startAt: 0,
                timeScale: 1
            });
        }
    },
    
    
    assaultRifleShoot: function(scene){
        scene.sound.play('shoot');
        gameState.ammo --;
        gameState.ammoText.setText(gameState.ammo);
        gameState.characterStats.fireReady = false;

        var flash;
        var bullet;
        if (gameState.character.flipX == false){
            bullet = gameState.bullets.create(gameState.character.x,gameState.character.y+3,`${gameState.bulletSkin}`);
        }else {
            bullet = gameState.bullets.create(gameState.character.x,gameState.character.y+3,`${gameState.bulletSkin}`);
        }
        gameState.gun.anims.play('flash',true);
        gameState.angle=Phaser.Math.Angle.Between(bullet.x,bullet.y,scene.input.x,scene.input.y);
        bullet.setRotation(gameState.angle); 
        scene.physics.moveToObject(bullet,scene.input,gameState.characterStats.bulletSpeed);
        //scene.physics.moveTo(bullet,scene.input.x,scene.input.y,300);
        var bulletLoop = scene.time.addEvent({
            delay: 5000,
            callback: ()=>{
                bullet.destroy();
            },  
            startAt: 0,
            timeScale: 1
        });
        scene.physics.add.overlap(bullet, gameState.zombies,(bulletT, target)=>{
            scene.sound.play('hitSound',{volume:0.2});
            var angle = Phaser.Math.Angle.Between(bulletT.x,bulletT.y,target.x,target.y);
            var blood = scene.physics.add.sprite(target.x+10,target.y, 'bulletBlood');
            blood.setRotation(angle);
            blood.anims.play('animate','true');
            scene.time.addEvent({
                delay: 200,
                callback: ()=>{
                    blood.destroy();
                },  
                startAt: 0,
                timeScale: 1
            });
            bulletLoop.destroy();
            if(target.health>0){
                bulletT.destroy();
            }
            target.health -= gameState.damage;
        });
        scene.time.addEvent({
            delay: gameState.fireRate,
            callback: ()=>{
                gameState.characterStats.fireReady = true;
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    minigunShoot: function(scene){
        scene.sound.play('shoot');
        gameState.ammo --;
        gameState.ammoText.setText(gameState.ammo);
        gameState.characterStats.fireReady = false;

        var flash;
        var bullet;
        if (gameState.character.flipX == false){
            bullet = gameState.bullets.create(gameState.character.x,gameState.character.y+3,`${gameState.bulletSkin}`);
        }else {
            bullet = gameState.bullets.create(gameState.character.x,gameState.character.y+3,`${gameState.bulletSkin}`);
        }
        gameState.gun.anims.play('minigunflash',true);
        gameState.angle=Phaser.Math.Angle.Between(bullet.x,bullet.y,scene.input.x,scene.input.y);
        bullet.setRotation(gameState.angle); 
        //scene.physics.moveToObject(bullet,scene.input,gameState.characterStats.bulletSpeed);
        scene.physics.moveTo(bullet,(scene.input.x-50)+Math.ceil(Math.random()*100),(scene.input.y-50)+Math.ceil(Math.random()*100),gameState.characterStats.bulletSpeed);
        var bulletLoop = scene.time.addEvent({
            delay: 5000,
            callback: ()=>{
                bullet.destroy();
            },  
            startAt: 0,
            timeScale: 1
        });
        scene.physics.add.overlap(bullet, gameState.zombies,(bulletT, target)=>{
            scene.sound.play('hitSound',{volume:0.2});
            var angle = Phaser.Math.Angle.Between(bulletT.x,bulletT.y,target.x,target.y);
            var blood = scene.physics.add.sprite(target.x+10,target.y, 'bulletBlood');
            blood.setRotation(angle);
            blood.anims.play('animate','true');
            scene.time.addEvent({
                delay: 200,
                callback: ()=>{
                    blood.destroy();
                },  
                startAt: 0,
                timeScale: 1
            });
            bulletLoop.destroy();
            if(target.health>0){
                bulletT.destroy();
            }
            target.health -= gameState.damage;
        });
        scene.time.addEvent({
            delay: gameState.fireRate,
            callback: ()=>{
                gameState.characterStats.fireReady = true;
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    rocketLauncherShoot: function(scene){
        scene.sound.play('shoot');
        gameState.ammo --;
        gameState.ammoText.setText(gameState.ammo);
        gameState.characterStats.fireReady = false;

        var flash;
        var bullet;
        var target = {
            x: scene.input.x,
            y: scene.input.y
        }
        if (gameState.character.flipX == false){
            bullet = gameState.bullets.create(gameState.character.x,gameState.character.y+3,`${gameState.bulletSkin}`);
        }else {
            bullet = gameState.bullets.create(gameState.character.x,gameState.character.y+3,`${gameState.bulletSkin}`);
        }
        gameState.gun.anims.play('rocketLauncherflash',true);
        gameState.angle=Phaser.Math.Angle.Between(bullet.x,bullet.y,scene.input.x,scene.input.y);
        bullet.setRotation(gameState.angle); 
        scene.physics.moveToObject(bullet,scene.input,gameState.characterStats.bulletSpeed);
        //scene.physics.moveTo(bullet,scene.input.x,scene.input.y,300);
        var bulletLoop = scene.time.addEvent({
            delay: 5000,
            callback: ()=>{
                bullet.destroy();
            },  
            startAt: 0,
            timeScale: 1
        });
        scene.time.addEvent({
            delay: (Phaser.Math.Distance.BetweenPoints(bullet, target)/gameState.characterStats.bulletSpeed)*1000,
            callback: ()=>{
                if( gameState.zombies.getChildren().length >0){
                    scene.sound.play('explode',{ volume: 0.5 });
                    var explosion = scene.physics.add.sprite(bullet.x,bullet.y,'');
                    explosion.anims.play('explode','true');
                    scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            explosion.destroy();
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    bullet.destroy();
                    var maxKills = 10;
                    for (var i = 0; i < gameState.zombies.getChildren().length; i++){
                        if(Phaser.Math.Distance.BetweenPoints(gameState.zombies.getChildren()[i], bullet)<150&&maxKills>0){
                            gameState.zombies.getChildren()[i].health -= gameState.damage;
                            maxKills--;
                        }
                    }
                } 
            },  
            startAt: 0,
            timeScale: 1
        });
        scene.time.addEvent({
            delay: gameState.fireRate,
            callback: ()=>{
                gameState.characterStats.fireReady = true;
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    
    //creates a randon powerup or item after zombie death
    createItem: function(scene,x,y){
        var random = Math.ceil(Math.random()*100);
        if(random <= 50){
            var coin = scene.physics.add.sprite(x,y,'coin');
            coin.anims.play('canimate','true');
            var gone = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    coin.destroy();
                },  
                startAt: 0,
                timeScale: 1
            });
            scene.physics.add.overlap(gameState.character, coin,(character, coin)=>{
                scene.sound.play('coinSound',{volume:0.05});
                var rand = Math.ceil(Math.random()*2)+gameState.coinsAdd;
                gameState.thingsToSave.coins += rand;
                coin.destroy();
                gone.destroy();
            });
        }
        else if(random<=100 && random >=96){
            var iBI = scene.physics.add.sprite(x,y,'infiniteBulletsImage');
            iBI.anims.play('shine','true');
            var gone = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    iBI.destroy();
                }, 
                startAt: 0,
                timeScale: 1
            });
            scene.physics.add.overlap(gameState.character, iBI,(character, iBI)=>{
                scene.sound.play('powerUp');
                gameState.disableReload = true;
                iBI.destroy();
                gone.destroy();
                gameState.fireRate = gameState.fireRate - 35;
                gameState.ammo = 9999;
                gameState.createTimer(scene,10,60,'infiniteBulletsImage');
                scene.time.addEvent({
                    delay: 10000,
                    callback: ()=>{
                        gameState.fireRate = gameState.currentRate;
                        if(gameState.gunType == 'assaultRifle'){
                             gameState.ammo = gameState.characterStats.ammo;
                        }else if(gameState.gunType == 'minigun'){
                             gameState.ammo = gameState.characterStats.ammo*8;
                        }else if(gameState.gunType == 'rocketLauncher'){
                             gameState.ammo = Math.ceil(gameState.characterStats.ammo/4.17);
                        }
                        gameState.disableReload = false;
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            });
        }
        else if(random<=95 && random >=90){
            var grenade = scene.physics.add.sprite(x,y,'grenadeImage');
            grenade.anims.play('shine2','true');
            var gone = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    grenade.destroy();
                },  
                startAt: 0,
                timeScale: 1
            });
            scene.physics.add.overlap(gameState.character, grenade,(character, grenade)=>{
                gone.destroy();
                grenade.destroy();
                if(gameState.bossBattle == false){
                    var gren = scene.physics.add.sprite(gameState.character.x,gameState.character.y,'grenadeObj');
                    if( gameState.zombies.getChildren().length >0){
                        var closest = 10000;
                        var dist;
                        var target;
                        for (var i = 0; i < gameState.zombies.getChildren().length; i++){ 
                            dist = Phaser.Math.Distance.BetweenPoints(gameState.zombies.getChildren()[i], gameState.character);
                            if(dist<closest){
                                closest = dist;
                                target = gameState.zombies.getChildren()[i];
                            }
                        }
                        scene.physics.moveToObject(gren,target,0,500);
                        scene.time.addEvent({
                            delay: 500,
                            callback: ()=>{
                                scene.sound.play('explode',{ volume: 0.5 });
                                var explosion = scene.physics.add.sprite(gren.x,gren.y,'');
                                explosion.anims.play('explode','true');
                                scene.time.addEvent({
                                    delay: 1000,
                                    callback: ()=>{
                                        explosion.destroy();
                                    },  
                                    startAt: 0,
                                    timeScale: 1
                                });
                                gren.destroy();
                                var maxKills = 10;
                                for (var i = 0; i < gameState.zombies.getChildren().length; i++){
                                    if(Phaser.Math.Distance.BetweenPoints(gameState.zombies.getChildren()[i], gren)<150&&maxKills>0){
                                        gameState.zombies.getChildren()[i].health -= 300;
                                        maxKills--;
                                    }
                                }
                            },  
                            startAt: 0,
                            timeScale: 1
                        });
                    } 
                    else{
                        gren.destroy();
                    }
                }
            });
        }
        else if(random<=89 && random >= 85){
            var medic = scene.physics.add.sprite(x,y,'medicImage');
            medic.anims.play('shine3','true');
            var gone = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    medic.destroy();
                },  
                startAt: 0,
                timeScale: 1
            });
            scene.physics.add.overlap(gameState.character, medic,(character, medic)=>{
                medic.destroy();
                if(gameState.health < gameState.characterStats.health){
                    scene.sound.play('healed');
                }
                gameState.health += 50;
                if(gameState.health > gameState.characterStats.health){
                    gameState.health = gameState.characterStats.health;
                }
            });
        }
        else if(random <= 84 && random >= 82){
            var crate = scene.physics.add.sprite(x,y,'lootBox').setScale(0.15);
            crate.anims.play('lootShine','true');
            var gone = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    crate.destroy();
                },  
                startAt: 0,
                timeScale: 1
            });
            scene.physics.add.overlap(gameState.character, crate,(character, crate)=>{
                crate.destroy();
                gameState.thingsToSave.numLootboxes++;
            });
        }
    },
    
    //creates unlocked screen for whatever image is the parameter
    createUnlocked: function(scene,image){
        var unlockBG = scene.add.image(window.innerWidth/2,window.innerHeight/2,'unlockedMenu').setInteractive().setDepth(100);
        var unlocked = scene.add.image(window.innerWidth/2,window.innerHeight/2+50,`${image}`).setDepth(100).setScale(3);
        unlockBG.on('pointerdown', function(pointer){
            gameState.save();
            gameState.keys.W.isDown = false;
            gameState.keys.S.isDown = false;
            gameState.keys.A.isDown = false;
            gameState.keys.D.isDown = false;
            gameState.keys.SPACE.isDown = false;
            unlockBG.destroy();
            unlocked.destroy();
            gameState.globalScene.scene.stop('UnlockedScene');
            gameState.globalScene.scene.resume(`${gameState.currentScene}`);
        });
    },
    
    //tracks achievement completion
    achievmentTracker: function(scene){
        if(gameState.kills >= 500 && gameState.weaponSkins.SkeletonGun.owned == 0){
            gameState.globalScene.scene.pause(`${gameState.currentScene}`);
            gameState.globalScene.scene.launch('UnlockScene');
        }
    },
    
    //stats of zombies and boss zombies
    zombie :{
        speed: 75,
        health : 100,
        damage : 10,
        image: 'zombie'
    },
    sarmsZombie :{
        speed: 70,
        runSpeed: 170,
        health : 4000,
        damage : 27,
        name: 'sarmsZombie'
    },
    quadZombie :{
        health : 2750,
        damage : 50,
        damageRange : 195,
        name: 'quadZombie'
    },
    cloneZombie :{
        health : 2000,
        damage : 20,
        grenDamage: 50,
        speed : 150,
        projectileSpeed: 200,
        name: 'Clone Zombie'
    },
    
    //function to control what happens eveytime the player takes damage in any way
    pDamage: function(damage){
        if(gameState.health > 0){
            gameState.cHurt.play();
        }
        gameState.health -= damage;
    },
    
    //creates a normal zombie
    createZombie: function (scene,inX,inY,zomStats){
        var zombie = gameState.zombies.create(inX,inY,`${zomStats.image}`).setDepth(1).setScale(0.6);
        zombie.setSize(70,110);
        zombie.health = zomStats.health;
        function zombieB(zom){
            zom.setCollideWorldBounds(true);
            var attack = scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    gameState.pDamage(gameState.zombie.damage);
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var loop = scene.time.addEvent({
                delay: 1,
                callback: ()=>{
                    if (zom.health > 0){
                        zom.depth = zom.y-40;
                        if(gameState.character.x > zom.x){
                            zom.flipX = false;
                        }
                        else if(gameState.character.x < zom.x){
                            zom.flipX = true;
                        }
                        var dist = Phaser.Math.Distance.BetweenPoints(gameState.character, zom);
                        if(dist > 30){
                            attack.paused = true;
                            scene.physics.moveTo(zom,gameState.character.x, gameState.character.y,zomStats.speed);
                            zom.anims.play('zombieWalk',true);
                        }
                        else {
                            attack.paused = false;
                            zom.anims.play('zombieStrike',true);
                            zom.setVelocityX(0);
                            zom.setVelocityY(0);
                        }
                    }
                    else {
                        zom.body.height = 1;
                        zom.setImmovable();
                        scene.sound.play('killSound');
                        scene.sound.play('zombieDeath',{volume:0.4});
                        if(gameState.bossBattle == false){
                            gameState.kills++;
                            gameState.createItem(scene,zom.x,zom.y);
                            gameState.bossSummonKills++;
                        }
                        loop.destroy();
                        attack.destroy();
                        zom.setVelocityX(0);
                        zom.setVelocityY(0);
                        if(gameState.skin == "characterGoldenGun"){
                            zom.anims.play('zombieGoldDeath','true');
                        }else {
                            zom.anims.play('zombieDeath','true');
                        }
                        scene.time.addEvent({
                            delay: 1000,
                            callback: ()=>{
                                zom.anims.play('zombieFade','true');
                                scene.time.addEvent({
                                    delay: 200,
                                    callback: ()=>{
                                        if(zom){
                                          zom.destroy();  
                                        }
                                    },  
                                    startAt: 0,
                                    timeScale: 1
                                });
                            },  
                            startAt: 0,
                            timeScale: 1
                        });
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
        };
        zombie.anims.play('zombieSpawn');
        scene.time.addEvent({
            delay: 1000, 
            callback: ()=>{
                zombieB(zombie);
                gameState.createHealthBar2(scene,zombie,zomStats.health);
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    //buffs the stats of the zombies after every boss kill
    buffZombies: function(){
        gameState.bossM.setMute(true);
        if(gameState.arenaM){
            gameState.arenaM.setMute(false);
        }
        gameState.bossBattle = false;
        gameState.coinsAdd++;
        if(gameState.zombie.speed <= 170){
            gameState.zombie.speed += 10;
            gameState.zombie.health += 10;
        }
    },
    
    //creates the boss sarms zombie
    createSarmsZombie: function (scene,inX,inY){
        var zombie = gameState.zombies.create(inX,inY,`sarmsZombie`).setDepth(1);
        zombie.health = gameState.sarmsZombie.health;
        zombie.rage = false;
        zombie.breathe = false;
        function zombieB(zom){
            zom.setCollideWorldBounds(true);
            var attack = scene.time.addEvent({
                delay: 350,
                callback: ()=>{
                    gameState.pDamage(gameState.sarmsZombie.damage);
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var breatheLoop;
            var rageTimer = scene.time.addEvent({
                delay: 3000,
                callback: ()=>{
                    zom.rage = true;
                    rageTimer.paused = true;
                    breatheLoop = scene.time.addEvent({
                        delay: 2500,
                        callback: ()=>{
                            zom.rage = false;
                            breatheTimer.paused = false;
                            attack.paused = true;
                            zom.breathe = true;
                            zom.anims.play('sarmsZombieBreathe','true');
                            zom.setVelocityX(0);
                            zom.setVelocityY(0);
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var breatheTimer = scene.time.addEvent({
                delay: 2500,
                callback: ()=>{
                    rageTimer.paused = false;
                    breatheTimer.paused = true;
                    zom.breathe = false;
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            breatheTimer.paused = true;
            
            var loop = scene.time.addEvent({
                delay: 1,
                callback: ()=>{
                    if (zom.health > 0){
                        zom.depth = zom.y-40;
                        if(gameState.character.x > zom.x){
                            zom.flipX = false;
                        }
                        else if(gameState.character.x < zom.x){
                            zom.flipX = true;
                        }
                        var dist = Phaser.Math.Distance.BetweenPoints(gameState.character, zom);
                        if(dist > 50){
                            if(zom.breathe == false){
                                attack.paused = true;
                                if(zom.rage == true){
                                    zom.anims.play('sarmsZombieRun',true);
                                    scene.physics.moveTo(zom,gameState.character.x, gameState.character.y,gameState.sarmsZombie.runSpeed);
                                }else {
                                    zom.anims.play('sarmsZombieWalk',true);
                                    scene.physics.moveTo(zom,gameState.character.x, gameState.character.y,gameState.sarmsZombie.speed);
                                }
                            }
                        }
                        else {
                            if(zom.breathe == false){
                                attack.paused = false;
                                zom.anims.play('sarmsZombieStrike',true);
                                zom.setVelocityX(0);
                                zom.setVelocityY(0);
                            }
                        }
                    }
                    else {
                        gameState.thingsToSave.coins += 50;
                        loop.destroy();
                        attack.destroy();
                        rageTimer.destroy();
                        breatheLoop.destroy();
                        zom.setVelocityX(0);
                        zom.setVelocityY(0);
                        zom.anims.play('sarmsZombieDeath','true');
                        gameState.checkBoss.paused = false;
                        scene.time.addEvent({
                            delay: 400,
                            callback: ()=>{
                                zom.destroy();
                                gameState.spawnZombies.paused = false;
                                gameState.buffZombies();
                            },  
                            startAt: 0,
                            timeScale: 1
                        });
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
        };
        zombie.anims.play('zombieSpawn');
        scene.time.addEvent({
            delay: 800,
            callback: ()=>{
                zombieB(zombie);
                gameState.createHealthBar3(scene,zombie,gameState.sarmsZombie.health);
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    //creates the boss quad zombie
    createQuadZombie: function (scene,inX,inY){
        var zombie = gameState.zombies.create(inX,inY,`quadZombie`).setDepth(1);
        zombie.health = gameState.quadZombie.health;
        var targeter;
        function zombieB(zom){
            var attack = scene.time.addEvent({  
                delay: 6000,
                callback: ()=>{
                    attack.timeScale = 1;
                    zom.anims.play('quadZombieBend');
                    zom.one = scene.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            zom.anims.play('quadZombieLaunch');
                            zom.two = scene.time.addEvent({
                                delay: 200,
                                callback: ()=>{
                                    scene.physics.moveTo(zom,zom.x,zom.y-1,1200);
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            zom.three = scene.time.addEvent({
                                delay: 500,
                                callback: ()=>{
                                    zom.x = 10000;
                                    zom.y = 10000;
                                    zom.setVelocityX(0);
                                    zom.setVelocityY(0);
                                    zom.anims.play('quadZombieBend');
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    zom.four = scene.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            targeter = scene.add.sprite(Math.random()*50+gameState.character.x, Math.random()*50+gameState.character.y,'quadZombieAbility').setDepth(0).setScale(2);
                            targeter.anims.play('quadZombieTarget');
                            zom.five = scene.time.addEvent({
                                delay: 1000,
                                callback: ()=>{
                                    zom.x = targeter.x;
                                    zom.y = -160;
                                    scene.physics.moveToObject(zom,targeter,0,200);
                                    zom.six = scene.time.addEvent({
                                        delay: 200,
                                        callback: ()=>{
                                            zom.setVelocityX(0);
                                            zom.setVelocityY(0);
                                            targeter.destroy();
                                            for (var i = 0; i < gameState.zombies.getChildren().length; i++){
                                                if(Phaser.Math.Distance.BetweenPoints(zom, gameState.character)<gameState.quadZombie.damageRange){
                                                    gameState.pDamage(gameState.quadZombie.damage);
                                                }
                                            }
                                            gameState.quake.play();
                                            scene.cameras.main.shake(800);
                                            var quake = scene.add.sprite(zom.x, zom.y,'quadZombieAbility').setDepth(0).setScale(1.7);
                                            quake.anims.play('quadZombieQuake');
                                            scene.time.addEvent({
                                                delay: 1000,
                                                callback: ()=>{
                                                    quake.destroy();
                                                },  
                                                startAt: 0,
                                                timeScale: 1
                                            });
                                        },  
                                        startAt: 0,
                                        timeScale: 1
                                    });
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            attack.timeScale = 3;
            
            var loop = scene.time.addEvent({
                delay: 1,
                callback: ()=>{
                    if (zom.health > 0){
                        var dist = Phaser.Math.Distance.BetweenPoints(gameState.character, zom);
                        if(dist > 50){
                            
                        }
                        else {
                            if(zom.breathe == false){
                                attack.paused = false;
                                zom.anims.play('sarmsZombieStrike',true);
                                zom.setVelocityX(0);
                                zom.setVelocityY(0);
                            }
                        }
                    }
                    else {
                        gameState.thingsToSave.coins += 50;
                        loop.destroy();
                        attack.destroy();
                        zom.setVelocityX(0);
                        zom.setVelocityY(0);
                        zom.anims.play('quadZombieDeath','true');
                        if(targeter){
                            targeter.destroy();
                        }
                        zom.one.destroy();
                        zom.two.destroy();
                        zom.three.destroy();
                        zom.four.destroy();
                        zom.five.destroy();
                        zom.six.destroy();
                        gameState.checkBoss.paused = false;
                        scene.time.addEvent({
                            delay: 400,
                            callback: ()=>{
                                zom.destroy();
                                gameState.spawnZombies.paused = false;
                                gameState.buffZombies();
                            },  
                            startAt: 0,
                            timeScale: 1
                        });
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
        };
        zombie.anims.play('quadZombieSpawn');
        scene.time.addEvent({
            delay: 800,
            callback: ()=>{
                zombieB(zombie);
                gameState.createHealthBar3(scene,zombie,gameState.quadZombie.health);
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    //creates the boss clone zombie
    createCloneZombie: function (scene,inX,inY){
        var zombie = gameState.zombies.create(inX,inY,`zombieClone`).setDepth(1);
        zombie.health = gameState.cloneZombie.health;
        function zombieB(zom){
            zom.setCollideWorldBounds(true);
            zom.anims.play('cloneZombieMove');
            var attackBursts;
            scene.physics.moveTo(zom,Math.random()*window.innerWidth,Math.random()*window.innerHeight,0,3000);
            var attack = scene.time.addEvent({
                delay: 4000,
                callback: ()=>{
                    attackBursts = scene.time.addEvent({
                        delay: 200,
                        callback: ()=>{
                            var flash;
                            var bullet;
                            if (zom.flipX == false){
                                flash = scene.physics.add.sprite(zom.x + 43, zom.y+10,'gunFlash').setDepth(1);
                                bullet = gameState.bullets.create(zom.x + 37,zom.y+5,'bullet1');
                            }else {
                                flash = scene.physics.add.sprite(zom.x - 25, zom.y+10,'gunFlash').setDepth(1);
                                zom.flipX = true;
                                bullet = gameState.bullets.create(zom.x-25,zom.y+5,'bullet1');
                            }
                            scene.sound.play('shoot');
                            var rand = Math.ceil(Math.random()*3);
                            if (rand == 1){
                                flash.anims.play('flash1','true');
                            }else if (rand == 2){
                                flash.anims.play('flash2','true');
                            }else {
                                flash.anims.play('flash3','true');
                            }
                            scene.time.addEvent({
                                delay: 10,
                                callback: ()=>{
                                    flash.destroy();
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            gameState.angle=Phaser.Math.Angle.Between(bullet.x,bullet.y,gameState.character.x,gameState.character.y);
                            bullet.setRotation(gameState.angle); 
                            scene.physics.moveToObject(bullet,gameState.character,gameState.characterStats.bulletSpeed/3);
                            var bulletLoop = scene.time.addEvent({
                                delay: 5000,
                                callback: ()=>{
                                    bullet.destroy();
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            scene.physics.add.overlap(bullet, gameState.character,(bulletT, target)=>{
                                var angle = Phaser.Math.Angle.Between(bulletT.x,bulletT.y,target.x,target.y);
                                var blood = scene.physics.add.sprite(target.x+10,target.y, 'bulletBlood');
                                blood.setRotation(angle);
                                blood.anims.play('animate','true');
                                scene.time.addEvent({
                                    delay: 200,
                                    callback: ()=>{
                                        blood.destroy();
                                    },  
                                    startAt: 0,
                                    timeScale: 1
                                });
                                bulletLoop.destroy();
                                bulletT.destroy();
                                gameState.pDamage(gameState.cloneZombie.damage);
                            });
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 4
                    });
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var move = scene.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    scene.physics.moveTo(zom,Math.random()*window.innerWidth,Math.random()*window.innerHeight,0,5000);
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var grenadeTimer = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    var gren = scene.physics.add.sprite(zom.x,zom.y,'grenadeObj');
                    scene.physics.moveToObject(gren,gameState.character,0,1500);
                    scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            var explosion = scene.physics.add.sprite(gren.x,gren.y,'');
                            explosion.anims.play('explode','true');
                            scene.sound.play('explode',{ volume: 0.5 });
                            scene.time.addEvent({
                                delay: 1000,
                                callback: ()=>{
                                    explosion.destroy();
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            gren.destroy();
                            if(Phaser.Math.Distance.BetweenPoints(gameState.character, gren)<75){
                                gameState.pDamage(gameState.cloneZombie.grenDamage);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            
            var loop = scene.time.addEvent({
                delay: 1,
                callback: ()=>{
                    if (zom.health > 0){
                        zom.depth = zom.y-40;
                        if(gameState.character.x > zom.x){
                            zom.flipX = false;
                        }
                        else if(gameState.character.x < zom.x){
                            zom.flipX = true;
                        }
                    }
                    else {
                        gameState.thingsToSave.coins += 50;
                        loop.destroy();
                        move.destroy();
                        attack.destroy();
                        attackBursts.destroy();
                        grenadeTimer.destroy();
                        zom.setVelocityX(0);
                        zom.setVelocityY(0);
                        zom.anims.play('cloneZombieDeath','true');
                        gameState.checkBoss.paused = false;
                        scene.time.addEvent({
                            delay: 400,
                            callback: ()=>{
                                zom.destroy();
                                gameState.spawnZombies.paused = false;
                                gameState.buffZombies();
                            },  
                            startAt: 0,
                            timeScale: 1
                        });
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
        };
        zombie.anims.play('cloneZombieSpawn');
        scene.time.addEvent({
            delay: 800,
            callback: ()=>{
                zombieB(zombie);
                gameState.createHealthBar3(scene,zombie,gameState.cloneZombie.health);
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    
    
    
    //creates the players healthbar
    createHealthBar: function(scene,x,y){
        var bars = [];
        var xTimes = 1;
        var barBg = scene.add.image(x, y, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0).setScale(0.5);
        for (var i = 0; i < 100;i++){
            var bar = scene.add.image(x+(5*xTimes), y+8.5, 'healthBar').setDepth(window.innerHeight+1).setScale(0.5);
            bars.push(bar);
            xTimes ++;
        }
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if ((gameState.health/(gameState.characterStats.health/100)) < bars.length && bars.length > 0){
                    bars[bars.length-1].destroy();
                    bars.pop();
                    xTimes--;
                }
                else if ((gameState.health/(gameState.characterStats.health/100)) > bars.length && bars.length < 100){
                    var bar = scene.add.image(x+(5*xTimes), y+8.5, 'healthBar').setDepth(window.innerHeight+1).setScale(0.5);
                    bars.push(bar);
                    xTimes ++;
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    //creates temporary ingame text
    createTempText:function(scene,x,y,text,time,size){
        var text = scene.add.text(x, y, `${text}`, {
            fill: '#FF0000', 
            fontSize: `${size}px`,
            fontFamily: 'Qahiri',
            strokeThickness: 5,
        }).setDepth(-100);
        scene.time.addEvent({
            delay: time,
            callback: ()=>{
                if(text){
                  text.destroy();  
                }
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    //creates the timer for the powerup infinite bullets
    createTimer:function(scene,x,y,image){
        var icon = scene.add.image(x,y,`${image}`).setOrigin(0,0).setScale(50/35);
        var timer = scene.add.sprite(icon.x+60,icon.y,'timerSprite').setOrigin(0,0);
        timer.anims.play('moveTime');
        scene.time.addEvent({
            delay: 10000,
            callback: ()=>{
                icon.destroy();
                timer.destroy();
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    createHealthBar2: function(scene, object,maxHP){
        var hbBG = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0xff0000).setScale(object.body.width/100).setDepth(window.innerHeight);  
        var hb = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0x2ecc71).setScale(object.body.width/100).setDepth(window.innerHeight);
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(object.health > 0){
                    hbBG.x = object.x;
                    hbBG.y = (object.y-object.body.height/2)-10;
                    hb.x = object.x;
                    hb.y = (object.y-object.body.height/2)-10;
                    hb.width = object.health/maxHP*100;
                } else {
                    hbBG.destroy();
                    hb.destroy();
                    checkHealth.destroy();
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    createHealthBar3: function(scene, object,maxHP){
        var hbBG = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0xff0000).setScale(object.body.width/100*2).setDepth(window.innerHeight);  
        var hb = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0xA020F0).setScale(object.body.width/100*2).setDepth(window.innerHeight);
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(object.health > 0){
                    hbBG.x = object.x;
                    hbBG.y = (object.y-object.body.height/2)-10;
                    hb.x = object.x;
                    hb.y = (object.y-object.body.height/2)-10;
                    hb.width = object.health/maxHP*100;
                } else {
                    hbBG.destroy();
                    hb.destroy();
                    checkHealth.destroy();
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    createSprintBar: function(scene, sprintAmount){
        var hbBG = scene.add.rectangle(600,0,100,10,0x5A5A5A).setScale(2).setDepth(window.innerHeight);  
        var hb = scene.add.rectangle(600,0,100,10,0xD3D3D3).setScale(2).setDepth(window.innerHeight);
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                hbBG.x = 950;
                hbBG.y = 30;
                hb.x = 950;
                hb.y = 30;
                hb.width = gameState.sprint/gameState.characterStats.sprint*100;
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
}