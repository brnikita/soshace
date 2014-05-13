'use strict';

var Mongoose = require('mongoose');

/**
 *  Объект для работы с моделью постов
 */
var PostsModel = {
    /**
     * Объект модели постов
     *
     * @field
     * @name PostsModel.model
     * @type {Mongoose.model}
     */
    model: null,

    /**
     * Инициализациия модели
     *
     * @method
     * @name PostsModel.initialize
     * @returns {undefined}
     */
    initialize: function () {
        if (this.model === null) {
            var PostsSchema = Mongoose.Schema({
                titleUrl: String, //путь в урле после даты
                public: Boolean, //отображать ли пост в общем доступе
                date: Date, //для сортировки
                UTCYear: String, //для улобной выборки по году YYYY (по гринвичу UTC)
                UTCMonth: String, //для удобной выборки помесяцу MM (по гринвичу UTC)
                UTCDate: String, //для удобной выборки по дню DD (по гринвичу UTC)
                locale: String,
                title: String, //Загловок поста
                category: String, //Категория, используется в урлах
                description: String, //Описание для выдачи
                body: String //Тело поста
            });

            this.model = Mongoose.model('Posts', PostsSchema);
        }
    },

    /**
     * Получаем список постов
     *
     * @method
     * @name PostsModel.getPosts
     * @param {Object} params
     * @return {Cursor}
     */
    getPosts: function (params) {
        var page = params.page || 0;

        return this.model.find({
            locale: params.locale,
            public: params.public
        }, {
            title: 1,
            description: 1,
            titleUrl: 1,
            date: 1,
            UTCYear: 1,
            UTCMonth: 1,
            UTCDate: 1
        }).sort({date: -1});
    },

    /**
     * Получаем пост целиком
     *
     * @method
     * @name PostsModel.getPost
     * @param {Object} params
     * @return {Cursor}
     */
    getPost: function (params) {
        return this.model.findOne(params, {
            title: 1,
            body: 1,
            titleUrl: 1,
            date: 1
        });
    },

    /**
     * Получаем пост целиком
     *
     * @method
     * @name PostsModel.addPost
     * @param {Object} postData данные поста, для записи в базу
     * @param {Function} callback
     * @return {undefined}
     */
    addPost: function (postData, callback) {
        if (postData && typeof callback === 'function') {
            this.model.create(postData, function (error) {
                callback(error);
            });
        }
    }
};
PostsModel.initialize();

module.exports = PostsModel;