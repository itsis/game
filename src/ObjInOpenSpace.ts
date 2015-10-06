/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpaceTemplate.ts" />

module Itsis{

	export class ObjInOpenSpace{
		static listOfObj : ObjInOpenSpace[] =[];
		id : number;
        locationX: number; // localisation sur l'openspace coord X/Y provient du tilemap de l'openspace
        locationY: number;
		orientation : string;
		// template : ObjInOpenSpaceTemplate;
        typeItem: string;
        sprite: Phaser.Plugin.Isometric.IsoSprite;
        spriteType: string;
        frame: number;
		owner : CharacterOS;


		constructor(){
			ObjInOpenSpace.listOfObj.push(this);
			}
	}


}
