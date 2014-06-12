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
         * Метод приводит строки типа camel-case к виду camelCase
         *
         * @method
         * @name Helpers.camelCase
         * @param input
         * @returns {string}
         */
        camelCase: function (input) {
            return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
                return group1.toUpperCase();
            });
        },

        /**
         * Метод возвращает сериализованный инпут
         *
         * @method
         * @name Helpers.camelCase
         * @param {jQuery} $input
         * @returns {Object}
         */
        getInputData: function ($input) {
            var value = $input.val(),
                name = $input.attr('name'),
                params  = {};

            name = this.camelCase(name);
            params[name] = value;

            return params;
        },

        /**
         * Получаем локаль
         *
         * @public
         * @method
         * @name Helpers.getLocale
         * @return {String}
         */
        getLocale: function () {
            return $.cookie('locale') || 'en';
        }
    };
});