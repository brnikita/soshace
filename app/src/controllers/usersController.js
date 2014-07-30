'use strict';
var Controller = require('../common/controller'),
    _ = require('underscore'),
    UsersModel = require('../models/usersModel'),
    RequestParams = require('../common/requestParams');
/**
 * Контроллер страницы профиля пользователя
 *
 * @class UsersController
 */
module.exports = Controller.extend({

    /**
     * Метод отдает в ответе json с данными профиля
     * пользователя
     *
     * @method
     * @name UsersController#getUser
     * @returns {undefined}
     */
    getUser: function () {

    },

    /**
     * Метод обновления профиля пользователя
     * В параметрах запроса нужно передавать метод из модели
     * для работы с передаваемыми данными
     * {method: systemMessageDelete}
     *
     * @method
     * @name UsersController#updateUser
     * @returns {undefined}
     */
    updateProfile: function () {
        var response = this.response,
            request = this.request,
            requestParams = new RequestParams(request),
            params = request.params,
            query = request.query,
            userId,
            method;

        if (!requestParams.isAuthenticated) {
            this.sendError('User is not authorized.');
            return;
        }

        if (params.username !== requestParams.profile.username) {
            this.sendError('User is not authorized.');
            return;
        }

        userId = requestParams.profile._id;
        method = query.method;

        if (typeof UsersModel[method] === 'function') {
            UsersModel[method](userId, query, _.bind(function (error, user) {
                if (error) {
                    this.sendError(error);
                    return;
                }

                response.send({user: user});
            }, this));
            return;
        }

        this.sendError('The Method {{' + method + '}} is not supported.', 405);
    },

    /**
     * Метод отдает в ответе json с данными профиля
     * текущего авторизованного пользователя
     *
     * @method
     * @name UsersController#getProfile
     * @returns {undefined}
     */
    getProfile: function () {
        var request = this.request,
            response = this.response,
            userProfile = null;

        if (request.user && request.user[0]) {
            userProfile = _.pick(request.user[0],
                'fullName',
                'userName',
                'isMale',
                'admin',
                'emailConfirmed',
                'systemMessages',
                'locale');
        }

        response.send({
            profile: userProfile
        });
    },

    /**
     * Метод рендерит страницу пользователя
     *
     * @method
     * @name UsersController#renderLogin
     * @return {undefined}
     */
    renderUserPage: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request);

        response.render('user', _.extend(requestParams, {
            isUserTab: true,
            title: 'User Profile',
            bodyClass: 'bg-color-blue bg-symbols'
        }));
    }
});