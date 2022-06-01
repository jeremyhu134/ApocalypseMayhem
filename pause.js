class PauseScene extends Phaser.Scene {
    constructor() {
		super({ key: 'PauseScene' })
	}
    preload(){
        
    }
    create() {
        this.scene.bringToTop();
        gameState.save();
        this.add.image(window.innerWidth/2,window.innerHeight/2,'pauseMenu');
        var scene = this;
        
        var back = this.add.image(window.innerWidth-75,10,'backButton').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            scene.scene.stop("PauseScene");
            scene.scene.resume(`${gameState.currentScene}`);
		});
        
        var mainMenu = this.add.image(window.innerWidth/2,window.innerHeight/2+200,'pauseMainMenuButton').setInteractive();
        mainMenu.on('pointerup', () => {
            scene.scene.stop(`${gameState.currentScene}`);
            scene.scene.stop("PauseScene");
            scene.scene.start("MenuScene");
		});
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
        gameState.save();
        this.add.image(window.innerWidth/2,window.innerHeight/2,'deathMenu');
        var scene = this;
        
        var mainMenu = this.add.image(window.innerWidth/2,window.innerHeight/2+200,'pauseMainMenuButton').setInteractive();
        mainMenu.on('pointerup', () => {
            scene.scene.stop(`${gameState.currentScene}`);
            scene.scene.stop("DeathScene");
            scene.scene.start("MenuScene");
		});
	}
    update(){
        
    }
}