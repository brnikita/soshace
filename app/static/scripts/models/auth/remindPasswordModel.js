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
         * Список подписей к успешным полям
         *
         * @field
         * @name RemindPasswordModel#successMessages
         * @type {Object}
         */
        successMessages: {
            email: 'Great email!'
        },

        /**
         * Список подсказок к полям
         *
         * @field
         * @name RemindPasswordModel#helpers
         * @type {Object}
         */
        helpers: {
            email: 'Please enter your e-mail address.'
        },

        /**
         * @field
         * @name RemindPasswordModel#validation
         * @type {Object}
         */
        validation: {
            email: [
                {
                    required: true,
                    msg: 'Email can&#39;t be blank.'
                },
                {
                    pattern: Soshace.patterns.email,
                    msg: 'Email is invalid.'
                }
            ]
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
        },

        /**
         * Метод делает запрос на валидацию поля на сервере
         *
         * @method
         * @name RegistrationModel#validation
         * @param {Object} serializedField
         * @returns {jQuery.Deferred}
         */
        validateFieldByServer: function (serializedField) {
            var params = {},
                name = serializedField.name;

            params[name] = serializedField.value;
            return $.post(Soshace.urls.api.remindPassword.validate, params);
        }
    });
});