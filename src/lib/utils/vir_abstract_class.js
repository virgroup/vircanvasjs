/**
 * VirAbstract Class
 * 
 * @abstract
 */

class VirAbstractClass{
    /**
     * @param {Class} _constructor
     * @constructor
     */
    constructor(_constructor){
        if((this.prototype === VirAbstractClass || this.__proto__.constructor === VirAbstractClass) ||
            (_constructor !== undefined && this.prototype === _constructor ||
                this.__proto__.constructor == _constructor)){
            throw new Error("Can't instantiate abstract class!");
        }
    }
}

export default VirAbstract;