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
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostEditController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new PostEditView({
                        model: this.model,
                        $el: $('.js-content-first-load')
                    });

                view.afterRender();
                view.setDataToModelFromView();
                this.view = view;
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name PostEditController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = new PostEditView({
                        model: this.model
                    }),
                    app = Soshace.app;

                this.view = view;
                app.setView('.js-content', view).render();
            }
        });
    });