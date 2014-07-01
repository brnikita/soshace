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
            Widgets.setBodyClass('bg-color-green bg-symbols');
            this.app = params.app;
            this.model = new PostDetailModel();
            this.model.on('change', _.bind(function () {
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
         * @name PostDetailView.serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = {},
                model = this.model.toJSON();

            data.isAutentificated = this.app.isAuthenticated();
            data.post = model;
            return data;
        },

        /**
         * @method
         * @name PostDetailView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.app.elements.title.html(this.model.get('title'));
//            Widgets.prettify(this.$el, 'js');
        }
    });
});