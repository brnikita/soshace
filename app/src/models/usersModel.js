'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

/**
 * Класс для работы с моделью пользователей
 * Пользователи, которые имеют подтвержденные email
 *
 * @class
 * @name UsersShema
 * @type {Schema}
 */
var UsersShema = Mongoose.Schema({
    //код подтверждения email
    code: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    isMale: {
        type: Boolean,
        default: null
    },
    password: {
        type: String
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    //Является ли пользователь админом
    admin: {
        type: Boolean,
        default: false
    },
    locale: {
        type: String,
        default: 'ru'
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
    Bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
        if (error) {
            return callback(error);
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
 * Шифруем пароль перед сохранением
 */
UsersShema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    Bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error) {
            return next(error);
        }

        Bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

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