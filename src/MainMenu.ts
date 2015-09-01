module Itsis {

    export class MainMenu extends Phaser.State {

        create() {
            //Background
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;

            this.add.tween(background).to({ alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);

            //Title
            var itsisTextStyle = {
              font: "bold 72px Arial",
              fill: "#f00",
              align: "center"
            }
            var itsisText = this.game.add.text(this.game.world.centerX, this.game.height/10, "ITSIS\nIT Services Industry Simulator", itsisTextStyle);
            itsisText.anchor.set(0.5);

            //Buttons
            var buttonTextStyle = {
              font:"32px Arial",
              fill: "#f00"
            }

            var playButton = this.game.add.button(this.game.world.centerX, 5*this.game.height/10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            playButton.anchor.set(0.5);
            var playButtonText = this.game.add.text(this.game.world.centerX, 5*this.game.height/10, "Jouer", buttonTextStyle);
            playButtonText.anchor.set(0.5);

            var creditsButton = this.game.add.button(this.game.world.centerX, 6*this.game.height/10, 'mainmenu_button', this.startCredits, this, 'over', 'out', 'down');
            creditsButton.anchor.set(0.5);
            var creditsButtonText = this.game.add.text(this.game.world.centerX, 6*this.game.height/10, "Credits", buttonTextStyle);
            creditsButtonText.anchor.set(0.5);

        }

        startCredits(){
            this.game.state.start("Credits", true, false);
        }

        startPlay(){
            this.game.state.start("PlayInOpenSpace", true, false);
        }
    }

}
