'use strict';
var _ = require('underscore'),
    UsersModel = require('../../models/usersModel'),
    TemporaryUsersModel = require('../../models/temporaryUsersModel'),
    RenderParams = require('../../common/renderParams'),
    SendMail = require('../../common/sendMail'),
    Crypto = require('crypto');
/**
 * Контроллер страницы регистрации
 *
 * @module RegistrationController
 */
var RegistrationController = {

    /**
     * Рендерим страницу регистрации
     *
     * @public
     * @function
     * @name RegistrationController.renderRegistration
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderRegistration: function (request, response) {
        var renderParams = new RenderParams(request);

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
     * @name RegistrationController.userDataValidate
     * @param {Object} userData данные пользователя
     * @returns {Object}
     */
    userDataValidate: function (userData) {

    },

    /**
     * Подтверждаем аккаунт с email
     *
     * @function
     * @name RegistrationController.confirmAccount
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    confirmAccount: function(request, response){
        var confirmCode = request.query.code,
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
     * @name RegistrationController.createUser
     * @param {Object} request
     * @param {Object} response
     * @returns {undefined}
     */
    createUser: function (request, response) {
        var userData = request.body,
            fullName,
            email;

        if (typeof userData === 'undefined') {
            response.send({
                error: true,
                message: 'Bad request'
            });
            return;
        }

        fullName = userData.fullName;
        email = userData.email;
        userData.password = Crypto.createHash('md5').update(userData.password).digest('hex');
        userData.confirmCode = Crypto.createHash('md5').update(fullName + email).digest('hex');
        userData.emailConfirmed = false;
        UsersModel.addUser(userData, _.bind(function (error, user) {
            if (error) {
                this.userAddFail(response, error);
                return;
            }
            this.userAddSuccess(request, response, user);
        }, this));
    },

    /**
     * Метод обработчик успешного добавления пользователя
     *
     * @method
     * @name RegistrationController.userAddSuccess
     * @param {Object} request
     * @param {Object} response
     * @param {Object} user данные пользователя
     * @returns {undefined}
     */
    userAddSuccess: function (request, response, user) {
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
     * @name RegistrationController.userAddFail
     * @param {Object} response
     * @param {Object} error
     * @returns {undefined}
     */
    userAddFail: function (response, error) {
        response.send({
            error: error
        });
    }
};

_.bindAll(RegistrationController, 'createUser');
module.exports = RegistrationController;