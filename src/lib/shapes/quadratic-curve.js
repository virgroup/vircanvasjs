import { isStrictObject } from "../utils";
import PathAbstract from "./path-abstract";

/**
 * 
 * QuadraticCurve class
 */
export class QuadraticCurve extends PathAbstract{
    // PRIVATE PROPERTIES
    _type = 'quadraticcurve';
    _options_properties = ['strokeStyle', 'lineCap', 'lineWidth'];
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
        controlPoint:{
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

export default QuadraticCurve;