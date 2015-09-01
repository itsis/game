/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpace.ts" />
/// <reference path="./OpenSpace.ts" />
module Itsis {

    export class PlayInOpenSpace extends Phaser.State {
		preload(){
            var jsonData = JSON.parse(this.game.cache.getText("SpriteList"));
            for(var i=0;i<jsonData.sprites.length;i++){
                this.game.load.image(jsonData.sprites[i].id,jsonData.sprites[i].path);
            }
		}
		
		create(){
			var jsonDataOS = JSON.parse(this.game.cache.getText("OSList"));
            for(var j=0;j<jsonDataOS.openSpace.length;j++){
                var tmpJsonOs = jsonDataOS.openSpace[j];
                var tmpOS = new OpenSpace();
                for (var itObj=0;itObj<jsonDataOS.openSpace[j].objInOpenSpace.length;itObj++){
                    var obj = jsonDataOS.openSpace[j].objInOpenSpace[itObj];
                    var tmp = new ObjInOpenSpace();
                    console.log(obj.id);
                    tmp.sprite = this.game.add.sprite(obj.posx,obj.posy,obj.id);
                    
                }
            }
		}
        
        update(){
            
        }
        
        render(){
            
        }
	}
}
