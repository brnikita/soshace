'use strict';

var Class = require('../libs/class');

/**
 * Родительский класс для контороллеров
 *
 * @class ControllerInit
 */
module.exports = Class.extend({

    /**
     * @field
     * @name ControllerInit#next
     * @type {Function | null}
     */
    next: null,

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
        this.next = this.next;
    },


    /**
     * Метод отправляет сообщение с ошибкой
     * Текст ошибки передается в параметре
     *
     * @method
     * @name ControllerInit#sendError
     * @param {String} message
     * @returns {undefined}
     */
    sendError: function (message) {
        var response = this.response;

        response.send({
            error: true,
            message: message
        });
    },

    /**
     * Метод отправляет успешное сообщение
     * Текст сообщения передается в параметре
     *
     * @method
     * @name ControllerInit#sendSuccess
     * @param {String} message
     *                               сообщение
     * @returns {undefined}
     */
    sendSuccess: function (message) {
        var response = this.response;

        response.send({
            error: false,
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

        return request.i18n.__(value);
    }
});