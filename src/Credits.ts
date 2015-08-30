module Itsis {

    export class Credits extends Phaser.State {

        create() {

            var creditsTextStyle = {
              font: "bold 24px Arial",
              fill: "#f00",
              align: "center"
            }

            var creditsContent = "ITSIS - IT Services Industry Simulator";
            creditsContent += "\n\nHaut Bas Gauche Droite A Start";

            var creditsText = this.game.add.text(this.game.world.centerX, 0, creditsContent, creditsTextStyle);
            creditsText.anchor.set(0.5);
            var tween = this.add.tween(creditsText).to({ y: creditsText.height/2 + this.game.height }, 10000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startMainMenu, this);
            this.input.onDown.addOnce(this.startMainMenu, this);

        }

        startMainMenu(){
            this.game.state.start("MainMenu", true, false);
        }

    }

}
