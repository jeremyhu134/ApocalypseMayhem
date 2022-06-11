class PauseScene extends Phaser.Scene {
    constructor() {
		super({ key: 'PauseScene' })
	}
    preload(){
        
    }
    create() {
        this.scene.bringToTop();
        this.add.image(window.innerWidth/2,window.innerHeight/2,'pauseMenu');
        var scene = this;
        
        var back = this.add.image(window.innerWidth-75,10,'backButton').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            gameState.save();
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
        
        var mainMenu = this.add.image(window.innerWidth/2,window.innerHeight/2+200,'pauseMainMenuButton').setInteractive();
        mainMenu.on('pointerup', () => {
            scene.scene.stop(`${gameState.currentScene}`);
            scene.scene.stop("PauseScene");
            scene.scene.start("MenuScene");
		});
        if(gameState.kills> gameState.highestKills){
            gameState.highestKills = gameState.kills;
        }
        var highestKills = this.add.text(window.innerWidth/2-90, window.innerHeight/2+105, `${gameState.highestKills}`, {
            fill: 'WHITE', 
            fontSize: `30px`,
            fontFamily: 'Qahiri',
            strokeThickness: 4,
        }).setDepth(window.innerHeight+3);
        gameState.save();
	}
    update(){
        
    }
}




class UnlockScene extends Phaser.Scene {
    constructor() {
		super({ key: 'UnlockScene' })
	}
    preload(){
        
    }
    create() {
        this.scene.bringToTop();
        if(gameState.kills >= 500 && gameState.weaponSkins.SkeletonGun.owned == 0){
            gameState.weaponSkins.SkeletonGun.owned = 1;
            gameState.createUnlocked(this,'characterSkeletonGun');
        }
	}
    update(){
        
    }
}




class DeathScene extends Phaser.Scene {
    constructor() {
		super({ key: 'DeathScene' })
	}
    preload(){
        
    }
    create() {
        this.scene.bringToTop();
        this.add.image(window.innerWidth/2,window.innerHeight/2,'deathMenu');
        var scene = this;
        if(gameState.kills> gameState.highestKills){
            gameState.highestKills = gameState.kills;
        }
        var mainMenu = this.add.image(window.innerWidth/2,window.innerHeight/2+200,'pauseMainMenuButton').setInteractive();
        mainMenu.on('pointerup', () => {
            scene.scene.stop(`${gameState.currentScene}`);
            scene.scene.stop("DeathScene");
            scene.scene.start("MenuScene");
		});
        gameState.save();
	}
    update(){
        
    }
}