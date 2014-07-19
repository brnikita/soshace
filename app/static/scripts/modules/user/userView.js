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
    'utils/helpers',
    'backbone.layoutmanager'
], function ($, _, Backbone, Helpers) {
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
        template: 'userView',

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
            var $messages = this.elements.messages;

            if (!this.app.isAuthenticated()) {
                return;
            }

            if (Soshace.profile.emailConfirmed) {
                return;
            }

            Helpers.renderTemplate('messages/notConfirmedEmail').
                done(function (template) {
                    $messages.append(template);
                });
        },

        /**
         * @method
         * @name UserView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();
            data.isAutentificated = this.app.isAuthenticated();
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