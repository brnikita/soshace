'use strict';

var Controller = srcRequire('common/controller'),
    _ = require('underscore'),
    PostsModel = srcRequire('models/postsModel'),
    RequestParams = srcRequire('common/requestParams');


/**
 * Контроллер содержащий методы работы с постами
 *
 * @class PostsController
 */
module.exports = Controller.extend({

    /**
     * Метод перенаправляет на тсраницу постов
     *
     * @method
     * @name PostsController#redirectToPosts
     * @returns {undefined}
     */
    redirectToPosts: function () {
        var request = this.request,
            response = this.response,
            locale = request.i18n.getLocale();

        response.redirect('/' + locale);
    },

    /**
     * Получаем пост целиком
     *
     * @method
     * @name PostsController#getPost
     * @return {undefined}
     */
    getPost: function () {
        var request = this.request,
            response = this.response;

        PostsModel.getPost(request.params).exec(function (error, post) {
            if (post) {
                return response.send(post);
            }
            return response.send({noPost: true});
        });
    },

    /**
     * Получаем список постов
     *
     * @method
     * @name PostsController#getPosts
     * @return {undefined}
     */
    getPosts: function () {
        var request = this.request,
            response = this.response,
            query = request.query,
            requestParams = new RequestParams(request),
            locale = requestParams.locale,
            ownerId = query.ownerId;

        if (ownerId) {
            this.getUserPosts(ownerId);
            return;
        }

        PostsModel.getPosts(locale, function (error, posts) {
            if (error) {
                this.sendError(error);
                return;
            }

            return response.send(posts);
        });
    },

    /**
     * Получаем список статей пользователя
     *
     * @method
     * @name PostsController#getUserPosts
     * @param {String} userId id пользователя
     * @return {undefined}
     */
    getUserPosts: function (userId) {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            isAuthenticated = requestParams.isAuthenticated,
            profileId;

        if (isAuthenticated) {
            profileId = requestParams.profile._id;
            if (String(userId) === String(profileId)) {
                PostsModel.getProfilePosts(profileId, _.bind(function (error, posts) {
                    if (error) {
                        this.sendError(error);
                        return;
                    }
                    response.send(posts);
                }, this));
                return;
            }
        }

        PostsModel.getUserPosts(userId, _.bind(function (error, posts) {
            if (error) {
                this.sendError(error);
                return;
            }
            response.send(posts);
        }, this));
    },

    /**
     * TODO: дописать
     * Метод удаляет статью
     *
     * @method
     * @name PostsController#removePost
     * @returns {undefined}
     */
    removePost: function () {

    },

    /**
     * Рендерим страницу поста
     *
     * @method
     * @name PostsController#renderPost
     * @return {undefined}
     */
    renderPost: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            params = {
                '_id': request.params._id
            };

        PostsModel.getPost(params).exec(function (error, post) {
            if (post) {
                response.render('posts/post', _.extend(requestParams, {
                    post: post,
                    title: post.title,
                    id: post._id
                }));
                return;
            }
            response.render('404');
        });
    },

    /**
     * Рендерим список постов
     *
     * @method
     * @name PostsController#renderPosts
     * @return {undefined}
     */
    renderPosts: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            locale = requestParams.locale;

        PostsModel.getPosts(locale, function (error, posts) {
            response.render('posts/posts', _.extend(requestParams, {
                isPostsTab: true,
                title: 'Soshace blog',
                posts: posts
            }));
        });
    }
});