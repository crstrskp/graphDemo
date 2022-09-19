import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export class Path
{
    steps : (Edge|Vertex)[] = [];

    totalCost : number = 0; 
    src : Vertex;

    constructor(src : Vertex)
    {
        this.src = src; 
        this.addStep(src);
    }

    public addStep(step : Vertex | Edge)
    {
        this.steps.push(step);
        this.calculateTotalCost(); 
    }

    private calculateTotalCost() {
        var cost = 0; 
        
        this.steps.forEach((step) =>
        {
            if (step instanceof Edge)
                cost += step.getCost();
        });

        
        
        // var n = this.next();
        
        // while (n != undefined) 
        // {
        //     if (n instanceof Edge)
        //     {
        //         cost += n.getCost();
        //     }

        //     n = this.next(); 
        // }

        this.totalCost = cost; 
    }

    public next() : Edge | Vertex | undefined
    {
        return this.steps.shift();
    }

    public peek() : Edge | Vertex | undefined
    {
        return this.steps[0];
    }

    public getTotalCost() : number 
    {
        return this.totalCost;
    }

}