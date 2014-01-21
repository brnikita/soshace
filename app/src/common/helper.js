'use strict';

var Helper = {
    /**
     * Форматируем числа к виду '01'
     *
     * @function
     * @name Helper.zeroLeading
     * @param {Number|String} numberToFormat
     * @returns {String}
     */
    zeroLeading: function(numberToFormat){
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

exports.Helper = Helper;