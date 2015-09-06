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
              // Retrieve image and image type
          for (let obj of this.levelJSON.openSpace.objInOpenSpace){
              let idObj = obj.id;
              for (let scen in this.sceneryJSON){
                  if (scen.toString() == idObj){
                      let sceneryInfo = this.sceneryJSON[scen][0];
                      let urlObj = 'assets/scenery/' + sceneryInfo.url;
                      // Load image according to image typpe
                      if (sceneryInfo.spritetype == "spritesheet"){
                        // Case Spritesheet
                          this.game.load.spritesheet(idObj, urlObj, sceneryInfo.width, sceneryInfo.height);
                      }else{
                        // Case single image
                          this.game.load.image(idObj, urlObj);
                      }
                  }
              }
          }

        }

        create() {

            // Create groups for assets
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();

            // Floor building
            this.spawnTilesFloor(this.levelJSON.openSpace.sizex, this.levelJSON.openSpace.sizey);

            // Sprite in openspace
              // Creation
            for (let obj of this.levelJSON.openSpace.objInOpenSpace){
                let idObj = obj.id;
                for (let scen in this.sceneryJSON){
                    if (scen.toString() == idObj){
                        let newObj = new ObjInOpenSpace();
                        let objScenery = this.sceneryJSON[scen][0];
                        newObj.typeItem = objScenery.type;
                        newObj.id = idObj;
                        newObj.locationX = obj.posx*38;
                        newObj.locationY = obj.posy*38;
                        newObj.spriteType = objScenery.spritetype;
                        newObj.orientation = objScenery.orientation;
                        if (newObj.spriteType == "spritesheet"){
                            newObj.frame = objScenery.frame;
                        }else{
                            newObj.frame = 0;
                        }
                    }
                }
            }

            // Drawing
            for (let objToOpenspace of ObjInOpenSpace.listOfObj){
                objToOpenspace.sprite = this.game.add.isoSprite(objToOpenspace.locationX, objToOpenspace.locationY, 0, objToOpenspace.id, objToOpenspace.frame, this.decorGroup);
                objToOpenspace.sprite.anchor.set(0.5, 0);
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
