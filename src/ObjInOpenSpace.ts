/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpaceTemplate.ts" />

module Itsis{

	export class ObjInOpenSpace{
		static listOfObj : ObjInOpenSpace[] =[];
		id : number;
		locationX : number; // localisation sur l'openspace coord X/Y provient du tilemap de l'openspace
		locationY : number;
		// template : ObjInOpenSpaceTemplate;
		typeItem : String;
		sprite : Phaser.Sprite;


		constructor(){
			ObjInOpenSpace.listOfObj.push(this);
			}
	}


}
