'use strict';

/**
 * Модель списка статей
 *
 * @module PostsListModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @method
         * @name PostsListModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.posts,

        /**
         * @constructor
         * @name PostsListModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'getPostsSuccess');
        },

        /**
         * @method
         * @name PostsListModel.getPosts
         * @param {string} locale локаль
         * @param {string} page номер страницы
         * @returns {undefined}
         */
        getPosts: function (locale, page) {
            this.fetch({
                data: $.param({
                    locale: locale,
                    page: page
                }),
                silent: true
            }).done(this.getPostsSuccess);
        },

        /**
         * Метод обработчик удачного получения списка постов
         *
         * @method
         * @name PostsListModel.getPostsSuccess
         * @param {Array} postsList список постов
         * @returns {undefined}
         */
        getPostsSuccess: function (postsList) {
            if (postsList instanceof Array && postsList.length === 0) {
                postsList = null;
            }
            this.set({posts: postsList}, {silent: true});
            this.trigger('updatePosts');
        }
    });
});