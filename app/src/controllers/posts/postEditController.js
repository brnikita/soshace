'use strict';
var Controller = srcRequire('common/controller'),
    PostsModel = srcRequire('models/postsModel'),
    _ = require('underscore'),
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
     * Обрабатываем запрос на добавление поста
     *
     * @public
     * @method
     * @name PostEditController#createPost
     * @return {undefined}
     */
    createPost: function () {
        var request = this.request,
            postData = request.body,
            requestParams = new RequestParams(request),
            post;

        if (!postData) {
            this.sendError('Bad request');
            return;
        }

        if(requestParams.isAuthenticated){
            this.sendError('Unauthorized', 401);
            return;
        }

        postData.ownerId

        post = new PostsModel(postData);
        post.save(_.bind(this.postSaveHandler, this));
    },

    /**
     * Метод обработчик сохранения поста в базе
     *
     * @method
     * @name PostEditController#postSaveHandler
     * @param {Object} error объект ошибки
     * @param {PostsModel} post модель статьи
     * @returns {undefined}
     */
    postSaveHandler: function (error, post) {
        var response = this.response;

        if (error) {
            if (error.errors) {
                this.sendError(error.errors);
                return;
            }

            this.sendError('Server is too busy, try later', 503);
            return;
        }

        response.send({
            _id: post._id
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