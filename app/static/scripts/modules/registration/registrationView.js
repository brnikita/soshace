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
    'backbone.validation',
    'utils/backboneValidationExtension',
    'utils/plugins/jquery.controlStatus'
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
        template: 'auth/authView',

        /**
         * @constructor
         * @name RegistrationView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            _.bindAll(this,
                'render',
                'userRegistrationSuccess',
                'userRegistrationFail'
            );
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
            var redirectUrl = response.redirect;

            Soshace.profile = response.profile;
            Backbone.history.navigate(redirectUrl, {trigger: true});
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
         * Метод обработчик получения фокуса полем
         *
         * @method
         * @name RegistrationView#changeFormFieldHandler
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
         * @name RegistrationView#changeFormFieldHandler
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
            //Выбрано специально большой интервал,
            //чтобы подсказка не мелькала слишком часто
            var changeStatusInterval = 1500,
                $target = $(event.target),
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
            _.debounce(_.bind(this.setStatus, this), changeStatusInterval)($target, serializedField);
        },

        /**
         * Метод устанавливает статусы для полей success или error
         *
         * @method
         * @name RegistrationView#changeFormFieldHandler
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
                    $field.controlStatus('error', error);
                    return;
                }

                $field.controlStatus('success', error);
            });
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
        }
    });
});