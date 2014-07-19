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
             * @field
             * @name PostsListController#model
             * @type {Backbone.Model}
             */
            model: null,

            /**
             * @field
             * @name PostsListController#view
             * @type {Backbone.Layout}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new PostsListModel();
                this.view = new PostsListView({
                    model: this.model
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostsListController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                this.view.afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name PostsListController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = this.view,
                    options = this.options,
                    app = Soshace.app;

                this.model.on('updatePosts', _.bind(function () {
                    view.render();
                }, this));

                this.model.getPosts(options.locale, options.page);
                app.setView('.js-content', view);
                app.$el.attr('class', 'bg-symbols bg-color-green');
                app.getView('.js-header').changeTab();
            }
        });
    });