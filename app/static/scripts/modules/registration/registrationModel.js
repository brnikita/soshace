'use strict';

/**
 * Модель страницы регистрации
 *
 * @module RegistrationModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @property
         * @name RegistrationModel#defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            email: null
        },

        /**
         * @field
         * @name RegistrationModel#url
         * @type {string}
         */
        url: '/api/create_user',

        /**
         * @constructor
         * @name RegistrationModel#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.set({locale: params.locale}, {silent: true});
        }
    });
});