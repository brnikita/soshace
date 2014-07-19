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
    'utils/helpers',
    'utils/widgets',
    'backbone.layoutmanager'
], function ($, _, Backbone, Helpers, Widgets) {
    return Backbone.Layout.extend({

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
            'keyup .js-model-field': 'changeFormFieldHandler',
            'blur .js-model-field': 'changeFormFieldHandler',
            'submit .js-login-form': 'userLoginHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name LoginView#template
         * @type {string}
         */
        template: 'auth/authView',

        /**
         * @constructor
         * @name LoginView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this,
                'render',
                'userLoginSuccess',
                'authenticatedHandler'
            );
        },

        /**
         * Метод обработчик клика на кнопке 'Войти'
         *
         * @method
         * @name LoginView#userLoginHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        userLoginHandler: function (event) {
            var _this = this;

            event.preventDefault();
            this.model.save(null, {
                success: _this.userLoginSuccess,
                error: _this.userLoginFail
            });
        },

        /**
         * Метод обработчик успешной входа пользователя
         *
         * @method
         * @name LoginView#userLoginSuccess
         * @param {Backbone.Model} model
         * @param {Object} response
         * @returns {undefined}
         */
        userLoginSuccess: function (model, response) {
            var error = response.error;

            if (error) {
                Widgets.showMessages(error);
            } else {
                this.app.getProfileData().
                    done(this.authenticatedHandler);
            }
        },

        /**
         * Метод обработчик события получения профиля
         * авторизованного пользователя
         *
         * @method
         * @name LoginView#authenticatedHandler
         * @returns {undefined}
         */
        authenticatedHandler: function () {
            var profile = Soshace.profile,
                userName = profile.userName,
                locale = profile.locale,
                redirectUrl = '/' + locale + '/user/' + userName;

            Backbone.history.navigate(redirectUrl, {trigger: true});
        },

        /**
         * TODO: дописать
         *
         * Метод обработчик неуспешной входа пользователя
         *
         * @method
         * @name LoginView#userLoginFail
         * @param {Object} response
         * @returns {undefined}
         */
        userLoginFail: function (response) {

        },

        /**
         * Метод обработчик события изменения поля формы
         *
         * @method
         * @name LoginView#changeFormFieldHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        changeFormFieldHandler: function (event) {
            var $target = $(event.target),
                serializedField = Helpers.serializeField($target),
                fieldName = serializedField.name,
                fieldValue = serializedField.value,
                params = {};

            params[fieldName] = fieldValue;
            this.model.set(params);
        },

        /**
         * @method
         * @name LoginView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();
            data.isLoginTab = true;
            data.isAutentificated = this.app.isAuthenticated();
            return data;
        },

        /**
         * @method
         * @name LoginView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            $('#email').focus();
        }
    });
});