'use strict';

/**
 * Контроллер страницы регистрации
 *
 * @class RegistrationController
 */
define(['utils/controller', './registrationModel', './registrationView'],
    function (Controller, RegistrationModel, RegistrationView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name RegistrationController#pageAlias
             * @type {String}
             */
            pageAlias: 'registration',

            /**
             * @field
             * @name RegistrationController#model
             * @type {Backbone.Model}
             */
            model: null,

            /**
             * @field
             * @name RegistrationController#view
             * @type {Backbone.Layout}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new RegistrationModel();
                this.view = new RegistrationView({
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
                var view = this.view,
                    app = Soshace.app;

                app.setView('.js-content', view).afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name RegistrationController#firstLoad
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