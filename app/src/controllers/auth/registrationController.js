'use strict';
var _ = require('underscore'),
    Class = require('../../libs/class'),
    UsersModel = require('../../models/usersModel'),
    TemporaryUsersModel = require('../../models/temporaryUsersModel'),
    RenderParams = require('../../common/renderParams'),
    SendMail = require('../../common/sendMail'),
    Crypto = require('crypto');


/**
 * Контроллер страницы регистрации
 *
 * @class RegistrationController
 */
module.exports = Class.extend({

    /**
     * @field
     * @name RegistrationController#request
     * @type {Object | null}
     */
    request: null,

    /**
     * @field
     * @name RegistrationController#response
     * @type {Object | null}
     */
    response: null,

    /**
     * @constructor
     * @name RegistrationController#initialize
     * @param {Object} request
     * @param {Object} response
     * @returns {undefined}
     */
    initialize: function (request, response) {
        this.request = request;
        this.response = response;
    },

    /**
     * Рендерим страницу регистрации
     *
     * @public
     * @function
     * @name RegistrationController#renderRegistration
     * @return {undefined}
     */
    renderRegistration: function () {
        var request = this.request,
            response = this.response,
            renderParams = new RenderParams(request);

        response.render('auth/authView', _.extend(renderParams, {
            isAuthPage: true,
            isRegistrationTab: true,
            title: 'Registration page',
            bodyClass: 'bg-symbols bg-color-yellow'
        }));
    },

    /**
     * Метод валидирует входные данные по пользователю и возвращет
     * ошибку, если данные не валидны
     *
     * @method
     * @name RegistrationController#userDataValidate
     * @param {Object} userData данные пользователя
     * @returns {Object}
     */
    userDataValidate: function (userData) {

    },

    /**
     * Подтверждаем аккаунт с email
     *
     * @function
     * @name RegistrationController#confirmAccount
     * @return {undefined}
     */
    confirmAccount: function () {
        var request = this.request,
            response = this.response,
            confirmCode = request.query.code,
            locale = request.i18n.getLocale();

        UsersModel.update({confirmCode: confirmCode}, {emailConfirmed: true}, function (error) {
            var message;

            if (error) {
                message = 'Registration failed, please try again.';
                response.cookie('error', message);
                response.redirect('/' + locale + '/registration');
                return;
            }

            message = 'Thank you for confirmation your email, you can enter.';
            response.cookie('success', message);
            response.redirect('/' + locale + '/login');
        });
    },

    /**
     * Метод создает пользователя в базе
     *
     * @method
     * @name RegistrationController#createUser
     * @returns {undefined}
     */
    createUser: function () {
        var request = this.request,
            response = this.response,
            userData = request.body;

        if (typeof userData === 'undefined') {
            response.send({
                error: true,
                message: 'Bad request'
            });
            return;
        }

        if (UsersModel.isUserExists()) {
            response.send({
                error: true,
                message: 'User with email is already exists'
            });
            return;
        }

        this.saveUserAtModel(userData);
    },

    /**
     * Метод сохраняет пользователя в модели временных пользователей
     *
     * После того как пользователь подтвердит свой email, его профиль будет перенесен
     * в коллекцию постоянных пользователей
     *
     * @method
     * @name RegistrationController#saveUserAtModel
     * @param {Object} userData
     * @returns {undefined}
     */
    saveUserAtModel: function (userData) {
        var fullName = userData.fullName,
            email = userData.email;

        userData.password = Crypto.createHash('md5').update(userData.password).digest('hex');
        userData.confirmCode = Crypto.createHash('md5').update(fullName + email).digest('hex');
        userData.emailConfirmed = false;

        TemporaryUsersModel.addUser(userData, _.bind(function (error, user) {
            if (error) {
                this.userAddFail(error);
                return;
            }
            this.userAddSuccess(user);
        }, this));
    },

    /**
     * Метод обработчик успешного добавления пользователя
     *
     * @method
     * @name RegistrationController#userAddSuccess
     * @param {Object} user данные пользователя
     * @returns {undefined}
     */
    userAddSuccess: function (user) {
        var request = this.request,
            response = this.response;

        SendMail.sendConfirmMail(request, user);
        //TODO: сделать редирект на страницу профиля
        response.send({
            error: false,
            message: 'Confirmation message has been sent to your email address'
        });
    },

    /**
     * Метод обработчик неудачного добавления пользователя в базу
     *
     * @method
     * @name RegistrationController#userAddFail
     * @param {Object} error
     * @returns {undefined}
     */
    userAddFail: function (error) {
        var response = this.response;

        response.send({
            error: true,
            message: 'Server is too busy, try later'
        });
    }
});