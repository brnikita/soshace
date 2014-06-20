'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt');

/**
 * Класс для работы с моделью пользователей
 * Пользователи, которые имеют подтвержденные email
 *
 * @class
 * @name UsersShema
 * @type {Schema}
 */
var UsersShema = Mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    isMale: {
        type: Boolean,
        default: true
    },
    password: {
        type: String
    },
    //Флаг означающий заполненность обязательной профильной информации
    registrationCompleted: {
        type: Boolean,
        default: false
    }
});


/**
 * Метод сравнения паролей
 *
 * @method
 * @name UsersShema#comparePassword
 * @param {String} candidatePassword проверяемый пароль
 * @param {Function} callback
 * @returns {undefined}
 */
UsersShema.methods.comparePassword = function (candidatePassword, callback) {
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
 * @name UsersShema#comparePassword
 * @param {String} candidatePassword проверяемый пароль
 * @param {Function} callback
 * @returns {undefined}
 */
UsersShema.methods.comparePassword = function (candidatePassword, callback) {
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
 * @name UsersShema.addUser
 * @param {Object} userData данные пользователя для записи в базу
 * @param {Function} callback
 * @return {undefined}
 */
UsersShema.statics.addUser = function (userData, callback) {
    if (userData && typeof callback === 'function') {
        this.create(userData, callback);
    }
};

/**
 * Метод проверяет существование пользователя с переданным email
 * в базе постоянных пользователей
 *
 * @method
 * @name UsersShema.isUserExists
 * @param {Object} email данные пользователя для записи в базу
 * @param {Function} callback
 * @return {undefined}
 */
UsersShema.statics.isUserExists = function (email, callback) {
    this.findOne({email: email}, callback);
};

module.exports = Mongoose.model('users', UsersShema);