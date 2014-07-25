'use strict';
var _ = require('underscore'),
    Controller = require('../../common/controller'),
    UsersModel = require('../../models/usersModel'),
    RenderParams = require('../../common/renderParams'),
    Passport = require('passport');

/**
 * Контроллер страницы регистрации
 *
 * @class LoginController
 */
module.exports = Controller.extend({

    /**
     * @constructor
     * @name LoginController#initialize
     * @param {Object} request объект запроса
     * @param {Object} response Объект ответа
     * @returns {undefined}
     */
    initialize: function (request, response) {
        this.request = request;
        this.response = response;
        _.bindAll(this,
            'authenticateHandler',
            'userLogin',
            'validateLoginData'
        );
    },

    /**
     * Рендерим страницу регистрации
     *
     * @method
     * @name LoginController#renderLogin
     * @return {undefined}
     */
    renderLogin: function () {
        var request = this.request,
            response = this.response,
            renderParams = new RenderParams(request);

        response.render('auth/authView', _.extend(renderParams, {
            isAuthTab: true,
            isLoginTab: true,
            title: 'Registration page',
            bodyClass: 'bg-color-yellow bg-symbols'
        }));
    },

    /**
     * Обработчик запроса аворизации со страницы логина
     *
     * @method
     * @name LoginController#loginHandler
     * @return {undefined}
     */
    loginHandler: function () {
        var request = this.request,
            data = request.body,
            email = data.email,
            error = UsersModel.validateEmail(email);

        if (error) {
            this.sendError(this.i18n(error), 400);
            return;
        }

        UsersModel.getUserByEmail(email).
            exec(this.validateLoginData);
    },

    /**
     * @method
     * @name LoginController#validateLoginData
     * @param error
     * @param user
     * @returns {undefined}
     */
    validateLoginData: function(error, user){
        var request = this.request,
            response = this.response,
            data = request.body,
            email = data.email,
            password = data.password,
            next = this.next,
            passwordError,
            message = 'User with email {{' + email + '}} is not registered yet.';

        if (error) {
            this.sendError(message);
            return;
        }

        passwordError = user.comparePassword(password);

        if (passwordError) {
            this.sendError(passwordError);
            return;
        }

        Passport.authenticate('local', this.authenticateHandler)(request, response, next);
    },

    /**
     * Обработчик запроса выхода из сессии
     *
     * @method
     * @name LoginController#logoutHandler
     * @return {undefined}
     */
    logoutHandler: function () {
        var request = this.request,
            response = this.response;

        request.logout();
        response.send({isAuthenticated: false});
    },

    /**
     * @method
     * @name LoginController#authenticateHandler
     * @param error
     * @param userId
     * @returns {undefined}
     */
    authenticateHandler: function (error, userId) {
        var request = this.request,
            message,
            userEmail,
            requestBody;

        if (error) {
            return this.sendError('Server is too busy, try later');
        }

        if (!userId) {
            requestBody = request.body;
            userEmail = requestBody.email;
            message = 'User with email {{' + userEmail + '}} is not registered yet.';
            return this.sendError(message);
        }

        request.login(userId, this.userLogin);
    },

    /**
     * @method
     * @name LoginController.userLogin
     * @returns {undefined}
     */
    userLogin: function (error) {
        var response = this.response;

        if (error) {
            return this.sendError('Server is too busy, try later');
        }

        response.send({isAuthenticated: true});
    }
});