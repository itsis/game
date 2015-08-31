/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpaceTemplate.ts" />

module Itsis{

	export class ObjInOpenSpace{
		id : number;
		locationX : number; // localisation sur l'openspace coord X/Y provient du tilemap de l'openspace
		locationY : number;
		template : ObjInOpenSpaceTemplate;
		
		constructor() {
			
		}
	}

}
