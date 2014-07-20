'use strict';

/**
 * Вид страницы пользователя
 *
 * @class UserView
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
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
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод показвыает сообщение о том, что email не подтвержден
         *
         * @method
         * @name UserView#showNotConfirmedEmailMessage
         * @returns {undefined}
         */
        showNotConfirmedEmailMessage: function () {
            var app = Soshace.app,
                $messages = this.elements.messages;

            if (!app.isAuthenticated()) {
                return;
            }

            if (Soshace.profile.emailConfirmed) {
                return;
            }

            $messages.append(Soshace.hbs['messages/notConfirmedEmail']());
        },

        /**
         * @method
         * @name UserView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = this.model.toJSON();
            data.isAutentificated = app.isAuthenticated();
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
            this.showNotConfirmedEmailMessage();
        }
    });
});