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
             * @type {AddPostModel}
             */
            model: null,

            /**
             * @field
             * @name AddPostController#view
             * @type {AddPostView}
             */
            view: null,

            /**
             * @constructor
             * @name AddPostController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new AddPostModel();
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name AddPostController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new AddPostView({
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
             * @name AddPostController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = new AddPostView({
                        model: this.model
                    }),
                    app = Soshace.app;

                this.view = view;
                app.setView('.js-content', view).render();
            }
        });
    });