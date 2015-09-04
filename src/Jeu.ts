module Itsis {

    export class Jeu extends Phaser.State {

        floorGroup: Phaser.Group;
        cubeGroup: Phaser.Group;
        decorGroup: Phaser.Group;
        cursorPos: Phaser.Plugin.Isometric.Point3;

        levelJSON;
        sceneryJSON;


        preload(){

          // Add and enable the plug-in.
          var isoPlugin = new Phaser.Plugin.Isometric(this.game);
          this.game.plugins.add(isoPlugin);
          this.game.iso.anchor.setTo(0.5, 0.2);

          // Load assets & level data
          this.levelJSON = this.game.cache.getJSON('level');
          this.sceneryJSON =  this.game.cache.getJSON('scenery');
          // Load level images
            // Load floor
          this.game.load.image('floor', 'assets/scenery/' + this.levelJSON.openSpace.floor);
            // Load assets
          for (let cptObj=0; cptObj < this.levelJSON.openSpace.objInOpenSpace.length ; cptObj++){
              let idObj = this.levelJSON.openSpace.objInOpenSpace[cptObj].id;
              for (let scen in this.sceneryJSON){
                  if (scen.toString() == idObj){
                    var urlObj = this.sceneryJSON[scen][0].url;
                  };
              }
              this.game.load.image(idObj, 'assets/scenery/' + urlObj);

          }



        }

        create() {

            // Create groups for assets
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();

            // Floor building
            this.spawnTilesFloor(this.levelJSON.openSpace.sizex, this.levelJSON.openSpace.sizey);

            // Sprite in openspace creation
            for (let cptObj=0; cptObj < this.levelJSON.openSpace.objInOpenSpace.length ; cptObj++){
                let idObj = this.levelJSON.openSpace.objInOpenSpace[cptObj].id;
                for (let scen in this.sceneryJSON){
                    if (scen.toString() == idObj){
                        let newObj = new ObjInOpenSpace();
                        newObj.typeItem = this.sceneryJSON[scen][0].type;
                    };
                }
            }

        }

        spawnCube(){
          var cube = this.game.add.isoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
          cube.anchor.set(0.5);
        }

        spawnTilesFloor(sizeX: number, sizeY: number) {
            sizeX *= 38;
            sizeY *= 38
            var tileFloor;
            for (let xx = 0; xx < sizeX; xx += 38) {
                for (let yy = 0; yy < sizeY; yy += 38) {
                   tileFloor = this.game.add.isoSprite(xx, yy, 0, 'floor', 0, this.floorGroup);
                   tileFloor.anchor.set(0.5, 0);
                }
            }
        }

        startMainMenu(){
            this.game.state.start("MainMenu", true, false);
        }

    }

}
