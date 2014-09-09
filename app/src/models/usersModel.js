'use strict';
//TODO: добавить trim перед сохранением полей

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    Bcrypt = require('bcrypt'),
    Validators = srcRequire('common/validators'),
    Helpers = srcRequire('common/helpers'),
    SALT_WORK_FACTOR = 10;

/**
 * Класс для работы с моделью пользователей
 * Пользователи, которые имеют подтвержденные email
 *
 * @class
 * @name UsersShema
 * @type {Schema}
 */
var UsersShema = new Schema({
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
        //поле доступно для отправки на клиент
        public: true,
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
    sex: {
        //поле доступно для отправки на клиент
        public: true,
        type: String,
        default: null
    },
    aboutAuthor: {
        //поле доступно для отправки на клиент
        public: true,
        type: String,
        default: null
    },
    birthday: {
        //поле доступно для отправки на клиент
        public: true,
        type: Date,
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
        //поле доступно для отправки на клиент
        public: true,
        type: String,
        default: 'en'
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
            callback({error: 'Password is not correct', code: 400});
            return;
        }

        if (!isMatch) {
            callback({error: 'Password is not correct', code: 400});
            return;
        }

        callback(null);
    });
};

/**
 * Метод возвращает доступные на клиенте для профиля (владельца)
 *
 * @method
 * @name UsersShema#getProfileFields
 * @returns {Object}
 */
UsersShema.methods.getProfileFields = function () {
    var profileFields = this.getPublicFields();

    profileFields.emailConfirmed = this.emailConfirmed;
    return profileFields;
};

/**
 * Метод возвращает публичные поля пользователя (общедоступные)
 *
 * @method
 * @name UsersShema#getPublicFields
 * @returns {Object}
 */
UsersShema.methods.getPublicFields = function () {
    var publicFields = {},
        userPaths = UsersShema.paths;

    _.each(userPaths, _.bind(function (pathSettings, path) {
        var pathOptions = pathSettings.options;

        if (pathOptions.public) {
            publicFields[path] = this[path];
        }
    }, this));

    publicFields._id = this._id;

    return publicFields;
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
 * @name UsersShema.getUserByUserName
 * @param {String} userName
 * @param {Function} callback
 * @return {Cursor}
 */
UsersShema.statics.getUserByUserName = function (userName, callback) {
    return this.findOne({userName: userName}, {
        fullName: 1,
        userName: 1,
        sex: 1,
        aboutAuthor: 1,
        birthday: 1,
        _id: 1
    }).exec(function (error, user) {
            if (error) {
                callback({error: 'Server is too busy, try later', code: 503});
                return;
            }
            callback(null, user);
        });
};

/**
 * Метод находит пользователя по email
 *
 * @method
 * @name UsersShema.getUserByEmail
 * @param {String} email проверяемый email
 * @param {Function} callback
 * @return {Cursor}
 */
UsersShema.statics.getUserByEmail = function (email, callback) {
    return this.findOne({email: email}).exec(function (error, user) {
        if (error) {
            callback({error: 'Server is too busy, try later', code: 503});
            return;
        }
        callback(null, user);
    });
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