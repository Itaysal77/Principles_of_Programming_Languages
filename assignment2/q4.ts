
import { Result, makeFailure,makeOk } from '../shared/result';
import {Program,Exp,isProcExp,PrimOp,isLitExp,CExp,isIfExp,isAppExp,isStrExp,isNumExp,isBoolExp,isVarRef,isPrimOp,isExp,isProgram,isDefineExp} from "./L31-ast";
import { bind, is, isEmpty, map } from "ramda";

/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l2ToPython = (exp: Exp | Program): Result<string>  => 
    isProgram(exp) ?  makeOk(map(TranslateExp,exp.exps).join("\n")):
    isExp(exp) ? makeOk(TranslateExp(exp)):
    makeFailure("Fail");
 
export const TranslateExp=(exp:Exp): string=>
    isDefineExp(exp) ? exp.var.var + " = " + TranslateCExp(exp.val) :
    "" +TranslateCExp(exp);


export const TranslateCExp  = (exp:CExp):string =>
    isNumExp(exp) ? exp.val.toString() :
    isBoolExp(exp) ? (exp.val ? 'True' : 'False')  :
    isPrimOp(exp) ? exp.op :
    isVarRef(exp) ? exp.var :
    isStrExp(exp) ? exp.val : 
    isLitExp(exp) ? exp.val.toString():
    isIfExp(exp) ? "(" + TranslateCExp(exp.then) + 
                        " if " + 
                        TranslateCExp(exp.test) +
                        " else " + 
                        TranslateCExp(exp.alt) + 
                    ")"  : 

    isProcExp(exp)? "(" + "lambda " +  
                    map((p) => p.var, exp.args).join(",") + " : " + 
                    TranslateCExp(exp.body[exp.body.length-1]) + 
                ")" :            
                    
    isAppExp(exp) ?  (isPrimOp(exp.rator) ?  primOpApp2Python(exp.rator, exp.rands) : TranslateCExp(exp.rator) + "(" + map(TranslateCExp, exp.rands).join(",") + ")") :
    "never";
    

export const primOpApp2Python = (rator : PrimOp, rands : CExp[]) : string => 
    rator.op === "not" ? "(not " + TranslateCExp(rands[0]) + ")" :
    rator.op === "and" ? "(" + map(TranslateCExp,rands).join(" && ") + ")" :
    rator.op === "or" ? "(" + map(TranslateCExp,rands).join(" || ") + ")" :
    "(" + map(TranslateCExp,rands).join(" " + (rator.op === '=' ? '==' : rator.op) + " ") + ")"