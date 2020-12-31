"use strict";

import {isStrictObject} from "./object";
import hasTypes from "./has-types";

/**
 * 
 * @param {Object} @requires data
 * @param {Object} @requires validator
 * @param {Boolean} _throw @default false
 * 
 * @return {Object, Boolean}
 * @description return valid data if 'data' is valid, else false
 */
export function validator(data, validator, _throw=false){
    var result = false;
    var des;
    var in_type;
    var value;
    var t_value;

    if(isStrictObject(data) && isStrictObject(validator)){
        result = {};
        for(var key in validator){
            des = validator[key];
            in_type = -1;
            value = {
                value: undefined,
                type: undefined,
                validator: (value) => true,
            };

            switch(typeof des){
                case "string":
                    if(data.hasOwnProperty(key)){
                        in_type = hasTypes(data[key], des);
                        value.type = des;
                    }

                    break;
                case "function":
                    if(data.hasOwnProperty(key)){
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
                                    if(data.hasOwnProperty(key)){
                                        in_type = hasTypes(data[key], t);
                                    }
                                    break;
                                case "function":
                                    if(data.hasOwnProperty(key)){
                                        in_type = hasTypes(data[key], t);
                                    }
                                    break;
                                case null:
                                    if(data.hasOwnProperty(key)){
                                        in_type = true;
                                    }
                            }

                            if(in_type === true) break;
                        }
                    }else if(des === null){
                        in_type = true;
                        value.type = null;
                    }else{
                        value.type = des.hasOwnProperty('type') ? des.type : null;

                        if(data.hasOwnProperty(key)){
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
                        }else if(des.hasOwnProperty('default') && des.default !== undefined){
                            value.value = des.default;
                            in_type = hasTypes(value.value, value.type);
                        }else if(des.require === true){
                            throw new Error(`'${key}' is required.`);
                        }
                    }
                    break;
                default:
                    throw new TypeError(`'${key}' of validator has'nt valid type.`);
            }

            if(in_type === true){
                if(value.value === undefined) value.value = data[key];

                result[key] = value;
            }else if(in_type === false && _throw){
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

export {validator as default};