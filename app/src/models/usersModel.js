'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt'),
    Validators = require('../common/validators'),
    Helpers = require('../common/helpers'),
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
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: Validators.userName,
                msg: 'Username is invalid'
            },
            {
                validator: Validators.userNameUnique,
                msg: 'User with same username already exists'
            }
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: Validators.email,
                msg: 'Email is invalid'
            },
            {
                validator: Validators.emailUnique,
                msg: 'User with same email already exists'
            }
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
 * Шифруем пароль перед сохранением
 */
UsersShema.pre('save', function (next) {
    var user = this,
        time = String((new Date()).getTime());

    user.code = Helpers.encodeMd5(user.email + time);
    next();
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

module.exports = Mongoose.model('users', UsersShema);