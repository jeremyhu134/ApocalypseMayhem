class ChooseHeroScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ChooseHeroScene' })
	}
    preload(){
        //this.load.image('menubg','tf2arenaimages/menubg.png');
        
        //this.load.spritesheet('redscout','tf2arenaimages/redscout.png',{frameWidth: 33,frameHeight:53});
    }
    create(){
        
    }
    update(){
        
    }
}

class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        
    }
    create(){
        gameState.globalScene = this;
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0);
        bg.anims.play('bganimate','true');
        gameState.character = this.physics.add.sprite(window.innerWidth/2-16,window.innerHeight/2+16,'character');
        gameState.character.body.width = 50;
        
        /*this.physics.add.collider(gameState.player, gameState.barriers,(hero,barrier)=>{
            
        });*/
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        //this.input.mouse.disableContextMenu();
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC');
        gameState.bullets = this.physics.add.group();
        gameState.zombies = this.physics.add.group();
        gameState.creatHealthBar(this);
       
        this.physics.add.collider(gameState.character, gameState.buildings);
        gameState.spawnZombies = this.time.addEvent({
            delay: 1200,
            callback: ()=>{
                gameState.createZombie(this,Math.ceil(Math.random()*window.innerWidth),Math.ceil(Math.random()*window.innerHeight));
            },
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        //this.physics.add.overlap(gameState.blueprint, gameState.buildings)
    }
    update(){
        gameState.chracterControls(this,gameState.character,gameState.characterStats);
    }
}