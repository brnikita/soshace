'use strict';

/**
 * Контроллер страницы логина
 *
 * @class LoginController
 */
define(['utils/controller', './loginModel', './loginView'],
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
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name LoginController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new LoginView({
                    model: this.model,
                    $el: $('.js-content-first-load')
                });
                view.afterRender();
                this.view = view;
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name LoginController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = new LoginView({
                        model: this.model
                    }),
                    app = Soshace.app;

                this.view = view;
                app.$el.attr('class', 'bg-symbols bg-color-yellow');
                app.setView('.js-content', view).render();
            }
        });
    });