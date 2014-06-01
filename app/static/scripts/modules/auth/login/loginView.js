'use strict';

/**
 * Вид страницы логина
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
         * @name LoginView#app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name LoginView#el
         * @type {string}
         */
        el: '.js-tab-content',

        /**
         * Модель формы логина
         *
         * @field
         * @name LoginView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name LoginView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * @field
         * @name LoginView#events
         * @type {Object}
         */
        events: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name LoginView#template
         * @type {string}
         */
        template: 'auth/loginView',

        /**
         * @constructor
         * @name LoginView#initialize
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
                this.app.headerView.changeTab('isAuthPage');
                this.render();
            }
        },

        /**
         * @method
         * @name LoginView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();
            data.isLoginTab = true;
            return data;
        },

        /**
         * @method
         * @name LoginView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});