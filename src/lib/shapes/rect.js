import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * Line class
 */
export class Rect extends PathAbstract{
    // PRIVATE PROPERTIES
    _type = 'rect';
    _options_properties = ['strokeStyle', 'lineCap', 'lineWidth', 'fillStyle'];
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
        height: {
            type: Number,
            mutable: false,
        },
        width: {
            type: Number,
            mutable: false,
        },
        fullFill:{
            typeof: Boolean,
            mutable: false,
            require: true,
            default: false,
        },
        fullStroke:{
            typeof: Boolean,
            mutable: false,
            require: true,
            default: true,
        }
    };

    /**
     * 
     * @constructor
     */
    constructor(options){
        var invalid = true;

        super();

        this._options = this._validate(options);

        if(typeof this._options.height.value === "number" && typeof this._options.width.value === "number"){
            invalid = false;
        }
        
        if(typeof this._options.to.value !== "undefined"){
            invalid = false;
        }

        if(invalid || (this._options.fullFill === false && this._options.fullStroke === false)){
            throw new TypeError("Some options to draw rect is missing");
        }

        return this._proxy();
    }
}

export default Rect;