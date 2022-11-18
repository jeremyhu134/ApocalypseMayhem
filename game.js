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
    scene:[MenuScene,PauseScene,ArenaScene,UpgradeScene,DeathScene,ShopScene,UnlockScene],
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
    coins: 11500,
    coinsAdd: 3,
    //character stats constants
    characterStats: {
        speed : 100,
        health: 100,
        ammo: 25,
        fireRate: 175,
        damage: 25,
        bulletSpeed: 1500,
        fireReady: true,
        sprint: 100
    },
    //character stats that changes
    speed : 100,
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
    
    //current sprite for bullet and player
    skin: 'character',
    bulletSkin: 'bullet1',
    
    //unlocked skins and their names and bullet sprites
    weaponSkins: {
        goldenGun : {
            owned: 0,
            name: 'characterGoldenGun',
            nameB: 'bulletGolden'
        },
        sus : {
            owned: 0,
            name: 'characterSus'
        },
        laserTrooper : {
            owned: 0,
            name: 'characterLaserTrooper',
            nameB: 'bulletLaser'
        },
        satvik : {
            owned: 0,
            name: 'characterSatvik',
            nameB: 'bulletTennis'
        },
        SkeletonGun : {
            owned: 0,
            name: 'characterSkeletonGun',
            nameB: 'bulletSG'
        }
    },
    
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
    
    
    //saves variable values to local storage
    save: function(){
        localStorage.setItem(1, gameState.coins);
        localStorage.setItem(2, gameState.characterStats.health);
        localStorage.setItem(3, gameState.characterStats.damage);
        localStorage.setItem(4, gameState.characterStats.ammo);
        localStorage.setItem(5, gameState.characterStats.speed);
        localStorage.setItem(6, gameState.weaponSkins.goldenGun.owned);
        localStorage.setItem(7, gameState.highestKills);
        localStorage.setItem(8, gameState.weaponSkins.sus.owned);
        localStorage.setItem(9, gameState.weaponSkins.laserTrooper.owned);
        localStorage.setItem(10, gameState.weaponSkins.satvik.owned);
        localStorage.setItem(11, gameState.weaponSkins.SkeletonGun.owned);
    },
    //loads variable values from localstorage
    loadSave: function(){
        if(localStorage.getItem(1)){//If variable exists in localStorage
            gameState.coins = parseInt(localStorage.getItem(1));
        }
        if(localStorage.getItem(2)){//If variable exists in localStorage
            gameState.characterStats.health = parseInt(localStorage.getItem(2));
        }
        if(localStorage.getItem(3)){//If variable exists in localStorage
            gameState.characterStats.damage = parseInt(localStorage.getItem(3));
        }
        if(localStorage.getItem(4)){//If variable exists in localStorage
            gameState.characterStats.ammo = parseInt(localStorage.getItem(4));
        }
        if(localStorage.getItem(5)){//If variable exists in localStorage
            gameState.characterStats.speed = parseInt(localStorage.getItem(5));
        }
        if(localStorage.getItem(6)){//If variable exists in localStorage
            gameState.weaponSkins.goldenGun.owned = parseInt(localStorage.getItem(6));
        }
        if(localStorage.getItem(7)){//If variable exists in localStorage
            gameState.highestKills = parseInt(localStorage.getItem(7));
        }
        if(localStorage.getItem(8)){//If variable exists in localStorage
            gameState.weaponSkins.sus.owned = parseInt(localStorage.getItem(8));
        }
        if(localStorage.getItem(9)){//If variable exists in localStorage
            gameState.weaponSkins.laserTrooper.owned = parseInt(localStorage.getItem(9));
        }
        if(localStorage.getItem(10)){//If variable exists in localStorage
            gameState.weaponSkins.satvik.owned = parseInt(localStorage.getItem(10));
        }
        if(localStorage.getItem(11)){//If variable exists in localStorage
            gameState.weaponSkins.SkeletonGun.owned = parseInt(localStorage.getItem(11));
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
                gameState.character.setVelocityX(gameState.speed*.65);
                gameState.character.setVelocityY(gameState.speed*.65);
            }
            else if(gameState.keys.D.isDown && gameState.keys.W.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(gameState.speed*.65);
                gameState.character.setVelocityY(-gameState.speed*.65);
            }
            else if(gameState.keys.A.isDown && gameState.keys.W.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(-gameState.speed*.65);
                gameState.character.setVelocityY(-gameState.speed*.65);
            }
            else if(gameState.keys.A.isDown && gameState.keys.S.isDown){
                gameState.character.anims.play(`${gameState.skin}`+`${gameState.speedState}`,true);
                gameState.character.setVelocityX(-gameState.speed*.65);
                gameState.character.setVelocityY(gameState.speed*.65);
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
            if(gameState.keys.SHIFT.isDown && gameState.sprint > 1){
                gameState.sprint -= 1;
                gameState.speed = gameState.characterStats.speed*2;
                gameState.sprintlock = 0;
                gameState.speedState = 'Run';
            }else {
                gameState.speedState = 'Walk';
                gameState.speed = gameState.characterStats.speed;
                if(gameState.sprint < gameState.characterStats.sprint && gameState.sprintlock > 30){
                    gameState.sprint += 0.5;
                }
            }
            if(gameState.input.x > gameState.character.x){
                gameState.character.flipX = false;
                gameState.gun.flipY = false;
                gameState.gun.x = gameState.character.x-6;
                gameState.gun.y = gameState.character.y-3;
            }
            else {
                gameState.character.flipX = true;
                gameState.gun.flipY = true;
                gameState.gun.x = gameState.character.x+6;
                gameState.gun.y = gameState.character.y-3;
            }
            gameState.gun.depth = gameState.character.y+5;
            gameState.gun.setRotation(Phaser.Math.Angle.Between(gameState.gun.x,gameState.gun.y,scene.input.x,scene.input.y)); 
            if (gameState.keys.SPACE.isDown && gameState.ammo > 0){
                if (gameState.characterStats.fireReady == true){
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
                }
            }
            else if (gameState.keys.R.isDown){
                gameState.reload(scene);
                
            }
            else {
                if(gameState.ammo<= 0){
                    gameState.reload(scene);
                }
            }
        }
        else {
            if(gameState.once == false){
                gameState.once = true;
                gameState.character.anims.play('characterDeath',true);
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
            gameState.ammo = gameState.characterStats.ammo;
            scene.time.addEvent({
                delay: 2500,
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
                gameState.coins += rand;
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
                gameState.fireRate = gameState.characterStats.fireRate - 35;
                gameState.ammo = 9999;
                gameState.createTimer(scene,10,60,'infiniteBulletsImage');
                scene.time.addEvent({
                    delay: 10000,
                    callback: ()=>{
                        gameState.fireRate = gameState.characterStats.fireRate;
                        gameState.ammo = gameState.characterStats.ammo;
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
                } else{
                    gren.destroy();
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
        damage : 25,
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
        gameState.arenaM.setMute(false);
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
                        delay: 6500,
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
                        gameState.coins += 50;
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
                        gameState.coins += 50;
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
                            scene.physics.moveToObject(bullet,gameState.character,gameState.characterStats.bulletSpeed/1.25);
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
                delay: 3000,
                callback: ()=>{
                    scene.physics.moveTo(zom,Math.random()*window.innerWidth,Math.random()*window.innerHeight,0,3000);
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var grenadeTimer = scene.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    var gren = scene.physics.add.sprite(zom.x,zom.y,'grenadeObj');
                    scene.physics.moveToObject(gren,gameState.character,0,1000);
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
                        gameState.coins += 50;
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
