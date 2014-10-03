'use strict';

var _ = require('underscore'),
    Helpers = srcRequire('common/helpers');

/**
 * Конструктор хелперов для шаблонизатора
 *
 * @constructor
 * @name TemplateHelpers
 * @param {Object} request
 * @returns {Object}
 */
module.exports = function (request) {
    var TemplateHelpers = {
        /**
         * Метод возврвращает первод строки-параметра
         *
         * @method
         * @name TemplateHelpers.i18n
         * @return {string}
         */
        i18n: function () {
            //В случае each передается контекст объекта в цикле,
            //поэтому используется ссылка на TemplateHelpers
            var _this = TemplateHelpers,
                i18n = request.i18n,
                translate = i18n.__.apply(i18n, arguments);

            Array.prototype.shift.call(arguments);
            return _this._i18nSetParams(translate, arguments);
        },

        /**
         * Метод вставляет в строку переменные из списка опций
         * Заменяет {{param}}
         *
         * @private
         * @method
         * @name TemplateHelpers._i18nSetParams
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
         * Метод отображает дату в формате 'mm.dd.yyyy'
         *
         * @method
         * @name TemplateHelpers.formatDate
         * @param {string} notFormattedDate неотформатированная дата
         * @return {string}
         */
        formatDate: function (notFormattedDate) {
            var dateObject = new Date(notFormattedDate),
                date = dateObject.getDate(),
                month = dateObject.getMonth() + 1,
                year = dateObject.getFullYear();

            date = Helpers.zeroLeading(date);
            month = Helpers.zeroLeading(month);

            return [date, month, year].join('.');
        }
    };

    return TemplateHelpers;
};