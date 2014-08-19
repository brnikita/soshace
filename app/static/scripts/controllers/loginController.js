'use strict';

/**
 * Контроллер страницы логина
 *
 * @class LoginController
 */
define(['utils/controller', 'models/loginModel', 'views/loginView'],
    function (Controller, LoginModel, LoginView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name LoginController#pageAlias
             * @type {String}
             */
            pageAlias: 'login',

            /**
             * @field
             * @name LoginController#model
             * @type {LoginModel}
             */
            model: null,

            /**
             * @field
             * @name LoginController#view
             * @type {LoginView}
             */
            view: null,

            /**
             * @constructor
             * @name LoginController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new LoginModel();
                this.view = new LoginView({
                    model: this.model
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name LoginController#firstLoad
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
             * @name LoginController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = this.view,
                    app = Soshace.app;

                this.view = view;
                app.setView('.js-content', view).render();
            }
        });
    });