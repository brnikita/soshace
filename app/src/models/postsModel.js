//TODO: доделать валидацию, добавить trim
'use strict';

var Mongoose = require('mongoose'),
    Validators = srcRequire('common/validators'),
    ObjectId = Mongoose.Types.ObjectId;

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
    //id пользователя, к которому относится сообщение
    ownerId: {
        default: null,
        type: ObjectId
    },
    locale: {
        default: 'en',
        type: String
    },
    //Загловок поста
    title: {
        type: String,
        //Валидация идет с конца!
        validate: [
            {
                validator: Validators.required,
                msg: 'Title can&#39;t be blank.'
            }
        ]
    },
    //Категория, используется в урлах
    category: {
        type: String
    },
    //Тэги для подбора
    tags: {
        type: Array,
        default: null
    },
    //Опубликовано, отправлено и т.д.
    status:{
        type: String
    },
    //Описание для выдачи
    description: {
        type: String
    },
    //Тело поста
    body: {
        type: String,
        //Валидация идет с конца!
        validate: [
            {
                validator: Validators.required,
                msg: 'Post body can&#39;t be blank.'
            }
        ]
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
        description: 1,
        locale: 1
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
        body: 1,
        locale: 1
    });
};

module.exports = Mongoose.model('posts', PostsShema);