class ShopScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ShopScene' })
	}
    preload(){
        this.load.image('menubg','tf2arenaimages/menubg.png');
        this.load.image('back','tf2arenaimages/back.png');
    }
    create() {
        this.add.image(0,0,'menubg').setOrigin(0,0);
        var back = this.add.image(20,450,'back').setOrigin(0,0).setInteractive();
        back.on('pointerup', () => {
            this.scene.stop("ShopScene");
            this.scene.start("MenuScene");
		});
	}
    update(){
        
    }
}