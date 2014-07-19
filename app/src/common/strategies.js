'use strict';

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    ObjectId = Mongoose.Types.ObjectId,
    Passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    UsersModel = require('../models/usersModel');

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
        UsersModel.findOne({ email: userEmail }, function (error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false, { message: 'User with email ' + userEmail + ' is not registered yet.'});
            }
            user.comparePassword(userPassword, function (error, isMatch) {
                if (error) {
                    return done(error);
                }
                if (isMatch) {
                    return done(null, user.id);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
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