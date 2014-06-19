'use strict';

var Mongoose = require('mongoose');

/**
 * Класс для работы с моделью неподтвержденных email
 *
 * @class
 * @name UnconfirmedEmailsShema
 * @type {Schema}
 */
var UnconfirmedEmailsShema = Mongoose.Schema({
    code: String,
    email: String
});


/**
 * Метод добавления email
 *
 * @method
 * @name UnconfirmedEmailsShema.addEmail
 * @param {Object} data email и code - код подтверждения email
 * @param {Function} callback
 * @return {undefined}
 */
UnconfirmedEmailsShema.statics.addEmail = function (data, callback) {
    if (data && typeof callback === 'function') {
        this.create(data, callback);
    }
};

module.exports = Mongoose.model('Users', UnconfirmedEmailsShema);