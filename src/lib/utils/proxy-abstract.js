import proxyHandler from "./proxy-handler";

/**
 * 
 * ProxyAbstarct class
 * @abstract
 */
export class ProxyAbstarct{
    // PROXY PROPERTIES
    _data = {};
    _options = {};

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

    // PRIVATE METHODS
    _proxy(){
        return new Proxy(this, proxyHandler());
    }

    /**
     * 
     * @constructor
     */
    constructor(){
        if(new.target === ProxyAbstarct){
            throw new TypeError("Can't instantiate abstract class!");
        }
    }
}

export default ProxyAbstarct;