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
    userName: function (value) {
        return Soshace.PATTERNS.userName.test(value);
    },

    /**
     * Метод проверки userName на уникальность
     *
     * @method
     * @name Validators.userNameUnique
     * @param {String} value значение
     * @param {Function} respond функция обратного вызова
     * @returns {undefined}
     */
    userNameUnique: function (value, respond) {
        this.model('users').getUser({userName: value}).exec(function (error, user) {
            if (error || user) {
                respond(false);
                return;
            }
            respond(true);
        });
    },

    /**
     * Метод валидирует email
     *
     * @method
     * @param {String} value
     * @name Validators.email
     * @returns {Boolean}
     */
    email: function (value) {
        return Soshace.PATTERNS.email.test(value);
    },

    /**
     * Метод проверки email на уникальность
     *
     * @method
     * @name Validators.emailUnique
     * @param {String} value значение
     * @param {Function} respond функция обратного вызова
     * @returns {undefined}
     */
    emailUnique: function (value, respond) {
        this.model('users').getUser({email: value}).exec(function (error, user) {
            if (error || user) {
                respond(false);
                return;
            }
            respond(true);
        });
    }
};