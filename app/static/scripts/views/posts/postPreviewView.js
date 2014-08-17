'use strict';

/**
 * Вид предпросмотра статьи
 *
 * @class PostPreviewView
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
        template: Soshace.hbs['partials/postPreview'],

        /**
         * @constructor
         * @name PostPreviewView#initialize
         * @params {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            var model = params && params.model;

            if (model) {
                this.model = model;
            }
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