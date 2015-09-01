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
		static listOfCharacter : CharacterOS[];
		
		startingHour : number;
		endingHour : number;
		endurance : number; 
		enduranceMax : number; 
		productivity : number; // base 100
		motivation : number; // base 100
		state : number;
		
		constructor(){
			super();
			this.state = State.home;
			this.startingHour = 8;
			this.endingHour = 18;
			this.enduranceMax = 100;
			this.endurance = this.enduranceMax;
			this.productivity = 100; 	
			this.motivation = 70;
			CharacterOS.listOfCharacter.push(this);
		};
		
		updateAtHome(timeInOpenSpace){
			if (timeInOpenSpace > this.startingHour){
				this.state=State.goToDesk;
			}
		};
		
		updateGoToDesk(timeInOpenSpace){
			// path to desk 
			
			//At end
			// this.state = State.working;
		}
		
		updateWorking(timeInOpenSpace){
			if(timeInOpenSpace>this.endingHour){
				this.state = State.goToExit;
			}
			// TODO : gestion des temps de pause
			// TODO : gestion du lunch time
		}
		
		updateGoToExit(){
			// path to Exit
			
			//at end
			this.state = State.home;
		}
		
		update(timeInOpenSpace){
			switch(timeInOpenSpace){
				case State.home:
					this.updateAtHome(timeInOpenSpace);
				break;
				case State.goToDesk:
					this.updateGoToDesk(timeInOpenSpace);
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
