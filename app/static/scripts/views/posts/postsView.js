'use strict';

/**
 * Вид страницы списка статей
 *
 * @class PostsView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'utils/helpers',
    './postPreviewView',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone, Handlebars, Helpers, PostPreviewView) {
    return Backbone.Layout.extend({
        /**
         * Список статей
         *
         * @field
         * @name PostsView#collection
         * @type {Backbone.Model | null}
         */
        collection: null,

        /**
         * @field
         * @name PostsView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostsView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/posts'],

        /**
         * @constructor
         * @name PostsView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            var $el = params && params.$el;

            if ($el) {
                this.$el = $el;
            }

            Handlebars.registerPartial(
                'intro',
                Soshace.hbs['partials/intro']
            );
        },


        /**
         * Метод добавляет вид превью с списку статей
         *
         * @method
         * @name PostsView#addOneView
         * @param {Backbone.Model} postModel модель статьи
         * @returns {undefined}
         */
        addOneView: function (postModel) {
            var view = new PostPreviewView({
                model: postModel
            });

            this.insertView('.js-posts-list', view);
        },

        /**
         * Метод заполняет список статей
         *
         * @method
         * @name PostsView#fillPostsList
         * @returns {undefined}
         */
        fillPostsList: function () {
            this.collection.each(_.bind(this.addOneView, this));
        },

        /**
         * @method
         * @name PostsView#serialize
         * @returns {Object}
         */
        serialize: function(){
            var data = {};

            data.posts = this.collection.toJSON();
            data.paths = Soshace.urls;
            data.locale = Helpers.getLocale();

            return data;
        },

        /**
         * @method
         * @name PostsView#beforeRender
         * @returns {undefined}
         */
        beforeRender: function () {
            this.fillPostsList();
        },

        /**
         * @method
         * @name PostsView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});