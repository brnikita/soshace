//TODO: доделать валидацию, добавить trim
'use strict';

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    ObjectId = Schema.ObjectId,
//Поля, которые можно обновлять
    fieldsCanBeUpdated = [
        'title',
        'body',
        'category',
        'tags'
    ],

    /**
     * Класс для работы с моделью постов
     *
     * @class
     * @name PostsShema
     * @type {Schema}
     */
        PostsShema = new Schema({
        //Время последнего изменения
        //timestamp
        updated: {
            type: Date
        },
        //Время публикации
        //timestamp
        published: {
            type: Boolean
        },
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
 * Формируем описание поста из тела поста
 *
 * @method
 * @name getPostDescription
 * @param {String} postBody тело поста
 * @returns {*}
 */
function getPostDescription(postBody) {
    return postBody.substr(0, 1400);
}

/**
 * Метод проверяет сооветствие пришедшего типа
 * значения поля типу установленому в модели
 *
 * @method
 * @name checkFieldType
 * @param {String} field
 * @param {*} value
 * @returns {boolean} вовращает true, если поле соответствует типу в модели
 */
function checkFieldType(field, value) {
    var postPaths = PostsShema.paths,
        fieldSetting = postPaths[field];

    if (fieldSetting.type === String) {
        return typeof value === 'string';
    }

    if (fieldSetting.type === Array) {
        return value instanceof Array;
    }

    return true;
}

/**
 * Оставляем в модели только необходимые данные
 */
PostsShema.pre('save', function (next) {
    var postPaths = PostsShema.paths;

    _.each(this, _.bind(function (value, field) {
        if (typeof postPaths[field] === 'undefined') {
            return;
        }

        if (!checkFieldType(field, value)) {
            this[field] = undefined;
        }
    }, this));
    next();
});

/**
 * Добавляем описание и время обновления
 */
PostsShema.pre('save', function (next) {
    var postBody = this.body;

    if (postBody) {
        this.description = getPostDescription(postBody);
    }

    this.updated = new Date();
    next();
});

/**
 * Получаем список постов
 *
 * @method
 * @name PostsShema.getPosts
 * @param {String} locale
 * @param {Function} callback
 * @return {Cursor}
 */
PostsShema.statics.getPosts = function (locale, callback) {
    return this.find({
        'locale': locale,
        'public': true
    }, {
        _id: 1,
        title: 1,
        description: 1,
        locale: 1
    }).exec(function (error, posts) {
            if (error) {
                callback({error: 'Server is too busy, try later.', code: 503});
                return;
            }

            callback(null, posts);
        });
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
    var isValid = true;

    _.every(update, function (value, field) {
        isValid = checkFieldType(field, value);
        return isValid;
    });

    return isValid;
};

/**
 * Метод удляет все поля из запроса не соответствующие
 * полям модели
 *
 * @method
 * @name PostsShema.clearUpdate
 * @param {Object} update обновляемые данные
 * @returns {Object} очищенный объект обновления
 */
PostsShema.statics.clearUpdate = function (update) {
    var pickArguments = [update].concat(fieldsCanBeUpdated);
    return _.pick.apply(_, pickArguments);
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

    if (update.body) {
        update.description = getPostDescription(update.body);
    }
    update.updated = new Date();
    updateRequest = {
        _id: postId,
        ownerId: profileId,
        public: false
    };

    this.update(updateRequest, {$set: update}, _.bind(function (error, post) {
        this.updatePostHandler(error, post, callback);
    }, this));
};

/**
 * Метод обработчик обновления статьи в базе
 *
 * @method
 * @name PostsShema.updatePostHandler
 * @param {Object} error ошибка
 * @param {Mongoose.model} post модель статьи
 * @param {Function} callback
 * @returns {undefined}
 */
PostsShema.statics.updatePostHandler = function (error, post, callback) {
    if (error) {
        callback({error: 'Server is too busy, try later.', code: 503});
        return;
    }

    if (post === null) {
        callback({error: 'Bad request.', code: 400});
        return;
    }

    callback(null);
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
    this.findOne({_id: postId, ownerId: ownerId}).exec(function (error, post) {
        if (error) {
            callback({error: 'Server is too busy, try later.', code: 503});
            return;
        }

        callback(null, post);
    });
};

/**
 * Метод получает список статей для конретного пользователя
 * Получает все статьи для зарегистрированного пользователя
 *
 * @method
 * @name PostsShema.getProfilePosts
 * @param {String} ownerId id пользователя
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.getProfilePosts = function (ownerId, callback) {
    this.find({ownerId: ownerId}).
        sort({updated: -1}).
        exec(function (error, posts) {
            if (error) {
                callback({error: 'Server is too busy, try later.', code: 503});
                return;
            }

            callback(null, posts);
        });
};

/**
 * Метод получает список статей для конретного пользователя,
 * доступные для всех (public: true)
 *
 * @method
 * @name PostsShema.getUserPosts
 * @param {String} ownerId id пользователя
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.getUserPosts = function (ownerId, callback) {
    this.find({
        ownerId: ownerId,
        public: true
    }).exec(function (error, posts) {
            if (error) {
                callback({error: 'Server is too busy, try later.', code: 503});
                return;
            }

            callback(null, posts);
        });
};

/**
 * Метод получает статью целиком
 *
 * @method
 * @name PostsShema.getPost
 * @param {String} postId id статьи
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.getPost = function (postId, callback) {
    this.findOne({_id: postId}, {
        _id: 1,
        title: 1,
        body: 1,
        locale: 1
    }).exec(function (error, post) {
            if (error) {
                callback({error: 'Server is too busy, try later.', code: 503});
                return;
            }

            callback(null, post);
        });
};

/**
 * Метод удаляет статью по id
 *
 * @method
 * @name PostsShema.removePost
 * @param {Object} postId id удаляемой статьи
 * @param {Function} callback
 * @return {undefined}
 */
PostsShema.statics.removePost = function (postId, callback) {
    this.findOneAndRemove({_id: postId}, null, function (error) {
        if (error) {
            callback({error: 'Server is too busy, try later.', code: 503});
            return;
        }

        callback(null);
    });
};

module.exports = Mongoose.model('posts', PostsShema);