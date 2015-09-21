module Itsis {

    export class Loaderjeu extends Phaser.State {


        preload() {

            //Json scenery declaration
            this.game.load.json('scenery', 'assets/scenery/scenery.json');
            this.game.load.json('characters', 'assets/characters/characters.json');
            this.game.load.json('persogui', 'assets/gui/perso.json');

            //Json level data
            this.game.load.json('level', 'assets/maps/level_1.json');

        }

        create() {

            this.game.state.start('Jeu', true, false);

        }

    }

}
