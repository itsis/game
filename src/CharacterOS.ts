/// <reference path="./ObjInOpenSpace.ts"/>
/// <reference path="../tsDefinitions/astar.js" />

module Itsis{
	export enum State{
			home = 0,
			working =1,
			lunch = 2,
			breaktime = 3,
			goToDesk = 4,
			goToExit = 5
		};
	class LocationToGo{
		x : number;
		y : number;
		width : number;
		orientation : string;
	}

	export class CharacterOS extends ObjInOpenSpace{
		public static listOfCharacter : CharacterOS[] = [];

		startingHour : number;
		endingHour : number;
		endurance : number;
		enduranceMax : number;
		productivity : number; // base 100
		motivation : number; // base 100
		state : number;
		speed : number ;
		locationToGo : LocationToGo;
		desk : ObjInOpenSpace = null;
		entree : ObjInOpenSpace = null;
		path : Object[] = null;

		constructor(){
			super();
			this.state = State.home;
			this.startingHour = 8;
			this.endingHour = 9;
			this.enduranceMax = 100;
			this.endurance = this.enduranceMax;
			this.productivity = 100;
			this.motivation = 70;
			this.speed = 200;
			this.locationToGo = null;
			// console
			CharacterOS.listOfCharacter.push(this);
		};

		findObjInOS(typeItem : String){
			let objToReturn = null;
			for (let objOs in ObjInOpenSpace.listOfObj ){
				if (ObjInOpenSpace.listOfObj[objOs].typeItem == typeItem){
					objToReturn = ObjInOpenSpace.listOfObj[objOs];
				}
			}
			return objToReturn;
		}

		goToLocation(location : ObjInOpenSpace){
			let posx=this.locationToGo.x;
			let posy=this.locationToGo.x;
			let width=this.locationToGo.width/2;

			if ((posx-width-this.sprite.isoX)>25 || (posx-width-this.sprite.isoX)<-25){// ||(posx-this.sprite.position.x)>20 || (posx-this.sprite.position.x)<20){
				if ((posx-width)>this.sprite.isoX){
					// this.sprite.position.x=this.sprite.position.x+5;
					this.sprite.body.velocity.x = this.speed;
					this.sprite.body.velocity.y = 0;
					if (this.sprite.animations.name!="right"){this.sprite.animations.play("right");}

				}else{
					this.sprite.body.velocity.x = -this.speed;
					this.sprite.body.velocity.y = 0;
					if (this.sprite.animations.name!="left"){this.sprite.animations.play("left");}
				}
			}else{
				if ((posy-this.sprite.isoY)>25 || (posy-this.sprite.isoY)<-25){

					if (posy>this.sprite.isoY){
						this.sprite.body.velocity.y = this.speed;
						this.sprite.body.velocity.x = 0;
						if (this.sprite.animations.name!="down"){this.sprite.animations.play("down");}
					}else{
						this.sprite.body.velocity.y = -this.speed;
						this.sprite.body.velocity.x = 0;
						if (this.sprite.animations.name!="up"){this.sprite.animations.play("up");}
					}
				}else{
					this.sprite.body.velocity.x =0;
					this.sprite.body.velocity.y =0;
					this.sprite.animations.stop();
					this.locationToGo=null;
					return true;
				}
			}
			// console.log(this.sprite.body.velocity.x + "#" + this.sprite.body.velocity.y);
			// console.log(posx + " x#x " + this.sprite.isoX);
			// console.log(posy + " y#y " + this.sprite.isoY);
			return false;

		}

		moveOnPath(){

			if (this.path.length>0){
				let posx=this.path[0].x*38;
				let posy=this.path[0].y*38;
				console.log(this.path[0]);
				let width=this.locationToGo.width/2;
				if ((posx-width-this.sprite.isoX)>25 || (posx-width-this.sprite.isoX)<-25){// ||(posx-this.sprite.position.x)>20 || (posx-this.sprite.position.x)<20){
					if ((posx-width)>this.sprite.isoX){
						// this.sprite.position.x=this.sprite.position.x+5;
						this.sprite.body.velocity.x = this.speed;
						this.sprite.body.velocity.y = 0;
						if (this.sprite.animations.name!="right"){this.sprite.animations.play("right");}

					}else{
						this.sprite.body.velocity.x = -this.speed;
						this.sprite.body.velocity.y = 0;
						if (this.sprite.animations.name!="left"){this.sprite.animations.play("left");}
					}
				}else{
					if ((posy-this.sprite.isoY)>25 || (posy-this.sprite.isoY)<-25){

						if (posy>this.sprite.isoY){
							this.sprite.body.velocity.y = this.speed;
							this.sprite.body.velocity.x = 0;
							if (this.sprite.animations.name!="down"){this.sprite.animations.play("down");}
						}else{
							this.sprite.body.velocity.y = -this.speed;
							this.sprite.body.velocity.x = 0;
							if (this.sprite.animations.name!="up"){this.sprite.animations.play("up");}
						}
					}else{

						this.path.shift();
						if (this.path.length == 0){
							this.sprite.body.velocity.x =0;
							this.sprite.body.velocity.y =0;

							switch (this.locationToGo.orientation){
								case "w":
									this.sprite.animations.play("right");
									break;
							}

							this.sprite.animations.stop();
						}
						// this.locationToGo=null;
						// return true;
					}
				}
			}
			// console.log(this.sprite.body.velocity.x + "#" + this.sprite.body.velocity.y);
			// console.log(posx + " x#x " + this.sprite.isoX);
			// console.log(posy + " y#y " + this.sprite.isoY);
			// return false;
		}


