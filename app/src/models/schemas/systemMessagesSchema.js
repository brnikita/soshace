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
    isShown: {
        type: Boolean,
        default: false
    }
});

module.exports = SystemMessagesShema;