'use strict';
var _ = require('underscore'),
    Controller = require('../../common/controller'),
    UsersModel = require('../../models/usersModel'),
    requestParams = require('../../common/requestParams'),
    SendMail = require('../../common/sendMail');


/**
 * Контроллер страницы регистрации
 *
 * @class RegistrationController
 */
module.exports = Controller.extend({

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
            'userSaveHandler',
            'confirmEmailHandler',
            'loginUser'
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
            requestParams = requestParams(request);

        response.render('auth/authView', _.extend(requestParams, {
            isAuthTab: true,
            isRegistrationTab: true,
            title: 'Registration page',
            bodyClass: 'bg-symbols bg-color-yellow'
        }));
    },

    /**
     * Метод обработчик подтверждения аккаунта с email
     *
     * @function
     * @name RegistrationController#confirmEmail
     * @return {undefined}
     */
    confirmEmail: function () {
        var request = this.request,
            confirmCode = request.query.code;

        //TODO: добавить проверку, что пользователь уже подтвердил email
        //TODO: добавить обработку ошибок и исключений
        UsersModel.confirmEmail(confirmCode, this.confirmEmailHandler);
    },

    /**
     * TODO: добавить обработку ошибок
     *
     * Метод обработчик положительного
     * подтверждения кода пользователя
     *
     * @method
     * @name RegistrationController#confirmEmailHandler
     * @param {Object} error
     * @param {Object} user
     * @returns {undefined}
     */
    confirmEmailHandler: function (error, user) {
        if (error) {
            //TODO: поменять на render
            this.sendError('Server is too busy, try later', 503);
            return;
        }

        //TODO: здесь вылетает бага, если код подтверждения отправлен неверный
        UsersModel.deleteNotConfirmedEmailMessage(user._id, this.loginUser);
    },

    /**
     * TODO: добавить обработку ошибок
     *
     * Метод обработчик положительного
     * подтверждения кода пользователя
     *
     * @method
     * @name RegistrationController#loginUser
     * @param {Object} error
     * @param {Object} user
     * @returns {undefined}
     */
    loginUser: function(error, user){
        var request = this.request,
            response = this.response,
            locale = request.i18n.getLocale();

        if (error) {
            //TODO: поменять на render
            this.sendError('Server is too busy, try later', 503);
            return;
        }

        request.login(user._id, _.bind(function (error) {
            if (error) {
                //TODO: поменять на render
                this.sendError('Server is too busy, try later', 503);
                return;
            }
            response.redirect('/' + locale + '/add_post/');
        }, this));
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
            user;

        if (!userData) {
            this.sendError('Bad request');
            return;
        }

        user = new UsersModel(userData);
        user.save(this.userSaveHandler);
    },

    /**
     * Метод обработчик сохранения пользователя в модели
     *
     * @method
     * @name RegistrationController#userSaveHandler
     * @param {Object} error объект ошибки
     * @param {Mongoose.model} user модель пользователя
     * @returns {undefined}
     */
    userSaveHandler: function (error, user) {
        if (error) {
            if (error.errors) {
                this.sendError(error.errors);
                return;
            }

            this.sendError('Server is too busy, try later', 503);
            return;
        }

        this.userAddSuccess(user);
    },

    /**
     * Метод валидирует поля регистрации
     *
     * @method
     * @name RegistrationController#validateField
     * @returns {undefined}
     */
    validateField: function () {
        var request = this.request,
            response = this.response,
            requestData = request.query,
            fieldName = _.keys(requestData)[0],
            user = new UsersModel(requestData);
        //TODO: добавить проверку на наличие поля в модели
        user.validate(function (error) {
            var errors = error && error.errors,
                message = errors && errors[fieldName] || null;

            response.send({
                error: message
            });
        });
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
            profile,
            redirectUrl;

        request.login(user._id, _.bind(function (error) {
            if (error) {
                this.sendError('Server is too busy, try later', 503);
                return;
            }

            profile = _.pick(user,
                'fullName',
                'userName',
                'isMale',
                'admin',
                'locale',
                'systemMessages'
            );

            redirectUrl = '/' + locale + '/user/' + user.userName;
            SendMail.sendConfirmMail(request, user);
            response.send({
                profile: profile,
                redirect: redirectUrl
            });
        }, this));
    }
});