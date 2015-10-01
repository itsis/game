module Itsis {
    export class ChooseMission extends Phaser.State {
      create(){
        var background = this.add.sprite(0, 0, 'mainmenu_background');
        background.alpha = 0;

        this.add.tween(background).to({ alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);

        //Title
        var itsisTextStyle = {
          font: "bold 72px Arial",
          fill: "#00f",
          align: "center"
        }
        var itsisText = this.game.add.text(this.game.world.centerX, this.game.height/10, "Choose your mission", itsisTextStyle);
        itsisText.anchor.set(0.5);

        //Buttons
        var buttonTextStyle = {
          font:"32px Arial",
          fill: "#f00"
        }

        var playButton = this.game.add.button(this.game.world.centerX, 5*this.game.height/10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
        playButton.anchor.set(0.5);
        var playButtonText = this.game.add.text(this.game.world.centerX, 5*this.game.height/10, "Mission 1", buttonTextStyle);
        playButtonText.anchor.set(0.5);
      }

      startPlay(){
        if (Mission.instance){
          Mission.instance.reset();
        }
        Mission.chooseMission(1);
        this.game.state.start("Loaderjeu", true, false);
      }
    }


}
