'use strict';

var _ = require('underscore'),
    Class = require('./vendors/class');

module.exports = Class.extend({
    /**
     * Префикс для путей к контроллерам
     *
     * @field
     * @name Router#controllersPrefix
     * @type {String}
     */
    controllersPrefix: './controllers/',

    /**
     * Ссылка на приложение
     *
     * @field
     * @name Router#app
     * @type {Object}
     */
    app: null,

    /**
     * Список контроллеров
     *
     * @field
     * @name Router#controllers
     * @type {Object}
     */
    controllers: null,

    /**
     * example {'post /api/create': 'posts/postsController create'}
     * example {'get /api/get_user': 'userController get'}
     *
     * 1 Тип запроса: GET, POST, PUT, DELETE
     * 2 Путь запроса
     * 3 Путь до контроллера
     * 4 Метод контроллера
     *
     * @field
     * @name Router#routes
     * @type {Object}
     */
    routes: {
        //-----------------API start------------------
        'post /api/image': 'imageController createImage',
        'get /api/posts': 'posts/postsController getPosts',
        'get /api/posts/:_id': 'posts/postsController getPost',
        'patch /api/posts/:_id': 'posts/postsController updatePost',
        'post /api/posts': 'posts/postsController createPost',
        'post /api/users': 'usersController createUser',
        'get /api/users/:_id': 'usersController getUser',
        'patch /api/users/:_id': 'usersController updateUser',
        'get /api/profile': 'userController getProfile',
        'post /api/login': 'auth/loginController loginHandler',
        'get /api/logout': 'auth/loginController logoutHandler',
        'get /api/registration/validate_field': 'auth/registrationController validateField',
        //-------------------API end--------------------

        'get /': 'posts/postsController redirectToPosts',
        'get /:locale': 'posts/postsController renderPosts',
        'get /:locale/posts': 'posts/postsController renderPosts',
        'get /:locale/posts/new': 'posts/addPostController renderAddPost',
        'get /:locale/posts/:_id/edit': 'posts/postController renderEditPost',
        'get /:locale/posts/:_id': 'posts/postsController renderPost',
        'get /:locale/registration': 'auth/registrationController renderRegistration',
        'get /:locale/login': 'auth/loginController renderLogin',
        'get /:locale/users/:username': 'userController renderUserPage',
        'get /:locale/registration/confirm_email': 'auth/registrationController confirmEmail'
    },


    /**
     * @constructor
     * @name Router#initialize
     * @returns {undefined}
     */
    initialize: function (app) {
        this.app = app;
        this.controllers = {};
        this.parseRoutes();
    },

    /**
     * Метод возвращает контроллер по пути
     *
     * @method
     * @name Router#getController
     * @param {String} path путь до контроллера
     * @returns {Object}
     */
    getController: function (path) {
        var prefix = this.controllersPrefix,
            fullPath = prefix + path,
            controllers = this.controllers,
            controller = controllers[path];

        if (controller) {
            return controller;
        }

        controller = controllers[path] = require(fullPath);
        return controller;
    },

    /**
     * Метод разбирает роуты
     *
     * example {'post /api/create': 'posts/postsController create'}
     * example {'get /api/get_user': 'userController get'}
     *
     * @method
     * @name Router#initialize
     * @returns {undefined}
     */
    parseRoutes: function () {
        var app = this.app,
            routes = this.routes;

        _.each(routes, _.bind(function (controller, route) {
            var controllerData = controller.match(/[^\s]+/g),
                controllerPath = controllerData[0],
                controllerMethod = controllerData[1],
                routeData = route.match(/[^\s]+/g),
                requestType = routeData[0],
                requestPath = routeData[1];

            app[requestType](requestPath, _.bind(function (request, response, next) {
                var Controller = this.getController(controllerPath),
                    controller = new Controller(request, response, next);

                controller[controllerMethod]();
            }, this));
        }, this));
    }

});