'use strict';
var Controller = srcRequire('common/controller'),
    PostsModel = srcRequire('models/postsModel'),
    _ = require('underscore'),
    RequestParams = srcRequire('common/requestParams');

/**
 * Контроллер, отвечающий за редактирование/добавление статьи
 *
 * @class PostEditController
 *
 */
module.exports = Controller.extend({
    /**
     * TODO: написать тест
     *
     * Формируем описание поста из тела поста
     *
     * @private
     * @method
     * @name PostEditController#_getPostDescription
     * @param {string} postBody тело поста
     * @returns {*}
     */
    _getPostDescription: function (postBody) {
        var ReadMoreIndex = postBody.indexOf('<readmore/>');

        if (ReadMoreIndex === -1) {
            return postBody;
        }

        return postBody.substr(0, ReadMoreIndex);
    },


    /**
     * Обрабатываем запрос на добавление поста
     *
     * @public
     * @method
     * @name PostEditController#createPost
     * @return {undefined}
     */
    createPost: function () {
        var request = this.request,
            postData = request.body,
            requestParams = new RequestParams(request),
            profile,
            post;

        if (!postData) {
            this.sendError('Bad request');
            return;
        }

        if (!requestParams.isAuthenticated) {
            this.sendError('Unauthorized', 401);
            return;
        }

        profile = requestParams.profile;
        postData.ownerId = profile._id;
        postData.locale = profile.locale;
        post = new PostsModel(postData);
        post.save(_.bind(this.postSaveHandler, this));
    },

    /**
     * Метод обновляет модель статьи
     *
     * @method
     * @name PostEditController#updatePost
     * @returns {undefined}
     */
    updatePost: function () {
        var request = this.request,
            response = this.response,
            params = request.params,
            postId = params._id,
            update = request.body,
            requestParams = new RequestParams(request),
            profile,
            profileId;

        if (typeof postId === 'undefined') {
            this.sendError('Bad request.');
            return;
        }

        if (!requestParams.isAuthenticated) {
            this.sendError('Unauthorized', 401);
            return;
        }
        //TODO: проверить права пользователя на обновление поста

        profile = requestParams.profile;
        profileId = profile._id;

        PostsModel.updatePost(postId, profileId, update, _.bind(function (error) {
            if (error) {
                this.sendError(error);
                return;
            }

            response.send('Success');
        }, this));
    },

    /**
     * Метод обработчик сохранения поста в базе
     *
     * @method
     * @name PostEditController#postSaveHandler
     * @param {Object} error объект ошибки
     * @param {PostsModel} post модель статьи
     * @returns {undefined}
     */
    postSaveHandler: function (error, post) {
        var response = this.response;

        if (error) {
            if (error.errors) {
                //TODO: доработать отображение ошибок
                this.sendError(error.errors);
                return;
            }

            this.sendError('Server is too busy, try later', 503);
            return;
        }

        response.send({
            _id: post._id
        });
    },

    /**
     * Метод возвращает True, если редактор должен быть заблокирован
     *
     * @method
     * @name PostEditController#isEditorDisabled
     * @returns {Boolean}
     */
    isEditorDisabled: function () {
        var request = this.request,
            emailConfirmed = request.isAuthenticated() &&
                request.user[0].emailConfirmed;

        return !emailConfirmed;
    },

    /**
     * TODO: доделать
     *
     * Метод редерит страницу редактировиания/добавления статьи
     *
     * @method
     * @name PostEditController#renderEditPost
     * @returns {undefined}
     */
    renderEditPost: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            locale = requestParams.locale,
            params = request.params,
            postId = params && params._id,
            notAuthenticated = !requestParams.isAuthenticated,
            redirectUrl;

        if (notAuthenticated) {
            if (postId) {
                redirectUrl = '/' + locale + '/posts/new';
                response.redirect(redirectUrl);
                return;
            }

            this.renderNewEditPost();
            return;
        }

        this.renderEditPostForAuthenticated();
    },

    /**
     * Метод рендерит страницу редактирования статьи для
     * авторизованного пользователя
     *
     * @method
     * @name PostEditController#renderEditPostForAuthenticated
     * @returns {undefined}
     */
    renderEditPostForAuthenticated: function () {
        var request = this.request,
            requestParams = new RequestParams(request),
            params = request.params,
            postId = params && params._id,
            profile = requestParams.profile,
            profileId = profile && profile._id;

        if (postId) {
            PostsModel.getProfilePost(postId, profileId,
                _.bind(this.renderEditPostForAuthenticatedHandler, this));
            return;
        }

        this.renderNewEditPost();
    },

    /**
     * Метод рендерит страницу редактирования статьи для
     * авторизованного пользователя
     *
     * Callback получения статьи из базы
     *
     * @method
     * @name PostEditController#renderEditPostForAuthenticatedHandler
     * @param {String} error текст ошибки
     * @param {Backbone.Model} post модель статьи
     * @returns {undefined}
     */
    renderEditPostForAuthenticatedHandler: function (error, post) {
        var response = this.response,
            request = this.request,
            requestParams = new RequestParams(request);

        if (error) {
            //TODO: отрендерить страницу с ошибкой
            return;
        }

        if (post === null) {
            this.renderNewEditPost();
            return;
        }

        response.render('posts/postEdit', _.extend(requestParams, {
            title: 'Edit Post',
            post: post,
            isPostEditTab: true
        }));
    },

    /**
     * Метод рендерит новую страницу редактора
     *
     * @method
     * @name PostEditController#renderNewEditPost
     * @returns {undefined}
     */
    renderNewEditPost: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request);

        response.render('posts/postEdit', _.extend(requestParams, {
            title: 'Edit Post',
            isPostEditTab: true,
            editorDisabled: this.isEditorDisabled()
        }));
    }
});