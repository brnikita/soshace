'use strict';

(function (Soshace) {
    /**
     * Контроллер страницы редактирования/добавления статьи
     *
     * @class Soshace.controllers.PostEditController
     */
    Soshace.controllers.PostEditController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.PostEditController#pageAlias
         * @type {string}
         */
        pageAlias: 'postEdit',

        /**
         * @field
         * @name Soshace.controllers.PostEditController#model
         * @type {Soshace.models.PostModel | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.controllers.PostEditController#view
         * @type {Soshace.views.PostEditView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.PostEditController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.model = new Soshace.models.PostModel();
            this.view = new Soshace.views.PostEditView({
                model: this.model
            });
        },

        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.PostEditController#firstLoad
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
         * @name Soshace.controllers.PostEditController#firstLoad
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
                    view.addListeners();
                });
        }
    });
})(window.Soshace);