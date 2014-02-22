'use strict';

/**
 * Модуль содержащий удобные методы для
 * работы с DOM, стороками и числами
 *
 * @module Helpers
 */

define([
    'jquery',
    'underscore',
    'jquery.cookie'
], function ($, _) {
    return {

        /**
         * Метод возвращает данные формы в виде объекта
         *
         * @public
         * @method
         * @name Helpers.serializeFormObject
         * @param {jQuery} formElement ссылка на элемент формы
         * @returns {Object} сериализованная форма
         */
        serializeFormObject: function (formElement) {
            var formArray = formElement.serializeArray(),
                formObject = {};

            _.each(formArray, function (formField) {
                formObject[formField.name] = formField.value;
            });

            return formObject;
        },

        /**
         * Получаем локаль
         *
         * @public
         * @function
         * @name Helpers.getLocale
         * @return {String}
         */
        getLocale: function () {
            return $.cookie('locale') || 'en';
        }
    };
});