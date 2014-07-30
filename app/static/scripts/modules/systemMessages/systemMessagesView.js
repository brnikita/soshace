'use strict';

/**
 * Вид страницы регистрации
 *
 * @class RegistrationView
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

        /**
         * Модель формы регистрации
         *
         * @field
         * @name RegistrationView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name RegistrationView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Список обработчиков событий
         *
         * @field
         * @name RegistrationView#events
         * @type {Object}
         */
        events: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView#template
         * @type {string}
         */
        template: Soshace.hbs['auth/authView'],

        /**
         * @constructor
         * @name RegistrationView#initialize
         * @returns {undefined}
         */
        initialize: function () {

        },

        /**
         * @method
         * @name RegistrationView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});