'use strict';

var Mongoose = require('mongoose'),
    ObjectId = Mongoose.Types.ObjectId,
    UsersModel = require('../../models/usersModel').UsersModel,
    Crypto = require('crypto');

/**
 * Методы конфигурации стратегий
 */
var StrategiesController = {
    /**
     * Создаем идентификатор для новой сессии
     *
     * @private
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
     * @private
     * @function
     * @name StrategiesController.deserializeUser
     * @param userId
     * @param done
     * @return {undefined}
     */
    deserializeUser: function (userId, done) {
        UsersModel.find({_id: new ObjectId(userId)}, function (error, user) {
            done(error, user);
        });
    },

    /**
     * Callback для конфигурации локальной стратегии
     *
     * @private
     * @function
     * @name StrategiesController.local
     * @param {String} userEmail
     * @param {String} userPassword
     * @param {Function} done
     * @return {undefined}
     */
    local: function (userEmail, userPassword, done) {
        userPassword = Crypto.createHash('md5').update(userPassword).digest('hex');

        UsersModel.findOne({email: userEmail}, function (error, user) {
            if (error) {
                return done(error);
            }

            if (user === null) {
                return done(null, null, {message: {email: userEmail, text: 'does not registered yet.'}});
            }

            if (user.password !== userPassword) {
                return done(null, null, {message: {text: 'Password is wrong!'}});
            }

            if (user.emailConfirmed) {
                return done(error, user._id);
            }

            return done(null, null, {message: {email: userEmail, text: 'does not confirmed.'}});
        });
    }
};

//Экспортируем методы
exports.serializeUser = function () {
    return StrategiesController.serializeUser.apply(StrategiesController, arguments);
};

exports.deserializeUser = function () {
    return StrategiesController.deserializeUser.apply(StrategiesController, arguments);
};

exports.local = function () {
    return StrategiesController.local.apply(StrategiesController, arguments);
};