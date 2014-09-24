'use strict';

/**
 * Коллекция списка статей
 *
 * @class PostsCollection
 */

define([
    'underscore',
    'core',
    'models/postModel',
    'global'
], function (_, Core, PostModel, Soshace) {
    return Core.Collection.extend({
        /**
         * Модель превью поста
         *
         * @field
         * @name PostsCollection#model
         * @type {PostModel}
         */
        model: PostModel,

        /**
         * @method
         * @name PostsCollection#initialize
         * @returns {string}
         */
        url: Soshace.urls.api.posts,

        /**
         * @constructor
         * @name PostsCollection#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * TODO: добавить обработку ошибок
         *
         * Используется такой способ получения постов, чтобы сделать свой триггер
         * Т.к. change не отрабатывает при полуении такой же модели
         *
         * @method
         * @name PostsCollection#getPosts
         * @param {Object} params параметры запроса
         * @returns {undefined}
         */
        getPosts: function (params) {
            this.fetch({
                data: params,
                silent: true
            }).done(_.bind(this.getPostsSuccess, this));
        },

        /**
         * Метод обработчик удачного получения списка постов
         *
         * @method
         * @name PostsCollection#getPostsSuccess
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