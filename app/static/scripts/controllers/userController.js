//TODO: выводить только опубликованные статьи для незарегистрированного
'use strict';

/**
 * Контроллер страницы пользователя
 *
 * @class UserController
 */
define([
        'underscore',
        'utils/controller',
        'models/userModel',
        'collections/postsCollection',
        'views/userView'
    ],
    function (_, Controller, UserModel, UserView, PostsCollection) {
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
             * @type {UserModel}
             */
            model: null,

            /**
             * @field
             * @name UserController#postsCollection
             * @type {PostsCollection}
             */
            postsCollection: null,

            /**
             * @field
             * @name UserController#view
             * @type {UserView}
             */
            view: null,

            /**
             * @constructor
             * @name UserController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new UserModel();
                this.postsCollection = new PostsCollection();
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name UserController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new UserView({
                    model: this.model,
                    postsCollection: this.postsCollection,
                    $el: $('.js-content-first-load')
                });

                view.afterRender();
                this.view = view;
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
                    view = new UserView({
                        model: this.model
                    }),
                    app = Soshace.app;

                this.model.set({
                    locale: params[0],
                    userName: params[1]
                });

                this.view = view;
                app.setView('.js-content', view);
                this.model.getUser().done(_.bind(view.render, view));
            }
        });
    });