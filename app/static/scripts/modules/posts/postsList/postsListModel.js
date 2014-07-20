'use strict';

/**
 * Модель списка статей
 *
 * @class PostsListModel
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
         * @name PostsListModel.getPostsSuccess
         * @param {Array} postsList список постов
         * @returns {undefined}
         */
        getPostsSuccess: function (postsList) {
            if (postsList instanceof Array && postsList.length === 0) {
                postsList = null;
            }
            this.set({posts: postsList}, {silent: true});
            this.trigger('postsReceived');
        }
    });
});