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
    'utils/helpers',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, Helpers) {
    return Backbone.Layout.extend({
        /**
         * Модель списка статей
         *
         * @field
         * @name PostsListView#model
         * @type {Backbone.Model | null}
         */
        model: null,

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
        template: 'posts/postsListView',

        /**
         * @constructor
         * @name PostsListView#initialize
         * @returns {undefined}
         */
        initialize: function () {

        },

        /**
         * @method
         * @name PostsListView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = {},
                posts = this.model.get('posts');

            data.locale = Helpers.getLocale();
            data.posts = posts;
            data.isAutentificated = Soshace.app.isAuthenticated();
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