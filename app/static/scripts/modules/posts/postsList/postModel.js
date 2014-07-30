'use strict';

/**
 * Модель превью статьи
 *
 * @class PostModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @method
         * @name PostModel.initialize
         * @returns {string}
         */
        url: function(){
            var postId = this.get('_id');
            
            return Soshace.urls.api.post.replce('0', postId);
        },

        /**
         * @constructor
         * @name PostModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'getPostsSuccess');
        },

        /**
         * @method
         * @name PostModel.getPosts
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
         * @name PostModel.getPostsSuccess
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