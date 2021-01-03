import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * Circle class
 */
export class Circle extends PathAbstract{
    // PRIVATE PROPERTIES
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

    // PUBLIC METHODS
    drawObject(){
        var result = {
            type: "circle",
            center: this._options.center.value,
            radius: this._options.radius.value,
            clockwise: this._options.clockwise.value,
            startAngle: this._options.startAngle.value,
            endAngle: this._options.endAngle.value,
            fullFill: this._options.fullFill.value,
            fullStroke: this._options.fullStroke.value,
            strokeStyle: this._options.strokeStyle && this._options.strokeStyle.value,
            fillStyle: this._options.fillStyle && this._options.fillStyle.value,
            lineCap: this._options.lineCap && this._options.lineCap.value,
            lineWidth: this._options.lineWidth && this._options.lineWidth.value,
        };

        return result;
    }
}

export default Circle;