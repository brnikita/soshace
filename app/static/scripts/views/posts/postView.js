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
            toolbar: null,
            post: null,
            title: null,
            body: null
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
         * Метод заполняет данными модель из шаблона
         *
         * @method
         * @name PostsView#setModelFromTemplate
         * @returns {undefined}
         */
        setModelFromTemplate: function () {
            var model = this.model,
                $post = this.elements.post,
                data = $post.data(),
                $title = this.elements.title,
                $body = this.elements.body,
                title = $title.html(),
                body = $body.html();

            model.set(_.extend(data, {
                title: title,
                body: body
            }), {silent: true});
        },

        /**
         * Метод добавляет тулбар к превью статьи,
         * если статья принадлежит пользователю
         *
         * @method
         * @name PostPreviewView#addPostToolBar
         * @returns {undefined}
         */
        addPostToolBar: function () {
            var ownerId = this.model.get('ownerId'),
                app = Soshace.app,
                profile,
                profileId,
                toolbar;

            if (!app.isAuthenticated()) {
                return;
            }

            profile = Soshace.profile;
            profileId = profile._id;

            if (profileId !== ownerId) {
                return;
            }

            toolbar = this.getToolBar();
            this.elements.toolbar.html(toolbar);
        },

        /**
         * Метод возвращает отрендеренный тулбар для превью статьи
         *
         * @method
         * @name PostPreviewView#getToolBar
         * @returns {undefined}
         */
        getToolBar: function () {
            var model = this.model.toJSON(),
                status = this.model.get('status'),
                statusClass = this.model.statuses[status].class,
                cantEdit = status === 'sent' || status === 'published';

            return Soshace.hbs['posts/edit/postPreviewToolbar'](_.extend(model, {
                canEdit: !cantEdit,
                statusClass: statusClass
            }));
        },

        /**
         * Метод сохраняет ссылки на DOM элементы
         *
         * @method
         * @name PostView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.toolbar = this.$('.js-post-toolbar');
            this.elements.post = this.$('.js-post');
            this.elements.title = this.$('.js-title');
            this.elements.body = this.$('.js-body');
        },

        /**
         * Метод вызывается, когда шаблон рендерится на сервере
         *
         * @method
         * @name PostView#withoutRender
         * @returns {undefined}
         */
        withoutRender: function(){
            var app = Soshace.app;

            this.$el = app.elements.contentFirstLoad;
            this.setElements();
            this.delegateEvents();
            this.setModelFromTemplate();
            this.addPostToolBar();
            app.elements.title.html(this.model.get('title'));
        },

        /**
         * @method
         * @name PostView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            var app = Soshace.app;

            this.setElements();
            this.addPostToolBar();
            app.elements.title.html(this.model.get('title'));
        }
    });
});