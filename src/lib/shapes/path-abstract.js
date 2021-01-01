import {ProxyAbstarct, isColorString, validator} from "../utils";

/**
 * 
 * PathAbstract class
 * @abstract
 */
export class PathAbtract extends ProxyAbstarct{
    // RRIVATE PROPERTIES
    _full_options_validations = {
        fillStyle: {
            type: [String, Object],
            mutable: false,
            default: "#000",
            validator: function(value){
                var r = fasle;

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
            default: "butt",
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
            default: "miter",
            validator: function(value){
                return ["bevel", "round", "miter"].includes(value);
            },
        },
        lineWidth: {
            type: Number,
            default: 1.0,
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
            default: "#FFF",
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
            type: [String, Object],
            mutable: false,
            default: "#000",
            validator: function(value){
                var r = fasle;

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
                default: "start",
                validator: function(value){
                    return ["left", "right", "center", "start", "end"].includes(value);
                },
            },
            textBaseline: {
                type: String,
                mutable: false,
                default: "alphabetic",
                validator: function(value){
                    return ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"].includes(value);
                },
            },
        },
    };

    // RRIVATE METHODS
    _validate(options){
        var op_val = {};

        for(var p of this._options_properties){
            if(p in this._full_options_validations){
                op_val[p] = this._full_options_validations[p];
            }
        }
        
        return validator(options, op_val);
    }

    /**
     * 
     * @constructor
     */
    constructor(){
        super();

        if(new.target === PathAbtract){
            throw new TypeError("Can't instantiate abstract class!");
        }
    }    
}

export default PathAbtract;