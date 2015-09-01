/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpace.ts" />
/// <reference path="./OpenSpace.ts" />
/// <reference path="./CharacterOS.ts" />

module Itsis {

    export class PlayInOpenSpace extends Phaser.State {
		preload(){
            var jsonData = JSON.parse(this.game.cache.getText("SpriteList"));
            for(var i=0;i<jsonData.sprites.length;i++){
                this.game.load.image(jsonData.sprites[i].id,jsonData.sprites[i].path);
            }
             this.load.spritesheet('perso', 'assets/characters/perso.png',64,64,16);
		}
		
		create(){
			var jsonDataOS = JSON.parse(this.game.cache.getText("OSList"));
            for(var j=0;j<jsonDataOS.openSpace.length;j++){
                var tmpJsonOs = jsonDataOS.openSpace[j];
                var tmpOS = new OpenSpace();
                for (var itObj=0;itObj<jsonDataOS.openSpace[j].objInOpenSpace.length;itObj++){
                    var obj = jsonDataOS.openSpace[j].objInOpenSpace[itObj];
                    var tmp = new ObjInOpenSpace();
                    // console.log(obj.id);
                    tmp.sprite = this.game.add.sprite(obj.posx,obj.posy,obj.id);
                    if (obj.id == "entree"){
                        // tmp.sprite.scale(10);
                    }
                    
                }
            }
           
            var tempChar = new CharacterOS();
            tempChar.sprite = this.game.add.sprite(300,300,"perso");
            tempChar.sprite.frame = 0;
            tempChar.sprite.animations.add("down",[0,1,2,3],2,true);
            tempChar.sprite.animations.add("left",[4,5,6,7],2,true);
            tempChar.sprite.animations.add("right",[8,9,10,11],2,true);
            tempChar.sprite.animations.add("up",[12,13,14,15],2,true);
            tempChar.sprite.animations.play("right");
		}
        
        update(){
            
            
        }
        
        render(){
            
        }
	}
}

