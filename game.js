const config = {
    type: Phaser.AUTO,
    width : window.innerWidth-10,
    height: window.innerHeight-10,
    backgroundColor: "#999999",
    audio: {
        disableWebAudio: true
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true
            //debug: true
        }
    },
    scene:[MenuScene,PauseScene,ArenaScene,ChooseHeroScene],
    scale: {
        zoom: 1,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);


let gameState = {
    coins: 0,
    characterStats: {
        speed : 150,
        health: 100,
        ammo: 25,
        fireRate: 175,
        damage: 25,
        bulletSpeed: 1000,
        kills: 0,
        fireReady: true
    },
    speed : 150,
    health: 100,
    ammo: 25,
    fireRate: 175,
    damage: 25,
    bulletSpeed: 1000,
    kills: 0,
    bossSummonKills: 50,
    chracterControls : function(scene){
        if(gameState.health > 0){
            gameState.character.depth = gameState.character.y-50;
            gameState.character.body.checkWorldBounds();
            if(gameState.character.body.velocity.x == 0 && gameState.character.body.velocity.y == 0){
                gameState.character.anims.play('characterIdle',true);
            }
            if(gameState.keys.W.isDown){
                gameState.character.anims.play('characterWalk',true);
                gameState.character.setVelocityY(-gameState.characterStats.speed);
            }
            else if(gameState.keys.S.isDown){
                gameState.character.anims.play('characterWalk',true);
                gameState.character.setVelocityY(gameState.characterStats.speed);
            }
            else {
                gameState.character.setVelocityY(0);
            }
            if(gameState.keys.A.isDown){
                gameState.character.anims.play('characterWalk',true);
                gameState.character.setVelocityX(-gameState.characterStats.speed);
            }
            else if(gameState.keys.D.isDown){
                gameState.character.anims.play('characterWalk',true);
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
            if (gameState.mouse.isDown && gameState.ammo > 0){
                if (gameState.characterStats.fireReady == true){
                    gameState.ammo --;
                    gameState.characterStats.fireReady = false;
                    var flash;
                    var bullet;
                    if (gameState.character.flipX == false){
                        flash = scene.physics.add.sprite(gameState.character.x + 43, gameState.character.y+10,'gunFlash').setDepth(1);
                        bullet = gameState.bullets.create(gameState.character.x + 37,gameState.character.y+5,'bullet1');
                    }else {
                        flash = scene.physics.add.sprite(gameState.character.x - 25, gameState.character.y+10,'gunFlash').setDepth(1);
                        flash.flipX = true;
                        bullet = gameState.bullets.create(gameState.character.x-25,gameState.character.y+5,'bullet1');
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
                        bulletT.destroy();
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
            gameState.spawnZombies.destroy();
            gameState.character.destroy();
            scene.physics.pause();
            scene.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    location.reload();
                    /*scene.scene.stop('ArenaScene');
                    scene.scene.start('MenuScene');*/
                },  
                startAt: 0,
                timeScale: 1
            });
        }
    },
    reload: function (scene){
        if(gameState.characterStats.fireReady == true){
            gameState.characterStats.fireReady = false;
            var clip = scene.physics.add.image(gameState.character.x+5, gameState.character.y+12, 'gunMagazine').setGravityY(1000);
            if (gameState.character.x > scene.input.x){
                clip.flipX = true;
            }
            clip.depth = clip.y +1;
            scene.time.addEvent({
                delay: 2500,
                callback: ()=>{
                    gameState.ammo = gameState.characterStats.ammo;
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
    
    
    zombie :{
        speed: 75,
        health : 100,
        damage : 10,
        image: 'zombie'
    },
    sarmsZombie :{
        speed: 45,
        runSpeed: 160,
        health : 3500,
        damage : 30,
        name: 'sarmsZombie'
    },
    
    
    createZombie: function (scene,inX,inY,zomStats){
        var zombie = gameState.zombies.create(inX,inY,`${zomStats.image}`).setDepth(1);
        zombie.health = zomStats.health;
        function zombieB(zom){
            zom.setCollideWorldBounds(true);
            var attack = scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    gameState.health -= zomStats.damage;
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
                        var random = Math.ceil(Math.random()*2);
                        if(random == 2){
                            var coin = scene.physics.add.sprite(zom.x,zom.y,'coin');
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
                                gameState.coins ++;
                                coin.destroy();
                                gone.destroy();
                            });
                        }
                        gameState.kills++;
                        loop.destroy();
                        attack.destroy();
                        zom.setVelocityX(0);
                        zom.setVelocityY(0);
                        zom.anims.play('zombieDeath','true');
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
    
    
    createSarmsZombie: function (scene,inX,inY){
        var zombie = gameState.zombies.create(inX,inY,`sarmsZombie`).setDepth(1);
        zombie.health = gameState.sarmsZombie.health;
        zombie.rage = false;
        zombie.breathe = false;
        function zombieB(zom){
            zom.setCollideWorldBounds(true);
            var attack = scene.time.addEvent({
                delay: 300,
                callback: ()=>{
                    gameState.health -= gameState.sarmsZombie.damage;
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
            var breatheLoop;
            var rageTimer = scene.time.addEvent({
                delay: 9000,
                callback: ()=>{
                    zom.rage = true;
                    rageTimer.paused = true;
                    breatheLoop = scene.time.addEvent({
                        delay: 6500,
                        callback: ()=>{
                            zom.rage = false;
                            breatheTimer.paused = false;
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
                delay: 5000,
                callback: ()=>{
                    console.log("lok");
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
            var barBg = scene.add.image(10, 55, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0);
            for (var i = 0; i < 100;i++){
                var bar = bars.create(10+(10*(i+1)), barBg.y+17, 'zombieHealthBar').setDepth(window.innerHeight+1);
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
                        var random = Math.ceil(Math.random()*2);
                        if(random == 2){
                            var coin = scene.physics.add.sprite(zom.x,zom.y,'coin');
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
                                gameState.coins ++;
                                coin.destroy();
                                gone.destroy();
                            });
                        }
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
                                console.log(gameState.kills);
                                gameState.spawnZombies.paused = false;
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
    
    
    createHealthBar: function(scene,x,y){
        var bars = [];
        var xTimes = 1;
        var barBg = scene.add.image(x, y, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0);
        for (var i = 0; i < 100;i++){
            var bar = scene.add.image(x+(10*xTimes), y+17, 'healthBar').setDepth(window.innerHeight+1);
            bars.push(bar);
            xTimes ++;
        }
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if ((gameState.health/(gameState.characterStats.health/100)) < bars.length && bars.length > 0){
                    bars[bars.length-1].destroy();
                    bars.pop();
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    createTempText:function(scene,x,y,text,time,size){
        var text = scene.add.text(x, y, `${text}`, {
            fill: '#000000', 
            fontSize: `${size}px`,
            fontFamily: 'Qahiri',
            strokeThickness: 5,
        }).setDepth(window.innerHeight+3);
        scene.time.addEvent({
            delay: time,
            callback: ()=>{
                text.destroy();
            },  
            startAt: 0,
            timeScale: 1
        });
    }
}
