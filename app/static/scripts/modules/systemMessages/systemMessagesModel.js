'use strict';

/**
 * Модель системного сообщения
 *
 * @class SystemMessagesModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @field
         * @name SystemMessagesModel#defaults
         * @type {Object}
         */
        defaults: {
            //сокращение для системного сообщения
            alias: null,
            //id пользователя, к которому относится сообщение
            ownerId: null,
            //путь до шаблона системного уведомления
            templatePath: null,
            //Параметры, которые передаются в шаблон
            templateOptions: null,
            //Сообщение закрывается пользователем
            closedByUser: false,
            //Сообщение показывается только один раз
            showOnce: null,
            //страницы на которых может быть показано сообщение
            pages: null,
            //true - сообщение не может быть удалено или измененно клиентским запросом
            readOnly: false
        },

        /**
         * @field
         * @name SystemMessagesModel#url
         * @type {string}
         */
        url: Soshace.urls.api.systemMessage,

        /**
         * @constructor
         * @name SystemMessagesModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});