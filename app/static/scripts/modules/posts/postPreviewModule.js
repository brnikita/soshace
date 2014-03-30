'use strict';

/**
 * Модуль страницы предпросмотра поста
 *
 * @module PostPreviewModule
 */

define([
    'jquery',
    'underscore',
    'utils/prettifyUtil'
], function ($, _, prettifyUtil) {
    return {

        /**
         * Контекст модуля
         * Родительский элемент DOM
         *
         * @field
         * @name PostPreviewModule.$el
         * @type {jQuery|null}
         */
        $el: null,

        /**
         * @field
         * @name PostPreviewModule.elements
         * @type {Object}
         */
        elements: {
            metaInformation: null
        },

        /**
         * @field
         * @name PostPreviewModule.postData
         * @type {Object|null}
         */
        postData: null,

        /**
         * @method
         * @name PostPreviewModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            prettifyUtil.byContext(this.$el, 'js');
            this.elements.metaInformation = $('.js-meta-information', this.$el);
            this.postData = this.$el.data();
//            this.updateMetaInformation();
        },

        /**
         * Записывает теги поста
         *
         * Дата устанавливается на клиенте, т.к. на сервере она хранится
         * по гринвичу
         *
         * @method
         * @name PostPreviewModule.updateMetaInformation
         * @returns {undefined}
         */
        updateMetaInformation: function(){
            this.elements.metaInformation.append($('<span>', {
                text: new Date(),
                class: 'label label-info'
            }));
        }
    };
});