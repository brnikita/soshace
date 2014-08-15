'use strict';
var _ = require('underscore'),
    Controller = srcRequire('common/controller'),
    UsersModel = srcRequire('models/usersModel'),
    RequestParams = srcRequire('common/requestParams'),
    SystemMessagesModel = srcRequire('models/systemMessagesModel'),
    SendMail = srcRequire('common/sendMail');


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
            requestParams = new RequestParams(request);

        response.render('auth/auth', _.extend(requestParams, {
            isAuthTab: true,
            isRegistrationTab: true,
            title: 'Registration page'
        }));
    },

    /**
     * Метод удаляет сообщение о том, что email не подтвержден и добавляет успешное
     * сообщение
     *
     * @method
     * @name RegistrationController#updateUserMessagesAfterConfirmEmail
     * @param {UsersModel} user
     * @param {Function} callback
     * @returns {undefined}
     */
    updateUserMessagesAfterConfirmEmail: function (user, callback) {
        SystemMessagesModel.removeMessage({ownerId: user._id, alias: 'notConfirmedEmail'}, function (error) {
            var successConfirmEmail;

            if (error) {
                callback(error);
                return;
            }

            successConfirmEmail = new SystemMessagesModel({
                alias: 'successConfirmEmail',
                ownerId: user._id,
                templatePath: 'messages/successConfirmEmail',
                showOnce: true,
                pages: ['postEdit']
            });
            successConfirmEmail.save(function (error) {
                if (error) {
                    callback({error: {message: 'Server is too busy, try later', code: 503}});
                    return;
                }

                callback(null, user);
            });
        });
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
     * TODO: здесь вылетает бага, если код подтверждения отправлен неверный
     *
     * Метод обработчик положительного
     * подтверждения кода пользователя
     *
     * @method
     * @name RegistrationController#confirmEmailHandler
     * @param {Object} error
     * @param {UsersModel} user
     * @returns {undefined}
     */
    confirmEmailHandler: function (error, user) {
        if (error) {
            //TODO: поменять на render
            this.sendError('Server is too busy, try later', 503);
            return;
        }
        this.updateUserMessagesAfterConfirmEmail(user, this.loginUser);
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
     * @param {UsersModel} user
     * @returns {undefined}
     */
    loginUser: function (error, user) {
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
            response.redirect('/' + locale + '/posts/new/');
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
     * @param {UsersModel} user модель пользователя
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
     * Метод добавляет системное сообщение о том, что пользователь
     * не подтвердил email
     *
     * @method
     * @name RegistrationController#addNotConfirmedEmailMessage
     * @param {UsersModel} user
     * @returns {undefined}
     */
    addNotConfirmedEmailMessage: function (user) {
        var notConfirmedEmailMessage = new SystemMessagesModel({
            alias: 'notConfirmedEmail',
            ownerId: user._id,
            templatePath: 'messages/notConfirmedEmail',
            pages: ['user', 'postEdit'],
            readOnly: true
        });

        notConfirmedEmailMessage.save();
    },

    /**
     * Метод обработчик успешного добавления пользователя
     *
     * @method
     * @name RegistrationController#userAddSuccess
     * @param {UsersModel} user
     * @returns {undefined}
     */
    userAddSuccess: function (user) {
        var request = this.request,
            response = this.response,
            locale = request.i18n.getLocale(),
            profile,
            redirectUrl;

        this.addNotConfirmedEmailMessage(user);
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

            redirectUrl = '/' + locale + '/users/' + user.userName;
            SendMail.sendConfirmMail(request, user);
            response.send({
                profile: profile,
                redirect: redirectUrl
            });
        }, this));
    }
});