import { Vertex } from "./Vertex";

export class Utilities
{
    static async timedAwait(delegate : any, maxExecutionTime_ms : number)
    {
        return new Promise(resolve => {
            setTimeout(() => delegate(), maxExecutionTime_ms);
        });
    }
}