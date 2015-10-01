module Itsis {

    export class Boot extends Phaser.State {

        preload() {

            this.load.image('preloadBar', 'assets/images/preloader_progressbar.png');
            this.load.image('problem', 'assets/images/headache-32.png');
            this.game.load.json('guiobj', 'assets/gui/guiobj.json');
            this.game.load.json('missions', 'assets/missions/mission.json');

        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            let gameWidth:number = 1600;
            let gameHeight:number = 900;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.maxWidth = gameWidth;
                this.game.scale.maxHeight = gameHeight;
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            }
            else {
                //  Same goes for mobile settings.
            }

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);

        }
    }

}
