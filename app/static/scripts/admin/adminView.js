'use strict';

/**
 * Вид страницы адмистрирования статьи
 *
 * У страниц адмистрирования нет клиентского роутинга
 * и шаблонизации, т.к. на клиенте не должно быть никаких упоминаний
 * о наличии страницы адмистрирования и API для адмистрования
 *
 * Так же скрипты админки не участвуют в общей сборке
 *
 * @module AdminView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/postModel',
    'models/reviewCommentsCollection'
], function ($, _, Backbone, PostModel, ReviewCommentsCollection) {
    return Backbone.View.extend({

        /**
         * Модель статьи
         *
         * @field
         * @name AdminView#postModel
         * @type {Backbone.Model | null}
         */
        postModel: null,

        /**
         * Коллекция комментариев ревью статьи
         *
         * @field
         * @name AdminView#reviewCommentsCollection
         * @type {ReviewCommentsCollection}
         */
        reviewCommentsCollection: null,

        /**
         * @field
         * @name AdminView#el
         * @type {String}
         */
        el: '.js-admin-post',

        /**
         * @field
         * @name AdminView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * @field
         * @name AdminView#events
         * @type {Object}
         */
        events: {
        },

        /**
         * @constructor
         * @name AdminView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.setElements();
            this.setDataToModelFromView();
        },

        /**
         * Метод берет данные из шаблона и сетит модель статьи
         *
         * @method
         * @name AdminView#setDataToModelFromView
         * @returns {undefined}
         */
        setDataToModelFromView: function(){

        },

        /**
         * Метод сохраняет ссылки на элементы DOM
         *
         * @method
         * @name AdminView#setElements
         * @returns {undefined}
         */
        setElements: function(){
        }
    });
});