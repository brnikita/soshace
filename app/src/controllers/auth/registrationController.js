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

        userData.emailConfirmed = false;
        UsersModel.addUser(userData, _.bind(function (error) {
            if (error) {
                this.userAddFail(response, error);
                return;
            }
            this.userAddSuccess();
        }, this));
    },

    /**
     * Метод обработчик успешного добавления пользователя
     *
     * @method
     * @name RegistrationController.userAddSuccess
     * @returns {undefined}
     */
    userAddSuccess: function () {
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

module.exports = RegistrationController;