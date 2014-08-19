'use strict';

/**
 * Контроллер страницы регистрации
 *
 * @class RegistrationController
 */
define([
        'utils/controller',
        'models/registrationModel',
        'views/registrationView',
        'config'
    ],
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
             * @type {RegistrationModel}
             */
            model: null,

            /**
             * @field
             * @name RegistrationController#view
             * @type {RegistrationView}
             */
            view: null,

            /**
             * @constructor
             * @name RegistrationController#initialize
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
                var view = this.view,
                    app = Soshace.app;

                this.view = view;
                app.setView('.js-content', view).render();
            }
        });
    });