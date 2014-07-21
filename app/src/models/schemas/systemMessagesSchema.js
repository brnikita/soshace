'use strict';

var Mongoose = require('mongoose');

/**
 * Класс для работы с моделью сустемных уведомлений пользователя
 *
 * @class
 * @name SystemMessagesShema
 * @type {Mongoose.Schema}
 */
var SystemMessagesShema = Mongoose.Schema({
    templatePath: {
        default: '',
        type: String
    },
    //Сообщение может быть удалено POST запросом
    userControl: false
});

module.exports = SystemMessagesShema;