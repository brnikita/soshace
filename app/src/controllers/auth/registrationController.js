'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
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
module.exports = ControllerInit.extend({

    /**
     * @constructor
     * @name RegistrationController#initialize
     * @param {Object} request Объект запроса
     * @param {Object} response Объект ответа
     */
    initialize: function (request, response) {
        this.request = request;
        this.response = response;

        _.bindAll(this, 'userExistsHandler');
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
            userData = request.body,
            email;

        if (typeof userData === 'undefined') {
            this.sendError('Bad request');
            return;
        }

        email = userData.email;
        UsersModel.isUserExists(email, this.userExistsHandler);
    },

    /**
     * Метод обработчик проверки на существование юзера в базе
     *
     * @method
     * @name RegistrationController#userExistsHandler
     * @param error
     * @param user
     */
    userExistsHandler: function (error, user) {
        var request = this.request,
            userData;

        if (error) {
            this.sendError('Server is too busy, try later');
            return;
        }

        if (user) {
            this.sendError('User with email is already exists');
            return;
        }

        userData = request.body;
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
                this.userAddFail();
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
            response = this.response,
            locale = request.i18n.getLocale(),
            redirectUrl = '/' + locale + '/user/new';

        SendMail.sendConfirmMail(request, user);
        response.send({
            error: false,
            redirect: redirectUrl
        });
    },

    /**
     * Метод обработчик неудачного добавления пользователя в базу
     *
     * @method
     * @name RegistrationController#userAddFail
     * @returns {undefined}
     */
    userAddFail: function () {
        var response = this.response;

        response.send({
            error: true,
            message: 'Server is too busy, try later'
        });
    }
});