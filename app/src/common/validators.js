'use strict';

/**
 * Модуль содержит набор валидаторов для моделей
 *
 * @module Validators
 */
module.exports = {
    /**
     * Метод проверяет на наличие значения
     *
     * @method
     * @name Validators.required
     * @param {*} value
     * @returns {Boolean}
     */
    required: function (value) {
        return !!value;
    },

    /**
     * Метод валидирует email
     *
     * @method
     * @param {String} value
     * @name Validators.email
     * @returns {Boolean}
     */
    email: function(value){
        return Soshace.PATTERNS.email.test(value);
    }
};