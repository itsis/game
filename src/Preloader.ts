module Itsis {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(0,0, 'preloadBar');
            this.preloadBar.x = this.game.world.centerX - this.preloadBar.texture.width/2;
            this.preloadBar.y = this.game.world.centerY - this.preloadBar.texture.height/2;

            this.load.setPreloadSprite(this.preloadBar);

            //  Load our assets
            this.load.image('mainmenu_background', 'assets/images/mainmenu_background.jpg');
            this.game.load.atlas('mainmenu_button', 'assets/buttons/mainmenu_button.png', 'assets/buttons/mainmenu_button.json');
        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}
