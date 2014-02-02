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
    'jquery.validation',
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
         * @name AddPostModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var formElement = $('.add_post_form', this.$el),
                postBody = $('.add_post_form__body', formElement);

            postBody.wysiwyg();
            this._validateConfig(formElement);
        },

        /**
         * TODO: переписать под список слушателей
         *
         * Прикрепляет слушатели
         *
         * @method
         * @name AddPostModule.events
         * @returns {undefined}
         */
        events: function () {
            var toolbar = $('.js-toolbar', this.$el);

            this.$el.
                on('focus', '.js-post-body',function () {
                    toolbar.removeClass('hide');
                }).
                on('blur', '.js-post-body', function (event) {
                    var $target = $(event.target);
                    debugger;
                    if ($target.hasClass('js-body-editor')) {
                        return;
                    }

                    toolbar.addClass('hide');
                });
        },

        /**
         * Конфигурируем валидацию для формы отправки
         * поста
         *
         * @private
         * @method
         * @name AddPostModule._validateConfig
         * @param {jQuery} formElement ссылка на Jquery объект формы,
         *                             которую хотим проверить
         * @returns {undefined}
         */
        _validateConfig: function (formElement) {
            var _this = this;

            formElement.validate({
                rules: {
                    title: {
                        required: true
                    },
                    body: {
                        required: true
                    }
                },
                messages: {
                    title: {
                        required: 'Укажите заголовок статьи'
                    },
                    body: {
                        required: 'Вы забыли написать статью'
                    }
                },
                invalidHandler: _this._invalidHandler,
                submitHandler: _this._submitHandler,
                errorPlacement: _this._errorPlacement
            });
        },

        /**
         * Клиентский обработчик ошибок формы
         *
         * @private
         * @method
         * @name AddPostModule._invalidHandler
         * @param {jQuery.Event} event
         * @param {jQuery.validate} validator
         * @returns {undefined}
         */
        _invalidHandler: function (event, validator) {
            _.each(validator.errorList, function (error) {
                $(error.element).tooltip({
                    title: error.message,
                    trigger: 'click'
                }).tooltip('show');
            });
        },

        /**
         * Обработчик успешной отправки формы
         *
         * @private
         * @method
         * @name AddPostModule._submitHandler
         * @param {jQuery} formElement ссылка на элемент формы
         * @returns {undefined}
         */
        _submitHandler: function (formElement) {
            var _this = this,
                formData = Helpers.serializeFormObject($(formElement));

            $.post('/api/post', formData, _this._sendPostSuccess, 'json');
        },

        /**
         * @private
         * @method
         * @name AddPostModule._sendPostSuccess
         * @param {Object} data
         * @returns {undefined}
         */
        _sendPostSuccess: function (data) {
            console.log(data);
            debugger;
        },

        /**
         * Метод отображающий кастомную ошибку
         *
         * @private
         * @method
         * @name AddPostModule._errorPlacement
         * @returns {boolean}
         */
        _errorPlacement: function () {
            return true;
        }
    };
});