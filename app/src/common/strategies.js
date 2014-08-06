'use strict';

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    ObjectId = Mongoose.Types.ObjectId,
    Passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    UsersModel = srcRequire('models/usersModel');

/**
 * Методы конфигурации стратегий
 */
var Strategies = {
    /**
     * Создаем идентификатор для новой сессии
     *
     * @function
     * @name Strategies.serializeUser
     * @param userId
     * @param done
     * @return {undefined}
     */
    serializeUser: function (userId, done) {
        done(null, userId);
    },

    /**
     * Получаем данные сессии по идентификатору сессии из куки запроса
     *
     * @function
     * @name Strategies.deSerializeUser
     * @param userId
     * @param done
     * @return {undefined}
     */
    deSerializeUser: function (userId, done) {
        UsersModel.find({_id: new ObjectId(userId)}, function (error, user) {
            done(error, user);
        });
    },

    /**
     * Callback для конфигурации локальной стратегии
     *
     * @function
     * @name Strategies.local
     * @param {String} userEmail
     * @param {String} userPassword
     * @param {Function} done
     * @return {undefined}
     */
    local: function (userEmail, userPassword, done) {
        var emailError = UsersModel.validateEmail(userEmail);
        if (emailError) {
            done({email: emailError});
            return;
        }

        UsersModel.getUserByEmail(userEmail).exec(_.bind(function(error, user){
            this.getUserByEmailHandler(error, user, userEmail, userPassword, done);
        }, this));
    },

    /**
     * Метод обработчик получения пользователя по email внутри локальной стратегии
     *
     * @method
     * @name Strategies.getUserByEmailHandler
     * @param {*} error
     * @param {Object | null} user
     * @param {String} userEmail
     * @param {String} userPassword
     * @param {Function} done
     * @returns {undefined}
     */
    getUserByEmailHandler: function (error, user, userEmail, userPassword, done) {
        var passwordError;

        if (error) {
            done('Server is too busy, try later');
            return;
        }

        if (!user) {
            done({email: 'User with email {{' + userEmail + '}} is not registered yet.'});
            return;
        }

        passwordError = UsersModel.validatePassword(userPassword);

        if (passwordError) {
            done({password: passwordError});
            return;
        }

        user.comparePassword(userPassword, function (error) {
            if (error) {
                return done({password: error});
            }

            return done(null, user.id);
        });
    },

    /**
     * Конфигурирем утентификацию, используя локальнуб стратегию
     *
     * @method
     * @name Strategies.localStrategy
     * @returns {undefined}
     */
    localStrategy: function () {
        Passport.serializeUser(this.serializeUser);
        Passport.deserializeUser(this.deSerializeUser);

        //Конфигурируем утентификацию через форму логина
        Passport.use(new LocalStrategy({
            usernameField: 'email'
        }, this.local));
    }
};

_.bindAll(Strategies, 'serializeUser', 'deSerializeUser', 'local');
module.exports = Strategies;