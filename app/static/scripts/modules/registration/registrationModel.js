'use strict';

/**
 * Модель страницы регистрации
 *
 * @module RegistrationModel
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.validation',
    'utils/backboneValidationExtension'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @field
         * @name RegistrationModel#defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            email: null,
            password: null,
            userName: null
        },

        /**
         * @field
         * @name RegistrationModel#validation
         * @type {Object}
         */
        validation: {
            userName: [
                {
                    required: true,
                    msg: 'Username can\'t be empty'
                },
                {
                    userName: 1
                }
            ],
            email: [
                {
                    required: true,
                    msg: 'Email can\'t be empty'
                },
                {
                    pattern: Soshace.patterns.email,
                    msg: 'Email is invalid'
                }
            ],
            password: [
                {
                    required: true,
                    msg: 'Password can\'t be empty'
                },
                {
                    minLength: 6,
                    msg: 'Password length should be more than 6 characters'
                }
            ]
        },

        /**
         * Список подсказок к полям
         *
         * @field
         * @name RegistrationModel#helpers
         * @type {Object}
         */
        helpers: {
            userName: 'You can only use the Latin alphabet, numbers, ".", "_", "-".',
            email: 'Please enter your e-mail address',
            password: 'Good password should contain: ' +
                'numbers, upper-and lowercase letters, symbols (".", "/", "?", "^", etc.)'
        },

        /**
         * Список подписей к успешным полям
         *
         * @field
         * @name RegistrationModel#successMessages
         * @type {Object}
         */
        successMessages: {
            userName: 'Great user name!',
            email: 'Great email!',
            password: 'Great password!'
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
                name = serializedField.name,
                value = serializedField.value;

            params[name] = value;
            return $.get(Soshace.urls.api.registration.validateField, params);
        }
    });
});