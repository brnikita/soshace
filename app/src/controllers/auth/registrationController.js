'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
    UsersModel = require('../../models/usersModel'),
    UnconfirmedEmails = require('../../models/unconfirmedEmails'),
    RenderParams = require('../../common/renderParams'),
    SendMail = require('../../common/sendMail'),
    Helpers = require('../../common/helpers');


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

        _.bindAll(this,
            'saveUserAtModel',
            'userExistsHandler',
            'saveNewEmailHandler'
        );
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
     * Подтверждаем аккаунт с email
     *
     * @function
     * @name RegistrationController#confirmAccount
     * @return {undefined}
     */
    confirmAccount: function () {
        var request = this.request,
            confirmCode = request.query.code;

        UnconfirmedEmails.find({code: confirmCode}, this.saveUserAtModel);
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
     * @param {Object | null} error
     * @param {Object | null} user модель существующего пользователя
     * @returns {undefined}
     */
    userExistsHandler: function (error, user) {
        var request = this.request,
            data;

        if (error) {
            this.sendError('Server is too busy, try later');
            return;
        }

        if (user) {
            this.sendError('User with email is already exists');
            return;
        }

        data = request.body;
        this.saveNewEmail(data);
    },

    /**
     * Метод сохраняет email в коллекции для неподтвержденных email
     *
     * @method
     * @name RegistrationController#saveNewEmail
     * @param {Object} data объект содержит пользовательский email
     * @returns {undefined}
     */
    saveNewEmail: function (data) {
        var email = data.email,
            time = String((new Date()).getTime()),
            code;

        code = Helpers.encodeMd5(email + time);
        UnconfirmedEmails.addEmail({
            code: code,
            email: email
        }, this.saveNewEmailHandler);
    },

    /**
     * Метод обработчик сохраннения email  в коллекции неподтвержденнных
     * email
     *
     * @method
     * @name RegistrationController#saveNewEmail
     * @param {Object} error
     * @param {Object} emailData
     * @returns {undefined}
     */
    saveNewEmailHandler: function (error, emailData) {
        var request = this.request;

        if (error) {
            this.sendError('Server is too busy, try later');
            return;
        }

        SendMail.sendConfirmMail(request, emailData);
    },

    /**
     * Метод сохраняет пользователя в модели временных пользователей
     *
     * После того как пользователь подтвердит свой email, его профиль будет перенесен
     * в коллекцию постоянных пользователей
     *
     * @method
     * @name RegistrationController#saveUserAtModel
     * @param {Object} error
     * @param {Object} userData
     * @returns {undefined}
     */
    saveUserAtModel: function (error, userData) {
        var savedData = {},
            email = userData.email;

        savedData.password = Helpers.encodeMd5(this.getNewPassword());
        savedData.email = email;
        UsersModel.addUser(savedData, _.bind(function (error, user) {
            if (error) {
                this.sendError('Server is too busy, try later');
                return;
            }
            this.userAddSuccess(user);
        }, this));
    },

    /**
     * TODO: доработать метод
     *
     * Метод возвращает новый рандомный пароль
     * для юзера
     *
     * @method
     * @name RegistrationController#getNewPassword
     * @returns {String}
     */
    getNewPassword: function () {
        return '1';
    },


    /**
     * Метод обработчик успешного добавления пользователя
     *
     * @method
     * @name RegistrationController#userAddSuccess
     * @returns {undefined}
     */
    userAddSuccess: function () {
        var request = this.request,
            response = this.response,
            locale = request.i18n.getLocale(),
            redirectUrl = '/' + locale + '/user/new';

        response.send({
            error: false,
            redirect: redirectUrl
        });
    }
});