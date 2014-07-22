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
             * @type {Backbone.Model}
             */
            model: null,

            /**
             * @field
             * @name LoginController#view
             * @type {Backbone.Layout}
             */
            view: null,

            /**
             * @constructor
             * @name
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
                this.view.$el = $('.js-content-el');
                this.view.afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name LoginController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var params = this.routeParams,
                    view = this.view,
                    app = Soshace.app;

                this.model.set({locale: params[0]}, {silent: true});
                app.getView('.js-header').changeTab('isAuthPage');
                app.$el.attr('class', 'bg-symbols bg-color-yellow');
                app.setView('.js-content', view).render();
            }
        });
    });