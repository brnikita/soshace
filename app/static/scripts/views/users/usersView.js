'use strict';

/**
 * Вид страницы пользователя
 *
 * @class UsersEditView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    './../posts/postPreviewView',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone, Handlebars, PostPreviewView) {
    return Backbone.Layout.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name UsersEditView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Коллекция статей
         *
         * @field
         * @name UsersEditView#postsCollection
         * @type {Backbone.Model | null}
         */
        postsCollection: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UsersEditView#elements
         * @type {Object}
         */
        elements: {
            postsPreviews: null
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UsersEditView#elements
         * @type {string}
         */
        template: Soshace.hbs['users/users'],

        /**
         * @constructor
         * @name UsersEditView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Handlebars.registerPartial(
                'usersTabs',
                Soshace.hbs['partials/usersTabs']
            );
        },

        /**
         * Метод заполняет данными коллекцию статей и устанавливает виды preview используя
         * данные из шаблона
         *
         * @method
         * @name UsersEditView#setPreViewsFromTemplate
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
         * @name UsersEditView#addOneView
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
         * @name UsersEditView#fillPostsList
         * @returns {undefined}
         */
        fillPostsList: function () {
            this.postsCollection.each(_.bind(this.addOneView, this));
        },

        /**
         * @method
         * @name UsersEditView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                isAuthenticated = app.isAuthenticated(),
                data = {},
                model = this.model.toJSON(),
                profile = Soshace.profile,
                isOwner = isAuthenticated && model._id === profile._id;

            data.user = model;
            data.isAuthenticated = isAuthenticated;
            data.paths = Soshace.urls;
            data.posts = this.postsCollection.toJSON();
            data.isOwner = isOwner;
            return data;
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UsersEditView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.postsPreviews = this.$('.js-post-preview');
        },

        /**
         * Метод запускается, когда рендеринг шаблона происходит на сервере
         *
         * @method
         * @name UsersEditView#withoutRender
         * @param {jQuery} $el корневой элемент
         * @returns {undefined}
         */
        withoutRender: function ($el) {
            this.$el = $el;
            this.delegateEvents();
            this.setElements();
            this.setPreViewsFromTemplate();
        },

        /**
         * @method
         * @name UsersEditView#beforeRender
         * @returns {undefined}
         */
        beforeRender: function () {
            this.fillPostsList();
        },

        /**
         * @method
         * @name UsersEditView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});