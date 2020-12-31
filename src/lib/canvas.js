/**
 * Canvas class
 */

import { proxyHandler, validator, isStrictObject, hasTypes } from "./utils";

export class Canvas{
    // PRIVATE PARAMETERS
    _options_validations = {
        container: {
            type: String,
            require: true,
            mutable: false,
            validator: function(value){
                return value[0] !== "#";    
            },
        },
        height: {
            type: [Number, Function, String],
            default: 500,
            mutable: false,
            validator: function(value){
                var type = typeof value;
                if(type === "function") {
                    value = value();
                    type = typeof value;
                }
                
                if(type === "string"){
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
            mutable: false,
            validator: function(value){
                var type = typeof value;
                if(type === "function") {
                    value = value();
                    type = typeof value;
                }

                if(type === "string"){
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

    _data = {};

    _container = null;
    
    _context = null;

    // PROXY METHODS
    _get(property){
        var value = undefined;

        if(this._options.hasOwnProperty(property)){
            value = this._options[property].value;
        }else if(this._data.hasOwnProperty(property)){
            value = this._data[property];
        }else if(typeof this[property] === "function"){
            value = this[property];
        }

        return value;
    }

    _set(property, value){
        var result = undefined;

        if(this._options.hasOwnProperty(property)){
            if(this._options[property].mutable){
                if(hasTypes(value, this._options[property].type)){
                    if(this._options[property].validator){
                        result = this._options[property] = value;
                    }else{
                        throw new Error("value is invalid value");
                    }
                }else{
                    throw new TypeError("value has invalid type");
                }
            }else{
                throw new Error("Can't set imutable property");
            }
        }else{
            result = this._data[property] = value;
        }

        return result;
    }

    _has(property){
        return this._data.hasOwnProperty(property) || this._options.hasOwnProperty(property);
    }

    _ownKeys(){
        return Object.getOwnPropertyNames(this._options).concat(Object.getOwnPropertyNames(this._data));
    }

    _delete(property){
        var result = false;

        if(this._data.hasOwnProperty(property)){
            result = delete this._data[property];
        }

        return result;
    }

    
    _size(container, height, width){
        var th = typeof height;
        var tw = typeof width;
        
        if(th === "function"){
            height = height();
            th = typeof height;
        }

        if(tw === "function"){
            width = width();
            tw = typeof width;
        }

        if(th === "string"){
            height = height.split("%");

            if(height.length === 2 && height[1] === ""){
                height = Number(height[0]) * container.clientHeight / 100;
            }else{
                height = 0;
            }
        }
        
        if(tw === "string"){
            width = width.split("%");

            if(width.length === 2 && width[1] === ""){
                width = Number(width[0]) * container.clientWidth / 100;
            }else{
                width = 0;
            }
        }

        console.log(height, width);
        
        return {height: height > 0 ? height : 0, width: width > 0 ? width : 0};
    }
    _init(){
        var container;
        var canvas;
        var context;
        var size;

        if(this._container === null){
            container = document.getElementById(this._options.container.value);
            if(container === null){
                throw new Error(`Can't find element by id of '${this._options.container.value}'.`);
            }

            size = this._size(container, this._options.height.value, this._options.width.value);
            container.innerHTML = `<canvas height="${size.height}" width="${size.width}"></canvas>`;
            canvas = container.querySelector("canvas");
            context = canvas.getContext("2d");

            this._container = container;
            this._context = context;
        }
    }

    /**
     * 
     * @constructor
     * @param {Object} options
     */
    constructor(options){
        
        if(isStrictObject(options)){
            options = validator(options, this._options_validations);
            if(options){
                this._options = options;
            }else{
                throw new TypeError("'options' is invalid.");
            }
        }else{
            throw new TypeError("'options' must be a object");
        }

        return new Proxy(this, proxyHandler());
    }

    // PRIVATE METHODS

    // PUBLIC METHODS

    destroy(){
        if(this._container !== null){
            this._container.innerHTML = '';

            this._container = null;
            this._context = null;            
        }

    }

    add(){
        // TODO IMPLEMENTION
    }

    draw(){
        this._init();

        // TODO IMPLEMENTION
    }
    
    delete(){
        // TODO IMPLEMENTION
    }
}

export default Canvas;