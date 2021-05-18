import { ClassExp,Program,Exp,isProcExp,Binding,makeDefineExp,isLitExp,makeAppExp,CExp,makeLetExp,isIfExp,isLetExp,isAppExp,isStrExp,isNumExp,isBoolExp,isVarRef,isPrimOp,isExp,isProgram,isDefineExp, makeProgram,IfExp,AppExp,makeBoolExp, makeLitExp,makeIfExp, makePrimOp, makeProcExp, makeVarDecl, makeVarRef, ProcExp, isClassExp, makeClassExp} from "./L31-ast";
import { Result, makeFailure, makeOk} from "../shared/result";
import {   } from "../imp/L3-ast";
import { makeCompoundSExp, makeSymbolSExp } from "../imp/L3-value";
import { bind, is, isEmpty, map } from "ramda";
import { cons, first, rest } from "../shared/list";

/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp

*/
/*
export const class2proc = (exp: ClassExp): ProcExp =>{
makeProcExp(exp.fields,make)
}
    


/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const class2proc = (exp: ClassExp): ProcExp =>{
    const takeMsg=(varName:string, methods: Binding[]):IfExp=>{
        return makeIfExp(makeAppExp(makePrimOp("eq?"),[makeVarRef(varName),makeLitExp(makeSymbolSExp(first(methods).var.var))]),makeAppExp(first(methods).val,[]),isEmpty(rest(methods)) ? makeBoolExp(false) : takeMsg(varName,rest(methods)))
    }
    const varName="msg"
    return makeProcExp(
        exp.fields,
        [makeProcExp([makeVarDecl(varName)],[takeMsg(varName,exp.methods)])]
    )
}

export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    isProgram(exp) ? makeOk(makeProgram(map(L31ExpToL3,exp.exps))) :
    isExp(exp) ? makeOk(L31ExpToL3(exp)) :
    exp;

export const L31ExpToL3 = (exp: Exp): Exp =>
    isDefineExp(exp) ? makeDefineExp(exp.var,L31CExpToL3(exp.val)) :
    L31CExpToL3(exp);

    
export const L31CExpToL3 = (exp: CExp): CExp =>
isNumExp(exp) ? exp :
isBoolExp(exp) ? exp :
isPrimOp(exp) ? exp :
isVarRef(exp) ? exp :
isStrExp(exp) ? exp : 
isLitExp(exp) ? exp:
isIfExp(exp) ? makeIfExp(L31CExpToL3(exp.test), L31CExpToL3(exp.then),L31CExpToL3(exp.alt)) : 
isAppExp(exp) ? makeAppExp(L31CExpToL3(exp.rator),map(L31CExpToL3,exp.rands)):
isClassExp(exp) ? class2proc(exp):
isProcExp(exp)? makeProcExp(exp.args, map(L31CExpToL3,exp.body)):
isLetExp(exp) ? makeLetExp(exp.bindings,map(L31CExpToL3,exp.body)):
exp;