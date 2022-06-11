//The configuration of your game that is a parameter of the Phaser.Game function
const config = {
    type: Phaser.AUTO,
    width : window.innerWidth-10,
    height: window.innerHeight-10,
    backgroundColor: "#999999",
    audio: {
        disableWebAudio: false 
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true
            //debug: true
        }
    },
    scene:[MenuScene,PauseScene,ArenaScene,UpgradeScene,DeathScene,ShopScene,UnlockScene],
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
    characterStats: {
        speed : 150,
        health: 100,
        ammo: 25,
        fireRate: 175,
        damage: 25,
        bulletSpeed: 1000,
        fireReady: true
    },
    speed : 150,
    health: 100,
    ammo: 25,
    fireRate: 175,
    damage: 25,
    bulletSpeed: 1000,
    kills: 0,
    highestKills:0,
    bossSummonKills: 0,
    disableReload: false,
    
    skin: 'character',
    bulletSkin: 'bullet1',
    
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
    
    upgradeCosts: function(current, max, factor){
        var cost;
        cost = (((current-max)+factor)/factor)*100;
        return cost;
    },
    
    
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
    
    once: false,
    chracterControls : function(scene){
        if(gameState.health > 0){
            gameState.character.depth = gameState.character.y-50;
            gameState.character.body.checkWorldBounds();
            if(gameState.character.body.velocity.x == 0 && gameState.character.body.velocity.y == 0){
                gameState.character.anims.play(`${gameState.skin}`+'Idle',true);
            }
            if(gameState.keys.W.isDown){
                gameState.character.anims.play(`${gameState.skin}`+'Walk',true);
                gameState.character.setVelocityY(-gameState.characterStats.speed);
            }
            else if(gameState.keys.S.isDown){
                gameState.character.anims.play(`${gameState.skin}`+'Walk',true);
                gameState.character.setVelocityY(gameState.characterStats.speed);
            }
            else {
                gameState.character.setVelocityY(0);
            }
            if(gameState.keys.A.isDown){
                gameState.character.anims.play(`${gameState.skin}`+'Walk',true);
                gameState.character.setVelocityX(-gameState.characterStats.speed);
            }
            else if(gameState.keys.D.isDown){
                gameState.character.anims.play(`${gameState.skin}`+'Walk',true);
                gameState.character.setVelocityX(gameState.characterStats.speed);
            }
            else {
                gameState.character.setVelocityX(0);
            }
            if(gameState.input.x > gameState.character.x){
                gameState.character.flipX = false;
            }
            else {
                gameState.character.flipX = true;
            }
            if (gameState.keys.SPACE.isDown && gameState.ammo > 0){
                if (gameState.characterStats.fireReady == true){
                    scene.sound.play('shoot');
                    gameState.ammo --;
                    gameState.ammoText.setText(gameState.ammo);
                    gameState.characterStats.fireReady = false;
                    var flash;
                    var bullet;
                    if (gameState.character.flipX == false){
                        flash = scene.physics.add.sprite(gameState.character.x + 43, gameState.character.y+10,'gunFlash').setDepth(1);
                        bullet = gameState.bullets.create(gameState.character.x + 37,gameState.character.y+5,`${gameState.bulletSkin}`);
                    }else {
                        flash = scene.physics.add.sprite(gameState.character.x - 25, gameState.character.y+10,'gunFlash').setDepth(1);
                        flash.flipX = true;
                        bullet = gameState.bullets.create(gameState.character.x-25,gameState.character.y+5,`${gameState.bulletSkin}`);
                    }
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
                                    gameState.zombies.getChildren()[i].health -= 100;
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
    
    achievmentTracker: function(scene){
        if(gameState.kills >= 500 && gameState.weaponSkins.SkeletonGun.owned == 0){
            gameState.globalScene.scene.pause(`${gameState.currentScene}`);
            gameState.globalScene.scene.launch('UnlockScene');
        }
    },
    
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
    
    pDamage: function(damage){
        if(gameState.health > 0){
            gameState.cHurt.play();
        }
        gameState.health -= damage;
    },
    
    
    createZombie: function (scene,inX,inY,zomStats){
        var zombie = gameState.zombies.create(inX,inY,`${zomStats.image}`).setDepth(1);
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
                            delay: 400,
                            callback: ()=>{
                                zom.destroy();
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
            },  
            startAt: 0,
            timeScale: 1
        });
    },
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
            var bars = scene.add.group();
            var barBg = scene.add.image(window.innerWidth/2-505, 65, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0);
            for (var i = 0; i < 100;i++){
                var bar = bars.create(barBg.x+(10*(i+1)), barBg.y+17, 'zombieHealthBar').setDepth(window.innerHeight+1);
            }
            var checkHealthBar = scene.time.addEvent({
                delay: 1,
                callback:()=>{
                    if ((zom.health/(gameState.sarmsZombie.health/100)) < bars.getChildren().length && bars.getChildren().length > 0){
                        bars.getChildren()[bars.getChildren().length-1].destroy();
                    }
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
                        for (var i = bars.getChildren().length-1; i >= 0;i--){
                            bars.getChildren()[i].destroy();
                        }
                        gameState.coins += 50;
                        loop.destroy();
                        attack.destroy();
                        rageTimer.destroy();
                        checkHealthBar.destroy();
                        breatheLoop.destroy();
                        barBg.destroy();
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
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    
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
                    gameState.one = scene.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            zom.anims.play('quadZombieLaunch');
                            gameState.two = scene.time.addEvent({
                                delay: 200,
                                callback: ()=>{
                                    scene.physics.moveTo(zom,zom.x,zom.y-1,1200);
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            gameState.three = scene.time.addEvent({
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
                    gameState.four = scene.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            targeter = scene.add.sprite(Math.random()*50+gameState.character.x, Math.random()*50+gameState.character.y,'quadZombieAbility').setDepth(0).setScale(2);
                            targeter.anims.play('quadZombieTarget');
                            gameState.five = scene.time.addEvent({
                                delay: 1000,
                                callback: ()=>{
                                    zom.x = targeter.x;
                                    zom.y = -160;
                                    scene.physics.moveToObject(zom,targeter,0,200);
                                    gameState.six = scene.time.addEvent({
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
            var bars = scene.add.group();
            var barBg = scene.add.image(window.innerWidth/2-505, 65, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0);
            for (var i = 0; i < 100;i++){
                var bar = bars.create(barBg.x+(10*(i+1)), barBg.y+17, 'zombieHealthBar').setDepth(window.innerHeight+1);
            }
            var checkHealthBar = scene.time.addEvent({
                delay: 1,
                callback:()=>{
                    if ((zom.health/(gameState.quadZombie.health/100)) < bars.getChildren().length && bars.getChildren().length > 0){
                        bars.getChildren()[bars.getChildren().length-1].destroy();
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
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
                        for (var i = bars.getChildren().length-1; i >= 0;i--){
                            bars.getChildren()[i].destroy();
                        }
                        gameState.coins += 50;
                        loop.destroy();
                        attack.destroy();
                        barBg.destroy();
                        zom.setVelocityX(0);
                        zom.setVelocityY(0);
                        checkHealthBar.destroy();
                        zom.anims.play('quadZombieDeath','true');
                        if(targeter){
                            targeter.destroy();
                        }
                        gameState.one.destroy();
                        gameState.two.destroy();
                        gameState.three.destroy();
                        gameState.four.destroy();
                        gameState.five.destroy();
                        gameState.six.destroy();
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
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    
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
            var bars = scene.add.group();
            var barBg = scene.add.image(window.innerWidth/2-505, 65, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0);
            for (var i = 0; i < 100;i++){
                var bar = bars.create(barBg.x+(10*(i+1)), barBg.y+17, 'zombieHealthBar').setDepth(window.innerHeight+1);
            }
            var checkHealthBar = scene.time.addEvent({
                delay: 1,
                callback:()=>{
                    if ((zom.health/(gameState.cloneZombie.health/100)) < bars.getChildren().length && bars.getChildren().length > 0){
                        bars.getChildren()[bars.getChildren().length-1].destroy();
                    }
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
                        for (var i = bars.getChildren().length-1; i >= 0;i--){
                            bars.getChildren()[i].destroy();
                        }
                        gameState.coins += 50;
                        loop.destroy();
                        move.destroy();
                        attack.destroy();
                        attackBursts.destroy();
                        grenadeTimer.destroy();
                        checkHealthBar.destroy();
                        barBg.destroy();
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
            },  
            startAt: 0,
            timeScale: 1
        });
    },
    
    
    
    
    
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
                text.destroy();
            },  
            startAt: 0,
            timeScale: 1
        });
    },
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
    }
}