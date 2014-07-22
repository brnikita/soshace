'use strict';

/**
 * Вид страницы просмотра статьи
 *
 * @class PostDetailView
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

        /**
         * Модель деталей статьи
         *
         * @field
         * @name PostDetailView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name PostDetailView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostDetailView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/postDetailView'],

        /**
         * @constructor
         * @name PostDetailView#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * @method
         * @name PostDetailView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = {},
                model = this.model.toJSON();

            data.isAuthenticated = app.isAuthenticated();
            data.post = model;
            return data;
        },

        /**
         * @method
         * @name PostDetailView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            var app = Soshace.app;
            app.elements.title.html(this.model.get('title'));
//            Widgets.prettify(this.$el, 'js');
        }
    });
});