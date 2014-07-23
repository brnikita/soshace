'use strict';

/**
 * Модуль страницы просмотра поста
 *
 * @module Router
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Router.extend({
        /**
         * Ссылка на текущий контроллер
         *
         * @field
         * @name Router#currentController
         * @type {Controller | null}
         */
        currentController: null,

        /**
         * Ротинг по контроллерам: каждому роуту соответствует контроллер,
         * у контроллера вызывается метод routeHandler
         *
         * @field
         * @name Router#controllersRoutes
         * @type {Object}
         */
        controllersRoutes: {
            ':locale': 'modules/posts/postsList/postsListController',
            ':locale/': 'modules/posts/postsList/postsListController',
            ':locale/posts/:year/:month/:date/:title': 'modules/posts/postDetail/postDetailController',
            ':locale/posts/:year/:month/:date/:title/': 'modules/posts/postDetail/postDetailController',
            ':locale/add_post': 'modules/posts/addPost/addPostController',
            ':locale/add_post/': 'modules/posts/addPost/addPostController',
            ':locale/login': 'modules/login/loginController',
            ':locale/login/': 'modules/login/loginController',
            ':locale/registration': 'modules/registration/registrationController',
            ':locale/registration/': 'modules/registration/registrationController',
            ':locale/user/:username': 'modules/user/userController',
            ':locale/user/:username/': 'modules/user/userController'
        },

        /**
         * Поле содержит список экземпляров контроллеров
         *
         * @field
         * @name Router#controllers
         * @type {Object}
         */
        controllers: null,

        /**
         * @constructor
         * @name Router#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.controllers = {};
            this.setRouter();
            Backbone.history.start({
                pushState: true
            });
        },

        /**
         * Метод устанавливает роутер по списку роутов
         * controllersRoutes
         *
         * @method
         * @name Router#setRouter
         * @returns {undefined}
         */
        setRouter: function(){
            _.each(this.controllersRoutes, _.bind(function(controllerPath, route){
                this.route(route, controllerPath);
            }, this));

            this.on('route', this.handleRouteByController, this);
        },

        /**
         * Метод возвращает экземпляр контроллера по пути
         *
         * @method
         * @name Router#getController
         * @param {String} path путь до контроллера
         * @returns {jQuery.Deferred}
         */
        getController: function (path) {
            var deferred = $.Deferred(),
                controllers = this.controllers,
                controller = controllers[path];

            if (typeof controller !== 'undefined') {
                return deferred.resolve(controller);
            }

            require([].concat(path), function (Controller) {
                controller = new Controller();
                controllers[path] = controller;
                deferred.resolve(controller);
            });

            return deferred;
        },

        /**
         * Метод передает параметры запроса роутеру
         *
         * @method
         * @name Router#handleRouteByController
         * @param {String} controllerPath путь до контроллера
         * @param {Array} routeParams параметры запроса
         * @returns {undefined}
         */
        handleRouteByController: function (controllerPath, routeParams) {
            this.getController(controllerPath).
                done(_.bind(function(controller){
                    this.currentController = controller;
                    controller.routeHandler.apply(controller, routeParams);
                }, this));
        }
    });
});