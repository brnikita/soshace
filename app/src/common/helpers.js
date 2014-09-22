'use strict';

var Crypto = require('crypto');

/**
 * Модуль содержит набор удобных методов
 *
 * @module Helpers
 */
module.exports = {
    /**
     * Форматируем числа к виду '01'
     *
     * @function
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
     * МЕтод закодирует передаваемую строку в MD5
     *
     * @method
     * @name Helpers.encodeMd5
     * @param {string} value кодируемая строка
     * @returns {string}
     */
    encodeMd5: function(value){
        return Crypto.createHash('md5').update(value).digest('hex');
    }
};