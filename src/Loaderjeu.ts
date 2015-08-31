module Itsis {

    export class Loaderjeu extends Phaser.State {


        preload() {

            //  Set-up our preloader sprite
              this.game.load.json('level_1', 'assets/maps/level_1.json');

        }

        create() {

          this.game.state.start('Jeu', true, false);


        }

    }

}
