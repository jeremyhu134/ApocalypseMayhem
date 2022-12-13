class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
    }

    preload(){
        // map
        this.load.image('testmap','heroimages/mapbg.png');
        this.load.spritesheet('reaperwraith','heroimages/reaperwraith.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('soldier','heroimages/soldier.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('archer','heroimages/archer.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('orc','heroimages/orc.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('orcShaman','heroimages/orcShaman.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('orcBoss','heroimages/orcBoss.png',{frameWidth: 150,frameHeight:150});
        this.load.spritesheet('mage','heroimages/mage.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('wizard','heroimages/wizard.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('troll','heroimages/troll.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('endTurn','heroimages/endTurn.png',{frameWidth: 100,frameHeight:50});
        this.load.spritesheet('selfDestruct','heroimages/selfDestruct.png',{frameWidth: 32,frameHeight:32});
        this.load.spritesheet('THEWORLD','heroimages/THEWORLD.png',{frameWidth: 234,frameHeight:300});
        this.load.image('hardenIcon','heroimages/hardenIcon.png');
        this.load.image('slashIcon','heroimages/slashIcon.png');
        this.load.spritesheet('slashAnimate','heroimages/slashAnimate.png',{frameWidth: 40,frameHeight:40});
        this.load.image('sharpenIcon','heroimages/sharpenIcon.png');
        this.load.image('emptyIcon','heroimages/emptyIcon.png');
        this.load.image('healIcon','heroimages/healIcon.png');
        this.load.spritesheet('healAnimate','heroimages/healAnimate.png',{frameWidth: 40,frameHeight:40});
        this.load.image('reviveIcon','heroimages/reviveIcon.png');
        this.load.image('drainIcon','heroimages/drainIcon.png');
        this.load.spritesheet('healthDrain','heroimages/healthDrain.png',{frameWidth: 32,frameHeight:32});
        this.load.image('slashIcon','heroimages/slashIcon.png');
        this.load.image('magicRayIcon','heroimages/magicRayIcon.png');
        this.load.image('ray','heroimages/ray.png');
        this.load.image('selfDestructIcon','heroimages/selfDestructIcon.png');
        this.load.image('plasmaShowerIcon','heroimages/plasmaShowerIcon.png');
        this.load.image('bashIcon','heroimages/bashIcon.png');
        this.load.image('arrowShotIcon','heroimages/arrowShotIcon.png');
        this.load.spritesheet('superBashAnimate','heroimages/superBashAnimate.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('bashAnimate','heroimages/bashAnimate.png',{frameWidth: 50,frameHeight:40});
        
        this.load.spritesheet('background','heroimages/background.png',{frameWidth: 1397,frameHeight:675});
        
        
        
        this.load.image('gameTitle','heroimages/gameTitle.png');
        this.load.image('infoBG','heroimages/infoBG.png');
        this.load.image('jojoBG','heroimages/jojoBG.png');
        this.load.image('snowBg','heroimages/snowBg.png');
        this.load.image('spear','heroimages/spear.png');
        this.load.image('arrow','heroimages/arrow.png');
        this.load.spritesheet('defenseUp','heroimages/defenseUp.png',{frameWidth: 80,frameHeight:80});
        this.load.spritesheet('attackUp','heroimages/attackUp.png',{frameWidth: 80,frameHeight:80});
        this.load.spritesheet('reviveAnim','heroimages/reviveAnim.png',{frameWidth: 32,frameHeight:32});
        this.load.spritesheet('target','heroimages/target.png',{frameWidth: 40,frameHeight:40});
        this.load.spritesheet('mudaAnim','heroimages/mudaAnim.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('magicBallRain','heroimages/magicBallRain.png',{frameWidth: 50,frameHeight:50});
        this.load.image('healthImage','heroimages/healthImage.png');
        this.load.image('newGame','heroimages/newGame.png');
        this.load.image('continue','heroimages/continue.png');
    }
    
    create() {
        var scene = this;
        
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(0);
        this.anims.create({
            key: 'bganimate',
            frameRate: 3,
            repeat: -1,
            frames:this.anims.generateFrameNames('background',{start: 0,end: 2})
        });
        bg.anims.play('bganimate','true');
        
        gameState.loadSave();
        var title = this.add.image(600,100,'gameTitle').setInteractive();
        
        var newGame;
        var continueb;
        if(gameState.thingsToSave.level == 1){
            newGame = this.add.image(900,500,'newGame').setInteractive();
            newGame.on('pointerdown', function(pointer){
                gameState.thingsToSave.level = 1;
                scene.scene.start('GameScene');
            });
        }
        if(gameState.thingsToSave.level > 1){
            continueb = this.add.image(900,500,'continue').setInteractive();
            continueb.on('pointerdown', function(pointer){
                scene.scene.start('GameScene');
            });
        }
        
    }
    update() {
        
    }
}









class SkirmishScene extends Phaser.Scene {
    constructor() {
		super({ key: 'SkirmishScene' })
	}
    preload(){
        
    }
    create() {
        
    }
    upload() {
        
    }
}








class GameScene extends Phaser.Scene {
    constructor() {
		super({ key: 'GameScene' })
	}
    preload(){
        
    }
    create(){
        var scene = this;
        //anims
        /*this.anims.create({
            key: 'tracerrecallone',
            frameRate: 20,
            frames:this.anims.generateFrameNames('tracerrecall',{start: 0,end: 10})
        });*/
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        //disables right click menu
        //this.input.mouse.disableContextMenu();
        //assigns cursors to track mouse
        gameState.cursors = this.input.keyboard.createCursorKeys();
        //assigns instances for the keys listed
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC');
        
        this.add.image(0,0,'infoBG').setOrigin(0,0).setScale(1).setDepth(0.1);
        
        /*for(var i = 0; i < gameState.allies.length; i++){
            if(gameState.allies[i]){
                gameState.allies.splice(i,1);
            }
        }
        for(var i = 0; i < gameState.enemies.length; i++){
            if(gameState.enemies[i]){
                gameState.enemies.splice(i,1);
            }
        }*/
        gameState.enemies = [];
        gameState.allies = [];
        
        
        if(gameState.thingsToSave.level >= 0 && gameState.thingsToSave.level <= 5){
            var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(0);
            this.anims.create({
                key: 'bganimate',
                frameRate: 3,
                repeat: -1,
                frames:this.anims.generateFrameNames('background',{start: 0,end: 2})
            });
            bg.anims.play('bganimate','true');
        }else if(gameState.thingsToSave.level >= 6 && gameState.thingsToSave.level <= 6){
            var bg = this.physics.add.sprite(0,0,'snowBg').setOrigin(0,0).setScale(1).setDepth(0);
        }
        else if(gameState.thingsToSave.level >= 7 && gameState.thingsToSave.level <= 7){
            var bg = this.physics.add.sprite(0,0,'jojoBG').setOrigin(0,0).setScale(1).setDepth(0);
        }
        
        
        this.time.addEvent({
            delay: 10,
            callback: ()=>{
                if(gameState.selectedMove !== ''){
                    if(gameState.selectedMove.type == 'ally'){
                        if(gameState.allies[0]){
                            gameState.target1.setFrame(1);
                        }if(gameState.allies[1]){
                            gameState.target2.setFrame(1);
                        }if(gameState.allies[2]){
                            gameState.target3.setFrame(1);
                        }if(gameState.allies[3]){
                            gameState.target4.setFrame(1);
                        }
                        if(gameState.enemies[0]){
                            gameState.target5.setFrame(0);
                        }if(gameState.enemies[1]){
                            gameState.target6.setFrame(0);
                        }if(gameState.enemies[2]){
                            gameState.target7.setFrame(0);
                        }if(gameState.enemies[3]){
                            gameState.target8.setFrame(0);
                        }
                    }else if(gameState.selectedMove.type == 'enemy'){
                        if(gameState.enemies[0]){
                            gameState.target5.setFrame(2);
                        }if(gameState.enemies[1]){
                            gameState.target6.setFrame(2);
                        }if(gameState.enemies[2]){
                            gameState.target7.setFrame(2);
                        }if(gameState.enemies[3]){
                            gameState.target8.setFrame(2);
                        }
                        if(gameState.allies[0]){
                            gameState.target1.setFrame(0);
                        }if(gameState.allies[1]){
                            gameState.target2.setFrame(0);
                        }if(gameState.allies[2]){
                            gameState.target3.setFrame(0);
                        }if(gameState.allies[3]){
                            gameState.target4.setFrame(0);
                        }
                    }
                }else {
                    if(gameState.allies[0]){
                        gameState.target1.setFrame(0);
                    }if(gameState.allies[1]){
                        gameState.target2.setFrame(0);
                    }if(gameState.allies[2]){
                        gameState.target3.setFrame(0);
                    }if(gameState.allies[3]){
                        gameState.target4.setFrame(0);
                    }
                    if(gameState.enemies[0]){
                        gameState.target5.setFrame(0);
                    }if(gameState.enemies[1]){
                        gameState.target6.setFrame(0);
                    }if(gameState.enemies[2]){
                        gameState.target7.setFrame(0);
                    }if(gameState.enemies[3]){
                        gameState.target8.setFrame(0);
                    }
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        
        
        gameState.info.createInfo(this);
        
        var turnButton = this.add.sprite(600,620,'endTurn').setInteractive();
        turnButton.on('pointerdown', function(pointer){
            if(gameState.turn != "enemy"){
                if(gameState.enemies[0]){
                    gameState.enemies[0].moved = 0;
                    gameState.enemies[0].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                    if(gameState.enemies[0].moves[0] && gameState.enemies[0].move1Countdown > 0){
                        gameState.enemies[0].move1Countdown -= 1;
                    }
                    if(gameState.enemies[0].moves[1] && gameState.enemies[0].move2Countdown > 0){
                        gameState.enemies[0].move2Countdown -= 1;
                    }
                    if(gameState.enemies[0].moves[2] && gameState.enemies[0].move3Countdown > 0){
                        gameState.enemies[0].move3Countdown -= 1;
                    }
                }if(gameState.enemies[1]){
                    gameState.enemies[1].moved = 0;
                    gameState.enemies[1].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                    if(gameState.enemies[1].moves[0] && gameState.enemies[1].move1Countdown > 0){
                        gameState.enemies[1].move1Countdown -= 1;
                    }
                    if(gameState.enemies[1].moves[1] && gameState.enemies[1].move2Countdown > 0){
                        gameState.enemies[1].move2Countdown -= 1;
                    }
                    if(gameState.enemies[1].moves[2] && gameState.enemies[1].move3Countdown > 0){
                        gameState.enemies[1].move3Countdown -= 1;
                    }
                }if(gameState.enemies[2]){
                    gameState.enemies[2].moved = 0;
                    gameState.enemies[2].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                    if(gameState.enemies[2].moves[0] && gameState.enemies[2].move1Countdown > 0){
                        gameState.enemies[2].move1Countdown -= 1;
                    }
                    if(gameState.enemies[2].moves[1] && gameState.enemies[2].move2Countdown > 0){
                        gameState.enemies[2].move2Countdown -= 1;
                    }
                    if(gameState.enemies[2].moves[2] && gameState.enemies[2].move3Countdown > 0){
                        gameState.enemies[2].move3Countdown -= 1;
                    }
                }if(gameState.enemies[3]){
                    gameState.enemies[3].moved = 0;
                    gameState.enemies[3].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                    if(gameState.enemies[3].moves[0] && gameState.enemies[3].move1Countdown > 0){
                        gameState.enemies[3].move1Countdown -= 1;
                    }
                    if(gameState.enemies[3].moves[1] && gameState.enemies[3].move2Countdown > 0){
                        gameState.enemies[3].move2Countdown -= 1;
                    }
                    if(gameState.enemies[3].moves[2] && gameState.enemies[3].move3Countdown > 0){
                        gameState.enemies[3].move3Countdown -= 1;
                    }
                }
                gameState.moveIcon1.setTexture(`emptyIcon`);
                gameState.moveIcon2.setTexture(`emptyIcon`);
                gameState.moveIcon3.setTexture(`emptyIcon`);
                gameState.turn = "enemy";
                for(var i = 0; i < gameState.enemies.length; i++){
                    if(gameState.enemies[i]){
                        gameState.enemies[i].moved = 0;
                    }
                }
                if(gameState.turn == "enemy"){
                    scene.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            if(gameState.enemies[0] && gameState.enemies[0].moved == 0 && gameState.enemies[0].health > 0){
                                gameState.enemies[0].stats.computer(scene,gameState.enemies[0]);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            if(gameState.enemies[1] && gameState.enemies[1].moved == 0 && gameState.enemies[1].health > 0){
                                gameState.enemies[1].stats.computer(scene,gameState.enemies[1]);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 1500,
                        callback: ()=>{
                            if(gameState.enemies[2] && gameState.enemies[2].moved == 0 && gameState.enemies[2].health > 0){
                                gameState.enemies[2].stats.computer(scene,gameState.enemies[2]);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 2000,
                        callback: ()=>{
                            if(gameState.enemies[3] && gameState.enemies[3].moved == 0 && gameState.enemies[3].health > 0){
                                gameState.enemies[3].stats.computer(scene,gameState.enemies[3]);
                            } 
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 2500,
                        callback: ()=>{
                            gameState.turn = 'player';
                            gameState.attacking = false;
                            gameState.selectedHero = '';
                            gameState.selectedMove = '';
                            if(gameState.allies[0]){
                                gameState.allies[0].moved = 0;
                                gameState.allies[0].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[0].moves[0] && gameState.allies[0].move1Countdown > 0){
                                    gameState.allies[0].move1Countdown -= 1;
                                }
                                if(gameState.allies[0].moves[1] && gameState.allies[0].move2Countdown > 0){
                                    gameState.allies[0].move2Countdown -= 1;
                                }
                                if(gameState.allies[0].moves[2] && gameState.allies[0].move3Countdown > 0){
                                    gameState.allies[0].move3Countdown -= 1;
                                }
                            }if(gameState.allies[1]){
                                gameState.allies[1].moved = 0;
                                gameState.allies[1].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[1].moves[0] && gameState.allies[1].move1Countdown > 0){
                                    gameState.allies[1].move1Countdown -= 1;
                                }
                                if(gameState.allies[1].moves[1] && gameState.allies[1].move2Countdown > 0){
                                    gameState.allies[1].move2Countdown -= 1;
                                }
                                if(gameState.allies[1].moves[2] && gameState.allies[1].move3Countdown > 0){
                                    gameState.allies[1].move3Countdown -= 1;
                                }
                            }if(gameState.allies[2]){
                                gameState.allies[2].moved = 0;
                                gameState.allies[2].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[2].moves[0] && gameState.allies[2].move1Countdown > 0){
                                    gameState.allies[2].move1Countdown -= 1;
                                }
                                if(gameState.allies[2].moves[1] && gameState.allies[2].move2Countdown > 0){
                                    gameState.allies[2].move2Countdown -= 1;
                                }
                                if(gameState.allies[2].moves[2] && gameState.allies[2].move3Countdown > 0){
                                    gameState.allies[2].move3Countdown -= 1;
                                }
                            }if(gameState.allies[3]){
                                gameState.allies[3].moved = 0;
                                gameState.allies[3].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[3].moves[0] && gameState.allies[3].move1Countdown > 0){
                                    gameState.allies[3].move1Countdown -= 1;
                                }
                                if(gameState.allies[3].moves[1] && gameState.allies[3].move2Countdown > 0){
                                    gameState.allies[3].move2Countdown -= 1;
                                }
                                if(gameState.allies[3].moves[2] && gameState.allies[3].move3Countdown > 0){
                                    gameState.allies[3].move3Countdown -= 1;
                                }
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }
            }
        });
        
        this.anims.create({
            key: 'soldierIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('soldier',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'soldierDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('soldier',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'orcIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('orc',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'orcDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('orc',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'orcShamanIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('orcShaman',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'orcShamanDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('orcShaman',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'orcBossIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('orcBoss',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'orcBossDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('orcBoss',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'trollIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('troll',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'trollDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('troll',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'mageIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('mage',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'mageDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('mage',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'wizardIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('wizard',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'wizardDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('wizard',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'archerIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('archer',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'archerDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('archer',{start: 4,end: 6})
        });
        
        this.anims.create({
            key: 'THEWORLDIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('THEWORLD',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'THEWORLDDeath',
            frameRate: 10,
            frames:this.anims.generateFrameNames('THEWORLD',{start: 4,end: 10})
        });
        
        
        
        
        //Animation moves
        this.anims.create({
            key: 'slashAnimation',
            frameRate: 30,
            frames:this.anims.generateFrameNames('slashAnimate',{start: 0,end: 7})
        });
        this.anims.create({
            key: 'healAnimation',
            frameRate: 5,
            frames:this.anims.generateFrameNames('healAnimate',{start: 0,end: 9})
        });
        this.anims.create({
            key: 'bashAnimation',
            frameRate: 12,
            frames:this.anims.generateFrameNames('bashAnimate',{start: 0,end: 5})
        });
        this.anims.create({
            key: 'superBashAnimation',
            frameRate: 10,
            frames:this.anims.generateFrameNames('superBashAnimate',{start: 0,end: 7})
        });
        this.anims.create({
            key: 'orbMove',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('selfDestruct',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'orbDestroy',
            frameRate: 10,
            frames:this.anims.generateFrameNames('selfDestruct',{start: 4,end: 7})
        });
        this.anims.create({
            key: 'healthDrainMove',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('healthDrain',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'defenseUpAnim',
            frameRate: 15,
            repeat: -1,
            frames:this.anims.generateFrameNames('defenseUp',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'attackUpAnim',
            frameRate: 15,
            repeat: -1,
            frames:this.anims.generateFrameNames('attackUp',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'reviveAnimation',
            frameRate: 12,
            frames:this.anims.generateFrameNames('reviveAnim',{start: 0,end: 12})
        });
        this.anims.create({
            key: 'mudaAnimation',
            frameRate: 20,
            repeat: -1,
            frames:this.anims.generateFrameNames('mudaAnim',{start: 0,end: 4})
        });
        this.anims.create({
            key: 'MBRAnim',
            frameRate: 10,
            frames:this.anims.generateFrameNames('magicBallRain',{start: 0,end: 6})
        });
        
        
        
        var checkWinorDefeat = this.time.addEvent({
            delay: 10,
            callback: ()=>{
                if(gameState.turn == 'player'){
                    turnButton.setFrame(0);
                }else {
                    turnButton.setFrame(1);
                }
                var allyDead = 0;
                var enemyDead = 0;
                for(var i = 0; i < gameState.allies.length; i++){
                    if(gameState.allies[i] && gameState.allies[i].health <= 0){
                        allyDead++;
                    }
                }
                for(var i = 0; i < gameState.enemies.length; i++){
                    if(gameState.enemies[i] && gameState.enemies[i].health <= 0){
                        enemyDead++;
                    }
                }
                if(allyDead == gameState.allies.length || enemyDead == gameState.enemies.length){
                    gameState.moveIcon1.destroy();
                    gameState.moveIcon2.destroy();
                    gameState.moveIcon3.destroy();
                    turnButton.destroy();
                }
                if(allyDead == gameState.allies.length){
                    checkWinorDefeat.destroy();
                    this.time.addEvent({
                        delay: 2500,
                        callback: ()=>{
                            this.scene.stop('GameScene');
                            this.scene.start('MenuScene');
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }
                else if(enemyDead == gameState.enemies.length){
                    checkWinorDefeat.destroy();
                    gameState.thingsToSave.level++;
                    gameState.save();
                    this.time.addEvent({
                        delay: 2500,
                        callback: ()=>{
                            this.scene.stop('GameScene');
                            this.scene.start('MenuScene');
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
        
        
        
        
        gameState.barriers = this.physics.add.group();
        gameState.barriers.create(-600,0,'sidebarrier').setOrigin(0,0).setImmovable();
        
        
        
        
        gameState.moveIcon1 = this.add.sprite(540,550,'emptyIcon').setInteractive();
        gameState.moveIcon2 = this.add.sprite(600,550,'emptyIcon').setInteractive();
        gameState.moveIcon3 = this.add.sprite(660,550,'emptyIcon').setInteractive();
        gameState.moveIcon1.on('pointerdown', function(pointer){
            if(gameState.selectedHero.moved == 0 && gameState.selectedHero.moves[0]){
                gameState.selectedMove = gameState.selectedHero.moves[0];
                gameState.selectedHero.move1Countdown = gameState.selectedHero.moves[0].countdown;
                if(gameState.selectedHero.moves[0].type == "self"){
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.attacking = false;
                    gameState.selectedHero.moves[0].action(scene,gameState.selectedHero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(gameState.selectedHero.moves[0].type == "enemy"){
                    gameState.attacking = true;
                }
                if(gameState.selectedHero.moves[0].type == "ally"){
                    gameState.attacking = true;
                }
            }
        });
        gameState.moveIcon2.on('pointerdown', function(pointer){
            if(gameState.selectedHero.moved == 0 && gameState.selectedHero.moves[1]){
                gameState.selectedMove = gameState.selectedHero.moves[1];
                gameState.selectedHero.move2Countdown = gameState.selectedHero.moves[1].countdown;
                if(gameState.selectedHero.moves[1].type == "self"){
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.attacking = false;
                    gameState.selectedHero.moves[1].action(scene,gameState.selectedHero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(gameState.selectedHero.moves[1].type == "enemy"){
                    gameState.attacking = true;
                }
                if(gameState.selectedHero.moves[1].type == "ally"){
                    gameState.attacking = true;
                }
            }
        });
        gameState.moveIcon3.on('pointerdown', function(pointer){
            if(gameState.selectedHero.moved == 0 && gameState.selectedHero.moves[2]){
                gameState.selectedMove = gameState.selectedHero.moves[2];
                gameState.selectedHero.move3Countdown = gameState.selectedHero.moves[2].countdown;
                if(gameState.selectedHero.moves[2].type == "self"){
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.attacking = false;
                    gameState.selectedHero.moves[2].action(scene,gameState.selectedHero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(gameState.selectedHero.moves[2].type == "enemy"){
                    gameState.attacking = true;
                }
                if(gameState.selectedHero.moves[2].type == "ally"){
                    gameState.attacking = true;
                }
            }
        });
        
        
        
        
        if(gameState.thingsToSave.level == 1){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.orcStats,'enemy');
        }else if(gameState.thingsToSave.level == 2){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.mageStats,'ally');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcStats,'enemy');
        }else if(gameState.thingsToSave.level == 3){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.mageStats,'ally');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcShamanStats,'enemy');
        }else if(gameState.thingsToSave.level == 4){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.mageStats,'ally');
            gameState.createHero(this,gameState.archerStats,'ally');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcShamanStats,'enemy');
            gameState.createHero(this,gameState.orcShamanStats,'enemy');
        }else if(gameState.thingsToSave.level == 5){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.mageStats,'ally');
            gameState.createHero(this,gameState.archerStats,'ally');
            gameState.createHero(this,gameState.wizardStats,'ally');
            gameState.createHero(this,gameState.orcStats,'enemy');
            gameState.createHero(this,gameState.orcBossStats,'enemy');
            gameState.createHero(this,gameState.orcShamanStats,'enemy');
            gameState.createHero(this,gameState.orcStats,'enemy');
        }else if(gameState.thingsToSave.level == 6){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.mageStats,'ally');
            gameState.createHero(this,gameState.wizardStats,'ally');
            gameState.createHero(this,gameState.archerStats,'ally');
            gameState.createHero(this,gameState.trollStats,'enemy');
            gameState.createHero(this,gameState.trollStats,'enemy');
            gameState.createHero(this,gameState.trollStats,'enemy');
            gameState.createHero(this,gameState.trollStats,'enemy');
        }
        else if(gameState.thingsToSave.level >= 7){
            gameState.createHero(this,gameState.soldierStats,'ally');
            gameState.createHero(this,gameState.mageStats,'ally');
            gameState.createHero(this,gameState.wizardStats,'ally');
            gameState.createHero(this,gameState.archerStats,'ally');
            gameState.enemies[0] = null;
            gameState.createHero(this,gameState.theWorldStats,'enemy');
        }
        
        gameState.createSlots(this);
        
        
        
        
        /*
        gameState.Sbutton.on('pointerout', function(pointer){
            gameState.Sbutton.setFrame(0);
        });*/
        
        
    }
    update(){
        
    }
}
