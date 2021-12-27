class PauseScene extends Phaser.Scene {
    constructor() {
		super({ key: 'PauseScene' })
	}
    preload(){
        
    }
    create() {
        this.scene.bringToTop();
        var back = this.add.image(window.innerWidth-75,10,'pauseSign').setOrigin(0,0).setInteractive();
        this.add.image(window.innerWidth/2,window.innerHeight/2,'paused');
        var scene = this;
        var paused = false;
        back.on('pointerup', () => {
            if(paused == false){
                paused = true;
            }
            else {
                scene.scene.stop("PauseScene");
                scene.scene.resume("ArenaScene");
            }
		});
	}
    update(){
        
    }
}