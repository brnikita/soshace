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
    'utils/helpers',
    './registrationModel',
    'backbone.layoutmanager',
    'backbone.validation'
], function ($, _, Backbone, Widgets, Helpers, RegistrationModel) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name RegistrationView#app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name RegistrationView#el
         * @type {string}
         */
        el: '.js-content',

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
            'keyup .js-model-field': 'changeFormFieldHandler',
            'blur .js-model-field': 'changeFormFieldHandler',
            'submit': 'userRegistrationHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView#template
         * @type {string}
         */
        template: 'auth/authView',

        /**
         * @constructor
         * @name RegistrationView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            _.bindAll(this, 'render');
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.app = params.app;
            this.model = new RegistrationModel({
                locale: params.locale
            });
            Backbone.Validation.bind(this);
            if (Soshace.firstLoad) {
                this.firstLoadHandler();
            } else {
                this.secondLoadHandler();
            }
        },

        /**
         * Метод исполняется, если страница была отрендерена на серевере
         *
         * @method
         * @name RegistrationView#firstLoadHandler
         * @returns {undefined}
         */
        firstLoadHandler: function () {
            Soshace.firstLoad = false;
            this.afterRender();
        },

        /**
         * Метод обработчик клика на кнопке 'Зарегистрироваться'
         *
         * @method
         * @name RegistrationView#userRegistrationHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        userRegistrationHandler: function (event) {
            var _this = this;

            event.preventDefault();

            var valid = this.model.validate(),
                valid2;
            if (!(valid2 = this.model.isValid(true))) {
                debugger;
                return;
            }
            debugger;
            this.model.save(null, {
                success: _this.userRegistrationSuccess,
                error: _this.userRegistrationFail
            });
        },

        /**
         * Метод обработчик успешной регистрации пользователя
         *
         * @method
         * @name RegistrationView#userRegistrationSuccess
         * @param {Backbone.Model} model
         * @param {Object} response
         * @returns {undefined}
         */
        userRegistrationSuccess: function (model, response) {
            var redirectUrl = response.redirect;

            Soshace.profile = response.profile;
            Backbone.history.navigate(redirectUrl, {trigger: true});
        },

        /**
         * Метод обработчик неуспешной регистрации пользователя
         *
         * @method
         * @name RegistrationView#userRegistrationFail
         * @param {Object} response
         * @returns {undefined}
         */
        userRegistrationFail: function (response) {

        },

        /**
         * Метод исполняется при клиентском рендере страницы
         *
         * @method
         * @name RegistrationView#secondLoadHandler
         * @returns {undefined}
         */
        secondLoadHandler: function () {
            this.fetchPartial('registrationView').done(this.render);
            this.app.headerView.changeTab('isAuthPage');
        },

        /**
         * Метод обработчик события изменения поля формы
         *
         * @method
         * @name RegistrationView#changeFormFieldHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        changeFormFieldHandler: function (event) {
            var $target = $(event.target),
                params = Helpers.getInputData($target);

            this.model.set(params);
        },

        /**
         * @method
         * @name RegistrationView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();

            data.isAutentificated = this.app.isAuthenticated();
            data.isRegistrationTab = true;
            return data;
        },

        /**
         * Метод вызывается роутером перед выходом из вида
         *
         * @method
         * @name RegistrationView#viewExitHandler
         * @returns {undefined}
         */
        viewExitHandler: function () {

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