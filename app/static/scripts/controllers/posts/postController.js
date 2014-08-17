'use strict';

/**
 * Контроллер страницы просмотра статьи
 *
 * @class PostController
 */
define([
        'underscore',
        'utils/controller',
        'models/postModel',
        'views/posts/postView'
    ],
    function (_, Controller, PostModel, PostView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name PostController#pageAlias
             * @type {String}
             */
            pageAlias: 'postDetail',

            /**
             * @field
             * @name PostController#model
             * @type {PostModel}
             */
            model: null,

            /**
             * @field
             * @name PostController#view
             * @type {PostView}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new PostModel();
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new PostView({
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
             * @name PostController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var params = this.routeParams,
                    postId = params[1],
                    view = new PostView({
                        model: this.model
                    }),
                    app = Soshace.app;

                this.model.getPost(postId).
                    done(function(){
                        app.setView('.js-content', view).render();
                    });
            }
        });
    });