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
    
    characterStats: {
        speed : 250,
        health: 100,
        ammo: 25,
        fireRate: 175,
        damage: 25,
        bulletSpeed: 1000,
        fireReady: true
    },
    speed : 175,
    health: 100,
    ammo: 25,
    fireRate: 175,
    damage: 25,
    bulletSpeed: 1000,
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
    
    createZombie: function (scene,inX,inY){
        var zombie = gameState.zombies.create(inX,inY,`zombie`).setDepth(1);
        zombie.health = 100;
        function zombieB(zom){
            var attack = scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    gameState.health -= 10;
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
                            scene.physics.moveTo(zom,gameState.character.x, gameState.character.y,120);
                            zom.anims.play('zombieWalk',true);
                        }
                        else {
                            zom.setVelocityX(0);
                            zom.setVelocityY(0);
                            zom.anims.play('zombieStrike',true);
                            attack.paused = false;
                        }
                    }
                    else {
                        loop.destroy();
                        zom.destroy();
                        attack.destroy();
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
    creatHealthBar: function(scene){
        gameState.bars = [];
        var x = 100;
        var xTimes = 1;
        var barBg = scene.add.image(120, 3, 'healthBarBg').setDepth(window.innerHeight+1).setOrigin(0,0);
        for (var i = 0; i < 100;i++){
            var bar = scene.add.image(120+(10*xTimes), 20, 'healthBar').setDepth(window.innerHeight+1);
            gameState.bars.push(bar);
            xTimes ++;
        }
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if ((gameState.health/(gameState.characterStats.health/100)) < gameState.bars.length && gameState.bars.length > 0){
                    gameState.bars[gameState.bars.length-1].destroy();
                    gameState.bars.pop();
                    console.log(gameState.bars.length);
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    }
}
