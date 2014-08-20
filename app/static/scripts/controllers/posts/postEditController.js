'use strict';

/**
 * Контроллер страницы редактирования/добавления статьи
 *
 * @class PostEditController
 */
define([
    'utils/controller',
    'models/postModel',
    'views/posts/postEditView'
],
    function (Controller, PostModel, PostEditView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name PostEditController#pageAlias
             * @type {String}
             */
            pageAlias: 'postEdit',

            /**
             * @field
             * @name PostEditController#model
             * @type {PostModel}
             */
            model: null,

            /**
             * @field
             * @name PostEditController#view
             * @type {PostEditView}
             */
            view: null,

            /**
             * @constructor
             * @name PostEditController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new PostModel();
                this.view = new PostEditView({
                    model: this.model
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostEditController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var app = Soshace.app,
                    view = this.view;

                view.$el = app.elements.contentFirstLoad;
                view.delegateEvents();
                view.afterRender();
                view.setDataToModelFromView(this.routeParams);
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name PostEditController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var params = this.routeParams,
                    postId = params[1],
                    view = this.view,
                    app = Soshace.app;

                this.model.getPost(postId).
                    done(function () {
                        app.setView('.js-content', view).render();
                    });
            }
        });
    });