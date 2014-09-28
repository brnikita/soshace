'use strict';
(function (Soshace) {
    /**
     * Контроллер страницы 404
     *
     * @class Soshace.controllers.NotFoundController
     */
    Soshace.controllers.NotFoundController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.NotFoundController#pageAlias
         * @type {string}
         */
        pageAlias: '404',

        /**
         * @field
         * @name Soshace.controllers.NotFoundController#view
         * @type {Soshace.views.NotFoundView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.NotFoundController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.view = new Soshace.views.NotFoundView();
        },

        /**
         * Метод вызывает при рендере на клиенте
         *
         * @method
         * @name RegistrationController#firstLoad
         * @returns {undefined}
         */
        secondLoad: function () {
            var view = this.view,
                app = Soshace.app;

            this.view = view;
            app.setView('.js-content', view).render();
        }
    });
})(window.Soshace);