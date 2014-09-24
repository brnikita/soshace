'use strict';

/**
 * Вид страницы логина
 *
 * @module LoginView
 */

define([
    'jquery',
    'underscore',
    'core',
    'utils/helpers',
    'utils/widgets',
    'handlebars',
    'plugins/controlStatus',
    'templates'
], function ($, _, Core, Helpers, Widgets, Handlebars) {
    return Core.View.extend({

        /**
         * Модель формы логина
         *
         * @field
         * @name LoginView#model
         * @type {Core.Model | null}
         */
        model: null,

        /**
         * @field
         * @name LoginView#elements
         * @type {Object}
         */
        elements: {
            validateFields: null
        },

        /**
         * @field
         * @name LoginView#events
         * @type {Object}
         */
        events: {
            'keyup .js-model-field': 'changeFormFieldHandler',
            'blur .js-model-field': 'changeFormFieldHandler',
            'focus .js-validate-input': 'validateFieldFocusHandler',
            'submit .js-login-form': 'userLoginHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name LoginView#template
         * @type {string}
         */
        template: Soshace.hbs['auth/auth'],

        /**
         * @constructor
         * @name LoginView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this,
                'render',
                'userLoginSuccess',
                'userLoginFail'
            );

            Handlebars.registerPartial(
                'auth/login',
                Soshace.hbs['partials/auth/login']
            );

            Backbone.Validation.bind(this);
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
            var errors,
                _this = this;

            event.preventDefault();

            errors = this.model.validate();

            if (errors) {
                this.showFieldsErrors(errors, true);
                return;
            }

            this.model.save(null, {
                success: _this.userLoginSuccess,
                error: _this.userLoginFail
            });
        },

        /**
         * Метод показывает список ошибок у
         * переданных полей
         *
         * @method
         * @name LoginView#showFieldsErrors
         * @param {Object} errors список ошибок
         * @param {boolean} [translate] true - перевести ошибки
         * @returns {undefined}
         */
        showFieldsErrors: function (errors, translate) {
            _.each(errors, _.bind(function (error, fieldName) {
                var $field;

                fieldName = Helpers.hyphen(fieldName);
                $field = $('#' + fieldName);
                if (translate) {
                    error = Helpers.i18n(error);
                }
                $field.controlStatus('error', error);
            }, this));
        },

        /**
         * Метод обработчик успешной входа пользователя
         *
         * @method
         * @name LoginView#userLoginSuccess
         * @param {Backbone.Model} model
         * @param {Object} response в ответе приходит профиль пользователя
         * @returns {undefined}
         */
        userLoginSuccess: function (model, response) {
            var app = Soshace.app,
                userName = response.userName,
                locale = response.locale,
                redirectUrl = '/' + locale + '/users/' + userName;

            Soshace.profile = response;
            app.getView('.js-system-messages').collection.fetch().
                done(function () {
                    Backbone.history.navigate(redirectUrl, {trigger: true});
                });
        },

        /**
         * Метод обработчик неуспешного логина пользователя
         *
         * @method
         * @name RegistrationView#userLoginFail
         * @param {Backbone.Model} model
         * @param {Object} response
         * @returns {undefined}
         */
        userLoginFail: function (model, response) {
            var error = response.responseJSON && response.responseJSON.error;
            if (typeof error === 'string') {
                //TODO: добавить вывод системной ошибки
                return;
            }

            if (typeof error === 'object') {
                this.showFieldsErrors(error);
            }
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
            var app = Soshace.app,
                data = this.model.toJSON();
            data.isLoginTab = true;
            data.isAuthenticated = app.isAuthenticated();
            data.paths = Soshace.urls;
            return data;
        },

        /**
         * Метод сохраняет ссылки на элементы DOM
         *
         * @method
         * @name LoginView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.validateFields = this.$('.js-validate-input');
        },

        /**
         * Метод обработчик получения фокуса полем валидации
         *
         * @method
         * @name LoginView#validateFieldFocusHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        validateFieldFocusHandler: function (event) {
            var $target = $(event.target);

            $target.controlStatus('base');
        },

        /**
         * @method
         * @name LoginView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.elements.validateFields.controlStatus();
            $('#email').focus();
        }
    });
});