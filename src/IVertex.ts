export interface IVertex
{
    setLabel(s : string) : any; 
    getLabel() : string;
    getCost() : number; 
    getObject() : any;
    getId() : number;
    setCost(cost : number) : any;
    setAttribute(key : string, value : any) : any;
    getAttribute(key : string) : any;
}