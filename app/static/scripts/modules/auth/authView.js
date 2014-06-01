'use strict';

/**
 * Вид страницы логина
 *
 * @module AuthView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './login/loginModel',
    './login/loginView',
    './registration/registrationModel',
    './registration/registrationView',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, LoginModel, LoginView, RegistrationModel, RegistrationView) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name AuthView#app
         * @type {Object}
         */
        app: null,

        /**
         * @field
         * @name AuthView#locale
         * @type {string | null}
         */
        locale: null,

        /**
         * Имя таба
         *
         * Регистрация или страница Логина
         *
         * @field
         * @name AuthView#tabName
         * @type {string | null}
         */
        tabName: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name AuthView#el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель формы логина
         *
         * @field
         * @name AuthView#loginModel
         * @type {Backbone.Model | null}
         */
        loginModel: null,

        /**
         * Модель формы логина
         *
         * @field
         * @name AuthView#registrationModel
         * @type {Backbone.Model | null}
         */
        registrationModel: null,

        /**
         * @field
         * @name AuthView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * @field
         * @name AuthView#events
         * @type {Object}
         */
        events: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name AuthView#template
         * @type {string}
         */
        template: 'authView',

        /**
         * @constructor
         * @name AuthView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.app = params.app;
            this.locale = params.locale;
            this.tabName = params.tabName;
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
            } else {
                this.app.headerView.changeTab('isAuthPage');
                this.render();
            }
        },

        /**
         * @method
         * @name AuthView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();
            data.isLoginTab = true;
            return data;
        },

        /**
         * Метод устнавливает вид таба Логина
         *
         * @method
         * @name AuthView#setLoginTab
         * @returns {undefined}
         */
        setLoginTab: function () {

        },

        /**
         * Метод устнавливает вид таба Логина
         *
         * @method
         * @name AuthView#setRegistrationTab
         * @returns {undefined}
         */
        setRegistrationTab: function () {

        },

        /**
         * Метод устанавливает вид таба
         *
         * @method
         * @name AuthView#setTab
         * @param tabName название таба
         * @returns {undefined}
         */
        setTab: function (tabName) {
            switch (tabName) {
                case 'isLoginTab':
                    this.setLoginTab();
                    break;
                case 'isRegistrationTab':
                    this.setRegistrationTab();
                    break;
            }
        },

        /**
         * @method
         * @name AuthView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setTab(this.tabName);
        }
    });
});