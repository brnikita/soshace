//TODO: доделать валидацию, добавить trim
'use strict';

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Класс для работы с моделью постов
 *
 * @class
 * @name PostsShema
 * @type {Schema}
 */
var PostsShema = new Schema({
    //отображать ли пост в общем доступе
    public: {
        type: Boolean,
        default: false,
        //поле не может быть изменено пользователем
        readonly: true
    },
    //id пользователя, к которому относится сообщение
    ownerId: {
        type: ObjectId,
        default: null,
        //поле не может быть изменено пользователем
        readonly: true
    },
    locale: {
        default: 'en',
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
    //Тэги для подбора
    tags: {
        type: Array,
        default: null
    },
    //Опубликовано, отправлено и т.д.
    status: {
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
        description: 1,
        locale: 1
    }).sort({_id: -1}).
        skip(Soshace.POSTS_PER_PAGE * page).
        limit(Soshace.POSTS_PER_PAGE);
};

/**
 * Метод проверяет обновляемые поля модели на соответствие типу
 *
 * @method
 * @name PostsShema.isUpdateFieldsValid
 * @param {Object} update обновляемые данные
 * @returns {Boolean} false - ошибка
 */
PostsShema.statics.isUpdateFieldsValid = function (update) {
    var isValid = true,
        postPaths = PostsShema.paths;

    _.every(update, function (value, field) {
        var fieldSetting = postPaths[field];

        if (fieldSetting.type === String) {
            if (typeof value === 'string') {
                return true;
            }
            isValid = false;
            return false;
        }

        if (fieldSetting.type === Array) {
            if (value instanceof Array) {
                return true;
            }
            isValid = false;
            return false;
        }

        return true;
    });

    return isValid;
};

/**
 * Метод удляет все поля из запроса не соответствующие
 *
 * @method
 * @name PostsShema.clearUpdate
 * @param {Object} update обновляемые данные
 * @returns {Object} очищенный объект обновления
 */
PostsShema.statics.clearUpdate = function (update) {
    return _.pick(update, 'title', 'body', 'category', 'tags');
};

/**
 * Метод обновляет статью
 *
 * @method
 * @name PostsShema.updatePost
 * @param {String} postId id статьи
 * @param {String} profileId id пользователя
 * @param {Object} update обновляемые поля
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.updatePost = function (postId, profileId, update, callback) {
    var updateRequest;

    if (typeof update !== 'object') {
        callback({error: 'Bad Request', code: 400});
        return;
    }

    update = this.clearUpdate(update);

    if (!this.isUpdateFieldsValid(update)) {
        callback({error: 'Bad Request', code: 400});
    }

    updateRequest = {
        _id: postId,
        ownerId: profileId,
        public: false
    };

    this.update(updateRequest, {$set: update}, function (error, post) {
        if (error) {
            callback({error: 'Server is too busy, try later.', code: 503});
            return;
        }

        if (post === null) {
            callback({error: 'Bad request.', code: 400});
            return;
        }

        callback(null);
    });
};

/**
 * Метод получает статью по id,
 * которую может редактировать пользователь
 *
 * @method
 * @name PostsShema.getProfilePost
 * @param {String} postId id статьи
 * @param {String} ownerId id пользователя
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.getProfilePost = function (postId, ownerId, callback) {
    this.findOne({_id: postId, ownerId: ownerId}).exec(function (error, model) {
        if (error) {
            callback({error: 'Server is too busy, try later.', code: 503});
            return;
        }

        callback(null, model);
    });
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