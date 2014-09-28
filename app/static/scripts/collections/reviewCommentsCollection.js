'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Коллекция списка сообщений ревью статьи
     *
     * @class Soshace.collections.ReviewCommentsCollection
     */
    Soshace.collections.ReviewCommentsCollection = Soshace.core.Collection.extend({
        /**
         * Модель превью поста
         *
         * @field
         * @name Soshace.collections.ReviewCommentsCollection#model
         * @type {Function}
         */
        model: Soshace.models.ReviewCommentsModel,

        /**
         * @method
         * @name Soshace.collections.ReviewCommentsCollection#initialize
         * @returns {string}
         */
        url: Soshace.urls.api.reviewComments,

        /**
         * @constructor
         * @name Soshace.collections.ReviewCommentsCollection#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * TODO: добавить обработку ошибок
         *
         * Используется такой способ получения постов, чтобы сделать свой триггер
         * Т.к. change не отрабатывает при полуении такой же модели
         *
         * @method
         * @name Soshace.collections.ReviewCommentsCollection#getPosts
         * @param {Object} params параметры запроса
         * @returns {undefined}
         */
        getPosts: function (params) {
            this.fetch({
                data: params,
                silent: true
            }).done(_.bind(this.getPostsSuccess, this));
        },

        /**
         * Метод обработчик удачного получения списка постов
         *
         * @method
         * @name Soshace.collections.ReviewCommentsCollection#getPostsSuccess
         * @param {Array} postsList список постов
         * @returns {undefined}
         */
        getPostsSuccess: function (postsList) {
            if (postsList instanceof Array && postsList.length === 0) {
                postsList = null;
            }
            this.set(postsList, {silent: true});
            this.trigger('postsReceived');
        }
    });
})(window.Soshace);