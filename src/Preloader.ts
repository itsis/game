

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
            // this.game.load.image('tileset','assets/images/office.png')
            this.game.load.text("SpriteList","assets/scenery/Sprite.json")
            
            this.game.load.text("OSList","assets/scenery/openspace1.json")
            // this.game.load.image('table', 'assets/images/table.png');
            // this.game.load.image('tableau', 'assets/images/tableau.png');
           
        }

        create() {
            // var jsonData = JSON.parse(this.game.cache.getText("SpriteList"));
            // for(var i=0;i<jsonData.listOfObj.length;i++){
            //     var tmp = new ObjInOpenSpaceTemplate(jsonData.listOfObj[i].id,jsonData.listOfObj[i].name,jsonData.listOfObj[i].posx,jsonData.listOfObj[i].posy,jsonData.listOfObj[i].width,jsonData.listOfObj[i].height)
            // }
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
            
           

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}
