'use strict';

/**
 * Расширение для Backbone.Validation
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.layoutmanager',
    'backbone.validation'
], function ($, _, Backbone) {
    _.extend(Backbone.Validation.validators, {
        /**
         * Метод валидации userName
         *
         * @method
         * @param {String} value
         * @returns {String | undefined}
         */
        userName: function(value){
            if(!Soshace.patterns.userName.test(value)){
               return 'Username is invalid';
            }
        }
    });
});