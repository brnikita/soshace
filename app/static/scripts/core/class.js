'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Базовый Класс
     *
     * @class Soshace.core.Class
     */
    Soshace.core.Class = function () {
        var initialize = this.initialize;

        if (_.isFunction(initialize)) {
            initialize.apply(this, arguments);
        }
    };

    /**
     * @method
     * @name Soshace.core.Class.extend
     * @param {Object} protoProps свойства прототипа
     * @param {Object} staticProps статичные свойства
     */
    Soshace.core.Class.extend = function (protoProps, staticProps) {
        var parent = this, child, Surrogate;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child._super = parent.prototype;

        return child;
    };
})(window.Soshace);