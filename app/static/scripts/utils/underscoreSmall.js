'use strict';

/**
 * @module UnderscoreSmall
 */
define(function () {
    // Save bytes in the minified (but not gzipped) version:
    var ArrayPrototype = Array.prototype,
        ObjPrototype = Object.prototype,
        FuncPrototype = Function.prototype,

    // Create quick reference variables for speed access to core prototypes.
        push = ArrayPrototype.push,
        slice = ArrayPrototype.slice,
        concat = ArrayPrototype.concat,
        toString = ObjPrototype.toString,
        hasOwnProperty = ObjPrototype.hasOwnProperty,

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
        nativeForEach = ArrayPrototype.forEach,
        nativeMap = ArrayPrototype.map,
        nativeReduce = ArrayPrototype.reduce,
        nativeFilter = ArrayPrototype.filter,
        nativeEvery = ArrayPrototype.every,
        nativeSome = ArrayPrototype.some,
        nativeIndexOf = ArrayPrototype.indexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncPrototype.bind;

    return {
        each: function (obj, iterator, context) {
            if (obj === null) {
                return;
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, length = obj.length; i < length; i++) {
                    if (iterator.call(context, obj[i], i, obj) === breaker) {
                        return;
                    }
                }
            } else {
                var keys = this.keys(obj);
                for (var i = 0, length = keys.length; i < length; i++) {
                    if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) {
                        return;
                    }
                }
            }
        },
        forEach: function () {
            return this.each.apply(arguments);
        },
        any: function (obj, iterator, context) {
            iterator || (iterator = this.identity);
            var result = false;

            if (obj === null) {
                return result;
            }

            if (nativeSome && obj.some === nativeSome) {
                return obj.some(iterator, context);
            }

            this.each(obj, function (value, index, list) {
                if (result || (result = iterator.call(context, value, index, list))) {
                    return breaker;
                }
            });

            return !!result;
        },
        find: function (obj, iterator, context) {
            var result;
            this.any(obj, function (value, index, list) {
                if (iterator.call(context, value, index, list)) {
                    result = value;
                    return true;
                }
            });
            return result;
        }
    };
})
;