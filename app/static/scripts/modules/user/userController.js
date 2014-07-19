'use strict';

/**
 * Контроллер страницы пользователя
 *
 * @class UserController
 */
define(['utils/controller', './userModel', './userView'],
    function (Controller, UserModel, UserView) {
        return Controller.extend({

            /**
             * @field
             * @name ГыукController#model
             * @type {Backbone.Model}
             */
            model: null,

            /**
             * @field
             * @name UserController#view
             * @type {Backbone.Layout}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new UserModel();
                this.view = new UserView({
                    model: this.model
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name UserController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                this.view.afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name UserController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var options = this.options,
                    view = this.view,
                    app = Soshace.app;

                this.model.set({
                    locale: options.locale,
                    userName: options.userName
                });
                this.model.getUser().done(view.render);

                app.setView('.js-content', view);
                app.getView('.js-header').changeTab('isUserPage');
                app.$el.attr('class', 'bg-symbols bg-color-blue');
            }
        });
    });