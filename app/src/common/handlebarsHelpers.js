'use strict';

var Helpers = require('./helpers');

/**
 * Конструктор хелперов для Handlebars
 *
 * @constructor
 * @name HandlebarsHelpers
 * @param {Object} request
 * @returns {Object}
 */
module.exports = function (request) {
    return {
        /**
         * Метод возврвращает первод строки-параметра
         *
         * @method
         * @name HandlebarsHelpers.i18n
         * @return {String}
         */
        i18n: function () {
            var i18n = request.i18n;
            return i18n.__.apply(i18n, arguments);
        },

        /**
         * Метод отображает дату в формате 'mm.dd.yyyy'
         *
         * @method
         * @name HandlebarsHelpers.formatDate
         * @param {String} notFormattedDate неотформатированная дата
         * @return {String}
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
};