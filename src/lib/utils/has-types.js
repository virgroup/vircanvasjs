"use strict";

/**
 * 
 * @param {*} value
 * @param {String, Function, Array} types @default null
 * 
 * @return {Boolean}
 * @description return true if 'value' is in 'types' or 'types' is null
 */
export function hasTypes(value, types=null){
    var result = false;
    var t_value = typeof value;
    var t_type;

    types = Array.isArray(types) ? types : [types];

    for(var type of types){
        t_type = typeof type;
        
        if(type === null){
            result = true;
        }else if(t_type === "string"){
            type = type.toLowerCase();
    
            switch(type){
                case "array":
                    result = Array.isArray(value);
                    break;
                case "s_object":
                    result = t_value === "object" && !Array.isArray(value);
                    break;
                case "object":
                    result = t_value === "object";
                    break;
                case "string":
                    result = t_value === "string";
                    break;
                case "function":
                    result = t_value === "function";
                    break;
                case "number":
                    result = t_value === "number";
                    break;
                case "boolean":
                    result = t_value === "boolean";
                    break;
                case "symbol":
                    result = t_value === "symbol";
                    break;
                default:
                    throw new TypeError(`'${type}' is not valid type.`);
            }
        }else if(t_type === "function"){
            switch(type){
                case Array:
                    result = Array.isArray(value);
                    break;
                case Object:
                    result = t_value === "object";
                    break;
                case String:
                    result = t_value === "string";
                    break;
                case Function:
                    result = t_value === "function";
                    break;
                case Number:
                    result = t_value === "number";
                    break;
                case Boolean:
                    result = t_value === "boolean";
                    break;
                case Symbol:
                    result = t_value === "symbol";
                    break;
                default:
                    result = value instanceof type;
            }
        }else{
            throw new TypeError("'type' must be a string or function, or array of both.");
        }

        if(result) break;
    }


    return result;
}

export {hasTypes as default};