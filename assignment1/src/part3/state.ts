import { any, F } from "ramda";

export type State<S, A> = (initialState: S) => [S, A];

export const bind= <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>): State<S, B>=>{  
 return (initialS :S)=>{
     const val:[S,A]=state(initialS);
     const returnVal:State<S,B>=f(val[1]);
        return(returnVal(val[0]));
 }
}
