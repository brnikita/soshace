//TODO: добавить оповещение при смене статуса
'use strict';

(function (Soshace) {
    var $ = Soshace.core.$;

    /**
     * Вид страницы адмистрирования статьи
     *
     * У страниц адмистрирования нет клиентского роутинга
     * и шаблонизации, т.к. на клиенте не должно быть никаких упоминаний
     * о наличии страницы адмистрирования и API для адмистрования
     *
     * Так же скрипты админки не участвуют в общей сборке
     *
     * @class Soshace.views.PostReView
     */
    Soshace.views.PostReView = Soshace.core.View.extend({
        /**
         * Модель статьи
         *
         * @field
         * @name Soshace.views.PostReView#postModel
         * @type {Soshace.models.PostModel | null}
         */
        postModel: null,

        /**
         * Коллекция комментариев ревью статьи
         *
         * @field
         * @name Soshace.views.PostReView#reviewCommentsCollection
         * @type {ReviewCommentsCollection}
         */
        reviewCommentsCollection: null,

        /**
         * @field
         * @name Soshace.views.PostReView#el
         * @type {string}
         */
        el: '.js-post-review',

        /**
         * @field
         * @name Soshace.views.PostReView#elements
         * @type {Object}
         */
        elements: {
            post: null,
            postTitle: null,
            postBody: null
        },

        /**
         * @field
         * @name Soshace.views.PostReView#events
         * @type {Object}
         */
        events: {
            'change .js-select': 'selectChangeHandler',
            'submit': 'submitHandler'
        },

        /**
         * @constructor
         * @name Soshace.views.PostReView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.postModel = new Soshace.models.PostModel();
            this.setElements();
            this.setDataToModelFromView();
        },

        /**
         * Метод обработчик изменения выпадающих списоков
         *
         * @method
         * @name Soshace.views.PostReView#selectChangeHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        selectChangeHandler: function (event) {
            var $target = $(event.target),
                name = $target.attr('name'),
                value = $target.val();

            this.postModel.set(name, value);
        },

        /**
         * Метод обработчик отправки формы
         *
         * @method
         * @name Soshace.views.PostReView#submitHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        submitHandler: function (event) {
            event.preventDefault();
            this.postModel.patchModel();
        },

        /**
         * Метод берет данные из шаблона и сетит модель статьи
         *
         * @method
         * @name Soshace.views.PostReView#setDataToModelFromView
         * @returns {undefined}
         */
        setDataToModelFromView: function () {
            var body = this.elements.postBody.html(),
                title = this.elements.postTitle.html(),
                ownerId = this.elements.post.data('ownerId'),
                postId = this.elements.post.data('postId');

            this.postModel.set({
                _id: postId,
                ownerId: ownerId,
                title: title,
                body: body
            }, {silent: true});
        },

        /**
         * Метод сохраняет ссылки на элементы DOM
         *
         * @method
         * @name Soshace.views.PostReView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.postTitle = this.$('.js-title');
            this.elements.postBody = this.$('.js-body');
            this.elements.post = this.$('.js-post');
        }
    });
})(window.Soshace);