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
         * Возращаемый метод делает запрос на валидацию поля на сервере
         * Метод не дает делать запросы чаще, чем раз в 500мс.
         *
         * @field
         * @name RegistrationModel#validation
         * @type {Function}
         */
        validateFieldByServer: _.debounce(function (serializedField, callback) {
            $.get(Soshace.urls.api.registration.validateField, serializedField).
                done(callback);
        }, 500),

        /**
         * @field
         * @name RegistrationModel#validation
         * @type {Object}
         */
        validation: {
            userName: [
                {
                    required: true,
                    msg: 'Please enter an username'
                },
                {
                    userName: 1
                }
            ],
            email: [
                {
                    required: true,
                    msg: 'Please enter an<br/> email address'
                },
                {
                    pattern: Soshace.patterns.email,
                    msg: 'Email is invalid'
                }
            ],
            password: [
                {
                    required: true,
                    msg: 'Please enter a password'
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
            userName: 'user name',
            email: 'Please enter an<br/> email address',
            password: 'Please enter a password'
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