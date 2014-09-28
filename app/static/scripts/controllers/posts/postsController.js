'use strict';

(function (Soshace) {
    /**
     * Контроллер страницы списка статей
     *
     * @class Soshace.controllers.PostsController
     */
    Soshace.controllers.PostsController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.PostsController#pageAlias
         * @type {string}
         */
        pageAlias: 'home',

        /**
         * @field
         * @name Soshace.controllers.PostsController#collection
         * @type {Soshace.collections.PostsCollection | null}
         */
        collection: null,

        /**
         * @field
         * @name Soshace.controllers.PostsController#view
         * @type {Soshace.views.PostsView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.PostsController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var view;

            this.collection = new Soshace.collections.PostsCollection();
            view = new Soshace.views.PostsView({
                collection: this.collection
            });
            this.collection.on('postsReceived', _.bind(function () {
                view.render();
            }, this));
            this.view = view;
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.PostsController#firstLoad
         * @returns {undefined}
         */
        firstLoad: function () {
            var app = Soshace.app,
                $el = app.elements.contentFirstLoad,
                view = this.view;

            app.setView('.js-content', view);
            view.withoutRender($el);
        },

        /**
         * Метод вызывает при рендере на клиенте
         *
         * @method
         * @name Soshace.controllers.PostsController#firstLoad
         * @returns {undefined}
         */
        secondLoad: function () {
            var app = Soshace.app,
                view = this.view,
                params = this.routeParams,
                locale = params[0];

            app.setView('.js-content', view);
            this.collection.getPosts({locale: locale});
        }
    });
})(window.Soshace);