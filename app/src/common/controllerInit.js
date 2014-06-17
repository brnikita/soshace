'use strict';

var Class = require('../libs/class');

/**
 * Родительский класс для контороллеров
 *
 * @class ControllerInit
 */
module.exports = Class.extend({

    /**
     * Объект ответа
     *
     * @field
     * @name ControllerInit#response
     * @type {Object | null}
     */
    response: null,

    /**
     * Объект запроса
     *
     * @field
     * @name ControllerInit#request
     * @type {Object | null}
     */
    request: null,

    /**
     * @constructor
     * @name ControllerInit#initialize
     * @param {Object} request объект запроса
     * @param {Object} response Объект ответа
     */
    initialize: function (request, response) {
        this.request = request;
        this.response = response;
    },


    /**
     * Метод отправляет сообщение с ошибкой
     * Текст ошибки передается в параметре
     *
     * @method
     * @name ControllerInit#sendError
     * @param {String} message
     * @param {Boolean} [notTranslate] флаг означающий, что не нужно переводить переданное
     *                               сообщение
     * @returns {undefined}
     */
    sendError: function (message, notTranslate) {
        var response = this.response;

        if(!notTranslate){
            message = this.i18n(message);
        }

        response.send({
            error: true,
            message: message
        });
    },

    /**
     * Метод переводит переданную строку
     *
     * @method
     * @name ControllerInit#i18n
     * @param value {String} строка для перевода
     * @returns {String} перевод
     */
    i18n: function (value) {
        var request = this.request;

        return request.i18n(value);
    }
});