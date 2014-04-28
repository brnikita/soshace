'use strict';

/**
 * @constructor
 * @name HandlebarsHelpers
 * @param {Object} request
 * @param {Object} response
 * @returns {Object}
 */
module.exports = function (request/*, response*/) {
    return {
        /**
         * Метод возврвращает первод строки-параметра
         *
         * @method
         * @name HandlebarsHelpers#i18n
         * @return {string}
         */
        i18n: function () {
            var i18n = request.i18n;
            return i18n.__.apply(i18n, arguments);
        }
    };
};