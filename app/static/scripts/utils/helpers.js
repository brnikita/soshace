'use strict';

/**
 * Модуль содержащий удобные методы для
 * работы с DOM, стороками и числами
 *
 * @module Helpers
 */

define([
    'core',
    'underscore',
    'global'
], function (Core, _, Soshace) {
    return {
        /**
         * Метод приводит строки типа hyp-hen к виду camelCase
         *
         * @public
         * @method
         * @name Helpers.camelCase
         * @param {string} value
         * @returns {string}
         */
        camelCase: function (value) {
            return value.toLowerCase().replace(/-(.)/g, function (match, group1) {
                return group1.toUpperCase();
            });
        },

        /**
         * Метод приводит строки типа camelCase к виду hyp-hen
         *
         * @public
         * @method
         * @name Helpers.camelCase
         * @param {string} value
         * @returns {string}
         */
        hyphen: function (value) {
            return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },

        /**
         * Метод возвращает сериализованный инпут
         *
         * @public
         * @method
         * @name Helpers.serializeField
         * @param {jQuery} $input
         * @returns {Object}
         */
        serializeField: function ($input) {
            var value = $input.val(),
                name = $input.attr('name');

            return {
                name: this.camelCase(name),
                value: this.trim(value)
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
            return this.getCookie('locale') || 'en';
        },

        /**
         * Метод переводит переданныу строку
         *
         * @public
         * @method
         * @name Helpers.i18n
         * @returns {string}
         */
        i18n: function () {
            var value = arguments[0],
                locale = this.getLocale(),
                translations = Soshace.locales[locale];

            Array.prototype.shift.call(arguments);

            if (typeof translations === 'undefined') {
                return this._i18nSetParams(value, arguments);
            }

            if (typeof translations[value] === 'undefined') {
                return this._i18nSetParams(value, arguments);
            }

            return this._i18nSetParams(translations[value], arguments);
        },

        /**
         * Метод вставляет в строку переменные из списка опций
         * Заменяет {{param}}
         *
         * @private
         * @method
         * @name Helpers._i18nSetParams
         * @param {string} value строка перевода
         * @param {Array} optionsList список опций
         * @returns {string}
         */
        _i18nSetParams: function (value, optionsList) {
            var stringParams = value.match(/\{\{(.+?)\}\}/g);

            _.each(stringParams, function (param, index) {
                value = value.replace(param, optionsList[index]);
            });

            return value;
        },

        /**
         * Метод возвращает true, если есть поддержка History API
         *
         * @public
         * @method
         * @name Helpers.checkHistoryApiSupport
         * @returns {boolean}
         */
        checkHistoryApiSupport: function () {
            return !!(window.history && history.pushState);
        },

        /**
         * Метод прокручивает до верхнего края элемента + 10px, чтобы
         * элемент было хорошо видно
         *
         * @public
         * @method
         * @name Helpers.scrollToElementTop
         * @param {jQuery} $element
         * @returns {undefined}
         */
        scrollToElementTop: function ($element) {
            var offset = $element.offset(),
                top = offset.top - 10;

            window.scrollTo(0, top);
        },

        /**
         * Форматируем числа к виду '01'
         *
         * @public
         * @method
         * @name Helpers.zeroLeading
         * @param {number | string} numberToFormat
         * @returns {string}
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
        },

        /**
         * Метод возврвщает cookie
         *
         * @public
         * @method
         * @param {string} name
         * @returns {string}
         */
        getCookie: function (name) {
            var matches = document.cookie.match(new RegExp(
                    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },

        /**
         * Метод устанавливает cookie
         *
         * @public
         * @method
         * @name Helpers.setCookie
         * @param {string} name
         * @param {string} value
         * @param {Object} options
         * @returns {undefined}
         */
        setCookie: function (name, value, options) {
            var expires, today, propName, propValue, updatedCookie;

            options = options || {};

            expires = options.expires;

            if (_.isNumber(expires) && expires) {
                today = new Date();
                today.setTime(today.getTime() + expires * 1000);
                expires = options.expires = today;
            }
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            updatedCookie = name + '=' + value;

            for (propName in options) {
                if (options.hasOwnProperty(propName)) {
                    updatedCookie += '; ' + propName;
                    propValue = options[propName];
                    if (propValue !== true) {
                        updatedCookie += '=' + propValue;
                    }
                }

            }

            document.cookie = updatedCookie;
        },

        /**
         * Метод удаляет из строки пробелы в начале и в конце
         *
         * @public
         * @method
         * @name Helpers.trim
         * @param {string} value
         * @returns {string}
         */
        trim: function(value){
            return value.replace(/^\s+|\s+$/gm,'');
        }
    };
});