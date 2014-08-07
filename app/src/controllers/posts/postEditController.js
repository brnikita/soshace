'use strict';
var Controller = srcRequire('common/controller'),
    PostsModel = srcRequire('models/postsModel'),
    Unidecode = require('unidecode'),
    Helper = srcRequire('common/helpers'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    RequestParams = srcRequire('common/requestParams');

/**
 * Контроллер, отвечающий за редактирование/добавление статьи
 *
 * @class PostEditController
 *
 */
module.exports = Controller.extend({
    /**
     * TODO: написать тест
     *
     * Формируем описание поста из тела поста
     *
     * @private
     * @method
     * @name PostEditController#_getPostDescription
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
     * Проверяем загловок поста на наличие косяков
     * В случае, если заголовок корректен возвращает false
     * В противном случае текст ошибки
     *
     * @private
     * @method
     * @name PostEditController#_checkPostTitle
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
     * @name PostEditController#_checkPostBody
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
     * @name PostEditController#addPost
     * @return {undefined}
     */
    addPost: function () {
        var request = this.request,
            response = this.response,
            dataToSave = {},
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

        dataToSave.description = this._getPostDescription(postData.body);

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
     * Метод возвращает True, если редактор должен быть заблокирован
     *
     * @method
     * @name AddPostsController.isEditorDisabled
     * @returns {Boolean}
     */
    isEditorDisabled: function () {
        var request = this.request,
            emailConfirmed = request.isAuthenticated() &&
                request.user[0].emailConfirmed;

        return !emailConfirmed;
    },

    /**
     * Рендерим страницу добавления поста
     *
     * @public
     * @function
     * @name AddPostsController.renderAddPost
     * @return {undefined}
     */
    renderAddPost: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request);

        response.render('posts/postEdit', _.extend(requestParams, {
            title: 'Add Post',
            isAddPostTab: true,
            editorDisabled: this.isEditorDisabled()
        }));
    }
});