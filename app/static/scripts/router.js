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
            ':locale': 'controllers/posts/postsController',
            ':locale/': 'controllers/posts/postsController',
            ':locale/posts': 'controllers/posts/postsController',
            ':locale/posts/': 'controllers/posts/postsController',
            ':locale/posts/:id': 'controllers/posts/postController',
            ':locale/posts/:id/': 'controllers/posts/postController',
            ':locale/posts/new': 'controllers/posts/postEditController',
            ':locale/posts/new/': 'controllers/posts/postEditController',
            ':locale/posts/:id/edit': 'controllers/posts/postEditController',
            ':locale/posts/:id/edit/': 'controllers/posts/postEditController',
            ':locale/login': 'controllers/loginController',
            ':locale/login/': 'controllers/loginController',
            ':locale/logout': 'controllers/logoutController',
            ':locale/logout/': 'controllers/logoutController',
            ':locale/registration': 'controllers/registrationController',
            ':locale/registration/': 'controllers/registrationController',
            ':locale/users/:username': 'controllers/userController',
            ':locale/users/:username/': 'controllers/userController'
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