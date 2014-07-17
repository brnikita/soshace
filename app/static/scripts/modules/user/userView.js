'use strict';

/**
 * Вид страницы пользователя
 *
 * @module UserView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './userModel',
    'utils/helpers',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, UserModel, Helpers) {
    return Backbone.Layout.extend({
        /**
         * Ссылка на объект App
         *
         * @field
         * @name UserView#app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name UserView#el
         * @type {string}
         */
        el: '.js-content',

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
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.app = params.app;
            if (Soshace.firstLoad) {
                this.firstLoadHandler();
            } else {
                this.secondLoadHandler();
            }
        },

        /**
         * Метод обработчик первой загрузки страницы
         * Рендеринг был на сервере
         *
         * @method
         * @name UserView#firstLoadHandler
         * @returns {undefined}
         */
        firstLoadHandler: function () {
            Soshace.firstLoad = false;
            this.afterRender();
        },

        /**
         * Метод обработчик второй загрузки страницы
         * Клиентский рендеринг
         *
         * @method
         * @name UserView#secondLoadHandler
         * @returns {undefined}
         */
        secondLoadHandler: function () {
            var _this = this;

            _.bindAll(this, 'render');
            this.app.headerView.changeTab('isUserPage');
            Widgets.setBodyClass('bg-symbols bg-color-blue');
            this.model = new UserModel();
            this.model.set({
                locale: _this.options.locale,
                userName: _this.options.userName
            });
            this.model.getUser().done(this.render);
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
         * Метод вызывается роутером перед выходом из вида
         *
         * @method
         * @name UserView#viewExitHandler
         * @returns {undefined}
         */
        viewExitHandler: function () {

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