'use strict';

/**
 * Модуль содержит различные виджеты
 *
 * @module Widgets
 */

define([
    'jquery',
    'underscore'
], function ($, _) {
    var errorsContainerDefault = $('.js-body-messages'),
        $body = $('body');

    return {
        /**
         * TODO: костыльный метод, убрать его!
         *
         * @deprecated
         *
         * @method
         * @name Widgets.showErrorMessages
         * @param {Array} errors массив содержащий объекты вида
         *                {
         *                  message: 'error',
         *                  element: element
         *                }
         *                Где message - сообщение ошибки
         *                    element - поле, в котором произошла ошибка, и которое надо
         *                    подсветить
         * @param {jQuery} [errorsContainer] Элемент, на который крепятся сообщения
         * @returns {undefined}
         */
        showErrorMessages: function (errors, errorsContainer) {
            var messages = [];
            errorsContainer = errorsContainer || errorsContainerDefault;

            if (!(errors instanceof Array)) {
                return;
            }

            if (errors.length === 0) {
                return;
            }

            _.each(errors, function (error) {
                if (error.message) {
                    messages.push(error.message);
                }

                if (error.element) {
                    if (error.element instanceof $) {
                        error.element.addClass('error');
                    } else if (error.element.isEditor) {
                        error.element.elements.editorElement.addClass('error');
                    }
                }
            });

            this.showMessages(messages, errorsContainer, 'alert-danger');
        },

        /**
         * Метод меняет класс у тела страницы
         *
         * @method
         * @name Widgets.showMessages
         * @param {string} bodyClass новый класс body
         * @returns {undefined}
         */
        setBodyClass: function (bodyClass) {
            $body.removeAttr('class');
            $body.addClass(bodyClass);
            this.previousBodyClass = bodyClass;
        },

        /**
         * Показывает сообщения
         *
         * @method
         * @name Widgets.showMessages
         * @param {Array|string} messages сообщение или список сообщений
         * @param {jQuery} [errorsContainer] котейнер для прикрепеления сообщений
         * @param {string} [alertClass] класс уведомления alert-success,
         *                                                alert-info,
         *                                                alert-warning, по умолчанию
         *                                                alert-danger
         * @returns {undefined}
         */
        showMessages: function (messages, errorsContainer, alertClass) {
            alertClass = alertClass || 'alert-warning';
            errorsContainer = errorsContainer || errorsContainerDefault;

            var alert = $('<div>', {
                    class: 'alert ' + alertClass
                }),
                message,
                isOneMessage = messages instanceof Array && messages.length === 1 ||
                    typeof messages === 'string',
                areSomeMessages = messages instanceof Array && messages.length > 1,
                alertContent;

            if (isOneMessage) {
                if (messages instanceof Array) {
                    message = messages[0];
                } else {
                    message = messages;
                }

                alertContent = $('<p>', {
                    text: message
                });
            } else if (areSomeMessages) {
                alertContent = $('<ul>');

                _.each(messages, function (message) {
                    var item = $('<li>', {
                        text: message
                    });

                    alertContent.append(item);
                });

            } else {
                return;
            }

            alert.append(alertContent);
            errorsContainer.html(alert);
            alert.fadeOut(0).fadeIn();
        },

        /**
         * Скрывает сообщения об ошибках
         * Параметры аналогичные для показа сообщений
         *
         * @method
         * @name Widgets.hideErrorMessages
         * @param {Array} errors массив содержащий объекты вида
         *                {
         *                  message: 'error',
         *                  element: element
         *                }
         *                Где message - сообщение ошибки
         *                    element - поле, в котором произошла ошибка, и которое надо
         *                    подсветить
         * @param {jQuery} [errorsContainer] Элемент, на который крепятся сообщения
         * @returns {undefined}
         */
        hideErrorMessages: function (errors, errorsContainer) {
            errorsContainer = errorsContainer || errorsContainerDefault;

            if (!(errors instanceof Array && errors.length)) {
                return;
            }

            errorsContainer.html('');

            _.each(errors, function (error) {
                if (error.element) {
                    if (error.element instanceof $) {
                        error.element.removeClass('error');
                    } else if (error.element.isEditor) {
                        error.element.elements.editorElement.removeClass('error');
                    }
                }
            });
        },

        /**
         * Метод перекрывает переданный элемент в параметрах
         * лоадером
         *
         * @method
         * @name Widgets.showLoader
         * @param {jQuery} $element элемент, к которому прибавляем лоадер
         * @returns {undefined}
         */
        showLoader: function ($element) {
            var $loader = $('.js-loader-mask').clone();

            $element.css('position', 'relative');
            $element.append($loader);
            $loader.removeClass('hide');
        },

        /**
         * Метод убирает с элемента лоадер
         *
         * @method
         * @name Widgets.showLoader
         * @param {jQuery} $element элемент, с которого удаляем лоадер
         * @returns {undefined}
         */
        hideLoader: function ($element) {
            $('.js-loader-mask', $element).remove();
            $element.removeAttr('style');
        },

        /**
         * Форматирует блоки с классом .prettyprint
         * в переданном контексте
         *
         * @name Widgets.prettify
         * @param {jQuery} context элемент DOM
         * @param {string} codeLanguage
         * @returns {undefined}
         */
        prettify: function (context, codeLanguage) {
            var $prettyPrint = $('.prettyprint', context),
                formattedHtml;

            $prettyPrint.each(function () {
                var codeBlock = $(this);

                formattedHtml = prettyPrintOne(codeBlock.html(), codeLanguage, true);
                codeBlock.html(formattedHtml);
            });
        }
    };
});