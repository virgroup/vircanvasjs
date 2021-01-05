import {ProxyAbstract, isColorString, validator, isStrictObject} from "../utils";
import CanvasGradient from "./canvas-gradient";

let basis_entity_id = 0;
/**
 * 
 * PathAbstract class
 * @abstract
 */
export class PathAbtract extends ProxyAbstract{
    // RRIVATE PROPERTIES
    _entity_id = 0;
    _share_options_validations = {
        fillStyle: {
            type: [String, Object],
            mutable: false,
            default: "",
            validator: function(value){
                var r = false;

                switch(typeof value){
                    case "string":
                        r = isColorString(value);
                        break;
                    case "object":
                        if(typeof window !== "undefined" && 
                            'CanvasGradient' in window &&
                            'CanvasPattern' in window){

                            r = value instanceof CanvasPattern || value instanceof CanvasGradient;

                        }
                        break;
                }

                return r;
            }
        },
        font: {
            type: String,
            mutable: false
        },
        imageSmoothingEnabled: {
            type: Boolean,
            mutable: false,
            default: true
        },
        lineCap: {
            type: String,
            mutable: false,
            validator: function(value){
                return ["butt", "round", "square"].includes(value);
            },
        },
        lineDashOffset: {
            type: Number,
            default: 0.0,
            mutable: false,
            validator: function(value){
                return value >= 0 && !isNaN(value) && isFinite(value);
            }
        },
        lineJoin: {
            type: String,
            mutable: false,
            default: "",
            validator: function(value){
                return ["bevel", "round", "miter"].includes(value);
            },
        },
        lineWidth: {
            type: Number,
            mutable: false,
            validator: function(value){
                return value > 0 && !isNaN(value) && isFinite(value);
            }
        },
        miterLimit: {
            type: Number,
            default: 1.0,
            mutable: false,
            validator: function(value){
                return value > 0 && !isNaN(value) && isFinite(value);
            }
        },
        shadowBlur: {
            type: Number,
            default: 0.0,
            mutable: false,
            validator: function(value){
                return value >= 0 && !isNaN(value) && isFinite(value);
            }
        },
        shadowColor: {
            type: String,
            mutable: false,
            default: "",
            validator: function(value){
                return isColorString(value);
            }
        },
        shadowOffsetX: {
            type: Number,
            default: 0.0,
            mutable: false,
            validator: function(value){
                return !isNaN(value) && isFinite(value);
            }
        },
        shadowOffsetY: {
            type: Number,
            default: 0.0,
            mutable: false,
            validator: function(value){
                return !isNaN(value) && isFinite(value);
            }
        },
        strokeStyle: {
            type: [String, CanvasGradient],
            mutable: false,
            default: "",
            validator: function(value){
                var r = false;

                switch(typeof value){
                    case "string":
                        r = isColorString(value);
                        break;
                    case "object":
                        if(typeof window !== "undefined" && 
                            'CanvasGradient' in window &&
                            'CanvasPattern' in window){

                            r = value instanceof CanvasPattern || value instanceof CanvasGradient;

                        }
                        break;
                }

                return r;
            },
            textAlign: {
                type: String,
                mutable: false,
                default: "",
                validator: function(value){
                    return ["left", "right", "center", "start", "end"].includes(value);
                },
            },
            textBaseline: {
                type: String,
                mutable: false,
                default: "",
                validator: function(value){
                    return ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"].includes(value);
                },
            },
        },
    };
    _options_properties = [];
    _type = '';

    /**
     * 
     * @constructor
     */
    constructor(){
        super();

        if(new.target === PathAbtract){
            throw new TypeError("Can't instantiate abstract class!");
        }

        this._entity_id = ++basis_entity_id;
    }

    // RRIVATE METHODS
    _validate(options){
        var op_val = {};

        for(var p of this._options_properties){
            if(p in this._share_options_validations){
                op_val[p] = this._share_options_validations[p];
            }
        }
        
        return Object.assign(validator(options, op_val), validator(options, this._options_object));
    }

    // PUBLIC METHOD
    entityId(){
        return this._entity_id;
    }

    drawObject(){
        var options = this._options;
        var result = {};

        if(typeof this._type === 'string' && isStrictObject(options)){
            result.type = this._type;
            for(var name in options){
                result[name] = options[name] && options[name].value;
            }
        }


        return result;
    }
}

export default PathAbtract;