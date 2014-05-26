'use strict';

/**
 * Модель страницы пользователя
 *
 * @module UserModel
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
         * @name UserModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.saveUser,

        /**
         * @property
         * @name UserModel.defaults
         * @type {Object}
         */
        defaults: {
            locale: null
        },

        /**
         * @constructor
         * @name UserModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var locale = Helpers.getLocale();
            this.set({locale: locale}, {silent: true});
        }
    });
});