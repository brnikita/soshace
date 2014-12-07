'use strict';

/**
 * Вид страницы восстановления пароля
 *
 * @class RemindPasswordView
 */

define([
    'zepto',
    'underscore',
    'backbone',
    'utils/helpers',
    'backbone.validation',
    'utils/backboneValidationExtension',
    'utils/plugins/jquery.controlStatus',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone, Helpers) {
    return Backbone.Layout.extend({

        /**
         * Модель формы восттановления пароля
         *
         * @field
         * @name RemindPasswordView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Поле содержит обернутый в debounce
         * метод setStatus, который устанавливает статус у поля email
         *
         * @field
         * @name RemindPasswordView#setStatusEmailDebounce
         * @type {Function | null}
         */
        setStatusEmailDebounce: null,

        /**
         * Список обработчиков событий
         *
         * @field
         * @name RemindPasswordView#events
         * @type {Object}
         */
        events: {
            'keyup .js-email-field': 'changeEmailFieldHandler',
            'blur .js-email-field': 'changeEmailFieldHandler',
            'submit': 'submitHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RemindPasswordView#template
         * @type {string}
         */
        template: Soshace.hbs['auth/remindPassword'],

        /**
         * @constructor
         * @name RemindPasswordView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Backbone.Validation.bind(this);
            this.setStatusEmailDebounce = _.debounce(_.bind(this.setEmailStatus, this), 500);
        },

        /**
         * Метод обработчик клика на кнопке 'Восстановить пароль'
         *
         * @method
         * @name RemindPasswordView#submitHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        submitHandler: function (event) {
            var errors,
                _this = this;

            event.preventDefault();

            errors = this.model.validate();

            if (errors) {
                this.showFieldsErrors(errors, true);
                return;
            }

            this.model.save(null, {
                success: _this.userRegistrationSuccess,
                error: _this.userRegistrationFail
            });
        },

        /**
         * Метод обработчик успешной регистрации пользователя
         *
         * @method
         * @name RemindPasswordView#userRegistrationSuccess
         * @param {Backbone.Model} model
         * @param {Object} response
         * @returns {undefined}
         */
        userRegistrationSuccess: function (model, response) {
            var app = Soshace.app,
                redirectUrl = response.redirect;

            Soshace.profile = response.profile;
            app.getView('.js-system-messages').collection.fetch().
                done(function () {
                    Backbone.history.navigate(redirectUrl, {trigger: true});
                });
        },

        /**
         * Метод обработчик неуспешной регистрации пользователя
         *
         * @method
         * @name RemindPasswordView#userRegistrationFail
         * @param {Backbone.Model} model
         * @param {Object} response
         * @returns {undefined}
         */
        userRegistrationFail: function (model, response) {
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
         * Метод обработчик события изменения поля email
         *
         * @method
         * @name RemindPasswordView#changeEmailFieldHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        changeEmailFieldHandler: function (event) {
            var $target = $(event.target),
                model = this.model,
                serializedField = Helpers.serializeField($target),
                fieldName = serializedField.name,
                fieldValue = serializedField.value;

            if (model.get(fieldName) === fieldValue) {
                return;
            }

            model.set(fieldName, fieldValue);
            $target.controlStatus('helper');
            this.setStatusEmailDebounce($target, serializedField);
        },

        /**
         * Метод устанавливает статус для поля email success или error
         *
         * @method
         * @name RemindPasswordView#setEmailStatus
         * @param {jQuery} $field ссылка на поле
         * @param serializedField сериализованное поле {name: '', value: ''}
         * @returns {undefined}
         */
        setEmailStatus: function ($field, serializedField) {
            var model = this.model,
                fieldValue = serializedField.value,
                fieldName = serializedField.name,
                error;

            if (fieldValue !== model.get(fieldName)) {
                return;
            }

            error = model.preValidate(fieldName, fieldValue);

            if (error) {
                error = Helpers.i18n(error);
                $field.controlStatus('error', error);
                return;
            }

            model.validateFieldByServer(serializedField).done(function (response) {
                //В случае, если поле пока шел ответ уже изменилось
                if (fieldValue !== model.get(fieldName)) {
                    return;
                }

                $field.controlStatus('success');
            }).fail(function (response) {
                var errorMessage,
                    responseJSON;

                //В случае, если поле уже изменилось пока шел ответ
                if (fieldValue !== model.get(fieldName)) {
                    return;
                }

                responseJSON = JSON.parse(response.response);
                error = responseJSON.error;
                errorMessage = Helpers.i18n(error.message);
                $field.controlStatus('error', errorMessage);
            });
        },

        /**
         * Метод показывает список ошибок у
         * переданных полей
         *
         * @method
         * @name RemindPasswordView#showFieldsErrors
         * @param {Object} errors список ошибок
         * @param {Boolean} [translate] true - перевести ошибки
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
         * Метод устанавливает всплывающие подсказоки у полей
         *
         * @method
         * @name RegistrationView#setFieldControlStatus
         * @returns {undefined}
         */
        setFieldControlStatus: function () {
            var $email,
                helper = this.model.helpers.email,
                successTitle = this.model.successMessages['email'];

            $email = $('#email');
            $email.controlStatus({
                helperTitle: Helpers.i18n(helper),
                successTitle: Helpers.i18n(successTitle)
            });
        },

        /**
         * @method
         * @name RemindPasswordView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setFieldControlStatus();

            //Используется асинхронный вызов, чтобы навесились обработчики событий
            setTimeout(function () {
                $('#email').focus();
            }, 0);
        }
    });
});