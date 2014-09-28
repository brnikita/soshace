'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Контроллер страницы пользователя
     *
     * @class Soshace.controllers.UsersController
     */
    Soshace.controllers.UsersController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.UsersController#pageAlias
         * @type {string}
         */
        pageAlias: 'user',

        /**
         * @field
         * @name Soshace.controllers.UsersController#model
         * @type {Soshace.models.UsersModel | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.controllers.UsersController#postsCollection
         * @type {Soshace.collections.PostsCollection | null}
         */
        postsCollection: null,

        /**
         * @field
         * @name Soshace.controllers.UsersController#view
         * @type {Soshace.views.UsersView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.UsersController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var app = Soshace.app,
                model,
                view,
                postsCollection;

            model = new Soshace.models.UsersModel();
            postsCollection = new Soshace.collections.PostsCollection();
            postsCollection.on('postsReceived', _.bind(function () {
                app.setView('.js-content', view).render();
            }, this));

            view = new Soshace.views.UsersView({
                postsCollection: postsCollection,
                model: model
            });

            this.model = model;
            this.view = view;
            this.postsCollection = postsCollection;
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.UsersController#firstLoad
         * @returns {undefined}
         */
        firstLoad: function () {
            var app = Soshace.app,
                $contentFirstLoad = app.elements.contentFirstLoad,
                view = this.view;

            app.setView('.js-content', view);
            view.withoutRender($contentFirstLoad);
        },

        /**
         * TODO: добавить обработку ошибок при получении статей
         *
         * Метод вызывает при рендере на клиенте
         *
         * @method
         * @name Soshace.controllers.UsersController#firstLoad
         * @returns {undefined}
         */
        secondLoad: function () {
            var params = this.routeParams;
            this.model.set({
                locale: params[0],
                userName: params[1]
            });

            this.model.getUser().done(_.bind(function (response) {
                this.postsCollection.getPosts({ownerId: response._id});
            }, this));
        }
    });
})(window.Soshace);