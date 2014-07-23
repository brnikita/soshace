'use strict';

/**
 * Контроллер страницы добавления статьи
 *
 * @class AddPostController
 */
define(['utils/controller', './addPostModel', './addPostView'],
    function (Controller, AddPostModel, AddPostView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name AddPostController#pageAlias
             * @type {String}
             */
            pageAlias: 'addPost',

            /**
             * @field
             * @name AddPostController#model
             * @type {Backbone.Model}
             */
            model: null,

            /**
             * @field
             * @name AddPostController#view
             * @type {Backbone.Layout}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new AddPostModel();
                this.view = new AddPostView({
                    model: this.model
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name AddPostController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = this.view,
                    app = Soshace.app;

                app.setView('.js-content', view).afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name AddPostController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = this.view,
                    app = Soshace.app;

                app.setView('.js-content', view);
                app.getView('.js-header').changeTab('isAddPostPage');
                app.$el.attr('class', 'bg-symbols bg-color-blue');
                view.render();
            }
        });
    });