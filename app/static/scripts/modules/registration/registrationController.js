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
                this.view.afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name RegistrationController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var options = this.options,
                    view = this.view,
                    app = Soshace.app;

                this.model.set({locale: options.locale}, {silent: true});
                app.setView('.js-content', view);
                view.fetchPartial('registrationView').done(view.render);
                app.getView('.js-header').changeTab('isAuthPage');
                app.$el.attr('class', 'bg-symbols bg-color-yellow');
            }
        });
    });