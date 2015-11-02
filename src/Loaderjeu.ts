module Itsis {

    export class Loaderjeu extends Phaser.State {


        preload() {

            //Json scenery declaration
            this.game.load.json('scenery', 'assets/scenery/scenery.json');
<<<<<<< HEAD
=======
            this.game.load.json('characters', 'assets/characters/characters.json');
            this.game.load.json('persogui', 'assets/gui/perso.json');
            // this.game.load.json('wingui', 'assets/gui/winpopup.json');
>>>>>>> afc5112008273b31f681c35aafb44bc1345e3ac4

            //Json level data
            this.game.load.json('level', 'assets/maps/level_1.json');

        }

        create() {

            this.game.state.start('Jeu', true, false);

        }

    }

}
