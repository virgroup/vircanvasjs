/**
 * @param {*} a 
 * 
 * @return {Object, Boolean}
 * @description  return `a` if `a` is a object, else false
 */
export function isStrictObject(a){
    return typeof a === "object" && !Array.isArray(a) && a;
}