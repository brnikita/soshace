'use strict';

/**
 * Вид страницы просмотра статьи
 *
 * @class PostView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

        /**
         * Модель деталей статьи
         *
         * @field
         * @name PostView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name PostView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/post'],

        /**
         * @constructor
         * @name PostView#initialize
         * @params {Object} params
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
         * @name PostView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = {},
                model = this.model.toJSON();

            data.isAuthenticated = app.isAuthenticated();
            data.post = model;
            data.paths = Soshace.urls;

            return data;
        },

        /**
         * @method
         * @name PostView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            var app = Soshace.app;
            app.elements.title.html(this.model.get('title'));
//            Widgets.prettify(this.$el, 'js');
        }
    });
});