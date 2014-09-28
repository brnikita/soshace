'use strict';
(function (Soshace) {
    /**
     * Контроллер страницы просмотра статьи
     *
     * @class Soshace.controllers.PostController
     */
    Soshace.controllers.PostController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.PostController#pageAlias
         * @type {string}
         */
        pageAlias: 'postDetail',

        /**
         * @field
         * @name Soshace.controllers.PostController#model
         * @type {Soshace.models.PostModel | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.controllers.PostController#view
         * @type {Soshace.views.PostView | null}
         */
        view: null,

        /**
         * @constructor
         * @name
         * @returns {undefined}
         */
        initialize: function () {
            this.model = new Soshace.models.PostModel();
            this.view = new Soshace.views.PostView({
                model: this.model
            });
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.PostController#firstLoad
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
         * @name Soshace.controllers.PostController#firstLoad
         * @returns {undefined}
         */
        secondLoad: function () {
            var params = this.routeParams,
                postId = params[1],
                view = this.view,
                app = Soshace.app;

            this.model.getPost(postId).
                done(function () {
                    app.setView('.js-content', view).render();
                });
        }
    });
})(window.Soshace);