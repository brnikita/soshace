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
            'blur .js-body-editor': '_postBodyLoseFocus',
            'submit': '_submitForm'
        },

        /**
         * @private
         * @method
         * @name AddPostModule._postBodyLoseFocus
         * @returns {undefined}
         */
        _postBodyLoseFocus: function (event) {
//            console.log(event);
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
         * @method
         * @private
         * @name AddPostModule._checkForm
         * @param {jQuery} formFields
         * @returns {Object}
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
                errorsContainer = this.elements.errorsContainer,
                formValidation = this._checkForm(formFields);

            if (!formValidation.valid) {
                Widgets.showErrorMessages(
                    formValidation.errors,
                    errorsContainer
                );
            }

            return false;
        }
    };
});