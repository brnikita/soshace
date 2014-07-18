'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
    UsersModel = require('../../models/usersModel'),
    RenderParams = require('../../common/renderParams'),
    SendMail = require('../../common/sendMail');


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
            'userSaveHandler',
            'confirmEmailHandler'
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
     * Метод обработчик подтверждения аккаунта с email
     *
     * @function
     * @name RegistrationController#confirmEmail
     * @return {undefined}
     */
    confirmEmail: function () {
        var request = this.request,
            confirmCode = request.query.code;

        //TODO: добавить обработку ошибок и исключений
        UsersModel.confirmEmail(confirmCode).exec(this.confirmEmailHandler);
    },

    /**
     * TODO: добавить обработку ошибок
     * TODO: логинить юзера сразу после подтверждения
     *
     * Метод обработчик положительного
     * подтверждения кода пользователя
     *
     * @method
     * @name RegistrationController#confirmEmailHandler
     * @returns {undefined}
     */
    confirmEmailHandler: function () {
        var request = this.request,
            response = this.response,
            locale = request.i18n.getLocale();

        console.log(arguments);
        request.login(user.id);
        response.redirect('/' + locale + '/add_post/');
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

        if (!'undefined') {
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
        var errors;

        if (error) {
            if (error.errors) {
                errors = this.formatErrors(error.errors);
                this.sendError(errors);
                return;
            }

            this.sendError(this.i18n('Server is too busy, try later'));
            return;
        }

        this.userAddSuccess(user);
    },

    /**
     * Метод форматирует ошибки валидации
     * для отправки на клиент
     *
     * @method
     * @name RegistrationController#formatErrors
     * @param {Object} errors
     * @returns {Object}
     */
    formatErrors: function (errors) {
        var request = this.request,
            formattedErrors = {};

        _.each(errors, function (value, key) {
            formattedErrors[key] = request.i18n.__(value.message);
        });

        return formattedErrors;
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
                error: request.i18n.__(message)
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

        request.login(user.id, _.bind(function (error) {
            if (error) {
                this.sendError(this.i18n('Server is too busy, try later'));
                return;
            }

            profile = _.pick(user,
                'fullName',
                'userName',
                'isMale',
                'emailConfirmed',
                'admin',
                'locale');

            redirectUrl = '/' + locale + '/user/' + user.userName;
            SendMail.sendConfirmMail(request, user);
            response.send({
                profile: profile,
                redirect: redirectUrl
            });
        }, this));
    }
});