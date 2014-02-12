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
         * @name AddPostModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var formElement = $('.add_post_form', this.$el),
                formFields,
                postBody = $('.add_post_form__body', formElement);

            postBody.wysiwyg();

            this.elements.errorsContainer = $('.js-error-messages');
            this.elements.formFields = {};
            formFields = this.elements.formFields;
            formFields.title = $('.js-title', this.$el);
            formFields.body = $('.js-body-editor', this.$el);
        },

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

            this.showFormErrors(field);

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
            this.showFormErrors();
        },

        /**
         * Показываем ошибки у полей
         * Если есть поле, которое сейчас в фокусе, то
         * его исключаем из списка ошибок
         *
         * @method
         * @name AddPostModule.showFormErrors
         * @param {jQuery} [focusField]
         * @returns {undefined}
         */
        showFormErrors: function (focusField) {
            var errors,
                showErrors = [],
                errorsContainer = this.elements.errorsContainer,
                formFields = this.elements.formFields,
                newFormValidation;

            //Проверяем форму по фокусу, только если она уже была
            //хоть раз отправлена
            if (!this.formWasSubmitted) {
                return;
            }

            newFormValidation = this._checkForm(formFields);

            if (this._formValidation) {
                errors = this._formValidation.errors;

                if (errors instanceof Array && errors.length) {
                    Widgets.hideErrorMessages(errors, errorsContainer);
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

                Widgets.showErrorMessages(showErrors, errorsContainer);
            }
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
                $.post('');
            } else {
                this.showFormErrors();
            }

            return false;
        }
    };
});