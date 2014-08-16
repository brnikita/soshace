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
    redirectToPosts: function(){
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
            page = request.query.page || 0,
            params = {
                'public': true,
                'locale': request.query.locale,
                'page': page
            };

        PostsModel.getPosts(params).exec(function (error, posts) {
            return response.send(posts);
        });
    },

    /**
     * Получаем список статей профиля
     *
     * @method
     * @name PostsController#getProfilePosts
     * @return {undefined}
     */
    getProfilePosts: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            profileId;

        if (requestParams.isAuthenticated) {
            profileId = requestParams.profile._id;
            PostsModel.getProfilePosts(profileId, function (error, posts) {
                return response.send(posts);
            });
            return;
        }

        this.sendError('Unauthorized', 401);
    },

    /**
     * TODO: дописать
     * Метод удаляет статью
     *
     * @method
     * @name PostsController#removePost
     * @returns {undefined}
     */
    removePost: function(){

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
            params = {
                'public': true,
                'locale': request.params.locale
            };

        PostsModel.getPosts(params).exec(function (error, posts) {
            response.render('posts/posts', _.extend(requestParams, {
                isPostsTab: true,
                title: 'Soshace blog',
                posts: posts
            }));
        });
    }
});