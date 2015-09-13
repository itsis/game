/// <reference path="./ObjInOpenSpace.ts"/>

module Itsis{
	export enum State{
			home = 0,
			working =1,
			lunch = 2,
			breaktime = 3,
			goToDesk = 4,
			goToExit = 5
		};

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
		desk : ObjInOpenSpace = null;
		entree : ObjInOpenSpace = null;

		constructor(){
			super();
			this.state = State.home;
			this.startingHour = 8;
			this.endingHour = 9;
			this.enduranceMax = 100;
			this.endurance = this.enduranceMax;
			this.productivity = 100;
			this.motivation = 70;
			this.speed = 100;
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
			let posx=location.sprite.isoX;
			let posy=location.sprite.isoY;
			let width=location.sprite.width/2;

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
					return true;
				}
			}
			// console.log(this.sprite.body.velocity.x + "#" + this.sprite.body.velocity.y);
			// console.log(posx + " x#x " + this.sprite.isoX);
			// console.log(posy + " y#y " + this.sprite.isoY);
			return false;

		}

		goToLocation2(location : ObjInOpenSpace){
			if (this.sprite.isoX> location.sprite.isoX){
				this.sprite.body.velocity.y = -100;

			}
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

		updateGoToDesk(){
			// path to desk
			if (this.desk == null){
				this.desk = this.findObjInOS("desk");
			}
			if (this.desk!=null){
				let ret = this.goToLocation(this.desk);
				if (ret) this.state = State.working;
			}
			//At end

		}

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
				let ret = this.goToLocation(this.entree);
				if (ret){
					this.state = State.home;
					this.sprite.visible=false;
				}
			}

		}

		update(timeInOpenSpace){
			switch(this.state){
				case State.home:
					this.updateAtHome(timeInOpenSpace);
				break;
				case State.goToDesk:
					this.updateGoToDesk();
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
