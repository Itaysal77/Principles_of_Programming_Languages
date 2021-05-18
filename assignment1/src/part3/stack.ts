import { State, bind } from "./state";

export type Stack = number[];

export const push=(num:number):State<Stack, any>=>{
    return (st:Stack):[Stack,undefined]=>{
    return [[num].concat(st), undefined];
}
}

export const pop : State<Stack, number> = (st: Stack) =>{
    return [st.slice(1), st[0]];
    };

export const stackManip = (st : Stack) : [Stack,number] => {
    return bind(pop ,(x : number) => bind(push(x*x),(y : number) => bind(pop ,(z: number)=>push(x+z))))(st);
}