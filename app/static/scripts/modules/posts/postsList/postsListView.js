'use strict';

/**
 * Вид страницы списка постов
 *
 * @module PostsListView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './postsListModel',
    'utils/helpers',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, PostsListModel, Helpers) {
    return Backbone.Layout.extend({
        /**
         * Ссылка на объект App
         *
         * @field
         * @name PostsListView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name PostsListView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель списка статей
         *
         * @field
         * @name PostsListView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name PostsListView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostsListView.elements
         * @type {string}
         */
        template: 'posts/postsListView',

        /**
         * @constructor
         * @name PostsListView.initialize
         * @returns {undefined}
         */
        initialize: function (params) {
            var $body = params.app.elements.body;

            this.app = params.app;

            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                return;
            }

            Widgets.showLoader($body);
            this.model = new PostsListModel();
            this.model.on('change', _.bind(function () {
                Widgets.hideLoader($body);
                this.render();
            }, this));
            this.model.fetch({data: $.param({
                locale: params.locale,
                page: params.page
            })});
        },

        /**
         * @method
         * @name PostsListView.serialize
         * @returns {Object}
         */
        serialize: function () {
            var locale = Helpers.getLocale(),
                model = this.model.toJSON();
            return {
                locale: locale,
                posts: model
            };
        },

        /**
         * @method
         * @name PostsListView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
//            Widgets.prettify(this.$el, 'js');
        }
    });
});