'use strict';

(function (Soshace) {
    /**
     * Модель системного сообщения
     *
     * @class Soshace.models.SystemMessagesModel
     */
    Soshace.models.SystemMessagesModel = Soshace.core.Model.extend({
        /**
         * @field
         * @name Soshace.models.SystemMessagesModel#idAttribute
         * @type {string}
         */
        idAttribute: '_id',

        /**
         * @field
         * @name Soshace.models.SystemMessagesModel#defaults
         * @type {Object}
         */
        defaults: {
            _id: null,
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
         * @method
         * @name Soshace.models.SystemMessagesModel#url
         * @returns {String}
         */
        url: function () {
            var id = this.get('_id');
            return Soshace.urls.api.systemMessage.replace('0', id);
        },

        /**
         * @constructor
         * @name Soshace.models.SystemMessagesModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
})(window.Soshace);