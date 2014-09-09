'use strict';

/**
 * Вид страницы регистрации
 *
 * @class RegistrationView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/helpers',
    'handlebars',
    'backbone.validation',
    'utils/backboneValidationExtension',
    'utils/plugins/jquery.controlStatus',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone, Helpers, Handlebars) {
    return Backbone.Layout.extend({

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
         * Поле содержит обернутый в debounce
         * метод setStatus, который устанавливает статусы у полей
         *
         * @field
         * @name RegistrationView#setStatusDebounce
         * @type {Function | null}
         */
        setStatusDebounce: null,

        /**
         * Список обработчиков событий
         *
         * @field
         * @name RegistrationView#events
         * @type {Object}
         */
        events: {
            'keyup .js-model-field': 'changeFormFieldHandler',
            'focus .js-model-field': 'focusFormFieldHandler',
            'blur .js-model-field': 'blurFormFieldHandler',
            'submit': 'userRegistrationHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView#template
         * @type {string}
         */
        template: Soshace.hbs['auth/auth'],

        /**
         * @constructor
         * @name RegistrationView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this,
                'render',
                'userRegistrationSuccess',
                'userRegistrationFail'
            );

            Handlebars.registerPartial(
                'registration',
                Soshace.hbs['partials/registration']
            );
            Backbone.Validation.bind(this);

            //TODO: у каждого поля должен быть свой debouce метод, чтобы ошибки показывались при быстрой смене фокуса
            this.setStatusDebounce =  _.debounce(_.bind(this.setStatus, this), 500);
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
         * @name RegistrationView#userRegistrationSuccess
         * @param {Backbone.Model} model
         * @param {Object} response
         * @returns {undefined}
         */
        userRegistrationSuccess: function (model, response) {
            var app = Soshace.app,
                redirectUrl = response.redirect;

            Soshace.profile = response.profile;
            app.getView('.js-system-messages').collection.fetch().
                done(function(){
                    Backbone.history.navigate(redirectUrl, {trigger: true});
                });
        },

        /**
         * Метод обработчик неуспешной регистрации пользователя
         *
         * @method
         * @name RegistrationView#userRegistrationFail
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
         * Метод обработчик получения фокуса полем
         *
         * @method
         * @name RegistrationView#focusFormFieldHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        focusFormFieldHandler: function (event) {
            var $target = $(event.target),
                controlStatusData = $target.data('controlStatus'),
                status = controlStatusData.status;

            if (status === 'success') {
                return;
            }

            if (status === 'error') {
                return;
            }

            $target.controlStatus('helper');
        },

        /**
         * Метод обработчик получения фокуса полем
         *
         * @method
         * @name RegistrationView#blurFormFieldHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        blurFormFieldHandler: function (event) {
            var $target = $(event.target),
                serializedField = Helpers.serializeField($target),
                fieldName = serializedField.name,
                fieldValue,
                error;

            //В противном случае у поля уже есть ошибка
            //Используется такой определения ошибки, т.к. у поля ошибки появляются с задержкой
            if (this.model.get(fieldName) !== null) {
                return;
            }

            serializedField = Helpers.serializeField($target);
            fieldValue = serializedField.value;
            error = this.model.preValidate(fieldName, fieldValue);
            error = Helpers.i18n(error);
            $target.controlStatus('error', error);
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
                model = this.model,
                serializedField = Helpers.serializeField($target),
                fieldName = serializedField.name,
                fieldValue = serializedField.value;

            if (model.get(fieldName) === fieldValue) {
                return;
            }

            //Если в поле попали первый раз
            if (model.get(fieldName) === null && fieldValue === '') {
                return;
            }

            model.set(fieldName, fieldValue);
            $target.controlStatus('helper');
            this.setStatusDebounce($target, serializedField);
        },

        /**
         * Метод устанавливает статусы для полей success или error
         *
         * @method
         * @name RegistrationView#setStatus
         * @param {jQuery} $field ссылка на поле
         * @param serializedField сериализованное поле {name: '', value: ''}
         * @returns {undefined}
         */
        setStatus: function ($field, serializedField) {
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
                if (fieldValue !== model.get(fieldName)) {
                    return;
                }
                error = response.error;

                if (error) {
                    $field.controlStatus('error', error.message);
                    return;
                }

                $field.controlStatus('success');
            });
        },

        /**
         * @method
         * @name RegistrationView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = this.model.toJSON();

            data.isAuthenticated = app.isAuthenticated();
            data.isRegistrationTab = true;
            return data;
        },

        /**
         * Метод показывает список ошибок у
         * переданных полей
         *
         * @method
         * @name RegistrationView#showFieldsErrors
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
         * @name RegistrationView#setFieldsHelpers
         * @param {Object} helpers список подсказок
         * @returns {undefined}
         */
        setFieldsHelpers: function (helpers) {
            _.each(helpers, _.bind(function (helper, fieldName) {
                var $field,
                    successTitle = this.model.successMessages[fieldName];

                fieldName = Helpers.hyphen(fieldName);
                $field = $('#' + fieldName);
                $field.controlStatus({
                    helperTitle: Helpers.i18n(helper),
                    successTitle: Helpers.i18n(successTitle)
                });
            }, this));
        },

        /**
         * @method
         * @name RegistrationView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setFieldsHelpers(this.model.helpers);
            //Используется асинхронный вызов, чтобы навесились обработчики событий
            setTimeout(function () {
                $('#user-name').focus();
            }, 0);
        }
    });
});