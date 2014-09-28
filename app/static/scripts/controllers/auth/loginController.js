'use strict';
(function (Soshace) {
    /**
     * Контроллер страницы логина
     *
     * @class Soshace.controllers.LoginController
     */
    Soshace.controllers.LoginController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.LoginController#pageAlias
         * @type {string}
         */
        pageAlias: 'login',

        /**
         * @field
         * @name Soshace.controllers.LoginController#model
         * @type {Soshace.models.LoginModel | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.controllers.LoginController#view
         * @type {Soshace.views.LoginView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.LoginController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.model = new Soshace.models.LoginModel();
            this.view = new Soshace.views.LoginView({
                model: this.model
            });
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.LoginController#firstLoad
         * @returns {undefined}
         */
        firstLoad: function () {
            var app = Soshace.app,
                view = this.view;

            view.$el = app.elements.contentFirstLoad;
            view.delegateEvents();
            view.afterRender();
        },

        /**
         * Метод вызывает при рендере на клиенте
         *
         * @method
         * @name Soshace.controllers.LoginController#firstLoad
         * @returns {undefined}
         */
        secondLoad: function () {
            var locale,
                userName,
                view = this.view,
                app = Soshace.app;

            if (app.isAuthenticated()) {
                locale = Soshace.helpers.getLocale();
                userName = Soshace.profile.userName;
                Backbone.history.navigate('/' + locale + '/users/' + userName);
                return;
            }

            this.view = view;
            app.setView('.js-content', view).render();
        }
    });
})(window.Soshace);