'use strict';

var Mongoose = require('mongoose');

/**
 * Класс для работы с моделью постов
 *
 * @class
 * @name PostsShema
 * @type {Mongoose.Schema}
 */
var PostsShema = Mongoose.Schema({
    //отображать ли пост в общем доступе
    public: {
        type: Boolean
    },
    locale: {
        type: String
    },
    //Загловок поста
    title: {
        type: String
    },
    //Категория, используется в урлах
    category: {
        type: String
    },
    //Описание для выдачи
    description: {
        type: String
    },
    //Тело поста
    body: {
        type: String
    }
});

/**
 * TODO: проверить необходимость такой сортировки
 *
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
        _id: 1,
        title: 1,
        description: 1
    }).sort({_id: -1}).
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
        _id: 1,
        title: 1,
        body: 1
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
        this.create(postData, callback);
    }
};

module.exports = Mongoose.model('posts', PostsShema);