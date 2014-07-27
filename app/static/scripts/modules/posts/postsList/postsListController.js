'use strict';

/**
 * Контроллер страницы списка статей
 *
 * @class PostsListController
 */
define(['underscore', 'utils/controller', './postsListModel', './postsListView'],
    function (_, Controller, PostsListModel, PostsListView) {
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
             * @name PostsListController#model
             * @type {PostsListModel}
             */
            model: null,

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
                this.model = new PostsListModel();
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
                        model: this.model
                    }),
                    app = Soshace.app;

                this.view = view;
                this.model.on('postsReceived', _.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));
                this.model.getPosts(this.routeParams);
                app.$el.attr('class', 'bg-symbols bg-color-green');
            }
        });
    });