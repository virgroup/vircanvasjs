import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * Line class
 */
export class Line extends PathAbstract{
    // PRIVATE PROPERTIES
    _options_properties = ['strokeStyle', 'lineCap', 'lineWidth' ];
    _options_object = {
        from: {
            type: [Object, Array],
            mutable: false,
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
            type: "line",
            from: this._options.from && this._options.from.value,
            to: this._options.to && this._options.to.value,
            strokeStyle: this._options.strokeStyle && this._options.strokeStyle.value,
            lineCap: this._options.lineCap && this._options.lineCap.value,
            lineWidth: this._options.lineWidth && this._options.lineWidth.value,
        };

        return result;
    }
}

export default Line;