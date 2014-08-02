'use strict';

/**
 * Контроллер страницы списка статей
 *
 * @class PostsListController
 */
define(['underscore', 'utils/controller', './postsListCollection', './postsListView'],
    function (_, Controller, PostsListCollection, PostsListView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name PostsListController#pageAlias
             * @type {String}
             */
            pageAlias: 'home',

            /**
             * @field
             * @name PostsListController#collection
             * @type {PostsListCollection}
             */
            collection: null,

            /**
             * @field
             * @name PostsListController#view
             * @type {PostsListView}
             */
            view: null,

            /**
             * @constructor
             * @name PostsListController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                this.collection = new PostsListCollection();
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostsListController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new PostsListView({
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
             * @name PostsListController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = new PostsListView({
                        collection: this.collection
                    }),
                    app = Soshace.app;

                this.view = view;
                this.collection.on('postsReceived', _.bind(function () {
                    app.$el.attr('class', 'bg-color-grey');
                    app.setView('.js-content', view).render();
                }, this));
                this.collection.getPosts(this.routeParams);
            }
        });
    });