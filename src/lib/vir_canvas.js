/**
 * VirCanvas class
 */

import { virProxyHandler, virValidator, virIsStrictObject } from "./utils";

class VirCanvas{
    // PRIVATE PARAMETERS
    _options_validations = {
        container: {
            type: String,
            require: true,
            validator: function(value){
                return value[0] !== "#";    
            }
        },
        height: {
            type: [Number, Function, String],
            default: 500,
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

    // PUBLIC PARAMETERS
    
    /**
     * 
     * @constructor
     * @param {Object} options
     */
    constructor(options){
        
        if(virIsStrictObject(options)){
            options = virValidator(options, this._options_validations);
            if(options){
                this._options = options;
            }else{
                throw new TypeError("'options' is invalid.");
            }
        }else{
            throw new TypeError("'options' must be a object");
        }

        return new Proxy(this, virProxyHandler());
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

export default VirCanvas;