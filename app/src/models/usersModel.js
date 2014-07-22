'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt'),
    Validators = require('../common/validators'),
    Helpers = require('../common/helpers'),
    SALT_WORK_FACTOR = 10,
    SystemMessageSchema = require('./schemas/systemMessagesSchema');

/**
 * Класс для работы с моделью пользователей
 * Пользователи, которые имеют подтвержденные email
 *
 * @class
 * @name UsersShema
 * @type {Mongoose.Schema}
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
        unique: true,
        //TODO: разобраться почему mongoose прогоняет все валидаторы
        //Валидация идет с конца!
        validate: [
            {
                validator: Validators.userNameUnique,
                msg: 'User with same username already exists.'
            },
            {
                validator: Soshace.PATTERNS.userName,
                msg: 'Use the Latin alphabet, numbers, &#34;.&#34;, &#34;_&#34;, &#34;-&#34;.'
            },
            {
                validator: Validators.required,
                msg: 'Username can&#39;t be blank.'
            }
        ]
    },
    email: {
        type: String,
        unique: true,
        //Валидация идет с конца!
        validate: [
            {
                validator: Validators.emailUnique,
                msg: 'User with same email already exists.'
            },
            {
                validator: Soshace.PATTERNS.email,
                msg: 'Email is invalid.'
            },
            {
                validator: Validators.required,
                msg: 'Email can&#39;t be blank.'
            }
        ]
    },
    isMale: {
        type: Boolean,
        default: null
    },
    password: {
        type: String,
        validate: [
            //Валидация идет с конца!
            {
                validator: Validators.passwordMinLength,
                msg: 'Password length should&#39;t be less than 6 characters.'
            },
            {
                validator: Validators.required,
                msg: 'Password can&#39;t be blank.'
            }
        ]
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
    systemMessages: [SystemMessageSchema],
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
 * Создаем код подтверждения email
 */
UsersShema.pre('save', function (next) {
    var user = this,
        time = String((new Date()).getTime());

    user.code = Helpers.encodeMd5(user.email + time);
    next();
});

/**
 * Создаем добавляем системное сообщение о необходимости подтвердить email
 */
UsersShema.pre('save', function (next) {
    this.systemMessages.push({
        templatePath: 'messages/notConfirmedEmail',
        pages: ['user', 'addPost'],
        readOnly: true
    });
    next();
});

/**
 * Метод возвращает данные пользователя
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
        isMale: 1
    });
};

/**
 * Метод возвращает данные профиля пользователя
 *
 * @method
 * @name UsersShema.getProfile
 * @param {Object} params
 * @return {Cursor}
 */
UsersShema.statics.getProfile = function (params) {
    return this.findOne(params, {
        fullName: 1,
        userName: 1,
        isMale: 1,
        emailConfirmed: 1,
        admin: 1,
        locale: 1,
        systemMessages: 1
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
    return this.collection.findAndModify({code: code}, [
        ['_id', 'asc']
    ], {
        $set: {
            emailConfirmed: true
        },
        $push: {
            systemMessages: {
                templatePath: 'messages/successConfirmEmail',
                showOnce: true,
                pages: ['addPost']
            }
        },
        $pull: {
            systemMessages: {
                templatePath: 'messages/notConfirmedEmail'
            }
        }
    }, {}, callback);
};
module.exports = Mongoose.model('users', UsersShema);