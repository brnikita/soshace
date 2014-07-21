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
             * @field
             * @name PostDetailController#model
             * @type {Backbone.Model}
             */
            model: null,

            /**
             * @field
             * @name PostDetailController#view
             * @type {Backbone.Layout}
             */
            view: null,

            /**
             * @constructor
             * @name
             * @returns {undefined}
             */
            initialize: function () {
                this.model = new PostDetailModel();
                this.view = new PostDetailView({
                    model: this.model
                });
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name PostDetailController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                this.view.$el = $('.js-content-el');
                this.view.afterRender();
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name PostDetailController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = this.view,
                    app = Soshace.app;

                app.setView('.js-content', view);
                this.model.on('postReceived', function () {
                    view.render();
                });
                this.model.getPost(this.routeParams);
                app.$el.attr('class', 'bg-symbols bg-color-green');
                app.getView('.js-header').changeTab();
            }
        });
    });