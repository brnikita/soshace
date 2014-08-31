'use strict';
var Controller = srcRequire('common/controller'),
    _ = require('underscore'),
    UsersModel = srcRequire('models/usersModel'),
    PostsModel = srcRequire('models/postsModel'),
    RequestParams = srcRequire('common/requestParams');
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
        var response = this.response,
            request = this.request,
            params = request.params,
            userName = params.username,
            requestParams = new RequestParams(request),
            profile;

        if (requestParams.isAuthenticated) {
            profile = requestParams.profile;

            if (userName === profile.userName) {
                profile = _.pick(profile,
                    '_id',
                    'fullName',
                    'userName',
                    'sex',
                    'aboutAuthor',
                    'birthday',
                    'emailConfirmed',
                    'locale');

                response.send(profile);
                return;
            }
        }

        UsersModel.getUserByUserName(userName, _.bind(function (error, user) {
            if (error) {
                this.sendError(error);
                return;
            }

            response.send(user);
        }, this));
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
     * Метод рендерит страницу пользователя
     *
     * @method
     * @name UsersController#renderLogin
     * @return {undefined}
     */
    renderUserPage: function () {
        var request = this.request,
            params = request.params,
            userName = params.username,
            requestParams = new RequestParams(request),
            profile;

        if (requestParams.isAuthenticated) {
            profile = requestParams.profile;
            if (userName === profile.userName) {
                this.renderProfileForAuthenticatedUser(profile);
                return;
            }
        }

        UsersModel.getUserByUserName(userName, _.bind(function (error, user) {
            if (error) {
                this.renderError(error);
                return;
            }

            if (user === null) {
                this.renderError('User not found', 404);
                return;
            }

            this.renderNotAuthenticatedUserPage(user);
        }, this));
    },

    /**
     * Метод рендерит страницу пользователя
     * Страница не принадлежит текущему пользователю
     *
     * @method
     * @name UsersController#renderAuthenticatedUserPage
     * @param {Mongoose.Model} user
     * @returns {undefined}
     */
    renderNotAuthenticatedUserPage: function (user) {
        var request = this.request,
            response = this.response,
            userId = user._id,
            requestParams = new RequestParams(request);

        PostsModel.getUserPosts(userId, _.bind(function (error, posts) {
            if (error) {
                this.renderError(error);
                return;
            }

            response.render('user', _.extend(requestParams, {
                user: user,
                isUserTab: true,
                posts: posts,
                title: 'User Profile'
            }));
        }, this));
    },

    /**
     * Метод рендерит страницу профиля
     * авторизованного пользователя по id профиля
     *
     * @method
     * @name UsersController#renderProfileForAuthenticatedUser
     * @param {Mongoose.Model} profile профиль пользователя
     * @returns {undefined}
     */
    renderProfileForAuthenticatedUser: function (profile) {
        var request = this.request,
            response = this.response,
            profileId = profile._id,
            requestParams = new RequestParams(request);

        PostsModel.getProfilePosts(profileId, _.bind(function (error, posts) {
            if (error) {
                this.renderError(error);
                return;
            }

            response.render('user', _.extend(requestParams, {
                user: profile,
                isUserTab: true,
                isOwner: true,
                posts: posts,
                title: 'User Profile'
            }));
        }, this));
    }
});