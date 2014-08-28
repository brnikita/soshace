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
    'views/userView',
    'views/posts/postsView'
],
    function (_, Controller, UserModel, PostsCollection, UserView, PostsView) {
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
             * @type {UserModel | null}
             */
            model: null,

            /**
             * @field
             * @name UserController#postsCollection
             * @type {PostsCollection | null}
             */
            postsCollection: null,

            /**
             * @field
             * @name UserController#postsView
             * @type {PostsView | null}
             */
            postsView: null,

            /**
             * @field
             * @name UserController#view
             * @type {UserView | null}
             */
            view: null,

            /**
             * @constructor
             * @name UserController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                var model,
                    view,
                    postsView,
                    postsCollection;

                model = new UserModel();
                postsCollection = new PostsCollection();
                postsView = new PostsView({
                    collection: postsCollection
                });
                postsCollection.on('postsReceived', _.bind(function () {
                    postsView.render();
                }, this));

                view = new UserView({
                    model: model
                });

                this.model = model;
                this.view = view;
                this.postsView = postsView;
                this.postsCollection = postsCollection;
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name UserController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var app = Soshace.app,
                    $contentFirstLoad = app.elements.contentFirstLoad,
                    $posts,
                    postsView = this.postsView,
                    view = this.view;

                app.setView('.js-content', view);
                view.withoutRender($contentFirstLoad);
                view.setView('.js-posts', postsView);
                $posts = view.$('.js-posts');
                postsView.withoutRender($posts);
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
                    view = this.view,
                    app = Soshace.app;

                this.model.set({
                    locale: params[0],
                    userName: params[1]
                });

                this.view = view;
                this.postsCollection.on('postsReceived', _.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));

                this.model.getUser().done(_.bind(function (response) {
                    this.postsCollection.getPosts({ownerId: response._id});
                }, this));
            }
        });
    });