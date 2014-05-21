'use strict';

var _ = require('underscore'),
    PostsModel = require('../../models/postsModel'),
    RenderParams = require('../../common/renderParams');


/**
 * Контроллер содержащий методы работы с постами
 *
 * @module PostsController
 */
var PostsController = {

    /**
     * Получаем пост целиком
     *
     * @public
     * @function
     * @name PostsController.getPost
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    getPost: function (request, response) {
        var query = request.query,
            params = {
                'public': true,
                'locale': query.locale,
                'UTCYear': query.year,
                'UTCMonth': query.month,
                'UTCDate': query.date,
                'titleUrl': query.title
            };

        PostsModel.getPost(params).exec(function (error, post) {
            if (post) {
                return response.send(post);
            }
            response.send({noPost: true});
        });
    },

    /**
     * Получаем список постов
     *
     * @public
     * @function
     * @name PostsController.getPosts
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    getPosts: function (request, response) {
        var page = request.query.page || 0,
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
     * @public
     * @function
     * @name PostsController.renderPost
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderPost: function (request, response) {
        var renderParams = new RenderParams(request),
            params = {
                'public': true,
                'locale': request.params.locale,
                'UTCYear': request.params.year,
                'UTCMonth': request.params.month,
                'UTCDate': request.params.date,
                'titleUrl': request.params.titleUrl
            };

        PostsModel.getPost(params).exec(function (error, post) {
            if (post) {
                response.render('posts/postDetailView', _.extend(renderParams, {
                    post: post,
                    title: post.title
                }));
                return;
            }
            response.render('404');
        });
    },

    /**
     * Рендерим список постов
     *
     * @public
     * @function
     * @name PostsController.renderPosts
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderPosts: function (request, response) {
        var renderParams = new RenderParams(request),
            params = {
                'public': true,
                'locale': request.params.locale,
                'page': request.params.page
            };

        PostsModel.getPosts(params).exec(function (error, posts) {
            response.render('posts/postsListView', _.extend(renderParams, {
                isPostsPage: true,
                title: 'Soshace blog',
                posts: posts
            }));
        });
    }
};

module.exports = PostsController;