/**
 * VirProxy function
 * 
 * @abstract
 */

function _invariant(property, action) {
    if (property[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${property}" property`);
    }

    return true;
}

function virProxyHandler(){
    return {
        apply: function(target, self, args){
            var r = null;

            if(typeof target._disable_call === "boolean" && target._disable_call === true){
                throw new Error("Object is'nt callable");
            }else if(typeof target._call === "function"){
                r = target._call(...args);
            }

            return r;
        },

        construct: function(target, args, new_tagert){
            var r;

            if(typeof target._disable_construct === "boolean" && target._disable_construc === true){
                throw new Error("Object is'nt callable");
            }

            return new target(...args);
        },

        defineProperty: function(target, property, descriptor){
            var valid = typeof target._invariant === "function" ?
                                target._invariant(property, 'define') : _invariant(property, 'define');
            
            return valid && typeof target._disable_define_proerty === "boolean" ? target._disable_define_proerty : valid;
        },

        deleteProperty: function(target, property){
            var r = false;

            if(typeof target._disable_delete === "boolean" && target._disable_delete === true){
                throw new Error(`Can't delete ''${property}'' of this object.`);
            }else if(typeof target._delete === "function"){
                r = target._delete(property);
            }else if(property in target){
                delete target[property];
                r = true;
            }

            return false;
        },

        get: function(target, property, receiver){
            var r = undefined,
                valid = typeof target._invariant === "function" ?
                                target._invariant(property, 'get') : _invariant(property, 'get');
            
            if(valid){
                if(typeof target._get === "function"){
                    r = target._get(property);
                }else if(property in target){
                    r = target[property];
                }
            }
            
            return r;
        },

        getOwnPropertyDescriptor: function(target, property){
            var r = undefined,
                valid = typeof target._invariant === "function" ?
                                target._invariant(property, 'getOwnPropertyDescriptor') :
                                _invariant(property, 'getOwnPropertyDescriptor');
            
            if(valid){
                if(typeof target._disable_get_own_property_descriptor === "boolean" && target._disable_get_own_property_descriptor === true){
                    throw new Error(`Can't '${property}' getOwnPropertyDescriptor of this object.`);
                }else if(typeof target._get_own_property_descriptor === "function"){
                    r = target._get_own_property_descriptor(property);
                }else{
                    r = Object.getOwnPropertyDescriptor(property);
                }
            }

            return r;
        },

        getPrototypeOf: function(target){
            return Object.getPrototypeOf(target);
        },

        has: function(target, property){
            var r = false,
                valid = typeof target._invariant === "function" ?
                                target._invariant(property, 'has') : _invariant(property, 'has');

            if(valid){
                if(typeof target._disable_has === "boolean" && target._disable_has === true){
                    throw new Error(`Can't check object has '${property}'.`);
                }else if(typeof target._has === "function"){
                    r = target._has(property);
                }else{
                    r = property in target;
                }
            }

            return r;
        },

        isExtensible: function(target){
            var r = true;

            if(typeof target._is_extensible === "boolean"){
                r = target._is_extensible;
            }else if(typeof target._disable_prevent_extensions === "boolean"){
                r = !target._disable_prevent_extensions;
            }

            return ;
        },

        ownKeys: function(target){
            var r = [];

            if(typeof target._disable_own_keys === "boolean" && target._disable_own_keys === true){
                throw new Error(`Can't get keys of this object.`);
            }else if(typeof target._ownKeys === "function"){
                r = target._ownKeys();
            }else{
                r = Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
            }

            return r;
        },

        preventExtensions: function(target){
            var r = true;
            
            if(typeof target._disable_prevent_extensions === "boolean" && target._disable_prevent_extensions === true){
                throw new Error("Can't extensions this object");
            }

            Object.preventExtensions(target);
            target._is_extensible = false;

            return r;
        },

        set: function(target, property, value, receiver){
            var r = false,
                valid = typeof target._invariant === "function" ?
                                target._invariant(property, 'set') : _invariant(property, 'set');

            if(valid){
                if(typeof target._disable_set === "boolean" && target._disable_set === true){
                    throw new Error(`Can't set '${property}' on this object`);
                }else if(typeof target._set === "function"){
                    r = target._set(property, value);
                }else{
                    r = target[property] = value;
                }
            }

            return r;
        },

        setPrototypeOf: function(target, prototype){
            var r = false;

            return r;
        }

    };
};

export default virProxyHandler;