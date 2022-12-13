const config = {
    type: Phaser.AUTO,
    width : 1200,
    height: 650,
    backgroundColor: "#C0C0C0",
    audio: {
        disableWebAudio: true
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            enableBody: true
            //debug: true
        }
    },
    scene:[MenuScene, SkirmishScene,GameScene],
    scale: {
        zoom: 1
    }
};

const game = new Phaser.Game(config);
let gameState = {
    
    thingsToSave: {
        level: 1
    },
    
    
    turn: "player",
    selectedHero: null,
    selectedMove: null,
    attacking: false,
    allies:[],
    enemies:[],
    
    save: function(){
        window.localStorage.setItem("thingsToSave", JSON.stringify(gameState.thingsToSave));
    },
    //loads variable values from localstorage
    loadSave: function(){
        if(JSON.parse(window.localStorage.getItem("thingsToSave")) !== null){
            gameState.thingsToSave = JSON.parse(window.localStorage.getItem("thingsToSave"));
        }
    },
    
    
    
    info: {
        name: null,
        health: null,
        createInfo: function(scene){
            gameState.info.name = scene.add.text(40, 25, ``, {
                fill: '#ADD8E6', 
                fontSize: `${50}px`,
                fontFamily: 'Qahiri',
                strokeThickness: 5,
            }).setDepth(1);
            gameState.info.health = scene.add.text(700, 25, ``, {
                fill: '#ADD8E6', 
                fontSize: `${50}px`,
                fontFamily: 'Qahiri',
                strokeThickness: 5,
            }).setDepth(1);
            scene.time.addEvent({
                delay: 1,
                callback: ()=>{
                    if(gameState.selectedHero !== '' && gameState.selectedHero !== null ){
                        gameState.info.name.setFill('#ADD8E6');
                        gameState.info.health.setFill('#ADD8E6');
                        gameState.info.name.setText(gameState.selectedHero.stats.name);
                        gameState.info.health.setText(`${Math.ceil(gameState.selectedHero.health)}/${gameState.selectedHero.maxHp}`);
                        
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            });
        }
    },
    
    createHero: function(scene,stats,status){
        var character = scene.physics.add.sprite(0,0,`${stats.sprite}`).setDepth(0).setScale(1).setInteractive();
        
        character.sprite = stats.sprite;
        character.level = stats.level;
        character.health = Math.ceil(stats.health+((character.level-1)*1.3));
        character.defense = stats.defense;
        character.moved = 0;
        character.moves = stats.moves.splice();
        character.move1Countdown = 0;
        character.move2Countdown = 0;
        character.move3Countdown = 0;
        character.maxHp = Math.ceil(stats.health+((character.level-1)*1.3));
        character.stats = stats;
        character.attackBoost = 0;
        function create(hero){
            gameState.createHealthBar(scene,hero,hero.maxHp);
            stats.integrateMoves(hero);
            if(status == 'ally'){
                gameState.allies.push(hero);
            }else if(status == 'enemy'){``
                gameState.enemies.push(hero);
            }
            hero.anims.play(`${hero.sprite}Idle`,true);
            hero.on('pointerdown', function(pointer){
                if(status == 'ally' && hero.moved == 0 && gameState.attacking == false && gameState.turn == 'player' && hero.health > 0){
                    
                    gameState.selectedMove = '';
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                    gameState.selectedHero = hero;
                    if(hero.moves[0] && hero.move1Countdown == 0){
                        gameState.moveIcon1.setTexture(`${hero.moves[0].sprite}Icon`);
                    }if(hero.moves[1] && hero.move2Countdown == 0){
                        gameState.moveIcon2.setTexture(`${hero.moves[1].sprite}Icon`);
                    }if(hero.moves[2] && hero.move3Countdown == 0){
                        gameState.moveIcon3.setTexture(`${hero.moves[2].sprite}Icon`);
                    }
                }else if(status == 'enemy'&& gameState.attacking == false && gameState.turn == 'player' && hero.health > 0){
                    gameState.selectedHero = '';
                    gameState.info.name.setFill('#880808');
                    gameState.info.health.setFill('#880808');
                    gameState.info.name.setText(hero.stats.name);
                    gameState.info.health.setText(`${Math.ceil(hero.health)}/${hero.maxHp}`);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                    gameState.selectedMove = '';
                }else if(status == 'enemy' && gameState.attacking == true && gameState.selectedMove.type == 'enemy' && hero.health > 0){
                    gameState.attacking = false;
                    gameState.selectedMove.action(scene,gameState.selectedHero,hero);
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                    gameState.selectedMove = '';
                }else if(status == 'ally' && gameState.attacking == true && gameState.selectedMove.type == 'ally'){
                    gameState.selectedMove.action(scene,gameState.selectedHero,hero);
                    gameState.attacking = false;
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                    gameState.selectedMove = '';
                }
            });
        }
        create(character);
    },
    
    selectedMove: '',
    
    slotsCoord: {
        ally:{
            slot1:{
                x: 175,
                y: 200
            },
            slot2:{
                x: 225,
                y: 325
            },
            slot3:{
                x: 175,
                y: 450
            },
            slot4:{
                x: 100,
                y: 325
            }
        },
        enemy:{
            slot1:{
                x: 1200-175,
                y: 200
            },
            slot2:{
                x: 1200-225,
                y: 325
            },
            slot3:{
                x: 1200-175,
                y: 450
            },
            slot4:{
                x: 1200-100,
                y: 325
            }
        }
    },
    createSlots: function(scene){
        if(gameState.allies[0]){
            gameState.allies[0].x = gameState.slotsCoord.ally.slot1.x;
            gameState.allies[0].y = gameState.slotsCoord.ally.slot1.y;
            gameState.target1 = scene.add.sprite(gameState.slotsCoord.ally.slot1.x,gameState.slotsCoord.ally.slot1.y,'target').setScale(2);
        }if(gameState.allies[1]){
            gameState.allies[1].x = gameState.slotsCoord.ally.slot2.x;
            gameState.allies[1].y = gameState.slotsCoord.ally.slot2.y;
            gameState.target2 = scene.add.sprite(gameState.slotsCoord.ally.slot2.x,gameState.slotsCoord.ally.slot2.y,'target').setScale(2);
        }if(gameState.allies[2]){
            gameState.allies[2].x = gameState.slotsCoord.ally.slot3.x;
            gameState.allies[2].y = gameState.slotsCoord.ally.slot3.y;
            gameState.target3 = scene.add.sprite(gameState.slotsCoord.ally.slot3.x,gameState.slotsCoord.ally.slot3.y,'target').setScale(2);
        }if(gameState.allies[3]){
            gameState.allies[3].x = gameState.slotsCoord.ally.slot4.x;
            gameState.allies[3].y = gameState.slotsCoord.ally.slot4.y;
            gameState.target4 = scene.add.sprite(gameState.slotsCoord.ally.slot4.x,gameState.slotsCoord.ally.slot4.y,'target').setScale(2);
        }if(gameState.enemies[0]){
            gameState.enemies[0].flipX = true;
            gameState.enemies[0].x = gameState.slotsCoord.enemy.slot1.x;
            gameState.enemies[0].y = gameState.slotsCoord.enemy.slot1.y;
            gameState.target5 = scene.add.sprite(gameState.slotsCoord.enemy.slot1.x,gameState.slotsCoord.enemy.slot1.y,'target').setScale(2);
        }if(gameState.enemies[1]){
            gameState.enemies[1].flipX = true;
            gameState.enemies[1].x = gameState.slotsCoord.enemy.slot2.x;
            gameState.enemies[1].y = gameState.slotsCoord.enemy.slot2.y;
            gameState.target6 = scene.add.sprite(gameState.slotsCoord.enemy.slot2.x,gameState.slotsCoord.enemy.slot2.y,'target').setScale(2);
        }if(gameState.enemies[2]){
            gameState.enemies[2].flipX = true;
            gameState.enemies[2].x = gameState.slotsCoord.enemy.slot3.x;
            gameState.enemies[2].y = gameState.slotsCoord.enemy.slot3.y;
            gameState.target7 = scene.add.sprite(gameState.slotsCoord.enemy.slot3.x,gameState.slotsCoord.enemy.slot3.y,'target').setScale(2);
        }if(gameState.enemies[3]){
            gameState.enemies[3].flipX = true;
            gameState.enemies[3].x = gameState.slotsCoord.enemy.slot4.x;
            gameState.enemies[3].y = gameState.slotsCoord.enemy.slot4.y;
            gameState.target8 = scene.add.sprite(gameState.slotsCoord.enemy.slot4.x,gameState.slotsCoord.enemy.slot4.y,'target').setScale(2);
        }
    },
    
    moves:{
        slash:{
            name: "Slash",
            sprite: 'slash',
            description: "Basic sword attack",
            type: 'enemy',
            countdown: 0,
            damage:{
                high: 9,
                low: 6
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.slash.damage.high-gameState.moves.slash.damage.low))+gameState.moves.slash.damage.low)-target.defense+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                target.health -= rand;
                var slash = scene.add.sprite(target.x,target.y,'slashAnimate').setScale(2);
                slash.anims.play('slashAnimation',true);
            }
        },
        harden:{
            name: "Harden",
            sprite: 'harden',
            description: "Increases Defense",
            type: 'self',
            countdown: 0,
            action: function(scene,user,target){
                user.defense += 1;
                var def = scene.add.sprite(user.x+50,user.y-40,'defenseUp').setScale(0.8);
                def.anims.play('defenseUpAnim',true);
                scene.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        def.destroy();
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        },
        sharpen:{
            name: "Sharpen",
            sprite: 'sharpen',
            description: "Increases Defense",
            type: 'self',
            countdown: 0,
            action: function(scene,user,target){
                user.attackBoost += 1;
                var attck = scene.add.sprite(user.x+50,user.y-40,'attackUp').setScale(0.8);
                attck.anims.play('attackUpAnim',true);
                scene.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        attck.destroy();
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        },
        heal:{
            name: "Heal",
            sprite: 'heal',
            description: "Heals hero or an ally",
            type: 'ally',
            countdown: 0,
            action: function(scene,user,target){
                target.health += Math.ceil(12+(1.3*(user.level-1)));
                var heal = scene.add.sprite(target.x,target.y,'healAnimate').setScale(2);
                heal.anims.play('healAnimation',true);
            }
        },
        bash:{
            name: "Bash",
            sprite: 'bash',
            description: "Basic smash attack",
            type: 'enemy',
            countdown: 0,
            damage:{
                high: 9,
                low: 4
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.bash.damage.high-gameState.moves.bash.damage.low))+gameState.moves.bash.damage.low)-target.defense+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                target.health -= rand;
                var bash = scene.add.sprite(target.x,target.y,'bashAnimate').setScale(2);
                bash.anims.play('bashAnimation',true);
            }
        },
        superBash:{
            name: "Super Bash",
            sprite: 'superBash',
            description: "Basic smash attack",
            type: 'enemy',
            countdown: 2,
            damage:{
                high: 29,
                low: 9
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.superBash.damage.high-gameState.moves.superBash.damage.low))+gameState.moves.superBash.damage.low)-target.defense+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                target.health -= rand;
                var superBash = scene.add.sprite(target.x,target.y,'superBashAnimate').setScale(2);
                superBash.anims.play('superBashAnimation',true);
            }
        },
        spearThrow:{
            name: "Spear Throw",
            sprite: 'spearThrow',
            description: "Heavy ranged attack",
            type: 'enemy',
            countdown: 0,
            damage:{
                high: 13,
                low: 8
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.spearThrow.damage.high-gameState.moves.spearThrow.damage.low))+gameState.moves.spearThrow.damage.low)-target.defense+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                
                var spear = scene.physics.add.sprite(user.x - 25, user.y+10,'spear').setDepth(1).setScale(1.5);
                 gameState.angle=Phaser.Math.Angle.Between(spear.x,spear.y,target.x,target.y);
                spear.setRotation(gameState.angle); 
                scene.physics.moveToObject(spear,target,1000);

                scene.physics.add.overlap(spear, target,(spearT, userT)=>{
                    spearT.destroy();
                    target.health -= rand;
                });
            }
        },
        arrowShot:{
            name: "Dead Eye",
            sprite: 'arrowShot',
            description: "single shot attack",
            type: 'enemy',
            countdown: 2,
            damage:{
                high: 15,
                low: 10
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.arrowShot.damage.high-gameState.moves.arrowShot.damage.low))+gameState.moves.arrowShot.damage.low)-target.defense+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                
                var spear = scene.physics.add.sprite(user.x - 25, user.y+10,'arrow').setDepth(1).setScale(1);
                 gameState.angle=Phaser.Math.Angle.Between(spear.x,spear.y,target.x,target.y);
                spear.setRotation(gameState.angle); 
                scene.physics.moveToObject(spear,target,1200);

                scene.physics.add.overlap(spear, target,(spearT, userT)=>{
                    spearT.destroy();
                    target.health -= rand;
                });
            }
        },
        revive:{
            name: "Revive",
            sprite: 'revive',
            description: "Revives a fallen ally",
            type: 'ally',
            countdown: 5,
            action: function(scene,user,target){
                if(user != target && target.health <= 0){
                    target.health = target.maxHp/2;
                    gameState.createHealthBar(scene,target,target.maxHp);
                    target.anims.play(`${target.sprite}Idle`);
                    var rev = scene.add.sprite(Math.ceil(target.x),Math.ceil(target.y),'reviveAnim').setDepth(1).setScale(target.body.height/32);
                    rev.anims.play('reviveAnimation',true);
                }
            }
        },
        drain:{
            name: "Drain",
            sprite: 'drain',
            description: "Steals enemy's health",
            type: 'enemy',
            countdown: 0,
            damage:{
                high: 6,
                low: 5
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.drain.damage.high-gameState.moves.drain.damage.low))+gameState.moves.drain.damage.low)-target.defense;
                if(rand < 0){
                    rand = 0;
                }
                scene.time.addEvent({
                    delay: 90,
                    callback: ()=>{
                        target.health -= rand/10;
                        var ray = scene.physics.add.sprite(target.x - 25, target.y+10,'healthDrain').setDepth(0.5).setScale(1);
                         gameState.angle=Phaser.Math.Angle.Between(ray.x,ray.y,user.x,user.y);
                        ray.anims.play('healthDrainMove');
                        ray.setRotation(gameState.angle); 
                        scene.physics.moveToObject(ray,user,400);

                        scene.physics.add.overlap(ray, user,(rayT, userT)=>{
                            rayT.destroy();
                            user.health += Math.ceil(rand*1.5/10);
                        });
                    },  
                    startAt: 0,
                    timeScale: 1,
                    repeat: 10
                });
            }
        },
        magicRay:{
            name: "Magic Ray",
            sprite: 'magicRay',
            description: "Heavy damage attack that ignores defense points",
            type: 'enemy',
            countdown: 2,
            damage:{
                high: 30,
                low: 20
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.magicRay.damage.high-gameState.moves.magicRay.damage.low))+gameState.moves.magicRay.damage.low)+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                
                scene.time.addEvent({
                    delay: 10,
                    callback: ()=>{

                        var ray = scene.physics.add.sprite(user.x - 25, user.y+10,'ray').setDepth(0.5).setScale(0.5);
                         gameState.angle=Phaser.Math.Angle.Between(ray.x,ray.y,target.x,target.y);
                        ray.setRotation(gameState.angle); 
                        scene.physics.moveToObject(ray,target,1000);

                        scene.physics.add.overlap(ray, target,(rayT, targetT)=>{
                            rayT.destroy();
                            target.health -= rand/100;
                        });
                    },  
                    startAt: 0,
                    timeScale: 1,
                    repeat: 100
                });
            }
        },
        selfDestruct:{
            name: "self Destruct",
            sprite: 'selfDestruct',
            description: "Kills the user but deals heavy damage to a single enemy",
            type: 'enemy',
            countdown: 10,
            damage:{
                high: 60,
                low: 25
            },
            action: function(scene,user,target){
                user.health = 0;
                var hit = 0;
                var rand = (Math.ceil(Math.random()*(gameState.moves.selfDestruct.damage.high-gameState.moves.selfDestruct.damage.low))+gameState.moves.selfDestruct.damage.low)-target.defense;
                if(rand < 0){
                    rand = 0;
                }
                var ray = scene.physics.add.sprite(user.x - 25, user.y+10,'selfDestruct').setDepth(0.5).setScale(1.5);
                 gameState.angle=Phaser.Math.Angle.Between(ray.x,ray.y,target.x,target.y);
                ray.setRotation(gameState.angle); 
                scene.physics.moveToObject(ray,target,600);
                ray.anims.play('orbMove',true);
                scene.physics.add.overlap(ray, target,(rayT, targetT)=>{
                    if(hit == 0){
                        rayT.anims.play('orbDestroy',true);
                        rayT.body.velocity.x = 0;
                        rayT.body.velocity.y = 0;
                        target.health -= rand;
                        scene.time.addEvent({
                            delay: 500,
                            callback: ()=>{
                                rayT.destroy();
                            },  
                            startAt: 0,
                            timeScale: 1
                        });
                        hit = 1;
                    }
                });
            }
        },
        plasmaShower:{
            name: "Plasma Shower",
            sprite: 'plasmaShower',
            description: "Splash attack that hits all enemies",
            type: 'enemy',
            countdown: 4,
            damage:{
                high: 12,
                low: 8
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.plasmaShower.damage.high-gameState.moves.plasmaShower.damage.low))+gameState.moves.plasmaShower.damage.low)+user.attackBoost;
                if(rand < 0){
                    rand = 0;
                }
                if(gameState.enemies[0]){
                   gameState.enemies[0].health -= rand; 
                }if(gameState.enemies[1]){
                    gameState.enemies[1].health -= rand;
                }if(gameState.enemies[2]){
                    gameState.enemies[2].health -= rand;
                }if(gameState.enemies[3]){
                    gameState.enemies[3].health -= rand;
                }
                
                var shower = scene.physics.add.sprite(1200-175, 325,'magicBallRain').setDepth(2).setScale(10);
                shower.anims.play('MBRAnim');
            }
        },
        muda:{
            name: "Futile Punches",
            sprite: 'muda',
            description: "MUDA MUDA MUDA MUDAAAAAAAAAAA!!!",
            type: 'enemy',
            countdown: 0,
            damage:{
                high: 40,
                low: 25
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.muda.damage.high-gameState.moves.muda.damage.low))+gameState.moves.muda.damage.low);
                if(rand < 0){
                    rand = 0;
                }

                var muda = scene.add.sprite(target.x,target.y,'mudaAnim').setScale(1);
                muda.anims.play('mudaAnimation',true);
                scene.time.addEvent({
                    delay: 25,
                    callback: ()=>{
                        target.health -= rand/100;
                    },  
                    startAt: 0,
                    timeScale: 1,
                    repeat: 100
                });
                scene.time.addEvent({
                    delay: 2500,
                    callback: ()=>{
                        muda.destroy();
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        }
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    soldierStats:{
        name: 'Soldier',
        sprite: 'soldier',
        health: 40,
        defense: 1,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.slash);
            hero.moves.push(gameState.moves.harden);
            hero.moves.push(gameState.moves.sharpen);
        },
        computer: function(scene,hero){
            
        }
    },
    wizardStats:{
        name: 'Wizard',
        sprite: 'wizard',
        health: 35,
        defense: 0,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.magicRay);
            hero.moves.push(gameState.moves.selfDestruct);
            hero.moves.push(gameState.moves.plasmaShower);
        },
        computer: function(scene,hero){
            
        }
    },
    mageStats:{
        name: 'Mage',
        sprite: 'mage',
        health: 30,
        defense: 2,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.heal);
            hero.moves.push(gameState.moves.revive);
            hero.moves.push(gameState.moves.drain);
        },
        computer: function(scene,hero){
            
        }
    },
    archerStats:{
        name: 'Archer',
        sprite: 'archer',
        health: 40,
        defense: 1,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.arrowShot);
        },
        computer: function(scene,hero){
            
        }
    },
    
    
    
    orcStats:{
        name: 'Orc',
        sprite: 'orc',
        health: 35,
        defense: 0,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.bash);
        },
        computer: function(scene,hero){
            var rand;
            var found = false;
            while(found == false){
                rand = Math.ceil(Math.random()*gameState.allies.length)-1;
                if(gameState.allies[rand] && gameState.allies[rand].health > 0){
                    found = true;
                }
            }
            hero.moves[0].action(scene,hero,gameState.allies[rand]);
            hero.moved = 1;
        }
    },
    orcShamanStats:{
        name: 'Orc Shaman',
        sprite: 'orcShaman',
        health: 60,
        defense: 0,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.bash);
            hero.moves.push(gameState.moves.revive);
        },
        computer: function(scene,hero){
            var rev = 0;
            var res;
            for (var i = 0; i < gameState.enemies.length; i++){
                if (gameState.enemies[i] !== hero && gameState.enemies[i].health <= 0){
                    rev = 1
                    res = gameState.enemies[i];
                }
            }
            if(hero.move2Countdown <= 0 && rev == 1){
                hero.moves[1].action(scene,hero,res);
                hero.move2Countdown = hero.moves[1].countdown;
            }
            var rand;
            var found = false;
            if(rev !== 1){
                
                while(found == false){
                    rand = Math.ceil(Math.random()*gameState.allies.length)-1;
                    if(gameState.allies[rand] && gameState.allies[rand].health > 0){
                        found = true;
                    }
                }
                hero.moves[0].action(scene,hero,gameState.allies[rand]);
                hero.moved = 1;
                hero.move2Countdown --;
            }
        }
    },
    orcBossStats:{
        name: 'Gulak the Orc General',
        sprite: 'orcBoss',
        health: 100,
        defense: 0,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.superBash);
        },
        computer: function(scene,hero){
            if(hero.move1Countdown <= 0){
                var rand;
                var found = false;
                while(found == false){
                    rand = Math.ceil(Math.random()*gameState.allies.length)-1;
                    if(gameState.allies[rand] && gameState.allies[rand].health > 0){
                        found = true;
                    }
                }
                hero.moves[0].action(scene,hero,gameState.allies[rand]);
                hero.moved = 1;
                hero.move1Countdown = hero.moves[0].countdown;
            }
        }
    },
    trollStats:{
        name: 'Troll',
        sprite: 'troll',
        health: 40,
        defense: 3,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.spearThrow);
        },
        computer: function(scene,hero){
            var rand;
            var found = false;
            while(found == false){
                rand = Math.ceil(Math.random()*gameState.allies.length)-1;
                if(gameState.allies[rand] && gameState.allies[rand].health > 0){
                    found = true;
                }
            }
            hero.moves[0].action(scene,hero,gameState.allies[rand]);
            hero.moved = 1;
        }
    },
    
    
    theWorldStats:{
        name: 'The World',
        sprite: 'THEWORLD',
        health: 300,
        defense: 0,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.muda);
        },
        computer: function(scene,hero){
            var rand;
            var found = false;
            while(found == false){
                rand = Math.ceil(Math.random()*gameState.allies.length)-1;
                if(gameState.allies[rand] && gameState.allies[rand].health > 0){
                    found = true;
                }
            }
            hero.moves[0].action(scene,hero,gameState.allies[rand]);
            hero.moved = 1;
        }
    },
    
    
    createHealthBar: function(scene, object,maxHP){
        var hbBG = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0xff0000).setScale(object.body.width/100).setDepth(window.innerHeight);  
        var hb = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0x2ecc71).setScale(object.body.width/100).setDepth(window.innerHeight);
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(object.health > maxHP){
                    object.health = maxHP;
                }
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
                    object.anims.play(`${object.sprite}Death`);
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
}
