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
        'views/user/userView'
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
                var app = Soshace.app,
                    model,
                    view,
                    postsCollection;

                model = new UserModel();
                postsCollection = new PostsCollection();
                postsCollection.on('postsReceived', _.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));

                view = new UserView({
                    postsCollection: postsCollection,
                    model: model
                });

                this.model = model;
                this.view = view;
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
                    view = this.view;

                app.setView('.js-content', view);
                view.withoutRender($contentFirstLoad);
            },

            /**
             * TODO: добавить обработку ошибок при получении статей
             *
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name UserController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var params = this.routeParams;
                this.model.set({
                    locale: params[0],
                    userName: params[1]
                });

                this.model.getUser().done(_.bind(function (response) {
                    this.postsCollection.getPosts({ownerId: response._id});
                }, this));
            }
        });
    });