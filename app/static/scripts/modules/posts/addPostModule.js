'use strict';

/**
 * Модуль страницы добавления поста
 *
 * @module AddPostModule
 */

define([
    'jquery',
    'underscore',
    'utils/widgets',
    'bootstrap',
    'bootstrap.wysiwyg'
], function ($, _, Widgets) {
    return {

        /**
         * Контекст модуля
         *
         * @field
         * @name AddPostModule.$el
         * @type {jQuery|null}
         */
        $el: null,

        /**
         * Список элементов DOM
         *
         * @field
         * @name AddPostModule.elements
         * @type {Object}
         */
        elements: {},

        /**
         * Указывает была ли уже попытка отправить форму
         * Нужно для включения механизма постоянной валидации
         * в методе _focusField
         *
         * @field
         * @name AddPostModule.formWasSubmitted
         * @type {boolean}
         */
        formWasSubmitted: false,

        /**
         * Объект содержаший результат валидирования формы
         * Результат исполнения метода _checkForm
         *
         * @field
         * @name AddPostModule._formValidation
         * @type {Object|null}
         */
        _formValidation: null,

        /**
         * Список обработчиков ошибок
         *
         * @field
         * @name AddPostModule.events
         * @type {Object}
         */
        events: {
            'submit': '_submitForm',
            'focus .js-title': '_focusField',
            'blur .js-title': '_blurField',
            'focus .js-body-editor': '_focusField',
            'blur .js-body-editor': '_blurField'
        },

        /**
         * @field
         * @name AddPostModule.errorMessages
         * @type {Object}
         */
        errorMessages: {
            title: 'Вы забыли указать загловок',
            body: 'Вы забыли указать тело поста'
        },

        /**
         * @name AddPostModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var formElement = $('.add_post_form', this.$el),
                formFields,
                postBody = $('.add_post_form__body', formElement);

            _.bindAll(this, '_showServerMessages');

            postBody.wysiwyg();

            this.elements.messagesContainer = $('.js-body-messages');
            this.elements.formFields = {};
            formFields = this.elements.formFields;
            formFields.title = $('.js-title', this.$el);
            formFields.body = $('.js-body-editor', this.$el);
        },

        /**
         * Обработчик события получения фокуса полем формы
         *
         * @private
         * @method
         * @name AddPostModule._focusField
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        _focusField: function (event) {
            var field = $(event.target);

            this.showClientErrors(field);
        },

        /**
         * Обработчик события потери фокуса полем формы
         *
         * @private
         * @method
         * @name AddPostModule._blurField
         * @returns {undefined}
         */
        _blurField: function () {
            this.showClientErrors();
        },

        /**
         * Ошибки на клиенте
         * Показываем ошибки у полей
         * Если есть поле, которое сейчас в фокусе, то
         * его исключаем из списка ошибок
         *
         * @method
         * @name AddPostModule.showClientErrors
         * @param {jQuery} [focusField]
         * @returns {undefined}
         */
        showClientErrors: function (focusField) {
            var errors,
                showErrors = [],
                messagesContainer = this.elements.messagesContainer,
                formFields = this.elements.formFields;

            //Проверяем форму по фокусу, только если она уже была
            //хоть раз отправлена
            if (!this.formWasSubmitted) {
                return;
            }

            if (this._formValidation) {
                errors = this._formValidation.errors;

                if (errors instanceof Array && errors.length) {
                    Widgets.hideErrorMessages(errors, messagesContainer);
                }
            }

            this._formValidation = this._checkForm(formFields);
            errors = this._formValidation.errors;

            if (errors.length) {
                if (focusField) {
                    //Исключаем поле, которое сейчас редактируем
                    _.each(errors, function (error) {
                        if (error.element[0] !== focusField[0]) {
                            showErrors.push(error);
                        }
                    });
                } else {
                    showErrors = errors;
                }

                Widgets.showErrorMessages(showErrors, messagesContainer);
            }
        },

        /**
         * Показываем серверные ошибки для полей
         *
         * @method
         * @name AddPostModule.showServerErrors
         * @param {Object|Array} fields поля или поле с ошибками
         *                              Пример: {
         *                                        fieldName: 'title',
         *                                        message:   'Не указан загловок'
         *                                      }
         * @returns {undefined}
         */
        showServerErrors: function (fields) {
            var showErrors = [],
                formFields = this.elements.formFields,
                messagesContainer = this.elements.messagesContainer,
                isArray = fields instanceof Array,
                isObject = typeof fields === 'object' && fields !== null;

            if (isArray || isObject) {
                _.each(fields, function (field) {
                    showErrors.push({
                        message: field.message,
                        element: formFields[field.fieldName]
                    });
                });
            }

            Widgets.showErrorMessages(showErrors, messagesContainer);
        },

        /**
         * Метод для проверки формы
         * Правильности заполнения полей
         *
         * @method
         * @private
         * @name AddPostModule._checkForm
         * @param {[jQuery]} formFields список полей
         * @returns {Object} возвращает объект вида {
         *                                              valid: valid, - валиданая ли вся форма
         *                                              errors: [{
         *                                                  message: message, - сообщение об ошибке
         *                                                  element: element - ссылка на DOM поля с ошибкой
         *                                              }]
         *                                          }
         */
        _checkForm: function (formFields) {
            var valid = true,
                errors = [];

            _.each(formFields, _.bind(function (element) {
                var value,
                    name = element.attr('name');

                if (element.attr('contenteditable')) {
                    value = element.html();
                } else {
                    value = element.val();
                }

                if (!value) {
                    errors.push({
                        message: this.errorMessages[name],
                        element: element
                    });
                }
            }, this));

            if (errors.length > 0) {
                valid = false;
            }

            return {
                valid: valid,
                errors: errors
            };
        },


        /**
         * Возвращает данные формы
         *
         * @private
         * @method
         * @name AddPostModule._getFormData
         * @param {object} formFields
         * @returns {object}
         */
        _getFormData: function (formFields) {
            var formsData = {};

            _.each(formFields, function (field) {
                var value,
                    name = field.attr('name');

                if (field.attr('contenteditable')) {
                    value = field.html();
                } else {
                    value = field.val();
                }

                formsData[name] = value;

            });

            return formsData;
        },

        /**
         * Показ сообщений от сервера
         *
         * @private
         * @method
         * @name AddPostModule._showSuccessMessage
         * @param {Object} response Ответ сервера
         * @returns {undefined}
         */
        _showServerMessages: function (response) {
            var messagesContainer = this.elements.messagesContainer;

            if (response.error) {
                if (response.fields) {
                    this.showServerErrors(response.fields);
                } else if (response.message) {
                    Widgets.showMessages(response.message, messagesContainer, 'alert-danger');
                }

                return;
            }

            if (response.message){
                Widgets.showMessages(response.message, messagesContainer, 'alert-success');
            }
        },

        /**
         * Обработчик отправки формы
         *
         * @private
         * @method
         * @name AddPostModule._submitForm
         * @returns {boolean}
         */
        _submitForm: function () {
            var formFields = this.elements.formFields,
                formValidation = this._checkForm(formFields);

            this.formWasSubmitted = true;

            if (formValidation.valid) {
                $.post('/api/post',
                    this._getFormData(formFields),
                    this._showServerMessages
                );
            } else {
                this.showClientErrors();
            }

            return false;
        }
    };
});