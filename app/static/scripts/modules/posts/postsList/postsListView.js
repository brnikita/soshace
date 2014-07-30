'use strict';

/**
 * Вид страницы списка постов
 *
 * @class PostsListView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    'utils/helpers'
], function ($, _, Backbone, Widgets, Helpers) {
    return Backbone.Layout.extend({
        /**
         * Список статей
         *
         * @field
         * @name PostsListView#collection
         * @type {Backbone.Model | null}
         */
        collection: null,

        /**
         * @field
         * @name PostsListView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostsListView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/postsListView'],

        /**
         * @constructor
         * @name PostsListView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            var $el = params && params.$el;

            if ($el) {
                this.$el = $el;
            }
        },

        /**
         * @method
         * @name PostsListView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = {},
                posts = this.collection.get('posts');

            data.locale = Helpers.getLocale();
            data.posts = posts;
            data.isAuthenticated = Soshace.app.isAuthenticated();
            return data;
        },

        /**
         * @method
         * @name PostsListView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
//            Widgets.prettify(this.$el, 'js');
        }
    });
});