'use strict';

/**
 * Контроллер страницы списка статей
 *
 * @class PostsController
 */
define([
        'underscore',
        'utils/controller',
        'collections/postsCollection',
        'views/posts/postsView'
    ],
    function (_, Controller, PostsCollection, PostsView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name PostsController#pageAlias
             * @type {String}
             */
            pageAlias: 'home',

            /**
             * @field
             * @name PostsController#collection
             * @type {PostsCollection}
             */
            collection: null,

            /**
             * @field
             * @name PostsController#view
             * @type {PostsView}
             */
            view: null,

            /**
             * @constructor
             * @name PostsController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                this.collection = new PostsCollection();
                this.view  = new PostsView({
                    collection: this.collection
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostsController#firstLoad
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
             * @name PostsController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var params = this.routeParams,
                    locale = params[0],
                    view = this.view,
                    app = Soshace.app;

                this.view = view;
                this.collection.on('postsReceived', _.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));
                this.collection.getPosts({locale: locale});
            }
        });
    });