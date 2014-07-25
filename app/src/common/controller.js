'use strict';

var Class = require('../vendors/class');

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
     * @param {Function} next
     * @returns {undefined}
     */
    initialize: function (request, response, next) {
        this.request = request;
        this.response = response;
        this.next = next;
    },


    /**
     * Метод отправляет сообщение с ошибкой
     * Текст ошибки передается в параметре
     *
     * @method
     * @name ControllerInit#sendError
     * @param {*} error
     * @param {String} [status] 404, 500 по-умолчанию 400
     * @returns {undefined}
     */
    sendError: function (error, status) {
        var response = this.response;

        status = status || 400;
        response.status(status).send({
            error: error
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
            error: null,
            message: message
        });
    }
});