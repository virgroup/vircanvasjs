/**
 * Canvas class
 */

import {PathAbtract, CanvasGradient} from "./shapes";
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

    _validations_path_func = {
        isPoint : function(name, path, value, ctx_p){
            var check = true;

            if(typeof value === 'undefined'){
                if(name === "from" || name === "origin"){
                    value = ctx_p.cords;
                }else if(name === "to" && path === "rect"){
                    check = false;
                }
            }

            if(check && !this._isPoint(value)){
                throw new TypeError(`'${name}' parameter of '${path}' path is invalid`);
            }

            return value;
        },
        
        getColor: function(name, path, value, ctx_p){
            if(typeof ctx_p !== "undefined" && (typeof value === "undefined" || value === "") && name in ctx_p){
                value = ctx_p[name];
            }

            return this._getColor(value);
        },
        _: function(name, path, value, ctx_p){
            if(typeof ctx_p !== "undefined" && (typeof value === "undefined" || value === "") && name in ctx_p){
                value = ctx_p[name];
            }

            return value;
        }
    };

    _validations_path_options = {
        to: "isPoint",
        from: "isPoint",
        origin: "isPoint",
        fillStyle: "getColor",
        strokeStyle: "getColor",
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

    _getColor(color){
        if(color instanceof CanvasGradient){
            color = color.getColor(this._context);
        }

        return color;
    }

    _isPoint(value){
        return isStrictObject(value) && (typeof value.x === "number" && typeof value.y === "number");
    }

    _draw_line(ctx, d_obj){
        var res = {}

        ctx.beginPath();
        ctx.moveTo(d_obj.from.x, d_obj.from.y);
        ctx.lineTo(d_obj.to.x, d_obj.to.y);
        
        ctx.stroke();

        res.cords = d_obj.to;

        return res;
    }

    _draw_circle(ctx, d_obj){
        var res = {};

        ctx.beginPath();
        if(d_obj.fullFill){
            ctx.moveTo(d_obj.center.x, d_obj.center.y);
        }
        
        ctx.arc(d_obj.center.x, d_obj.center.y, d_obj.radius, d_obj.startAngle, d_obj.endAngle, d_obj.clockwise);

        if(d_obj.fullStroke){
            ctx.closePath();
            ctx.stroke();
        }
        ctx.fill();

        res.cords = {
            x: d_obj.center.x + d_obj.radius * Math.cos(d_obj.endAngle),
            y: d_obj.center.y + d_obj.radius * Math.sin(d_obj.endAngle),
        };

        return res;
    }
    
    _draw_arc(ctx, d_obj){
        var res = {};

        ctx.beginPath();
        ctx.moveTo(d_obj.origin.x, d_obj.origin.y);
        ctx.arcTo(d_obj.from.x, d_obj.from.y, d_obj.to.x, d_obj.to.y, d_obj.radius);

        if(d_obj.fullStroke){
            ctx.closePath();
        }
        ctx.stroke();
        if(d_obj.fullFill){
            ctx.fill();
        }

        res.cords = d_obj.origin;

        return res;
    }

    _draw_rect(ctx, d_obj){
        var res = {};
        var from;
        var to;
        var height;
        var width;

        from = d_obj.from;

        if(typeof d_obj.height === 'number' && typeof d_obj.width === 'number'){
            height = d_obj.height;
            width = d_obj.width;

            to = {
                x: from.x + width,
                y: from.y + height
            };
        }else if('to' in d_obj && this._isPoint(d_obj.to)){
            to = d_obj.to;
            height = to.y - from.y;    
            width = to.x - from.x;
        }else{
            throw new TypeError("Some options to draw rect is mission");
        }

        ctx.beginPath();
        ctx.moveTo(d_obj.from.x, d_obj.from.y);

        if(d_obj.fullStroke){
            ctx.strokeRect(from.x, from.y, width, height);
        }
        
        if(d_obj.fullFill){
            ctx.fillRect(from.x, from.y, width, height);
        }

        res.cords = to;

        return res;
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
        var vpo = this._validations_path_options;
        var vpf = this._validations_path_func;
        var func;

        var ctx;
        var ctx_p = Object.assign({}, this._current_context_properties);
        var d_obj;
        var res;

        this._init();
        this.clear();

        ctx = this._context;

        for(var path of this._pathes){
            if(path.draw === false){
                path = path.path;
    
                d_obj = path.drawObject();

                if(isStrictObject(d_obj)){
                    d_obj = [d_obj];
                }else if(!Array.isArray(d_obj)){
                    throw new TypeError("return type of 'drawObject' must be a object or array of objects");
                }

                for(var item of d_obj){
                    if(typeof item.type !== 'string' || typeof this[`_draw_${item.type}`] !== "function"){
                        throw new TypeError("type of 'path' is invalid type");
                    }
                    ctx.save();

                    for(var p in item){
                        if(p in vpo && vpo[p] in vpf){
                            func = vpf[vpo[p]];
                        }else{
                            func = vpf['_'];
                        }
                        
                        item[p] = func.call(this, p, item.type, p in item ? item[p] : undefined, ctx_p);

                        if(p in ctx_p){
                            ctx_p[p] = item[p];
                            ctx[p] = item[p];
                        }
                    }
                    
                    res = this[`_draw_${item.type}`](ctx, item);
                    if(isStrictObject(res)){
                        for(var _p in Object.assign({}, res)){
                            if(_p in ctx_p){
                                ctx_p[_p] = res[_p];
                            }
                        }
                    }

                    ctx.restore();
                }

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
            id = path.entityId();

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