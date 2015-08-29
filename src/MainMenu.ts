module Itsis {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite;
        creditsbutton : Phaser.Button;

        create() {

            this.background = this.add.sprite(0, 0, 'mainmenu_background');
            this.background.alpha = 0;

            this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);

            this.creditsbutton = this.game.add.button(0, 500, 'mainmenu_buttoncredits', this.credits);
            this.creditsbutton.x = this.game.world.centerX - this.creditsbutton.texture.width/2;
        }

        credits(){

        }
    }

}
