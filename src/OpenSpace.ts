/// <reference path="./ObjInOpenSpace.ts"/>

module Itsis{

	export class OpenSpace{
		static instance : OpenSpace;
		sprite : Phaser.Sprite;
		id : number;
		name : String;
		listOfObj : ObjInOpenSpace[];
	
		constructor(){
			OpenSpace.instance=this;
		}
	}
}
