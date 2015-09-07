/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpaceTemplate.ts" />

module Itsis{

	export class ObjInOpenSpace{
		static listOfObj : ObjInOpenSpace[] =[];
		id : Number;
		locationX : Number; // localisation sur l'openspace coord X/Y provient du tilemap de l'openspace
		locationY : Number;
		orientation : String;
		// template : ObjInOpenSpaceTemplate;
		typeItem : String;
		sprite : Phaser.Sprite;
		spriteType : String;
		frame : Number;


		constructor(){
			ObjInOpenSpace.listOfObj.push(this);
			}
	}


}
