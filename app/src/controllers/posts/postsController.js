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
        PostsModel.getPost(request.query).exec(function (error, post) {
            response.send(post);
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
        var params = {
            page: request.query.page
        };

        PostsModel.getPosts(params).exec(function (error, posts) {
            response.send(posts);
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
                public: true,
                locale: request.params.locale,
                UTCYear: request.params.year,
                UTCMonth: request.params.month,
                UTCDate: request.params.date,
                titleUrl: request.params.titleUrl
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