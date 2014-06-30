'use strict';

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    ObjectId = Mongoose.Types.ObjectId,
    UsersModel = require('../../models/usersModel');

/**
 * Методы конфигурации стратегий
 */
var StrategiesController = {
    /**
     * Создаем идентификатор для новой сессии
     *
     * @function
     * @name StrategiesController.serializeUser
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
     * @name StrategiesController.deSerializeUser
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
     * @name StrategiesController.local
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
    }
};

_.bindAll(StrategiesController, 'serializeUser', 'deSerializeUser', 'local');
module.exports = StrategiesController;