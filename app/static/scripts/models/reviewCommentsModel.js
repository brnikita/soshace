'use strict';

(function (Soshace) {
    /**
     * Модель комментариев ревью статьи
     *
     * @class Soshace.models.ReviewCommentsModel
     */
    Soshace.models.ReviewCommentsModel = Soshace.core.Model.extend({
        /**
         * @field
         * @name Soshace.models.ReviewCommentsModel#idAttribute
         * @type {string}
         */
        idAttribute: '_id',

        /**
         * @field
         * @name Soshace.models.ReviewCommentsModel#default
         * @type {string | null}
         */
        default: {
            _id: null,
            locale: null,
            //Загловок поста
            title: null,
            //Категория, используется в урлах
            category: null,
            //Тело поста
            body: null
        },

        /**
         * Список статусов статьи
         *
         * @field
         * @name Soshace.models.ReviewCommentsModel#statuses
         * @type {Object}
         */
        statuses: {
            saved: {
                title: 'Post saved',
                class: 'label-primary'
            },
            editing: {
                title: 'Post is editing...',
                class: 'label-default'
            },
            sent: {
                title: 'Post sent',
                class: 'label-primary'
            },
            published: {
                title: 'Post published',
                class: 'label-success'
            },
            denied: {
                title: 'Publication denied',
                class: 'label-danger'
            },
            comments: {
                title: 'Some comments',
                class: 'label-warning'
            }
        },

        /**
         * @method
         * @name Soshace.models.ReviewCommentsModel#url
         * @returns {string}
         */
        url: function () {
            var url = Soshace.urls.api.post,
                _id = this.get('_id');

            if (_id) {
                return url.replace('0', _id);
            }

            return url.replace('0', '');
        },

        /**
         * @constructor
         * @name Soshace.models.ReviewCommentsModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.set('locale', Soshace.helpers.getLocale(), {silent: true});
        }
    });
})(window.Soshace);