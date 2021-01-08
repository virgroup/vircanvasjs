import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * Circle class
 */
export class Circle extends PathAbstract{
    // PRIVATE PROPERTIES
    _type = 'circle';
    _options_properties = ['strokeStyle', 'lineCap', 'lineWidth', 'fillStyle'];
    _options_object = {
        center: {
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
        radius: {
            typeof: Number,
            mutable: false,
            require: true,
            validator: function(value){
                return value >= 0 && !isNaN(value) && isFinite(value);
            }
        },
        clockwise: {
            typeof: Boolean,
            mutable: false,
            defulat: true,
            require: true
        },
        startAngle: {
            typeof: Number,
            mutable: false,
            require: true,
            default: 0,
        },
        endAngle: {
            typeof: Number,
            mutable: false,
            require: true,
            default: Math.PI * 2,
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
        super();

        this._options = this._validate(options);

        return this._proxy();
    }
}

export default Circle;