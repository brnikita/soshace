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
        url: '/api/login',

        /**
         * @constructor
         * @name LoginModel#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.set({locale: params.locale}, {silent: true});
        }
    });
});