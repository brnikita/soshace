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
                var options = this.options,
                    view = this.view,
                    app = Soshace.app;

                this.model.set({locale: options.locale}, {silent: true});
                app.setView('.js-content', view);
                view.fetchPartial('loginView').done(view.render);
                app.getView('.js-header').changeTab('isAuthPage');
                app.$el.attr('class', 'bg-symbols bg-color-yellow');
            }
        });
    });