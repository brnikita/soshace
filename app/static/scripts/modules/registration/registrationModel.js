'use strict';

/**
 * Модель страницы просмотра статьи
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
         * @method
         * @name RegistrationModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.createUser,

        /**
         * @property
         * @name RegistrationModel.defaults
         * @type {Object}
         */
        defaults: {
            email: null,
            password: null,
            locale: null
        },

        /**
         * @constructor
         * @name RegistrationModel.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.set({locale: params.locale}, {silent: true});
        }
    });
});