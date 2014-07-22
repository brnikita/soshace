'use strict';

/**
 * Контроллер страницы пользователя
 *
 * @class UserController
 */
define([
        'underscore',
        'utils/controller',
        './userModel',
        './userView'
    ],
    function (_, Controller, UserModel, UserView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name UserController#pageAlias
             * @type {String}
             */
            pageAlias: 'user',

            /**
             * @field
             * @name UserController#model
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
                this.view.$el = $('.js-content-el');
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
                var params = this.routeParams,
                    view = this.view,
                    app = Soshace.app;

                this.model.set({
                    locale: params[0],
                    userName: params[1]
                });

                app.setView('.js-content', view);
                this.model.getUser().done(_.bind(view.render, view));
                app.getView('.js-header').changeTab('isUserPage');
                app.$el.attr('class', 'bg-symbols bg-color-blue');
            }
        });
    });