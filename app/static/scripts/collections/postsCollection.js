'use strict';
(function (Soshace) {
    /**
     * Коллекция списка статей
     *
     * @class Soshace.collections.PostsCollection
     */
     Soshace.collections.PostsCollection = Soshace.core.Collection.extend({
            /**
             * Модель превью поста
             *
             * @field
             * @name Soshace.collections.PostsCollection#model
             * @type {Function}
             */
            model: Soshace.models.PostModel,

            /**
             * @method
             * @name Soshace.collections.PostsCollection#initialize
             * @returns {string}
             */
            url: Soshace.urls.api.posts,

            /**
             * @constructor
             * @name Soshace.collections.PostsCollection#initialize
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
             * @name Soshace.collections.PostsCollection#getPosts
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
             * @name Soshace.collections.PostsCollection#getPostsSuccess
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