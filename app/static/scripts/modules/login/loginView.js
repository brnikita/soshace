'use strict';

/**
 * Вид страницы авторизации
 *
 * @module LoginView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './loginModel',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, LoginModel) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name LoginView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name LoginView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель деталей статьи
         *
         * @field
         * @name LoginView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name LoginView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * @field
         * @name LoginView.events
         * @type {Object}
         */
        events: {
            'click .js-login-nav-tabs a': 'changeTab'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name LoginView.elements
         * @type {string}
         */
        template: 'loginView',

        /**
         * @constructor
         * @name LoginView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.app = params.app;
            this.model = new LoginModel({
                locale: params.locale
            });
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
            } else {
                this.app.headerView.changeTab('isSignInPage');
                this.render();
            }
        },

        /**
         * Метод обработчик события клика по табу
         *
         * @method
         * @name LoginView.changeTab
         * @returns {undefined}
         */
        changeTab: function (event) {
            var $target = $(event.target);

            event.preventDefault();
            $target.tab('show');
        },

        /**
         * @method
         * @name LoginView.serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * @method
         * @name LoginView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});