		updateAtHome(timeInOpenSpace : number){
			// let entree = null;
			if (timeInOpenSpace > this.startingHour && timeInOpenSpace < this.endingHour){
				if (this.entree == null){
					this.entree = this.findObjInOS("entree");
				}
				if (this.entree != null){
					this.sprite.visible=true;
					this.sprite.x = this.entree.sprite.isoX;
					this.sprite.y = this.entree.sprite.isoY;
					// console.log(this.sprite);
					this.state=State.goToDesk;
				}
			}
		};

		updateGoToDesk(openSpace){
			// path to desk
			if (this.desk == null){
				this.desk = this.findObjInOS("desk");
			}
			if (this.desk!=null){
				if (this.locationToGo==null){
					this.locationToGo = new LocationToGo();
					this.locationToGo.x = this.desk.sprite.isoX;
					this.locationToGo.y = this.desk.sprite.isoY;
					this.locationToGo.width = this.desk.sprite.width;
					this.locationToGo.orientation = this.desk.orientation;

					}
				}

				if (this.path == null){
					console.log(this.desk);
					console.log(this.locationToGo);
					graph = new Graph(openSpace);
					let isoX = Math.round(this.sprite.isoX / 38);
          let isoY = Math.round(this.sprite.isoY / 38);
          let destX = Math.round(this.locationToGo.x /38);
          let destY = Math.round(this.locationToGo.y / 38);
					let step  = 1+ Math.round(this.locationToGo.width/2)/38;
					console.log("step" + step);
					switch (this.desk.orientation){
						case "s":	destX+=1;
							break;
						case "w":
							destY+=1;
							break;
						case "n":destX-=1;
							break;
						case "e":destY-=1;
							break;
					}
					let start = graph.grid[isoX][isoY];
          let end = graph.grid[destX][destY];
          this.path = astar.search(graph,start,end);
					console.log(isoX + "/" + isoY +"/" +destX +"/" +destY);
					console.log(this.path);
				}
				if (this.path!=null){
					this.moveOnPath();
					if (this.path.length==0){
						this.state = State.working;
						this.path = null;
						this.locationToGo = null;
					}
				}
				// let ret = this.goToLocation();
				// if (ret){
				// 	this.state = State.working;
				// 	this.locationToGo = null;
				// }
			}
			//At end



		updateWorking(timeInOpenSpace : number){
			if(timeInOpenSpace>this.endingHour){
				this.state = State.goToExit;
				// this.sprite.visible=false;
			}
			// TODO : gestion des temps de pause

	// TODO : gestion du lunch time
		}

		updateGoToExit(){
			if (this.entree == null){
				this.entree = this.findObjInOS("entree");
			}
			if (this.entree!=null){
				if (this.locationToGo==null){
					this.locationToGo = new LocationToGo();
					this.locationToGo.x = this.entree.sprite.isoX;
					this.locationToGo.y = this.entree.sprite.isoY;
					this.locationToGo.width = this.entree.sprite.width;
					}
				}
				if (this.path!=null){
					this.moveOnPath();
					if (this.path.length==0){
						this.state = State.working;
						this.path = null;
						this.locationToGo = null;
					}
				}


		}

		update(timeInOpenSpace,openSpace){
			switch(this.state){
				case State.home:
					this.updateAtHome(timeInOpenSpace);
				break;
				case State.goToDesk:
					this.updateGoToDesk(openSpace);
				break;
				case State.working:
					this.updateWorking(timeInOpenSpace);
				break;
				case State.goToExit:
					this.updateGoToExit();
				break;
				default:
				break;
			}


		};


	}
}
