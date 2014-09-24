'use strict';

/**
 * Класс деферред объектов
 *
 * @module Deferred
 */
define(['./class'], function (Class) {
    /**
     * @class Deferred
     */
    return Class.extend({
        /**
         * Resolve a Deferred object and call any doneCallbacks with the given args.
         *
         * @public
         * @method
         * @name Deferred#resolve
         * @returns {Deferred}
         */
        resolve: function(){
            return this;
        },

        /**
         * Reject a Deferred object and call any failCallbacks with the given args.
         *
         * @public
         * @method
         * @name Deferred#reject
         * @returns {Deferred}
         */
        reject: function(){

        },

        /**
         * Add handlers to be called when the Deferred object is resolved.
         *
         * @public
         * @method
         * @name Deferred#done
         * @param {Function} callback
         * @returns {Deferred}
         */
        done: function(callback){},

        /**
         * Add handlers to be called when the Deferred object is rejected.
         *
         * @public
         * @method
         * @name Deferred#fail
         * @param {Function} callback
         * @returns {Deferred}
         */
        fail: function(callback){}
    });
});