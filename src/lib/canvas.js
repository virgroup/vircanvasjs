/**
 * Canvas class
 */

import { proxyHandler, validator, isStrictObject, hasTypes } from "./utils";

export default class Canvas{
    // PRIVATE PARAMETERS
    _options_validations = {
        container: {
            type: String,
            require: true,
            mutable: false,
            validator: function(value){
                return value[0] !== "#";    
            },
        },
        height: {
            type: [Number, Function, String],
            default: 500,
            mutable: false,
            validator: function(value){
                var type = typeof value;
                if(type === "function") value = value();
                else if(type === "string"){
                    value = value.split("%");

                    if(value.length === 2 && value[1] === ""){
                        value = Number(value[0]);
                    }else{
                        value = 0;
                    }
                }

                return value > 0;
            }
        },
        width: {
            type: [Number, Function, String],
            default: "100%",
            mutable: false,
            validator: function(value){
                var type = typeof value;
                if(type === "function") value = value();
                else if(type === "string"){
                    value = value.split("%");

                    if(value.length === 2 && value[1] === ""){
                        value = Number(value[0]);
                    }else{
                        value = 0;
                    }
                }

                return value > 0;
            }
        },

    };

    _options = {};

    _data = {};

    // PROXY METHODS
    _get(property){
        var value = undefined;

        if(this._options.hasOwnProperty(property)){
            value = this._options[property].value;
        }else if(this._data.hasOwnProperty(property)){
            value = this._data[property];
        }

        return value;
    }

    _set(property, value){
        var result = undefined;

        if(this._options.hasOwnProperty(property)){
            if(this._options[property].mutable){
                if(hasTypes(value, this._options[property].type)){
                    if(this._options[property].validator){
                        result = this._options[property] = value;
                    }else{
                        throw new Error("value is invalid value");
                    }
                }else{
                    throw new TypeError("value has invalid type");
                }
            }else{
                throw new Error("Can't set imutable property");
            }
        }else{
            result = this._data[property] = value;
        }

        return result;
    }

    _has(property){
        return this._data.hasOwnProperty(property) || this._options.hasOwnProperty(property);
    }

    _ownKeys(){
        return Object.getOwnPropertyNames(this._options).concat(Object.getOwnPropertyNames(this._data));
    }

    _delete(property){
        var result = false;

        if(this._data.hasOwnProperty(property)){
            result = delete this._data[property];
        }

        return result;
    }

    /**
     * 
     * @constructor
     * @param {Object} options
     */
    constructor(options){
        
        if(isStrictObject(options)){
            options = validator(options, this._options_validations);
            if(options){
                this._options = options;
            }else{
                throw new TypeError("'options' is invalid.");
            }
        }else{
            throw new TypeError("'options' must be a object");
        }

        return new Proxy(this, proxyHandler());
    }

    // PRIVATE METHODS

    // PUBLIC METHODS

    destroy(){
        // TODO IMPLEMENTION
    }

    add(){
        // TODO IMPLEMENTION
    }

    draw(){
        // TODO IMPLEMENTION
    }
    
    delete(){
        // TODO IMPLEMENTION
    }
}