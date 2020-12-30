/**
 * @param {*} a 
 * 
 * @return {Object, Boolean}
 * @description  return `a` if `a` is a object, else false
 */
function virIsStrictObject(a){
    return typeof a === "object" && !Array.isArray(a) && a;
}

export default virIsStrictObject;