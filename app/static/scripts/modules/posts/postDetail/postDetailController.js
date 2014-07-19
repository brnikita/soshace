'use strict';

/**
 * Контроллер страницы деталей статьи
 *
 * @class PostDetailController
 */
define(['underscore', 'utils/controller', './postDetailModel', './postDetailView'],
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
                    params = this.options,
                    app = Soshace.app;

                this.model.on('change', function () {
                    view.render();
                });

                this.model.fetch({data: {
                    locale: params.locale,
                    year: params.year,
                    month: params.month,
                    date: params.date,
                    title: params.title
                }});

                app.setView('.js-content', view);
                app.$el.attr('class', 'bg-symbols bg-color-green');
                app.getView('.js-header').changeTab();
            }
        });
    });