'use strict';
(function(Soshace){
    var _ = Soshace._;

    /**
     * Класс роутера
     *
     * @class Soshace.core.Router
     */
    Soshace.core.Router = Soshace.core.Class.extend({
        /**
         * Ссылка на текущий контроллер
         *
         * @field
         * @name Soshace.core.Router#currentController
         * @type {Controller | null}
         */
        currentController: null,

        /**
         * Ротинг по контроллерам: каждому роуту соответствует контроллер,
         * у контроллера вызывается метод routeHandler
         *
         * @field
         * @name Soshace.core.Router#controllersRoutes
         * @type {Object}
         */
        controllersRoutes: {
            ':*notFound': 'controllers/notFoundController',
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
            ':locale/login': 'controllers/auth/loginController',
            ':locale/login/': 'controllers/auth/loginController',
            ':locale/registration': 'controllers/auth/registrationController',
            ':locale/registration/': 'controllers/auth/registrationController',
            ':locale/users/:username': 'controllers/users/usersController',
            ':locale/users/:username/': 'controllers/users/usersController',
            ':locale/users/:username/edit': 'controllers/users/usersEditController',
            ':locale/users/:username/edit/': 'controllers/users/usersEditController',
            ':locale/users/:username/settings': 'controllers/users/usersSettingsController',
            ':locale/users/:username/settings/': 'controllers/users/usersSettingsController'
        },

        /**
         * Поле содержит список экземпляров контроллеров
         *
         * @field
         * @name Soshace.core.Router#controllers
         * @type {Object}
         */
        controllers: null,

        /**
         * @constructor
         * @name Soshace.core.Router#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.controllers = {};
            this.setRouter();
            this.startRouter();
        },

        /**
         * Метод запускает history API при её поддержке или принудительно стартует роут
         *
         * @method
         * @name Soshace.core.Router#startRouter
         * @returns {undefined}
         */
        startRouter: function () {
            if (Soshace.helpers.checkHistoryApiSupport()) {
                Soshace.app.history.start({
                    pushState: true
                });
                return;
            }

            //TODO: доделать
            this.handleRouteByController();
        },

        /**
         * Метод устанавливает роутер по списку роутов
         * controllersRoutes
         *
         * @method
         * @name Soshace.core.Router#setRouter
         * @returns {undefined}
         */
        setRouter: function () {
            _.each(this.controllersRoutes, _.bind(function (controllerPath, route) {
                this.route(route, controllerPath);
            }, this));

            this.on('route', this.handleRouteByController, this);
        },

        /**
         * Метод возвращает экземпляр контроллера по пути
         *
         * @method
         * @name Soshace.core.Router#getController
         * @param {string} path путь до контроллера
         * @returns {jQuery.Deferred}
         */
        getController: function (path) {
            var deferred = Soshace.core.deferred(),
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
         * @name Soshace.core.Router#handleRouteByController
         * @param {string} controllerPath путь до контроллера
         * @param {Array} routeParams параметры запроса
         * @returns {undefined}
         */
        handleRouteByController: function (controllerPath, routeParams) {
            this.getController(controllerPath).
                done(_.bind(function (controller) {
                    this.currentController = controller;
                    controller.routeHandler.apply(controller, routeParams);
                }, this));
        }
    });
})(window.Soshace);