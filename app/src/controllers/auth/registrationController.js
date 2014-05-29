'use strict';
var _ = require('underscore'),
    UsersModel = require('../../models/usersModel'),
    RenderParams = require('../../common/renderParams');
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

        response.render('registrationView', _.extend(renderParams, {
            isSignInPage: true,
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
     * Метод создает пользователя в базе
     *
     * @method
     * @name RegistrationController.createUser
     * @param {Object} request
     * @param {Object} response
     * @returns {undefined}
     */
    createUser: function (request, response) {
        var userData = request.body;

        if (typeof userData === 'undefined') {
            response.send({
                error: true,
                message: 'Bad request'
            });
            return;
        }

        UsersModel.addUser(userData, function (error) {
            response.send({
                error: error
            });
        });
    }
};

module.exports = RegistrationController;