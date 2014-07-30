'use strict';

/**
 * Вид предпросмотра статьи
 *
 * @class PostPreviewView
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
         * @name PostPreviewView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name PostPreviewView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostPreviewView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/postDetail'],

        /**
         * @constructor
         * @name PostPreviewView#initialize
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
         * @name PostPreviewView#serialize
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
         * @name PostPreviewView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            var app = Soshace.app;
            app.elements.title.html(this.model.get('title'));
//            Widgets.prettify(this.$el, 'js');
        }
    });
});