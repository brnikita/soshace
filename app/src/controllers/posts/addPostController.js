'use strict';
var PostsModel = require('../../models/postsModel'),
    Unidecode = require('unidecode'),
    Helper = require('../../common/helpers'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    RenderParams = require('../../common/renderParams');

/**
 * Контроллер, отвечающий за добавление статьи
 *
 * @module AddPostController
 *
 */
var AddPostController = {

    /**
     * TODO: написать тест
     *
     * Формирует последнюю часть урла
     * из заголовка поста
     *
     * @private
     * @method
     * @name AddPostController._formatPostUrl
     * @param {string} title заголовок поста
     * @returns {string}
     */
    _formatPostUrl: function (title) {
        var url;

        //переводим в латиницу
        url = Unidecode(title.toLowerCase());

        //заменяем все нелатинские символы на "-"
        return url.replace(/\W+/g, '-');
    },

    /**
     * TODO: написать тест
     *
     * Формируем описание поста из тела поста
     *
     * @private
     * @method
     * @name AddPostController._getPostDescription
     * @param {string} postBody тело поста
     * @returns {*}
     */
    _getPostDescription: function (postBody) {
        var ReadMoreIndex = postBody.indexOf('<readmore/>');

        if (ReadMoreIndex === -1) {
            return postBody;
        }

        return postBody.substr(0, ReadMoreIndex);
    },

    /**
     * TODO: написать тест
     *
     * Формирует список необходимых переменных, связанных с датой
     * Время берется по гринвичу
     * Переменные нужны для формирования адреса поста
     * Так же дата нужна для сортировки в базе
     *
     * @private
     * @method
     * @name AddPostController._getDate
     * @returns {Object}
     */
    _getDate: function () {
        var date = new Date(),
            dateObject = {};

        dateObject.date = date;
        dateObject.UTCYear = date.getUTCFullYear();
        dateObject.UTCMonth = Helper.zeroLeading(date.getUTCMonth() + 1);
        dateObject.UTCDate = Helper.zeroLeading(date.getUTCDate());

        return dateObject;
    },

    /**
     * TODO: написать тест
     *
     * Проверяем загловок поста на наличие косяков
     * В случае, если заголовок корректен возвращает false
     * В противном случае текст ошибки
     *
     * @private
     * @method
     * @name AddPostController._checkPostTitle
     * @param {string} title загловок поста
     * @returns {string|boolean}
     */
    _checkPostTitle: function (title) {
        if (typeof title !== 'string') {
            return 'Title is not a string';
        }

        if (title.length === 0) {
            return 'Title is empty';
        }

        return false;
    },

    /**
     * TODO: написать тест
     *
     * Проверяем тело поста на наличие косяков
     * В случае, если тело корректно возвращает false
     * В противном случае текст ошибки
     *
     * @private
     * @method
     * @name AddPostController._checkPostBody
     * @param {string} body загловок поста
     * @returns {string|boolean}
     */
    _checkPostBody: function (body) {
        if (typeof body !== 'string') {
            return 'Body is not a string';
        }

        if (body.length === 0) {
            return 'Body is empty';
        }

        return false;
    },

    /**
     * TODO: отрефакторить, сделать валидацию в модели
     * TODO: разбить на методы, написать тесты
     *
     * Обрабатываем запрос на добавление поста
     *
     * @public
     * @method
     * @name AddPostController.addPost
     * @param {Object} request тело запроса
     * @param {Object} response тело ответа
     * @return {undefined}
     */
    addPost: function (request, response) {
        var dataToSave = {},
            postData = request.body,
            titleError,
            bodyError,
            errorFields = [];

        if (typeof postData === 'undefined') {
            response.send({
                error: true,
                message: 'Bad request'
            });
            return;
        }

        //проверяем заголовок
        titleError = this._checkPostTitle(postData.title);

        //проверяем тело поста
        bodyError = this._checkPostBody(postData.body);


        if (titleError) {
            errorFields.push({
                message: titleError,
                fieldName: 'title'
            });
        }

        if (bodyError) {
            errorFields.push({
                fieldName: 'body',
                message: bodyError
            });
        }

        if (errorFields.length) {
            response.send({
                error: true,
                fields: errorFields
            });
            return;
        }

        dataToSave.title = _s.trim(postData.title);
        dataToSave.body = _s.trim(postData.body);
        dataToSave.public = false;

        _.extend(dataToSave, this._getDate());

        dataToSave.description = this._getPostDescription(postData.body);

        dataToSave.titleUrl = this._formatPostUrl(dataToSave.title);

        //TODO: убрать хардкод
        dataToSave.locale = 'ru';

        PostsModel.addPost(dataToSave, function (error) {
            if (error) {
                response.send({
                    error: true,
                    message: 'Something is wrong'
                });
                return;
            }

            response.send({
                error: false,
                message: 'Success'
            });
        });
    },

    /**
     * Рендерим страницу добавления поста
     *
     * @public
     * @function
     * @name AddPostsController.renderAddPost
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderAddPost: function (request, response) {
        var renderParams = new RenderParams(request);

        response.render('posts/addPostView', _.extend(renderParams, {
            title: 'Add Post',
            isAddPostPage: true,
            bodyClass: 'bg-color-blue bg-symbols'
        }));
    }
};

_.bindAll(AddPostController, 'addPost');
module.exports = AddPostController;