'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
    UsersModel = require('../../models/usersModel'),
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
            'userExistsHandler'
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
     * Страница подтверждения аккаунта с email
     *
     * @function
     * @name RegistrationController#renderConfirmAccountPage
     * @return {undefined}
     */
    renderConfirmAccountPage: function () {
        var request = this.request,
            response = this.response,
            renderParams = new RenderParams(request),
            confirmCode = request.query.code;

        response.render('auth/registrationFinish', _.extend(renderParams, {
            error: true,
            title: 'Complete registration',
            bodyClass: 'bg-symbols bg-color-yellow'
        }));
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
            email,
            data;

        if (error) {
            this.sendError(this.i18n('Server is too busy, try later'));
            return;
        }

        if (user) {
            email = user.email;
            this.sendError(this.i18n('User with email ') + email + this.i18n(' is already exists'));
            return;
        }

        data = request.body;
        this.saveUserAtModel(data);
    },

    /**
     * Метод сохраняет пользователя в модели пользователей
     *
     * @method
     * @name RegistrationController#saveUserAtModel
     * @param {Object} userData
     * @returns {undefined}
     */
    saveUserAtModel: function (userData) {
        var email = userData.email,
            time = String((new Date()).getTime()),
            code = Helpers.encodeMd5(email + time);

        userData.code = code;
        UsersModel.addUser(userData, _.bind(function (error, user) {
            if (error) {
                this.sendError(this.i18n('Server is too busy, try later'));
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
     * @param {Mongoose.model} user
     * @returns {undefined}
     */
    userAddSuccess: function (user) {
        var request = this.request,
            response = this.response,
            locale = request.i18n.getLocale(),
            redirectUrl = '/' + locale + '/user/' + user.id;

        request.login(user, _.bind(function (error) {
            if (error) {
                this.sendError(this.i18n('Server is too busy, try later'));
                return;
            }

            SendMail.sendConfirmMail(request, user);
            response.send({
                redirect: redirectUrl
            });
        }, this));
    }
});