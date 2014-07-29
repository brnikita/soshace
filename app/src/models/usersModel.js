'use strict';

var _ = require('underscore'),
    Mongoose = require('mongoose'),
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
 * @type {Mongoose.Schema}
 */
var UsersShema = Mongoose.Schema({
    //код подтверждения email
    code: {
        type: String,
        //поле не может быть изменено пользователем
        readonly: true
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
        //поле не может быть изменено пользователем
        readonly: true,
        unique: true,
        //TODO: разобраться почему mongoose прогоняет все валидаторы
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
        //TODO: разобраться почему mongoose прогоняет все валидаторы
        //Валидация идет с конца!
        validate: [
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
        default: false,
        //поле не может быть изменено пользователем
        readonly: true
    },
    //Является ли пользователь админом
    admin: {
        //поле не может быть изменено пользователем
        readonly: true,
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
            callback({error: {message: 'Password is not correct', code: 400}});
            return;
        }

        if (!isMatch) {
            callback({error: {message: 'Password is not correct', code: 400}});
            return;
        }

        callback(null);
    });
};

/**
 * Шифруем пароль перед сохранением
 */
UsersShema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        next();
        return;
    }

    Bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error) {
            next(error);
            return;
        }

        Bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                next(error);
                return;
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
 * Метод находит пользователя по email
 *
 * @method
 * @name UsersShema.getUserByEmail
 * @param {String} email проверяемый email
 * @return {Cursor}
 */
UsersShema.statics.getUserByEmail = function (email) {
    return this.findOne({email: email});
};

/**
 * Метод делает проверку email, используется при логине,
 * т.к. валидация модели не подходит
 *
 * @method
 * @name UsersShema.validateEmail
 * @param {String} email проверяемый email
 * @return {String | undefined} ошибка
 */
UsersShema.statics.validateEmail = function (email) {
    var emailNotEmpty = Validators.required(email);

    if (!emailNotEmpty) {
        return 'Email can&#39;t be blank.';
    }

    if (!Soshace.PATTERNS.email.test(email)) {
        return 'Email is invalid.';
    }
};

/**
 * Метод делает проверку password, используется при логине,
 * т.к. валидация модели не подходит
 *
 * @method
 * @name UsersShema.validatePassword
 * @param {String} password проверяемый пароль
 * @return {String | undefined} ошибка
 */
UsersShema.statics.validatePassword = function (password) {
    var passwordNotEmpty = Validators.required(password);

    if (!passwordNotEmpty) {
        return 'Password can&#39;t be blank.';
    }

    if (!Validators.passwordMinLength(password)) {
        return 'Password can&#39;t be less than 6 characters.';
    }
};

/**
 * mongo не дает одновременно сделать $push и $pull
 * http://stackoverflow.com/questions/4584665/field-name-duplication-not-allowed-with-modifiers-on-update
 *
 * Метод ставит email пользователя в статус утверждена
 * и добавляет сообщение об успехе
 *
 * @method
 * @name UsersShema.confirmEmail
 * @param {String} code код подтверждения email
 * @param {Function} callback
 * @return {undefined}
 */
UsersShema.statics.confirmEmail = function (code, callback) {
    this.collection.findAndModify({code: code}, [], {
        $set: {
            emailConfirmed: true
        }
    }, {new: true}, callback);
};

module.exports = Mongoose.model('users', UsersShema);