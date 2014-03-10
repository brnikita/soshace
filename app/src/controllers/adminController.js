'use strict';

var PostsModel = require('../models/postsModel');

/**
 * Контроллер админки
 *
 * @module AdminController
 */
var AdminController = {

    /**
     * Получаем пост целиком
     *
     * @public
     * @function
     * @name AdminController.getPost
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
     * @name AdminController.getPosts
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
     * @name AdminController.renderPost
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderPost: function (request, response) {
        var params = {
            locale: request.params.locale,
            UTCYear: request.params.year,
            UTCMonth: request.params.month,
            UTCDate: request.params.date,
            titleUrl: request.params.titleUrl
        };

        PostsModel.getPost(params).exec(function (error, post) {
            if (post) {
                response.render('posts/postDetailView', {
                    post: post,
                    environment: soshace.ENVIRONMENT,
                    scriptsPath: '/static',
                    version: soshace.VERSION,
                    title: 'Welcome to Soshace blog!'
                });
                return;
            }
            response.render('404. Пост не найден');
        });
    },

    /**
     * Рендерим список постов
     *
     * @public
     * @function
     * @name AdminController.renderPosts
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderPosts: function (request, response) {
        var params = {
            locale: request.params.locale,
            page: request.params.page
        };

        PostsModel.getPosts(params).exec(function (error, posts) {
            response.render('posts/postsListView', {
                posts: posts,
                activeTab: 'posts',
                environment: soshace.ENVIRONMENT,
                scriptsPath: '/static',
                version: soshace.VERSION,
                title: 'Welcome to Soshace blog!'
            });
        });
    }
};

module.exports = AdminController;