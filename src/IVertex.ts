export interface IVertex
{
    setLabel(s : string) : any; 
    getLabel() : string;
    updateCost() : any; 
    getCost() : number; 
    getObject() : any;
    getId() : number;
}