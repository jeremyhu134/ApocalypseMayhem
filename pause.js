//pause screen subclass
class PauseScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'PauseScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create() {
        //makes it so pause screen covers the game screen
        this.scene.bringToTop();
        //adds image of the pause menu
        this.add.image(window.innerWidth/2,window.innerHeight/2,'pauseMenu');
        //references class so it can be used during the local functions
        var scene = this;
        
        //back button that unpaused game and resets keys current input
        var back = this.add.image(window.innerWidth-75,10,'backButton').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            //gameState.save();
            if(gameState.currentScene == "ArenaScene"){
                gameState.keys.W.isDown = false;
                gameState.keys.S.isDown = false;
                gameState.keys.A.isDown = false;
                gameState.keys.D.isDown = false;
                gameState.keys.SPACE.isDown = false;
            }
            scene.scene.stop("PauseScene");
            scene.scene.resume(`${gameState.currentScene}`);
		});
        
        //adds main menu image and button to return to main menu
        var mainMenu = this.add.image(window.innerWidth/2,window.innerHeight/2+200,'pauseMainMenuButton').setInteractive();
        mainMenu.on('pointerup', () => {
            scene.scene.stop(`${gameState.currentScene}`);
            scene.scene.stop("PauseScene");
            scene.scene.start("MenuScene");
		});
        // sets the highscore kills if player beats the highest kills
        if(gameState.kills> gameState.highestKills){
            gameState.highestKills = gameState.kills;
        }
        //prints the highest kills on the pause menu
        var highestKills = this.add.text(window.innerWidth/2-90, window.innerHeight/2+105, `${gameState.highestKills}`, {
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        //save stats whenever paused
        //gameState.save();
	}
    update(){
        //game loop that constantly runs (not needed for pause)
    }
}



//unlock scene subclass
class UnlockScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'UnlockScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create() {
        this.scene.bringToTop();
        if(gameState.kills >= 500 && gameState.weaponSkins.SkeletonGun.owned == 0){
            gameState.weaponSkins.SkeletonGun.owned = 1;
            gameState.createUnlocked(this,'characterSkeletonGun');
        }
	}
    update(){
        //game loop that constantly runs (not needed for unlocking items)
    }
}



//subclass death scene 
class DeathScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'DeathScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create() {
        this.scene.bringToTop();
        gameState.deathMusic.play(gameState.loopSound);
        this.add.image(window.innerWidth/2,window.innerHeight/2,'deathMenu');
        var scene = this;
        if(gameState.kills> gameState.highestKills){
            gameState.highestKills = gameState.kills;
        }
        var mainMenu = this.add.image(window.innerWidth/2,window.innerHeight/2+200,'pauseMainMenuButton').setInteractive();
        mainMenu.on('pointerup', () => {
            gameState.deathMusic.setMute(true);
            scene.scene.stop(`${gameState.currentScene}`);
            scene.scene.stop("DeathScene");
            scene.scene.start("MenuScene");
		});
        //gameState.save();
	}
    update(){
        //game loop that constantly runs (not needed for death screen)
    }
}