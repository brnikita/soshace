'use strict';

var Controller = require('../../common/controller'),
    _ = require('underscore'),
    PostsModel = require('../../models/postsModel'),
    RenderParams = require('../../common/renderParams');


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
            response = this.response,
            params = {
                '_id': request.params._id
            };

        PostsModel.getPost(params).exec(function (error, post) {
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
     * Рендерим страницу поста
     *
     * @method
     * @name PostsController#renderPost
     * @return {undefined}
     */
    renderPost: function () {
        var request = this.request,
            response = this.response,
            renderParams = new RenderParams(request),
            params = {
                '_id': request.params._id
            };

        PostsModel.getPost(params).exec(function (error, post) {
            if (post) {
                response.render('posts/postDetailView', _.extend(renderParams, {
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
            renderParams = new RenderParams(request),
            params = {
                'public': true,
                'locale': request.params.locale,
                'page': request.params.page
            };

        PostsModel.getPosts(params).exec(function (error, posts) {
            response.render('posts/postsListView', _.extend(renderParams, {
                isPostsTab: true,
                title: 'Soshace blog',
                posts: posts
            }));
        });
    }
});