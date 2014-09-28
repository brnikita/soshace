'use strict';
(function (Soshace) {
    /**
     * Контроллер страницы регистрации
     *
     * @class RegistrationController
     */
    Soshace.controllers.RegistrationController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name RegistrationController#pageAlias
         * @type {string}
         */
        pageAlias: 'registration',

        /**
         * @field
         * @name RegistrationController#model
         * @type {Soshace.models.RegistrationModel | null}
         */
        model: null,

        /**
         * @field
         * @name RegistrationController#view
         * @type {Soshace.views.RegistrationView | null}
         */
        view: null,

        /**
         * @constructor
         * @name RegistrationController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.model = new Soshace.models.RegistrationModel();
            this.view = new Soshace.views.RegistrationView({
                model: this.model
            });
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name RegistrationController#firstLoad
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
         * @name RegistrationController#firstLoad
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
            }

            this.view = view;
            app.setView('.js-content', view).render();
        }
    });
})(window.Soshace);