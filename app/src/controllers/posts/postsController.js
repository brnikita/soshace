'use strict';

var PostsModel = require('../../models/postsModel');

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
        var params = {
            titleUrl: request.params.titleUrl
        };

        PostsModel.getPost(params).exec(function (error, post) {
            response.render('posts/postDetailView', {
                post: post,
                environment: soshace.ENVIRONMENT,
                scriptsPath: '/static',
                version: soshace.VERSION
            });
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
        var params = {
            page: request.params.page
        };

        PostsModel.getPosts(params).exec(function (error, posts) {
            response.render('posts/postsListView', {
                posts: posts,
                activeTab: 'posts',
                environment: soshace.ENVIRONMENT,
                scriptsPath: '/static',
                version: soshace.VERSION
            });
        });
    }
};

module.exports = PostsController;