'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt'),
    Validators = require('../common/validators'),
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
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: [
            Validators.userName,
            'Username is invalid'
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            Validators.email,
            'Email is invalid'
        ]
    },
    isMale: {
        type: Boolean,
        default: null
    },
    password: {
        type: String,
        required: true
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
        required: true,
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
 * Метод возвращает данные профиля пользователя
 *
 * @method
 * @name UsersShema.getUser
 * @param {Object} params
 * @return {Cursor}
 */
UsersShema.statics.getUser = function (params) {
    return this.findOne(params, {
        fullName: 1,
        userName: 1,
        isMale: 1,
        emailConfirmed: 1,
        admin: 1,
        locale: 1
    });
};

/**
 * Метод возвращает данные профиля пользователя
 *
 * @method
 * @name UsersShema.confirmEmail
 * @param {String} code код подтверждения email
 * @param {Function} callback
 * @return {Cursor}
 */
UsersShema.statics.confirmEmail = function (code, callback) {
    this.update({code: code}, {emailConfirmed: true}, null, callback);
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