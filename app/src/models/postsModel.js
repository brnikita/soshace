'use strict';

var mongoose = require('mongoose');

/**
 *  Объект для работы с моделью постов
 */
var PostsModel = {
    /**
     * Объект модели постов
     *
     * @private
     * @field
     * @name PostsModel.model
     * @type {mongoose.model}
     */
    _model: null,

    /**
     * Инициализациия модели
     *
     * @private
     * @function
     * @name PostsModel.init
     * @returns {undefined}
     */
    _init: function () {
        if (this._model === null) {
            var PostsSchema = mongoose.Schema({
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

            this._model = mongoose.model('Posts', PostsSchema);
        }
    },

    /**
     * Получаем список постов
     *
     * @public
     * @function
     * @name PostsModel.getPosts
     * @param {Object} params
     * @return {Cursor}
     */
    getPosts: function (params) {
        return this._model.find({public: true}, {
            title: 1,
            description: 1,
            titleUrl: 1,
            date: 1,
            UTCYear: 1,
            UTCMonth: 1,
            UTCDate: 1
        }).sort({date: -1}).
            skip(soshace.POSTS_PER_PAGE * params.page).
            limit(soshace.POSTS_PER_PAGE);
    },

    /**
     * Получаем пост целиком
     *
     * @public
     * @function
     * @name PostsModel.getPost
     * @param {Object} params
     * @return {Cursor}
     */
    getPost: function (params) {
        return this._model.findOne({titleUrl: params.titleUrl}, {
            title: 1,
            body: 1,
            titleUrl: 1,
            date: 1
        });
    },

    /**
     * Получаем пост целиком
     *
     * @public
     * @function
     * @name PostsModel.addPost
     * @param {Object} postData данные поста, для записи в базу
     * @param {Function} callback
     * @return {undefined}
     */
    addPost: function (postData, callback) {
        if (postData && typeof callback === 'function') {
            this._model.create(postData, function (error) {
                callback(error);
            });
        }
    }
};
PostsModel._init();

module.exports = PostsModel;