'use strict';

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Класс для работы с моделью системных уведомлений пользователя
 *
 * @class
 * @name SystemMessagesShema
 * @type {Schema}
 */
var SystemMessagesShema = new Schema({
    //сокращение для системного сообщения
    alias: {
        default: null,
        type: String
    },
    //id пользователя, к которому относится сообщение
    owner: {
        default: null,
        type: ObjectId
    },
    //путь до шаблона системного уведомления
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

/**
 * Метод удаляет сообщение из коллекции
 *
 * @method
 * @name SystemMessagesShema.removeMessage
 * @param {ObjectId} userId пользователь, которому принадлежит сообщение
 * @param {String} alias сокращенное название уведомления
 * @param {Function} callback
 * @return {undefined}
 */
SystemMessagesShema.statics.removeMessage = function (userId, alias, callback) {
    this.findOne({owner: userId, alias: alias}, function (error, message) {
        if (error) {
            callback({error: {message: 'Server is too busy, try later', code: 503}});
            return;
        }

        if (message) {
            message.remove();
        }

        callback(null);
    });
};

module.exports = Mongoose.model('systemMessages', SystemMessagesShema);