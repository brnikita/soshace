'use strict';

/**
 * Модель статьи
 *
 * @class PostModel
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/helpers',
    'config'
], function ($, _, Backbone, Helpers) {
    return Backbone.Model.extend({
        /**
         * @field
         * @name PostModel#idAttribute
         * @type {String}
         */
        idAttribute: '_id',

        /**
         * @field
         * @name PostModel#default
         * @type {String | null}
         */
        default: {
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
         * @name PostModel#url
         * @returns {string}
         */
        url: function () {
            var url = Soshace.urls.api.post,
                _id = this.get('_id');

            if(_id){
                return url.replace('0', _id);
            }

            return url.replace('0', '');
        },

        /**
         * @constructor
         * @name PostModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.set('locale', Helpers.getLocale(), {silent: true});
        },

        /**
         * TODO: доделать patch, т.к. сейчас метод фигачит всю модель целиком
         * TODO: или переделать на  put
         *
         * Метод патчит модель, если модель уже создана.
         * Содает новую, если модели нет.
         * Удаляет модель, если приходят пустые значения на запись
         *
         * @method
         * @name PostModel#patchModel
         * @returns {undefined}
         */
        patchModel: function(){
            var _this = this,
                options = {
                    silent: true,
                    success: _.bind(_this.modelSaveSuccess, _this),
                    error: _.bind(_this.modelSaveFail, _this)
                },
                postId = this.get('_id');

            if(postId){
                options.patch = true;
            }

            this.save(null, options);
        },

        /**
         * Метод обработчик успешного сохранения модели в базе
         *
         * @method
         * @name PostModel#modelSaveSuccess
         * @param {Backbone.Model} model текущая модель
         * @param {Object} response ответ сервера
         * @returns {undefined}
         */
        modelSaveSuccess: function(model, response){
            var postId = response._id,
                locale = this.get('locale'),
                postUrl;

            if(postId){
                this.set('_id', postId, {silent: true});
                postUrl = '/' + locale + '/posts/' + postId + '/edit';
                Backbone.history.navigate(postUrl);
                this.trigger('postCreated');
            }
        },

        /**
         * Метод неудачного сохранения модели в базе
         *
         * @method
         * @name PostModel#modelSaveFail
         * @returns {undefined}
         */
        modelSaveFail: function(){

        },

        /**
         * Метод получает статью
         *
         * @method
         * @name PostModel#initialize
         * @param {String} postId id поста
         * @returns {jQuery.Deferred}
         */
        getPost: function (postId) {
            this.set('_id', postId, {silent: true});
            return this.fetch();
        }
    });
});