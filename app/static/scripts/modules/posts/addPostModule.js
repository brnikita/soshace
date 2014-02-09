'use strict';

/**
 * Модуль страницы добавления поста
 *
 * @module AddPostModule
 */

define([
    'jquery',
    'underscore',
    'utils/helpers',
    'bootstrap',
    'bootstrap.wysiwyg'
], function ($, _, Helpers) {
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
         * Список элементов формы
         *
         * @field
         * @name AddPostModule.formElements
         * @type {null|Object}
         */
        formElements: null,

        /**
         * @name AddPostModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var formElement = $('.add_post_form', this.$el),
                postBody = $('.add_post_form__body', formElement);

            postBody.wysiwyg();

            this.formElements = {};
            this.formElements.title = $('.js-title', this.$el);
            this.formElements.body = $('.js-body-editor', this.$el);
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
         * @param {jQuery} formElements
         * @returns {Object}
         */
        _checkForm: function (formElements) {
            var valid = true,
                message = null;

            _.each(formElements, _.bind(function (element) {
                var value,
                    name = element.attr('name');

                if (element.attr('contenteditable')) {
                    value = element.html();
                } else {
                    value = element.val();
                }

                if (!value) {
                    valid = false;
                    message = this.errorMessages[name];
                }
            }, this));

            return {
                valid: valid,
                message: message
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
        _submitForm: function (event) {
            console.log(this._checkForm(this.formElements));
            return false;
        }
    };
});