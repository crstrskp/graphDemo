import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export class Path
{
    steps : (Edge|Vertex)[] = [];

    totalCost : number = 0; 

    public addStep(step : Vertex | Edge)
    {
        // if (this.steps.includes(step)) return;
        this.steps.push(step);
        this.calculateTotalCost(); 
    }

    private calculateTotalCost() 
    {
        var cost = 0; 
        
        this.steps.forEach((step) =>
        {
            if (step instanceof Edge)
                cost += step.getCost();
        });

        this.totalCost = cost; 
    }

    /** NOTE: alters collection!
     * Removes the first element of the steps list. 
     * @returns the removed element
     */
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

    /**NOTE: alters collection!
     * mutates the <steps> array
     */
    public reverse()
    {
        this.steps.reverse();
    }

    public toString = () : string => {
        var msg = "";

        this.steps.forEach((element) => 
        {
            if (element instanceof Vertex)
            {
                msg += "Vertex: "+element.label+" cost: "+element.getCost()+"\n";
            }
            else if (element instanceof Edge)
            {
                msg += "Edge from: "+element.start.label+" to: "+element.end.label+" cost: "+ element.getCost()+".\n";
            }
            else {
                msg += "unknow type: "+element+"\n";
            }
        })

        return msg;
    }
}