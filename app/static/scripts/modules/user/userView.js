'use strict';

/**
 * Вид страницы пользователя
 *
 * @class UserView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets'
], function ($, _, Backbone, Widgets) {
    return Backbone.Layout.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name UserView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UserView#elements
         * @type {Object}
         */
        elements: {
            messages: null
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UserView#elements
         * @type {string}
         */
        template: Soshace.hbs.userView,

        /**
         * @constructor
         * @name UserView#initialize
         * @params {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            var $el = params && params.$el;

            if ($el) {
                this.$el = $el;
            }
        },

        /**
         * @method
         * @name UserView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = this.model.toJSON();
            data.isAuthenticated = app.isAuthenticated();
            return data;
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UserView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.messages = this.$('.js-messages');
        },

        /**
         * @method
         * @name UserView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            Widgets.showSystemMessage();
            this.save({method: 'systemMessageDelete', systemMessage: []});
        }
    });
});