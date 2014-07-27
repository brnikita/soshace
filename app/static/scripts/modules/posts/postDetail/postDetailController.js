'use strict';

/**
 * Контроллер страницы деталей статьи
 *
 * @class PostDetailController
 */
define([
        'underscore',
        'utils/controller',
        './postDetailModel',
        './postDetailView'
    ],
    function (_, Controller, PostDetailModel, PostDetailView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name PostDetailController#pageAlias
             * @type {String}
             */
            pageAlias: 'postDetail',

            /**
             * @field
             * @name PostDetailController#model
             * @type {PostDetailModel}
             */
            model: null,

            /**
             * @field
             * @name PostDetailController#view
             * @type {PostDetailView}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new PostDetailModel();
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostDetailController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var view = new PostDetailView({
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
             * @name PostDetailController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = new PostDetailView({
                        model: this.model
                    }),
                    app = Soshace.app;

                this.model.getPost(this.routeParams).
                    done(function(){
                        app.setView('.js-content', view).render();
                    });
                app.$el.attr('class', 'bg-symbols bg-color-green');
            }
        });
    });