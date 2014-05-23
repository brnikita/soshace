'use strict';

/**
 * Модель страницы просмотра статьи
 *
 * @module RegistrationModel
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/helpers'
], function ($, _, Backbone, Helpers) {
    return Backbone.Model.extend({

        /**
         * @method
         * @name RegistrationModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.saveUser,

        /**
         * @property
         * @name RegistrationModel.defaults
         * @type {Object}
         */
        defaults: {
            email: null,
            password: null,
            repeatPassword: null,
            locale: null
        },

        /**
         * @constructor
         * @name RegistrationModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var locale = Helpers.getLocale();
            this.set({locale: locale}, {silent: true});
        }
    });
});