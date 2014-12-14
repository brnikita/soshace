'use strict';

/**
 * Модель страницы восстановления пароля
 *
 * @module RemindPasswordModel
 */

define([
    'zepto',
    'underscore',
    'backbone',
    'utils/helpers',
    'config'
], function ($, _, Backbone, Helpers) {
    return Backbone.Model.extend({
        /**
         * @field
         * @name RemindPasswordModel#defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            email: null
        },

        /**
         * @field
         * @name RemindPasswordModel#url
         * @type {String}
         */
        url: Soshace.urls.api.remindPassword.send,

        /**
         * @constructor
         * @name RemindPasswordModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var locale = Helpers.getLocale();
            this.set({locale: locale}, {silent: true});
        }
    });
});