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
    function (_, Controller, UserModel, PostsCollection, UserView) {
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
                    $el: $('.js-content-first-load')
                });

                view.afterRender();
                this.view = view;
            },

            /**
             * TODO: добавить обработку ошибок
             *
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name UserController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var params = this.routeParams,
                    view = new UserView({
                        model: this.model,
                        postsCollection: this.postsCollection
                    }),
                    app = Soshace.app;

                this.model.set({
                    locale: params[0],
                    userName: params[1]
                });

                this.view = view;
                this.postsCollection.on('postsReceived', _.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));

                this.model.getUser().done(_.bind(function(response){
                    this.postsCollection.getPosts({ownerId: response._id});
                }, this));
            }
        });
    });