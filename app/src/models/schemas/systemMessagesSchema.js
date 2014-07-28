'use strict';

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

/**
 * Класс для работы с моделью системных уведомлений пользователя
 *
 * @class
 * @name SystemMessagesShema
 * @type {Schema}
 */
var SystemMessagesShema = new Schema({
    templatePath: {
        default: '',
        type: String
    },
    //Параметры, которые передаются в шаблон
    templateOptions: {
        type: Schema.Types.Mixed,
        default: null
    },
    //Сообщение закрывается пользователем
    closedByUser: {
        type: Boolean,
        default: false
    },
    //Сообщение показывается только один раз
    showOnce: {
        type: Boolean,
        default: false
    },
    //страницы на которых может быть показано сообщение
    pages: {
        type: [String]
    },
    //true - сообщение не может быть удалено или измененно клиентским запросом
    readOnly: {
        type: Boolean,
        default: false
    }
});

module.exports = SystemMessagesShema;