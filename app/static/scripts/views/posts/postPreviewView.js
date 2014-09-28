'use strict';

(function (Soshace) {
    var _ = Soshace._;

    /**
     * Вид предпросмотра статьи
     *
     * @class Soshace.views.PostPreviewView
     */
    Soshace.views.PostPreviewView = Soshace.core.View.extend({

        /**
         * @field
         * @name Soshace.views.PostPreviewView#el
         * @type {boolean}
         */
        el: false,

        /**
         * Модель деталей статьи
         *
         * @field
         * @name Soshace.views.PostPreviewView#model
         * @type {Core.Model | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.views.PostPreviewView#elements
         * @type {Object}
         */
        elements: {
            metaDataPanel: null
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name Soshace.views.PostPreviewView#elements
         * @type {string}
         */
        template: Soshace.hbs['partials/postPreview'],

        /**
         * @constructor
         * @name Soshace.views.PostPreviewView#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод используется в тех случаях, когда шаблон уже отрендерен
         * Но надо навесить слушатели и выполнить afterRender и т.д.
         *
         * @method
         * @name Soshace.views.PostPreviewView#withoutRender
         * @returns {undefined}
         */
        withoutRender: function () {
            this.delegateEvents();
            this.setElements();
            this.addMetaData();
        },

        /**
         * Метод возвращает true, если текущий авторизованный пользователь является владельцем
         *
         * @method
         * @name Soshace.views.PostPreviewView#addMetaData
         * @returns {boolean}
         */
        isOwner: function () {
            var app = Soshace.app,
                profileId,
                ownerId;

            if (!app.isAuthenticated()) {
                return false;
            }

            profileId = Soshace.profile._id;
            ownerId = this.model.get('ownerId');

            return profileId === ownerId;
        },

        /**
         * Метод добавляет ланные (статус, дату публикации и пр.) к превью статьи
         *
         * @method
         * @name Soshace.views.PostPreviewView#addMetaData
         * @returns {undefined}
         */
        addMetaData: function () {
            var metaData = this.getMetaData();
            this.elements.metaDataPanel.html(metaData);
        },

        /**
         * Метод возвращает отрендеренную панель информации для превью статьи
         *
         * @method
         * @name Soshace.views.PostPreviewView#getMetaData
         * @returns {undefined}
         */
        getMetaData: function () {
            var model = this.model.toJSON(),
                isOwner = this.isOwner(),
                status = this.model.get('status'),
                statusSettings = this.model.statuses[status],
                statusClass = statusSettings.class,
                statusTitle = statusSettings.title,
                editorEnable = statusSettings.editorEnable;

            return Soshace.hbs['posts/edit/postMetaData'](_.extend(model, {
                isOwner: isOwner,
                editorEnable: editorEnable,
                statusClass: statusClass,
                statusTitle: statusTitle
            }));
        },

        /**
         * Метод сохраняет ссылки на элементы DOM
         *
         * @method
         * @name Soshace.views.PostPreviewView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.metaDataPanel = this.$('.js-meta-data');
        },

        /**
         * @method
         * @name Soshace.views.PostPreviewView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.addMetaData();
        }
    });
})(window.Soshace);