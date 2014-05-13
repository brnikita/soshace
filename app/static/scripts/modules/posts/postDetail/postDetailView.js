'use strict';

/**
 * Вид страницы просмотра статьи
 *
 * @module PostDetailView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './postDetailModel',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, PostDetailModel) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name PostDetailView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name PostDetailView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель деталей статьи
         *
         * @field
         * @name PostDetailView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name PostDetailView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostDetailView.elements
         * @type {string}
         */
        template: 'posts/postDetailView',

        /**
         * @constructor
         * @name PostDetailView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            debugger;
            var $body = params.app.elements.body;

            this.app = params.app;

            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                this.afterRender();
                return;
            }

            Widgets.showLoader($body);
            this.model = new PostDetailModel();
            this.model.on('change', _.bind(function(){
                Widgets.hideLoader($body);
                this.render();
            }, this));

            this.model.fetch({data: $.param({
                locale: params.locale,
                year: params.year,
                month: params.month,
                date: params.date,
                title: params.title
            })});
        },

        /**
         * @method
         * @name PostDetailView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
//            Widgets.prettify(this.$el, 'js');
        }
    });
});