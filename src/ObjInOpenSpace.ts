/// <reference path="../tsDefinitions/phaser.d.ts" />

module Itsis{

	export class ObjInOpenSpace{
		sprite : Phaser.Sprite;
		name : String;
		id : number;
		locationX : number; // localisation sur l'openspace coord X/Y provient du tilemap de l'openspace
		locationY : number;
		scale : number; // redimensionnement de l'image au besoin
		zIndex : number ; // il est déterminant de préciser dans quel ordre on affiche les sprites, notamment pour pouvoir les superposer.



	}

}
