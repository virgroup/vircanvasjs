"use strict";

import {isStrictObject} from "./object";
import hasTypes from "./has-types";

/**
 * 
 * @param {Object} @requires data
 * @param {Object} @requires validator
 * 
 * @return {Object, Boolean}
 * @description return valid data if 'data' is valid, else false
 */
export function validator(data, validator){
    var result = false;
    var des;
    var in_type;
    var value;

    if(isStrictObject(data) && isStrictObject(validator)){
        result = {};
        for(var key in validator){
            des = validator[key];
            in_type = -1;
            value = {
                value: undefined,
                type: undefined,
                mutable: true,
                validator: (value) => true,
            };

            switch(typeof des){
                case "string":
                    if(key in data){
                        in_type = hasTypes(data[key], des);
                        value.type = des;
                    }

                    break;
                case "function":
                    if(key in data){
                        in_type = hasTypes(data[key], des);
                        value.type = des;
                    }

                    break;
                case "object":
                    if(Array.isArray(des)){
                        value.type = des;

                        for(var t of des){
                            switch(typeof t){
                                case "string":
                                    if(key in data){
                                        in_type = hasTypes(data[key], t);
                                    }
                                    break;
                                case "function":
                                    if(key in data){
                                        in_type = hasTypes(data[key], t);
                                    }
                                    break;
                                case null:
                                    if(key in data){
                                        in_type = true;
                                    }
                            }

                            if(in_type === true) break;
                        }
                    }else if(des === null){
                        in_type = true;
                        value.type = null;
                    }else{
                        value.type = 'type' in des ? des.type : null;
                        if(typeof des.mutable === "boolean") value.mutable = des.mutable;

                        if(key in data){
                            in_type = hasTypes(data[key], value.type);
                            if(in_type){                                
                                if(typeof des.validator === "function"){
                                    if(des.validator(data[key])){
                                        value.value = data[key];
                                        value.validator = des.validator;
                                    }else{
                                        throw new Error(`value of '${key}' is invalid.`);
                                    }
                                }
                            }
                        }else if('default' in des && des.default !== undefined){
                            value.value = des.default;
                            in_type = hasTypes(value.value, value.type);
                        }else if(des.require === true){
                            throw new Error(`'${key}' is required.`);
                        }else{
                            in_type = true;
                        }

                        if(typeof des.calcValue === "function"){
                            value.value = des.calcValue(value.value);
                        }
                    }
                    break;
                default:
                    throw new TypeError(`'${key}' of validator has'nt valid type.`);
            }

            if(in_type === true){
                if(value.value === undefined) value.value = data[key];

                result[key] = value;
            }else if(in_type === false){
                throw new TypeError(`'${key}' value is invalid type.`);
            }else if(in_type !== -1){
                result = false;

                break;
            }
        }
    }else{
        throw new TypeError("'data' and 'validator' must be objects");
    }
    
    return result;
}

export default validator;