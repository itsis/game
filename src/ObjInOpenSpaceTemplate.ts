/// <reference path="../tsDefinitions/phaser.d.ts" />

module Itsis{
	export class ObjInOpenSpaceTemplate{
		static listOfTemplate = [];
		
		posx : number;
		posy : number;
		height : number;
		width : number;
		name : String;
		id : number;
		scale : number; // redimensionnement de l'image au besoin
		zIndex : number ; // 
		
		constructor(id:number, name : String, posx : number, posy : number, width:number,height:number){
			ObjInOpenSpaceTemplate.listOfTemplate.push(this);
			this.id=id;
			this.posx=posx;
			this.posy=posy;
			this.width=width;
			this.height=height;
			this.id = id;
			this.name = name;
		}
	}
}