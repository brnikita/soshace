'use strict';

(function(Soshace){
    var _ = Soshace._,
        $ = Soshace.core.$;

    /**
     * Вид страницы списка статей
     *
     * @class Soshace.views.PostsView
     */
    Soshace.views.PostsView = Soshace.core.View.extend({
        /**
         * Список статей
         *
         * @field
         * @name Soshace.views.PostsView#collection
         * @type {Core.Collection | null}
         */
        collection: null,

        /**
         * @field
         * @name Soshace.views.PostsView#elements
         * @type {Object}
         */
        elements: {
            postsPreviews: null
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name Soshace.views.PostsView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/posts'],

        /**
         * @constructor
         * @name Soshace.views.PostsView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Handlebars.registerPartial(
                'intro',
                Soshace.hbs['partials/intro']
            );
        },

        /**
         * Метод заполняет данными коллекцию и устанавливает виды preview используя
         * данные из шаблона
         *
         * @method
         * @name Soshace.views.PostsView#setViewsFromTemplate
         * @returns {undefined}
         */
        setViewsFromTemplate: function () {
            var _this = this,
                collection = this.collection,
                PostModel = collection.model,
                postsPreviews = this.elements.postsPreviews;

            postsPreviews.each(function () {
                var $this = $(this),
                    model,
                    view,
                    data = $this.data(),
                    $title = $('.js-title', $this),
                    $description = $('.js-description', $this),
                    title = $title.html(),
                    description = $description.html();

                model = new PostModel(_.extend(data, {
                    title: title,
                    description: description
                }));

                view = new PostPreviewView({
                    model: model
                });

                view.$el = $this;
                view.withoutRender();
                _this.insertView('.js-posts-list', view);
                collection.add(model);
            });
        },


        /**
         * Метод добавляет вид превью с списку статей
         *
         * @method
         * @name Soshace.views.PostsView#addOneView
         * @param {Backbone.Model} postModel модель статьи
         * @returns {undefined}
         */
        addOneView: function (postModel) {
            var view = new Soshace.views.PostPreviewView({
                model: postModel
            });

            this.insertView('.js-posts-list', view);
        },

        /**
         * Метод заполняет список статей
         *
         * @method
         * @name Soshace.views.PostsView#fillPostsList
         * @returns {undefined}
         */
        fillPostsList: function () {
            this.collection.each(_.bind(this.addOneView, this));
        },

        /**
         * @method
         * @name Soshace.views.PostsView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                data = {};

            data.posts = this.collection.toJSON();
            data.paths = Soshace.urls;
            data.locale = Soshace.helpers.getLocale();
            data.isAuthenticated = app.isAuthenticated();

            return data;
        },

        /**
         * Метод вызывается, когда рендер происходит на сервере
         *
         * @method
         * @name Soshace.views.PostsView#withoutRender
         * @param {jQuery} $el корневой элемент вида
         * @returns {undefined}
         */
        withoutRender: function ($el) {
            this.$el = $el;
            this.delegateEvents();
            this.setElements();
            this.setViewsFromTemplate();
        },

        /**
         * @method
         * @name Soshace.views.PostsView#beforeRender
         * @returns {undefined}
         */
        beforeRender: function () {
            this.fillPostsList();
        },

        /**
         * Метод сохраняет ссылки на DOM элементы
         *
         * @method
         * @name Soshace.views.PostsView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.postsPreviews = this.$('.js-post-preview');
        },

        /**
         * @method
         * @name Soshace.views.PostsView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
})(window.Soshace);