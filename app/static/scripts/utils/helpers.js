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
    'jquery.cookie',
    'config'
], function ($, _) {
    return {
        /**
         * TODO: в jquery есть такое же
         * Метод возвращает данные формы в виде объекта
         *
         * @deprecated
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
         * Метод приводит строки типа hyp-hen к виду camelCase
         *
         * @method
         * @name Helpers.camelCase
         * @param {String} value
         * @returns {string}
         */
        camelCase: function (value) {
            return $.camelCase(value);
        },

        /**
         * Метод приводит строки типа camelCase к виду hyp-hen
         *
         * @method
         * @name Helpers.camelCase
         * @param {String} value
         * @returns {string}
         */
        hyphen: function (value) {
            return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },

        /**
         * Метод возвращает сериализованный инпут
         *
         * @method
         * @name Helpers.serializeField
         * @param {jQuery} $input
         * @returns {Object}
         */
        serializeField: function ($input) {
            var value = $input.val(),
                name = $input.attr('name'),
                _this = this;

            return {
                name: _this.camelCase(name),
                value: $.trim(value)
            };
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
        },

        /**
         * Метод переводит переданныу строку
         *
         * @method
         * @name Helpers.i18n
         * @param {String} value
         * @returns {String}
         */
        i18n: function (value) {
            var locale = this.getLocale(),
                translations = Soshace.locales[locale];

            if (typeof translations === 'undefined') {
                return value;
            }

            if (typeof translations[value] === 'undefined') {
                return value;
            }

            return translations[value];
        },

        /**
         * Метод возвращает true, если есть поддержка History API
         *
         * @method
         * @name Helpers.checkHistoryApiSupport
         * @returns {boolean}
         */
        checkHistoryApiSupport: function () {
            return !!(window.history && history.pushState);
        },

        /**
         * TODO: не работает opara mini
         *
         * Метод удобен в мобильных версиях
         * Поле должно быть хорошо видно
         *
         * @method
         * @name Helpers.scrollFieldToTop
         * @param {jQuery} $field
         * @returns {undefined}
         */
        scrollFieldToTop: function ($field) {
            var offset = $field.offset(),
                top = offset.top - 10;

            setTimeout(function () {
                window.scrollTo(0, top);
            }, 1500);
        },

        /**
         * Форматируем числа к виду '01'
         *
         * @function
         * @name Helpers.zeroLeading
         * @param {Number|String} numberToFormat
         * @returns {String}
         */
        zeroLeading: function (numberToFormat) {
            numberToFormat = String(numberToFormat);
            if (numberToFormat && numberToFormat.length) {
                if (numberToFormat.length === 1) {
                    return '0' + numberToFormat;
                }
                return numberToFormat;
            }
            return '00';
        }
    };
});