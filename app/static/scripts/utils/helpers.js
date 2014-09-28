'use strict';

(function (Soshace) {
    var _ = Soshace._;

    /**
     * Модуль содержащий удобные методы для
     * работы с DOM, стороками и числами
     *
     * @module Soshace.helpers
     */
    Soshace.helpers = {
        /**
         * Метод возвращает сериализованный инпут
         *
         * @public
         * @method
         * @name Soshace.helpers.serializeField
         * @param {jQuery} $input
         * @returns {Object}
         */
        serializeField: function ($input) {
            var value = $input.val(),
                name = $input.attr('name');

            return {
                name: _.camelCase(name),
                value: _.trim(value)
            };
        },

        /**
         * Получаем локаль
         *
         * @public
         * @method
         * @name Soshace.helpers.getLocale
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
         * @name Soshace.helpers.i18n
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
         * @name Soshace.helpers._i18nSetParams
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
         * @name Soshace.helpers.checkHistoryApiSupport
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
         * @name Soshace.helpers.scrollToElementTop
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
         * @name Soshace.helpers.zeroLeading
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
         * @name Soshace.helpers.setCookie
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
         * Метод вовзращает true, если есть профиль
         * аутентифицированного пользователя
         *
         * @method
         * @name Soshace.helpers.isAuthenticated
         * @returns {boolean}
         */
        isAuthenticated: function () {
            return this.getCookie('isAuthenticated') === '1';
        }
    };
})(window.Soshace);