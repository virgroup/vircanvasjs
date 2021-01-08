import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * Line class
 */
export class Line extends PathAbstract{
    // PRIVATE PROPERTIES
    _type = 'line';
    _options_properties = ['strokeStyle', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit'];
    _options_object = {
        from: {
            type: [Object, Array],
            mutable: false,
            calcValue: function(value){
                var v = undefined;

                if(isStrictObject(value)){
                    v = {
                        x: value.x,
                        y: value.y
                    };
                }else if(Array.isArray(value)){
                    v = {
                        x: value[0],
                        y: value[1]
                    };
                }

                return v;
            },
            validator: function(value){
                var v = false;

                if(isStrictObject(value)){
                    v = typeof value.x === "number";
                    v = v && typeof value.x === "number";
                }else if(Array.isArray(value) && value.length === 2){
                    v = typeof value[0] === "number";
                    v = v && typeof value[1] === "number";
                }

                return v;
            },
        },
        to: {
            type: [Object, Array],
            mutable: false,
            require: true,
            calcValue: function(value){
                var v = undefined;

                if(isStrictObject(value)){
                    v = {
                        x: value.x,
                        y: value.y
                    };
                }else if(Array.isArray(value)){
                    v = {
                        x: value[0],
                        y: value[1]
                    };
                }

                return v;
            },
            validator: function(value){
                var v = false;

                if(isStrictObject(value)){
                    v = typeof value.x === "number";
                    v = v && typeof value.y === "number";
                }else if(Array.isArray(value) && value.length === 2){
                    v = typeof value[0] === "number";
                    v = v && typeof value[1] === "number";
                }

                return v;
            },
        },
        lineDash: {
            type: Array,
            mutable: false,
            require: true,
            default: [],
            validator: function(value){
                var res = true;

                for(var v of value){
                    res &&= typeof v === "number" && v >= 0;
                }

                return res;
            }
        },
        lineDashOffset: {
            type: Number,
            mutable: false,
            require: true,
            default: 0,
            // validator: function(value){
                
            // }
        },

    };

    /**
     * 
     * @constructor
     */
    constructor(options){
        super();

        this._options = this._validate(options);

        return this._proxy();
    }
}

export default Line;