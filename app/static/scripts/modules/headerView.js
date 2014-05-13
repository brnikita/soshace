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
    'backbone.layoutmanager'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

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
        initialize: function () {
        },

        /**
         * @method
         * @name PostsListView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});