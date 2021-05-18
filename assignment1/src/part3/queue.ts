import { pseudoRandomBytes } from "node:crypto";
import { concat } from "ramda";
import { State, bind } from "./state";

export type Queue = number[];

export const enqueue=(num:number):State<any, undefined>=>{
    return (q:Queue):[Queue,undefined]=>{
    return [q.concat(num), undefined];
}
}


export const dequeue: State<Queue, number> = (q: Queue) =>{
return [q.slice(1), q[0]];
}
export const queueManip :State<Queue,number>=bind (dequeue, x=>bind(enqueue(x*2),()=>bind(enqueue(x/3),()=>bind (dequeue,(y:number)=>(q:Queue)=>[q,y]))));