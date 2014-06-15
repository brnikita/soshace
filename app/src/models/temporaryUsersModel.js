'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt');

/**
 * Класс для работы с моделью пользователей
 * Пользователи, которые не имеют подтвержденные email
 *
 * После подтверждения email, пользователи удаляется из базы временных
 * и копируется в постоянную базу
 *
 * @class
 * @name TemporaryUsersShema
 * @type {Schema}
 */
var TemporaryUsersShema = Mongoose.Schema({
    fullName: String,
    email: String,
    isMale: Boolean,
    password: String,
    confirmCode: String
});


/**
 * Метод сравнения паролей
 *
 * @method
 * @name TemporaryUsersShema#comparePassword
 * @param {String} candidatePassword проверяемый пароль
 * @param {Function} callback
 * @returns {undefined}
 */
TemporaryUsersShema.methods.comparePassword = function (candidatePassword, callback) {
    var currentPassword;
    Bcrypt.compare(candidatePassword, currentPassword, function (error, isMatch) {
        if (error) {
            callback(error);
            return;
        }

        callback(null, isMatch);
    });
};

/**
 * Метод сравнения паролей
 *
 * @method
 * @name TemporaryUsersShema#comparePassword
 * @param {String} candidatePassword проверяемый пароль
 * @param {Function} callback
 * @returns {undefined}
 */
TemporaryUsersShema.methods.comparePassword = function (candidatePassword, callback) {
    var currentPassword;
    Bcrypt.compare(candidatePassword, currentPassword, function (error, isMatch) {
        if (error) {
            callback(error);
            return;
        }

        callback(null, isMatch);
    });
};

/**
 * Метод добавления пользователя
 *
 * @method
 * @name TemporaryUsersShema.addUser
 * @param {Object} userData данные пользователя для записи в базу
 * @param {Function} callback
 * @return {undefined}
 */
TemporaryUsersShema.statics.addUser = function (userData, callback) {
    if (userData && typeof callback === 'function') {
        this.create(userData, function (error, user) {
            callback(error, user);
        });
    }
};

module.exports = Mongoose.model('TemporaryUsers', TemporaryUsersShema);