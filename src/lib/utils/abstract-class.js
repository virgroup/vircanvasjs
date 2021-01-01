/**
 * AbstractClass
 * 
 * @abstract
 */

export class AbstractClass{
    /**
     * @param {Class} _constructor
     * @constructor
     */
    constructor(_constructor){
        if((this.prototype === AbstractClass || this.__proto__.constructor === AbstractClass) ||
            (_constructor !== undefined && this.prototype === _constructor ||
                this.__proto__.constructor == _constructor)){
            throw new Error("Can't instantiate abstract class!");
        }
    }
}

export default AbstractClass;