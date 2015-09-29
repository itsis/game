module Itsis {

    export class ItsisGame extends Phaser.Game {

        constructor() {

            super(1600, 900, Phaser.AUTO, 'content', null);

            // Main Menu
            this.state.add('Boot', Boot, true);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('ChooseMission', ChooseMission, false);
            this.state.add("Credits", Credits, false);
            this.state.add("EndMission", EndMission, false);

            // Actual game
            this.state.add("Loaderjeu", Loaderjeu, false);
            this.state.add("Jeu", Jeu, false);

        }

    }

}
