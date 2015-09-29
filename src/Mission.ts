module Itsis{
  export enum MissionStatus{
			notStarted = 0,
			inProgres =1,
      failed=2,
      success=3
		};
  export class Mission{
    public static missionJSON = null;
    public static instance = null;
    public static listOfMission : mission[] = [];
    public id : number;
    public name : String;
    public aproduire : number;
    public timeTarget : number;
    public currentProductivityProgression : number = 0;
    public status

    constructor(id:number){
      for (let mi of Mission.missionJSON.missions){
        if (mi.id == id){
          this.id = mi.id;
          this.name = mi.name;
          this.aproduire = mi.aproduire;
          this.timeTarget = mi.time;
        }
      }

      Mission.listOfMission.push(this);
    }

    public static chooseMission(id:number){
      for(let m of Mission.listOfMission){
        if (m.id == id){
          Mission.instance = m;
        }
      }
    }

  }
}
