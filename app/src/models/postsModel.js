'use strict';

var Mongoose = require('mongoose');

/**
 * Класс для работы с моделью постов
 *
 * @class
 * @name PostsShema
 * @type {Schema}
 */
var PostsShema = Mongoose.Schema({
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

/**
 * Получаем список постов
 *
 * @method
 * @name PostsShema.getPosts
 * @param {Object} params
 * @return {Cursor}
 */
PostsShema.statics.getPosts = function (params) {
    var page = params.page || 0;

    return this.find({
        'locale': params.locale,
        'public': params.public
    }, {
        title: 1,
        description: 1,
        titleUrl: 1,
        date: 1,
        UTCYear: 1,
        UTCMonth: 1,
        UTCDate: 1
    }).sort({date: -1}).
        skip(Soshace.POSTS_PER_PAGE * page).
        limit(Soshace.POSTS_PER_PAGE);
};

/**
 * Получаем пост целиком
 *
 * @method
 * @name PostsShema.getPost
 * @param {Object} params
 * @return {Cursor}
 */
PostsShema.statics.getPost = function (params) {
    return this.findOne(params, {
        title: 1,
        body: 1,
        date: 1
    });
};

/**
 * Получаем пост целиком
 *
 * @method
 * @name PostsShema.addPost
 * @param {Object} postData данные поста, для записи в базу
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.addPost = function (postData, callback) {
    if (postData && typeof callback === 'function') {
        this.model.create(postData, function (error) {
            callback(error);
        });
    }
};

module.exports = Mongoose.model('Posts', PostsShema);