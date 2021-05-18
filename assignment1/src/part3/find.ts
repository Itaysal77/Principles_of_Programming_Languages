import { fail, ok } from "node:assert";
import { empty, filter, isEmpty } from "ramda";
import { Result, makeFailure, makeOk, bind, either, isOk } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult =  <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    const predArray:T[]=a.filter(pred);
    if (isEmpty(predArray))
        return makeFailure("fail");
    return makeOk(predArray[0]);
}
function isVowel (s:string) :boolean {
    return(s==='a'||s==='e'||s==='i'||s==='o'||s==='u'||s==='A'||s==='E'||s==='I'||s==='O'||s==='U')
}
/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (a:number[]):Result<number>=>{
    return bind ( findResult((x=>(x)%2===0),a),x=>makeOk(x*x));
}

export const returnSquaredIfFoundEven_v3 = (a:number[]):number|string=>{
    const b= either ( findResult((x=>(x)%2===0),a),x=>makeOk(x*x),x=>makeOk(-1));
    if (isOk(b))
    return b.value;
    else return b.message;
};
console.log(returnSquaredIfFoundEven_v3([1,2,3]));
