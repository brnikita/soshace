'use strict';

/**
 * Модель предпросмотра статьи
 *
 * @class PostPreviewModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @field
         * @name PostPreviewModel#defaults
         * @type {Object}
         */
        defaults:{
            _id: null,
            locale: null,
            //Загловок поста
            title: null,
            //Категория, используется в урлах
            category: null,
            //Тело поста
            body: null
        },
        /**
         * @method
         * @name PostPreviewModel#initialize
         * @returns {string}
         */
        url: function(){
            var postId = this.get('_id');
            
            return Soshace.urls.api.post.replce('0', postId);
        },

        /**
         * @constructor
         * @name PostPreviewModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});