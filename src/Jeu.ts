module Itsis {

    export class Jeu extends Phaser.State {

        floorGroup: Phaser.Group;
        cubeGroup: Phaser.Group;
        decorGroup: Phaser.Group;
        cursorPos: Phaser.Plugin.Isometric.Point3;

        level1JSON;

        preload(){

          // Add and enable the plug-in.
          var isoPlugin = new Phaser.Plugin.Isometric(this.game);
          this.game.plugins.add(isoPlugin);
          this.game.iso.anchor.setTo(0.5, 0.2);

          // Load Level assets list
          this.game.load.json('level_1', 'assets/maps/level_1.json');
          this.game.load.onFileComplete.add(this.onJSONComplete);  // Add and enable the plug-in.

          this.game.load.image('cube', 'assets/scenery/cube.png');

        }


        onJSONComplete(){

              this.level1JSON = this.game.cache.getJSON('level_1');
              console.log(this.level1JSON);

              var floorTileName = this.level1JSON.floor.tileName;
              this.game.load.image(floorTileName, this.level1JSON.floor.url);
        }

        create() {

            // Create a group for our tiles.
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();
            // Let's make a load of tiles on a grid.
            this.spawnTilesFloor();
            this.spawnCube();

        }

        spawnCube(){
          var cube = this.game.add.isoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
          cube.anchor.set(0.5);

        }

        spawnTilesFloor() {
            //var taille =  this.level1JSON.floor.levelSize *38;
            var taille = 15 * 38;
            var tileFloor;
            for (let xx = 0; xx < taille; xx += 38) {
                for (let yy = 0; yy < taille; yy += 38) {
                    // Create a tile using the new game.add.isoSprite factory method at the specified position.
                    // The last parameter is the group you want to add it to (just like game.add.sprite)
              //      tileFloor = this.game.add.isoSprite(xx, yy, 0, this.level1JSON.floor.url, 0, this.floorGroup);
              //      tileFloor.anchor.set(0.5, 0);
                }
            }
        }

        startMainMenu(){
            this.game.state.start("MainMenu", true, false);
        }

    }

}
