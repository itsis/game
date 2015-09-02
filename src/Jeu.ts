/// <reference path="../tsDefinitions/phaser.plugin.isometric.d.ts" />

module Itsis {

    export class Jeu extends Phaser.State {

        floorGroup: Phaser.Group;
        cubeGroup: Phaser.Group;
        decorGroup: Phaser.Group;
        cursorPos: Phaser.Plugin.Isometric.Point3;
        text : Phaser.Text;
        level1JSON;
        actualDate : number;
        lastTicksHour : number;



        preload(){
          this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
          // Add and enable the plug-in.
          var isoPlugin = new Phaser.Plugin.Isometric(this.game);
          this.game.plugins.add(isoPlugin);
          this.game.iso.anchor.setTo(0.5, 0.2);

          // Load Level assets list

          this.game.load.image('cube', 'assets/scenery/cube.png');

          this.level1JSON = this.game.cache.getJSON('level_1');


          var floorTileName = this.level1JSON.floor.tileName;
           this.game.load.image(floorTileName, 'assets/scenery/'+floorTileName+'.png');
           this.load.spritesheet('perso', 'assets/characters/perso.png',64,64,16);
        }


        create() {
          this.lastTicksHour = this.game.time.time;
          this.actualDate=7.00;
          var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false,  align: "center" };
          this.text = this.game.add.text(0,0,"hello",style);
              // text.anchor.setTo(0.5);
              //
              // text.font = 'Revalia';
              // text.fontSize = 60;
            // Create a group for our tiles.
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();
            // Let's make a load of tiles on a grid.

            this.spawnCube();
            this.spawnTilesFloor(this.level1JSON.floor.levelSize);

            var tempChar = new CharacterOS();
            tempChar.sprite = this.game.add.sprite(280,380,"perso");
            tempChar.sprite.frame = 0;
            tempChar.sprite.animations.add("down",[0,1,2,3],10,true);
            tempChar.sprite.animations.add("left",[4,5,6,7],10,true);
            tempChar.sprite.animations.add("right",[8,9,10,11],10,true);
            tempChar.sprite.animations.add("up",[12,13,14,15],10,true);
            tempChar.sprite.animations.play("right");
            tempChar.sprite.visible=false;

        }

        spawnCube(){
          var cube = this.game.add.isoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
          cube.anchor.set(0.5);

        }

        spawnTilesFloor(taille: number) {
            taille *= 38;

            var tileFloor;
            for (let xx = 0; xx < taille; xx += 38) {
                for (let yy = 0; yy < taille; yy += 38) {
                   tileFloor = this.game.add.isoSprite(xx, yy, 0, this.level1JSON.floor.tileName, 0, this.floorGroup);
                   tileFloor.anchor.set(0.5, 0);
                }
            }
        }

        startMainMenu(){
            this.game.state.start("MainMenu", true, false);

        }

        formatHour(){
          if ((this.game.time.time - this.lastTicksHour) >= 1000 ){
            this.actualDate+=0.10;
            var tempHour = parseInt(this.actualDate);
            var tempMin = parseInt((this.actualDate-tempHour) * 100);
            if (tempMin>=60){
              this.actualDate=tempHour+1;
            }
            if (this.actualDate>24){
              this.actualDate-=24;
            }
            this.lastTicksHour = this.game.time.time;
            tempHour = parseInt(this.actualDate);
            tempMin = parseInt((this.actualDate-tempHour) * 100);
            this.text.setText(((tempHour>10?tempHour:"0" + tempHour) + ":" + (tempMin>10?tempMin:"0"+tempMin);
          }
        }

        render(){
          this.formatHour();
          for (var itChar = 0; itChar < CharacterOS.listOfCharacter.length; itChar++){
            tempChar = CharacterOS.listOfCharacter[itChar];
            tempChar.update(this.actualDate);
          }
        }

    }

}
