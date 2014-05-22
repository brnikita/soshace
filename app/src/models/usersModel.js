'use strict';

var Mongoose = require('mongoose'),
    Bcrypt = require('bcrypt');

/**
 *  Объект для работы с моделью пользователей
 */
var UsersModel = {
        /**
         * Объект модели пользователей
         *
         * @field
         * @name UsersModel.model
         * @type {Mongoose.model}
         */
        model: null,

        /**
         * Инициализациия модели
         *
         * @method
         * @name UsersModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
            if (this.model === null) {
                var UsersSchema = Mongoose.Schema({
                    fullName: String,
                    email: String,
                    isMale: Boolean,
                    password: String,
                    emailConfirmed: Boolean
                });

                this.model = Mongoose.model('Users', UsersSchema);
            }
        },

        /**
         * Метод сравнения паролей
         *
         * @method
         * @name UsersModel.comparePassword
         * @param {String} candidatePassword проверяемый пароль
         * @param {Function} callback
         * @returns {undefined}
         */
        comparePassword: function (candidatePassword, callback) {
            var currentPassword;
            Bcrypt.compare(candidatePassword, currentPassword, function (error, isMatch) {
                if (error) {
                    callback(error);
                    return;
                }

                callback(null, isMatch);
            });
        },

        /**
         * Получаем пост целиком
         *
         * @method
         * @name PostsModel.addPost
         * @param {Object} userData данные пользователя для записи в базу
         * @param {Function} callback
         * @return {undefined}
         */
        addUser: function (userData, callback) {
            if (userData && typeof callback === 'function') {
                this.model.create(userData, function (error) {
                    callback(error);
                });
            }
        }
    };

UsersModel.initialize();
module.exports = UsersModel;