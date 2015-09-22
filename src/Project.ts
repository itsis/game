module Itsis{

	export class Project{
    static instance:Project = null;


      pointOfProductivityToReach:number;
      currentPointOfProductivity:number;
      name:String;

      constructor(){
        this.pointOfProductivityToReach = 1000;
        this.currentPointOfProductivity = 0;
        this.name =  "test";
        Project.instance = this;
      }

  }
}
