import proxyHandler from "./proxy-handler";
import hasTypes from "./has-types";

/**
 * 
 * ProxyAbstract class
 * @abstract
 */
export class ProxyAbstract{
    // PROXY PROPERTIES
    _data = {};
    _options = {};
    _proxy_this = null;

    // PROXY METHODS
    _get(property){
        var value = undefined;

        if(property in this || typeof this[property] === "function"){
            value = this[property];
        }else if(property in this._options){
            value = this._options[property].value;
        }else if(property in this._data){
            value = this._data[property];
        }

        return value;
    }

    _set(property, value){
        var result = undefined;

        if(property in this._options){
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
        }else if(property in this && this[property] !== "function"){
            result = this[property] = value;
        }else{
            result = this._data[property] = value;
        }

        return result;
    }

    _has(property){
        return property in this._data || property in this._options;
    }

    _ownKeys(){
        return Object.getOwnPropertyNames(this._options).concat(Object.getOwnPropertyNames(this._data));
    }

    _delete(property){
        var result = false;

        if(property in this._data){
            result = delete this._data[property];
        }

        return result;
    }

    // PRIVATE METHODS
    _proxy(){
        this._proxy_this = new Proxy(this, proxyHandler());
        return this._proxy_this;
    }

    /**
     * 
     * @constructor
     */
    constructor(){
        if(new.target === ProxyAbstract){
            throw new TypeError("Can't instantiate abstract class!");
        }
    }
}

export default ProxyAbstract;