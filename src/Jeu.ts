module Itsis {

    export class Jeu extends Phaser.State {

        floorGroup: Phaser.Group;
        cubeGroup: Phaser.Group;
        decorGroup: Phaser.Group;
        cursorPos: Phaser.Plugin.Isometric.Point3;
        actualDate : number;
        ticks : number = 0;
        text : Phaser.Text;
        but : Phaser.Text;
        lastTicksHour : number;
        levelJSON;
        sceneryJSON;
        charJSON;
        mapOpenSpace : number[][];
        guiContainer;
        nbDay : number =1;
        listOfTiles: Phaser.Sprite[] = [];
        isoPlugin: Phaser.Plugin.Isometric;
        itsisGame: ItsisGame;

        preload(){

          // Add and enable the plug-in.
          this.isoPlugin = new Phaser.Plugin.Isometric(this.game);
          this.game.plugins.add(this.isoPlugin);
          this.isoPlugin.projector.anchor.setTo(0.5, 0.2);
          // tihs.guiContainer= new Object[10];
          this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

          // Load assets & level data
          this.levelJSON = this.game.cache.getJSON('level');
          this.charJSON = this.game.cache.getJSON('characters');
          this.sceneryJSON =  this.game.cache.getJSON('scenery');
          // Load level images
            // Load floor
          this.game.load.image('floor', 'assets/scenery/' + this.levelJSON.openSpace.floor);
          this.game.load.image('entree', 'assets/scenery/tile_entree.png');
            // Load assets
              // Retrieve image and image type

          for (let ch of  this.charJSON.characters){
              this.load.spritesheet(ch.name, ch.sprite,ch.sizex,ch.sizey,ch.nbanim);
          }
          CharacterOS.charJSON = this.charJSON;

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
            EZGUI.tilingRenderer = this.game.renderer;
         //   var guiObj = this.game.cache.getJSON('guiobj')guiObj ;
          //
            var persoGuiJSON = this.game.cache.getJSON('persogui');
            var listOfGui = new Array(10);
          EZGUI.Theme.load(['./assets/gui/kenney-theme/kenney-theme.json'], function () {
             var guiContainer = EZGUI.create(persoGuiJSON , 'kenney');
             guiContainer.visible=false;
             listOfGui[0] = guiContainer;
               EZGUI.components.btn1.on('click',function (event,me)
               {
                 guiContainer.visible=false;
               }
             );
             EZGUI.components.btn2.on('click',function (event,me)
             {
               for (let tempChar of CharacterOS.listOfCharacter){
                 if (tempChar.name == EZGUI.components.nameperso.text){
                   tempChar.productivity-=10;
                   EZGUI.components.productivity.text=tempChar.productivity;
                 }
               }
             }
           );
          });


            var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false,  align: "center" };
            this.text = this.game.add.text(0,0,"hello",style);
            this.but = this.game.add.text(200,0,"hello",style);
            this.lastTicksHour = this.game.time.time;
            this.actualDate=7.00;
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



            function dragStop(sprite,pointer){
              let cursorPos = new Phaser.Plugin.Isometric.Point3();
              this.isoPlugin.projector.unproject(this.game.input.activePointer.position, cursorPos);
              this.listOfTiles.forEach(function (tile) {
                  var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
                  if (inBounds) {
                      console.log(tile.isoX);
                      sprite.isoX = tile.isoX;
                      sprite.isoY = tile.isoY;
                  }
              });
            }


            // Drawing
            for (let objToOpenspace of ObjInOpenSpace.listOfObj) {
                objToOpenspace.sprite = <Phaser.Plugin.Isometric.IsoSprite> this.isoPlugin.addIsoSprite(objToOpenspace.locationX, objToOpenspace.locationY, 0, objToOpenspace.id, objToOpenspace.frame, this.decorGroup);
                console.log(objToOpenspace.sprite);
                objToOpenspace.sprite.anchor.set(0.5);
                objToOpenspace.sprite.inputEnabled = true;
                objToOpenspace.sprite.input.enableDrag();
                //objToOpenspace.sprite.events.onDragStart.add(dragStrat, this);
                objToOpenspace.sprite.events.onDragStop.add(dragStop, this);
                //objToOpenspace.events.onDragStop.add(onDragStop, this);

            }



            let tempObjEntree = new ObjInOpenSpace();
            tempObjEntree.sprite = <Phaser.Plugin.Isometric.IsoSprite> this.isoPlugin.addIsoSprite(494, 0, 0, "entree", 0, this.floorGroup);
            tempObjEntree.sprite.anchor.set(0.5,0.2);
            tempObjEntree.typeItem = "entree";
            function onDown(event,tempChar){
              listOfGui[0].visible=true;
              EZGUI.components.nameperso.text=this.char.name;
              EZGUI.components.productivity.text=this.char.productivity;
            };
            let tempChar = new CharacterOS("rose", <ItsisGame>this.game, this.isoPlugin, this.decorGroup);
            tempChar.group = this.game.add.group();
            tempChar.sprite.inputEnabled = true;
            tempChar.sprite.events.onInputDown.add(onDown,{"char":tempChar});

            let tempChar2 = new CharacterOS("persofille", <ItsisGame>this.game, this.isoPlugin, this.decorGroup);
            tempChar2.group = this.game.add.group();
            tempChar2.sprite.inputEnabled = true;
            tempChar2.sprite.events.onInputDown.add(onDown,{"char":tempChar});

            this.mapOpenSpace =[this.levelJSON.openSpace.sizex];
            for (let x=0; x < this.levelJSON.openSpace.sizex;x++){
              this.mapOpenSpace[x] = [this.levelJSON.openSpace.sizey];
              }


            for (let x=0; x < this.levelJSON.openSpace.sizex;x++){
              for (let y = 0; y< this.levelJSON.openSpace.sizey;y++){
                this.mapOpenSpace[x][y]=1;
              }
            }

            // Construction de la map de l'openspace servant plus tard dans les astar (pathfinding) des CharacterOS
            // centralisé ici pour l'instant
            for (let it of ObjInOpenSpace.listOfObj){
              let isoX = it.sprite.isoX / 38;
              let isoY = it.sprite.isoY / 38;
              if (it.typeItem !="entree"){
                if (it.sprite.width>38){
                  switch (it.orientation){
                    case "w":
                      this.mapOpenSpace[isoX-1][isoY] = 0;
                    break;
                    case "e":
                    this.mapOpenSpace[isoX+1][isoY] = 0;
                  break;
                  case "s":
                    this.mapOpenSpace[isoX][isoY-1] = 0;
                  break;
                  case "n":
                    this.mapOpenSpace[isoX][isoY+1] = 0;
                  break;
                  }
                }
                this.mapOpenSpace[isoX][isoY] = 0;
              }
            }


          // console.log(this.mapOpenSpace);
        }



        spawnCube(){
            var cube = <Phaser.Plugin.Isometric.IsoSprite> this.isoPlugin.addIsoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
          cube.anchor.set(0.5);
        }

        spawnTilesFloor(sizeX: number, sizeY: number) {
            sizeX *= 38;
            sizeY *= 38
            var tileFloor;
            for (let xx = 0; xx < sizeX; xx += 38) {
                for (let yy = 0; yy < sizeY; yy += 38) {
                    tileFloor = <Phaser.Plugin.Isometric.IsoSprite> this.isoPlugin.addIsoSprite(xx, yy, 0, 'floor', 0, this.floorGroup);
                   tileFloor.anchor.set(0.5, 0);
                   this.listOfTiles.push(tileFloor);
                }
            }
        }

        formatHour(){
          if ((this.game.time.time - this.lastTicksHour) >= 1000 ){
            this.ticks+=0.10;
            this.lastTicksHour = this.game.time.time;
            this.actualDate+=0.10;
            var tempHour = Math.floor(this.actualDate);
            var tempMin = Math.round((this.actualDate-tempHour) * 100);
            if (tempMin>=60){
              this.actualDate=tempHour+1;
              if (this.actualDate>=24){
                this.actualDate-=24;
                this.nbDay+=1;
              }
            }
            tempHour = Math.round(this.actualDate);
            tempMin = Math.round((this.actualDate-tempHour) * 100);
            this.text.setText(((tempHour>=10?tempHour:"0" + tempHour) + ":" + (tempMin>=10?tempMin:"0"+tempMin)));
          }
        }

        startMainMenu(){
            this.game.state.start("MainMenu", true, false);
        }

        render(){
          this.formatHour();
          // console.log(CharacterOS.listOfCharacter);
          for (let itChar of CharacterOS.listOfCharacter){
            itChar.update(this.actualDate,this.mapOpenSpace,this.ticks);
          }
          this.but.setText(Mission.instance.currentProductivityProgression + " Produits / " + Mission.instance.aproduire +" a faire");
          if (this.nbDay<Mission.instance.timeTarget || Mission.instance.timeTarget == -1){
            if (Mission.instance.currentProductivityProgression >= Mission.instance.aproduire){

              Mission.instance.state=MissionStatus.success;
              this.game.state.start("EndMission", true, false);
            }
          }else{
            Mission.instance.state=MissionStatus.failed;
            this.game.state.start("EndMission", true, false);
          }

        }

    }

}
