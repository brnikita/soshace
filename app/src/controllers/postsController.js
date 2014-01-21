'use strict';

var PostsModel = require('../models/postsModel').PostsModel,
    Unidecode = require('unidecode'),
    Helper = require('../common/helper').Helper,
    _ = require('underscore'),
    _s = require('underscore.string');

/**
 * Контроллер содержащий методы работы с постами
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
    },

    /**
     * Рендерим страницу добавления поста
     *
     * @public
     * @function
     * @name PostsController.renderAddPost
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderAddPost: function (request, response) {
        response.render('posts/addPostView');
    },

    /**
     * Обрабатываем запрос на добавление поста
     *
     * @public
     * @function
     * @name PostsController.addPost
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    addPost: function (request, response) {
        var dataToSave = {},
            postData = request.body;

        if (typeof postData === 'undefined') {
            response.send({error: 'Bad request'});
            return;
        }

        //проверяем заголовок
        postData.title = String(postData.title);
        if ((!postData.title && postData.title.length)) {
            response.send({error: 'Bad title'});
            return;
        }
        dataToSave.title = _s.trim(postData.title);

        //проверяем тело поста
        postData.body = String(postData.body);
        if ((!postData.body && postData.body.length)) {
            response.send({error: 'Bad body'});
            return;
        }
        dataToSave.body = _s.trim(postData.body);

        dataToSave.public = false;

        var date;
        if (typeof postData.date === 'undefined') {
            date = new Date();
        } else {
            date = new Date(postData.date);
        }

        dataToSave.date = date;
        dataToSave.UTCYear = date.getUTCFullYear();
        dataToSave.UTCMonth = Helper.zeroLeading(date.getUTCMonth());
        dataToSave.UTCDate = Helper.zeroLeading(date.getUTCDate());

        var ReadMoreIndex = postData.body.indexOf('<readmore/>');
        if (ReadMoreIndex === -1) {
            dataToSave.description = dataToSave.body;
        } else {
            dataToSave.description = dataToSave.body.substr(0, ReadMoreIndex);
        }

        //переводим в латиницу
        dataToSave.titleUrl = Unidecode(dataToSave.title.toLowerCase());
        //заменяем все нелатинские символы на "-"
        dataToSave.titleUrl = dataToSave.titleUrl.replace(/\W+/g, '-');

        //TODO: убрать хардкод
        dataToSave.locale = 'ru';

        PostsModel.addPost(dataToSave, function (error) {
            if (error) {
                response.send({status: 'Something is wrong'});
                return;
            }
            response.send({status: 'Success'});
        });
    }
};

exports.PostsController = PostsController;