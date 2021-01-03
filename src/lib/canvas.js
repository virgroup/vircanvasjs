/**
 * Canvas class
 */

import PathAbtract from "./shapes/path-abstract";
import { ProxyAbstract, validator, isStrictObject } from "./utils";

class Canvas extends ProxyAbstract{
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
        globalAlpha: {
            type: Number,
            mutable: false,
            default: 1.0,
            validator: function(value){
                return value >= 0 && value <= 1;
            }
        },
        globalCompositeOperation: {
            type: String,
            mutable: false,
            default: "source-over",
            validator: function(value){
                return ["source-over", "source-in", "source-out", "source-atop",
                        "destination-over", "destination-in", "destination-out", "destination-atop",
                        "lighter", "copy", "xor", "multiply", "screen", "overlay",
                        "darken", "lighten", "color-dodge", "color-burn", "hard-light",
                        "soft-light", "difference", "exclusion", "hue",
                        "saturation", "color", "luminosity"].includes(value);
            }
        },
    };

    _container = null;
    _context = null;

    _pathes = [];

    _current_context_properties = {
        cords: {x: 0, y: 0},
        lineCap: "butt",
        lineWidth: 1,
        strokeStyle: "#000",
        fillStyle: "#000",
    };
    
    // PRIVATE METHODS
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

    _draw_line(d_obj, ctx_p){
        var ctx = this._context;

        if(typeof d_obj.to !== "object" || 
            (typeof d_obj.to.x !== "number" && typeof d_obj.to.y !== "number")){
            throw new TypeError("'to' parameter of line path is invalid");
        }

        if(typeof d_obj.from !== "object" || 
            (typeof d_obj.from.x !== "number" && typeof d_obj.from.y !== "number")){
            d_obj.from = this._current_context_properties.cords;
        }


        for(var p of ['strokeStyle', 'lineCap', 'lineWidth']){
            ctx[p] = d_obj.strokeStyle = typeof d_obj[p] === "undefined" ? ctx_p[p]: d_obj[p];
        }

        ctx.beginPath();
        ctx.moveTo(d_obj.from.x, d_obj.from.y);
        ctx.lineTo(d_obj.to.x, d_obj.to.y);
        
        ctx.stroke();

        return d_obj;
    }

    _draw_circle(d_obj, ctx_p){
        var ctx = this._context;

        if(typeof d_obj.center !== "object" || 
            (typeof d_obj.center.x !== "number" && typeof d_obj.center.y !== "number")){
            throw new TypeError("'center' parameter of circle path is invalid");
        }
        
        if(typeof d_obj.radius !== "number" && typeof d_obj.radius >= 0){
            throw new TypeError("'radius' parameter of circle path is invalid");
        }
        
        if(typeof d_obj.startAngle !== "number"){
            throw new TypeError("'startAngle' parameter of circle path is invalid");
        }
        
        if(typeof d_obj.endAngle !== "number"){
            throw new TypeError("'endAngle' parameter of circle path is invalid");
        }
        
        ctx.fillStyle = d_obj.fillStyle = typeof d_obj.fillStyle === "undefined" ? ctx_p.fillStyle: d_obj.fillStyle;
        ctx.beginPath();
        if(d_obj.fullFill){
            ctx.moveTo(d_obj.center.x, d_obj.center.y);
        }
        
        ctx.arc(d_obj.center.x, d_obj.center.y, d_obj.radius, d_obj.startAngle, d_obj.endAngle, d_obj.clockwise);

        if(d_obj.fullStroke){
            for(var p of ['strokeStyle', 'lineCap', 'lineWidth']){
                ctx[p] = d_obj.strokeStyle = typeof d_obj[p] === "undefined" ? ctx_p[p]: d_obj[p];
            }

            ctx.closePath();
            ctx.stroke();
        }
        ctx.fill();

        return d_obj;
    }
    
    _draw_arc(d_obj, ctx_p){
        var ctx = this._context;

        if(typeof d_obj.origin !== "object" || 
            (typeof d_obj.origin.x !== "number" && typeof d_obj.origin.y !== "number")){
            d_obj.origin = this._current_context_properties.cords;
        }

        if(typeof d_obj.from !== "object" || 
            (typeof d_obj.from.x !== "number" && typeof d_obj.from.y !== "number")){
            throw new TypeError("'to' parameter of line path is invalid");
        }

        if(typeof d_obj.to !== "object" || 
            (typeof d_obj.to.x !== "number" && typeof d_obj.to.y !== "number")){
            throw new TypeError("'to' parameter of line path is invalid");
        }
        
        if(typeof d_obj.radius !== "number" && typeof d_obj.radius >= 0){
            throw new TypeError("'radius' parameter of circle path is invalid");
        }

        ctx.beginPath();
        ctx.moveTo(d_obj.origin.x, d_obj.origin.y);
        ctx.arcTo(d_obj.from.x, d_obj.from.y, d_obj.to.x, d_obj.to.y, d_obj.radius);
        
        for(var p of ['strokeStyle', 'lineCap', 'lineWidth', 'fillStyle']){
            ctx[p] = d_obj.strokeStyle = typeof d_obj[p] === "undefined" ? ctx_p[p]: d_obj[p];
        }
        if(d_obj.fullStroke){
            ctx.closePath();
        }
        ctx.stroke();
        if(d_obj.fullFill){
            ctx.fill();
        }

        return d_obj;
    }

    /**
     * 
     * @constructor
     * @param {Object} options
     */
    constructor(options){
        super();

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

        return this._proxy();
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

    /**
     * 
     * @param {PathAbtract} path 
     * @param {string} name
     * 
     * @description add path to pathes list
     */
    add(path, name=''){
        if(path instanceof PathAbtract){
            if(typeof name !== "string") name = '';
            this._pathes.push({
                path: path,
                name: name,
                draw: false
            });
        }else{
            throw new TypeError("path must be a PathAbstract");
        }

        return this._proxy_this;
    }

    draw(){
        var d_obj;
        var ctx_p = Object.assign({}, this._current_context_properties);
        var res;

        this._init();
        this.clear();

        for(var path of this._pathes){
            if(path.draw === false){
                path = path.path;
    
                d_obj = path.drawObject();

                if(typeof d_obj !== "object"){
                    throw new TypeError("return type of 'drawObject' must be object");
                }
                if(typeof d_obj.type !== "string" && typeof this[`_draw_${d_obj.type}`] === "function"){
                    throw new TypeError("type of 'drawObject.type' is invalid");
                }

                this._context.save();
                res = this[`_draw_${d_obj.type}`](d_obj, ctx_p);
                for(var p in ctx_p){
                    if(typeof res[p] !== "undefined"){
                        ctx_p[p] = res[p];
                    }
                }
                this._context.restore();
            }
        }

        this._proxy_this;
    }
    
    /**
     * 
     * @param {PathAbtract, Object} path 
     * @param {string, Boolean} name
     * 
     * name: true -> all groups
     * name: false -> not global groups
     * name: '' -> global groups
     * name: else -> only `name` groups
     * @description remove path from pathes list
     */
    remove(path, name=true){
        var pathes = [];
        var fn;
        var id;

        if(!["string", "boolean"].includes(typeof name)){
            name = true;
        }

        if(path === null){
            if(name === true){
                pathes = [];
            }else{
                if(name === false){
                    fn = (item) => item.name === '';
                }else{
                    fn = (item) => item.name !== name;
                }
                pathes = this._pathes.filter(fn);
            }
        }else if(path instanceof PathAbtract){
            var id = path.entityId();

            if(name === true){
                fn = (item) => item.path.entityId() !== id;
            }else if(name === false){
                fn = (item) => item.path.entityId() !== id || item.name === '';
            }else{
                fn = (item) => item.path.entityId() !== id || item.name !== name;
            }

            pathes = this._pathes.filter(fn);
        }else{
            throw new TypeError("path must be a PathAbstract");
        }

        this._pathes = pathes;
    }

    /**
     * 
     * @description clear canvas
     */
    clear(){
        this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }
}

export default Canvas;