'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
    RenderParams = require('../../common/renderParams'),
    Passport = require('passport');

/**
 * Контроллер страницы регистрации
 *
 * @class LoginController
 */
module.exports = ControllerInit.extend({

    /**
     * @constructor
     * @name ControllerInit#initialize
     * @param {Object} request объект запроса
     * @param {Object} response Объект ответа
     * @returns {undefined}
     */
    initialize: function (request, response) {
        this.request = request;
        this.response = response;
        _.bindAll(this, 'authenticateHandler', 'userLogin');
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
            isAuthPage: true,
            isLoginTab: true,
            title: 'Registration page',
            bodyClass: 'bg-color-yellow bg-symbols'
        }));
    },

    /**
     * Обработчик запроса аворизации со страницы логина
     *
     * @private
     * @method
     * @name LoginController#loginPostHandler
     * @return {undefined}
     */
    loginPostHandler: function () {
        var request = this.request,
            response = this.response,
            next = this.next;

        Passport.authenticate('local', this.authenticateHandler)(request, response, next);
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
            requestBody = request.body,
            userEmail = requestBody.email;

        if (error) {
            this.sendError(this.i18n('Server is too busy, try later'));
            return;
        }

        if (!userId) {
            this.sendError(this.i18n('User with email ') + userEmail + this.i18n(' is not registered yet.'));
            return;
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
            this.sendError(this.i18n('Server is too busy, try later'));
            return;
        }

        response.send({isAuthenticated: true});
    }
});