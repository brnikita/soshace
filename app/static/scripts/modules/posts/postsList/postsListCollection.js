'use strict';

/**
 * Коллекция списка статей
 *
 * @class PostsListCollection
 */

define([
    'jquery',
    'underscore',
    'backbone',
    './postPreview/postPreviewModel'
], function ($, _, Backbone, PostPreviewModel) {
    return Backbone.Collection.extend({
        /**
         * Модель превью поста
         *
         * @field
         * @name PostsListCollection.model
         * @type {PostPreviewModel}
         */
        model: PostPreviewModel,

        /**
         * @method
         * @name PostsListCollection.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.posts,

        /**
         * @constructor
         * @name PostsListCollection.initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'getPostsSuccess');
        },

        /**
         * Используется такой способ получения постов, чтобы сделать свой триггер
         * Т.к. change не отрабатывает при полуении такой же модели
         *
         * @method
         * @name PostsListCollection.getPosts
         * @param {Array} routeParams параметры запроса
         * @returns {undefined}
         */
        getPosts: function (routeParams) {
            this.fetch({
                data: {
                    locale: routeParams[0],
                    page: routeParams[1]
                },
                silent: true
            }).done(this.getPostsSuccess);
        },

        /**
         * Метод обработчик удачного получения списка постов
         *
         * @method
         * @name PostsListCollection.getPostsSuccess
         * @param {Array} postsList список постов
         * @returns {undefined}
         */
        getPostsSuccess: function (postsList) {
            if (postsList instanceof Array && postsList.length === 0) {
                postsList = null;
            }
            this.set(postsList, {silent: true});
            this.trigger('postsReceived');
        }
    });
});