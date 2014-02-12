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
    return {
        /**
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
         * @param {jQuery} errorsContainer Элемент, на который крепятся сообщения
         * @returns {undefined}
         */
        showErrorMessages: function (errors, errorsContainer) {
            var alertList,
                alert;

            if (!(errors instanceof Array)) {
                return;
            }

            if (errors.length === 0) {
                return;
            }

            alert = $('<div>', {
                class: 'alert alert-danger'
            });

            alertList = $('<ul>');

            _.each(errors, function (error) {
                if (error.message) {
                    alertList.append($('<li>', {
                        text: error.message
                    }));
                }

                if (error.element) {
                    error.element.addClass('error');
                }
            });

            alert.append(alertList);
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
         * @param {jQuery} errorsContainer Элемент, на который крепятся сообщения
         * @returns {undefined}
         */
        hideErrorMessages: function (errors, errorsContainer) {
            if (!(errors instanceof Array && errors.length)) {
                return;
            }

            errorsContainer.html('');

            _.each(errors, function (error) {
                if (error.element) {
                    error.element.removeClass('error');
                }
            });
        }
    };
});