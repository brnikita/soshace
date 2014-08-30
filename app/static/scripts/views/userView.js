'use strict';

/**
 * Вид страницы пользователя
 *
 * @class UserView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    './posts/postPreviewView',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone, PostPreviewView) {
    return Backbone.Layout.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name UserView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Коллекция статей
         *
         * @field
         * @name UserView#postsCollection
         * @type {Backbone.Model | null}
         */
        postsCollection: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UserView#elements
         * @type {Object}
         */
        elements: {
            postsPreviews: null
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UserView#elements
         * @type {string}
         */
        template: Soshace.hbs.user,

        /**
         * @constructor
         * @name UserView#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод заполняет данными коллекцию статей и устанавливает виды preview используя
         * данные из шаблона
         *
         * @method
         * @name UserView#setPreViewsFromTemplate
         * @returns {undefined}
         */
        setPreViewsFromTemplate: function () {
            var _this = this,
                collection = this.postsCollection,
                PostModel = collection.model,
                postsPreviews = this.elements.postsPreviews;

            postsPreviews.each(function () {
                var $this = $(this),
                    model,
                    view,
                    data = $this.data(),
                    $title = $('.js-title', $this),
                    $description = $('.js-description', $this),
                    title = $title.html(),
                    description = $description.html();

                model = new PostModel(_.extend(data, {
                    title: title,
                    description: description
                }));

                view = new PostPreviewView({
                    model: model
                });

                view.$el = $this;
                view.withoutRender();
                _this.insertView('.js-posts-list', view);
                collection.add(model);
            });
        },

        /**
         * Метод добавляет вид превью с списку статей
         *
         * @method
         * @name UserView#addOneView
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
         * @name UserView#fillPostsList
         * @returns {undefined}
         */
        fillPostsList: function () {
            this.postsCollection.each(_.bind(this.addOneView, this));
        },

        /**
         * @method
         * @name UserView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = this.model.toJSON();

            data.isAuthenticated = app.isAuthenticated();
            data.paths = Soshace.urls;
            data.posts = this.postsCollection.toJSON();

            return data;
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UserView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.postsPreviews = this.$('.js-post-preview');
        },

        /**
         * Метод запускается, когда рендеринг шаблона происходит на сервере
         *
         * @method
         * @name UserView#withoutRender
         * @param {jQuery} $el корневой элемент
         * @returns {undefined}
         */
        withoutRender: function($el){
            this.$el = $el;
            this.delegateEvents();
            this.setElements();
            this.setPreViewsFromTemplate();
        },

        /**
         * @method
         * @name UserView#beforeRender
         * @returns {undefined}
         */
        beforeRender: function () {
            this.fillPostsList();
        },

        /**
         * @method
         * @name UserView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});