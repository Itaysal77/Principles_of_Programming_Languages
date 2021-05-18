import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
function isVowel (s:string) :boolean {
    return(s==='a'||s==='e'||s==='i'||s==='o'||s==='u'||s==='A'||s==='E'||s==='I'||s==='O'||s==='U')
  };
export const countVowels =function (str: string):number{
  const strArray: string[]=stringToArray(str);
  return strArray.filter(isVowel).length;
}

/* Question 2 */

 function buildString (str:string[], numString:number[]):string{
   if (str.length==0)
    return "";
   else{
     if (numString[0]===1){
      return (str[0].concat(buildString(str.slice(1),numString.slice(1))));
     }
     else{
      return (str[0].concat(numString[0].toString().concat(buildString(str.slice(1),numString.slice(1)))));
     }
 }
}
export const runLengthEncoding=(str:string):string=>{
  const strArray: string[]=R.groupWith(R.equals,str);
  const sizeArr:number[]=R.map(x=>x.length,strArray);
  const charArr=R.map(x=>x[0],strArray);
   return (buildString(charArr,sizeArr));
}

/* Question 3 */
function isBracket (s:string) :boolean {
  return(s==='{'||s==='}'||s==='('||s===')'||s==='['||s===']')
}
export const isPaired = function (str:string):boolean{
  const strArray: string[]=stringToArray(str);
  const bracketArray:string[]= strArray.filter(isBracket);
  const legalBracket:string=bracketArray.reduce((outAcc:string,currChar:string)=>{
    if (outAcc!=='F'){ //checks if we already got a false value
    if (currChar==='('||currChar==='{'||currChar==='[') //we will accumilate every opening bracket
    return outAcc.concat(currChar);
    else{ 
      const lastChar:string=outAcc.slice(outAcc.length-1);
       if (currChar===')'&&lastChar!=='('||currChar==='}'&&lastChar!=='{'||currChar===']'&&lastChar!=='[') //checks if the cloosing bracket is matching to last open
          return 'F';
      else return outAcc.slice(0,outAcc.length-1); //matches so we will only remove the last one and continue
  }
}
  return outAcc;
},"");
 if (legalBracket==="")
 return true;
 return false;
}

