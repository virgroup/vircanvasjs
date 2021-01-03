import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * Arc class
 */
export class Arc extends PathAbstract{
    // PRIVATE PROPERTIES
    _options_properties = ['strokeStyle', 'lineCap', 'lineWidth', 'fillStyle'];
    _options_object = {
        origin: {
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
        from: {
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
        radius: {
            typeof: Number,
            mutable: false,
            require: true,
            validator: function(value){
                return value > 0 && !isNaN(value) && isFinite(value);
            }
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
            type: "arc",
            origin: this._options.origin && this._options.origin.value,
            from: this._options.from.value,
            to: this._options.to.value,
            radius: this._options.radius.value,
            fullStroke: this._options.fullStroke.value,
            fullFill: this._options.fullFill.value,
            strokeStyle: this._options.strokeStyle && this._options.strokeStyle.value,
            lineCap: this._options.lineCap && this._options.lineCap.value,
            lineWidth: this._options.lineWidth && this._options.lineWidth.value,
            fillStyle: this._options.fillStyle && this._options.fillStyle.value,
        };

        return result;
    }
}

export default Arc;