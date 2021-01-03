import {ProxyAbstract, isColorString, validator, isStrictObject} from "../utils";

/**
 * 
 * CanvasGradient class
 */

export class CanvasGradient extends ProxyAbstract{
    // PRIVATE PROPERTIES
    _options = {};
    _options_properties = {
        type: {
            type: Object,
            require: true,
            mutable: false,
            calcValue: function(value){
                var r = {
                    name: value.name,
                    from : {},
                    to : {},
                };

                if(isStrictObject(value.from === "object")){
                    r.from = {
                        x: value.from.x,
                        y: value.from.y,
                    };

                    if(typeof value.from.radian === "undefined") r.from.radian = value.from.radian;
                }else if(Array.isArray(value.from) && value.from.length >= 2){
                    r.from = {
                        x: value.from[0],
                        y: value.from[1],
                    };

                    if(typeof value.from[3] === "undefined") r.from.radian = value.from[3];
                }
                
                if(isStrictObject(value.to === "object")){
                    r.to = {
                        x: value.to.x,
                        y: value.to.y,
                    };

                    if(typeof value.to.radian === "undefined") r.to.radian = value.to.radian;
                }else if(Array.isArray(value.to) && value.to.length >= 2){
                    r.to = {
                        x: value.to[0],
                        y: value.to[1],
                    };

                    if(typeof value.to[3] === "undefined") r.to.radian = value.to[3];
                }


                return r;
            },
            validator: function(value){
                var v = true;

                if(typeof value.name === "string"){
                    switch(value.name){
                        case 'radial':
                            if(isStrictObject(value.from)){
                                v = v && typeof value.from.x === "number" && typeof value.from.y === "number" && typeof value.to.radian === "number";
                            }else if(Array.isArray(value.from) && value.from.length >= 2){
                                v &&= true;
                            }else{
                                v = false;
                            }
                            
                            if(isStrictObject(value.to)){
                                v = v && typeof value.to.x === "number" && typeof value.to.y === "number" && typeof value.to.radian === "number";
                            }else if(Array.isArray(value.to) && value.to.length >= 3){
                                v &&= true;
                            }else{
                                v = false;
                            }

                            break;
                        case 'linear':
                            if(isStrictObject(value.from)){
                                v = v && typeof value.from.x === "number" && typeof value.from.y === "number";
                            }else if(Array.isArray(value.from) && value.from.length >= 2){
                                v &&= true;
                            }else{
                                v = false;
                            }
                            
                            if(isStrictObject(value.to)){
                                v = v && typeof value.to.x === "number" && typeof value.to.y === "number";
                            }else if(Array.isArray(value.to) && value.to.length >= 2){
                                v &&= true;
                            }else{
                                v = false;
                            }
                            break;
                    }
                }else{
                    v = false;
                }


                return v;
            }
        },
        stopColors: {
            type: Array,
            require: true,
            mutable: false,
            validator: function(value){
                var v = true;

                for(var s of value){
                    if(Array.isArray(s) && s.length >= 2 &&
                        (typeof s[0] === "number" && s[0] >=0 && s[0] <= 1) &&
                        (typeof s[1] === "string" && isColorString(s[1]))){
                            v = v && true;
                    }else{
                        v = false;
                    }
                }

                return value.length >= 1 && v;
            },
        }
    };

    /**
     * 
     * @constructor
     */
    constructor(options){
        super();

        this._options = validator(options, this._options_properties, true);

        return this._proxy();
    }

    getColor(ctx){
        var t = this._options.type.value;
        var g;

        if(t.name === "linear"){
            g = ctx.createLinearGradient(t.from.x, t.from.y, t.to.x, t.to.y);
        }else{
            g = ctx.createRadialGradient(t.from.x, t.from.y, t.from.radian, t.to.x, t.to.y, t.to.radian);
        }

        for(var s of this._options.stopColors.value){
            g.addColorStop(s[0], s[1]);
        }

        return g;
    }
}

export {CanvasGradient as default};