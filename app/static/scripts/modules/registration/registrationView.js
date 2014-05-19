'use strict';

/**
 * Вид страницы регистрации
 *
 * @module RegistrationView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './registrationModel',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, RegistrationModel) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name RegistrationView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name RegistrationView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель деталей статьи
         *
         * @field
         * @name RegistrationView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name RegistrationView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView.elements
         * @type {string}
         */
        template: 'registrationView',

        /**
         * @constructor
         * @name RegistrationView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            Widgets.setBodyClass('bg-books');
            this.app = params.app;
            this.render();
        },

        /**
         * @method
         * @name RegistrationView.serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * @method
         * @name RegistrationView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});