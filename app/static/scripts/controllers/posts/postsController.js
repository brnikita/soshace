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
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostsController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new PostsView({
                    model: this.model,
                    $el: $('.js-content-first-load')
                });

                view.afterRender();
                this.view = view;
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
                    view = new PostsView({
                        collection: this.collection
                    }),
                    app = Soshace.app;

                this.view = view;
                this.collection.on('postsReceived', _.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));
                this.collection.getPosts({locale: locale});
            }
        });
    });