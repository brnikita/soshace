'use strict';

/**
 * Модель страницы логина
 *
 * @module LoginModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @property
         * @name LoginModel#defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            email: null,
            password: null
        },

        /**
         * @field
         * @name LoginModel#url
         * @type {String}
         */
        url: Soshace.urls.api.login,

        /**
         * @constructor
         * @name LoginModel#initialize
         * @returns {undefined}
         */
        initialize: function () {

        }
    });
});