'use strict';

/**
 * Модуль содержит набор валидаторов для моделей
 *
 * @module Validators
 */
module.exports = {
    /**
     * Метод валидирует userName
     *
     * @method
     * @param {String} value
     * @name Validators.userName
     * @returns {Boolean}
     */
    userName: function(value){
        return Soshace.PATTERNS.userName.test(value);
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