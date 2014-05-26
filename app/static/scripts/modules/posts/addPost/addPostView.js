'use strict';

/**
 * Вид страницы добавления поста
 *
 * @module AddPostView
 */

define([
    'jquery',
    'underscore',
    'underscore.string',
    'backbone',
    'utils/widgets',
    './addPostModel',
    'utils/editorView',
    'backbone.layoutmanager'
], function ($, _, _s, Backbone, Widgets, AddPostModel, EditorView) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name AddPostView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name AddPostView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель деталей статьи
         *
         * @field
         * @name AddPostView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Список ошибок: поля и тексты ошибок
         * Результат исполнения метода checkForm
         *
         * @field
         * @name AddPostView.formErrors
         * @type {Array|null}
         */
        formErrors: null,

        /**
         * Список обработчиков ошибок
         *
         * @field
         * @name AddPostView.events
         * @type {Object}
         */
        events: {
            'click .js-submit-post': 'submitForm',
            'focus .js-title': 'focusField',
            'blur .js-title': '_blurField',
            'focus .js-body-editor': 'focusField',
            'blur .js-body-editor': '_blurField'
        },

        /**
         * @field
         * @name AddPostView.errorMessages
         * @type {Object}
         */
        errorMessages: {
            title: 'Вы забыли указать загловок',
            body: 'Вы забыли указать тело поста'
        },

        /**
         * @field
         * @name AddPostView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name AddPostView.elements
         * @type {string}
         */
        template: 'posts/addPostView',

        /**
         * @constructor
         * @name AddPostView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            var toolbarElement,
                formFields,
                editorBody;
            Widgets.setBodyClass('bg-symbols bg-color-blue');
            this.app = params.app;

            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
            } else {
                this.app.headerView.changeTab('isAddPostPage');
                this.render();
            }

            toolbarElement = $('.js-editor-toolbar', this.$el);
            editorBody = $('.js-body-editor', this.$el);
            _.bindAll(this, 'showServerMessages');
            this.elements.formFields = {};
            formFields = this.elements.formFields;
            formFields.title = $('.js-title', this.$el);
            formFields.body = new EditorView({
                editor: editorBody,
                toolbar: toolbarElement
            });
        },

        /**
         * Обработчик события получения фокуса полем формы
         *
         * @method
         * @name AddPostView.focusField
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        focusField: function (event) {
            var field = $(event.target);

            this.hideClientError(field);
        },

        /**
         * Метод убирает ошибку у заданного поля
         *
         * @method
         * @name AddPostView.hideClientError
         * @param {jQuery} hideField поле, у которого нужно убрать ошибку
         * @returns {undefined}
         */
        hideClientError: function (hideField) {
            var showErrors = [];

            if (this.formErrors !== null && this.formErrors.length) {
                Widgets.hideErrorMessages(this.formErrors);

                //Исключаем поле, которое сейчас редактируем
                _.each(this.formErrors, function (error) {
                    var field = error.element.isEditor ?
                        error.element.elements.editorElement[0] : error.element[0];

                    if (field !== hideField[0]) {
                        showErrors.push(error);
                    }
                });

                this.formErrors = showErrors;
                Widgets.showErrorMessages(showErrors);
            }
        },

        /**
         * Показываем серверные ошибки для полей
         *
         * @method
         * @name AddPostView.showServerErrors
         * @param {Object|Array} fields поля или поле с ошибками
         *                              Пример: {
         *                                        fieldName: 'title',
         *                                        message:   'Не указан загловок'
         *                                      }
         * @returns {undefined}
         */
        showServerErrors: function (fields) {
            var showErrors = [],
                formFields = this.elements.formFields,
                isArray = fields instanceof Array,
                isObject = typeof fields === 'object' && fields !== null;

            if (isArray || isObject) {
                _.each(fields, function (field) {
                    showErrors.push({
                        message: field.message,
                        element: formFields[field.fieldName]
                    });
                });
            }

            Widgets.showErrorMessages(showErrors);
        },

        /**
         * Метод для проверки формы
         * Правильности заполнения полей
         *
         * @method
         * @private
         * @name AddPostView.checkForm
         * @param {jQuery} formFields список проверяемых полей
         * @returns {Array} возвращает список ошибок [{
         *                                                  message: message, - сообщение об ошибке
         *                                                  element: element - ссылка на DOM поля с ошибкой
         *                                              }]
         */
        checkForm: function (formFields) {
            var errors = [];

            _.each(formFields, _.bind(function (element) {
                var value,
                    name;

                if (element instanceof $) {
                    name = element.attr('name');
                    value = element.val();
                } else if (element.isEditor) {
                    value = element.cleanHtml();
                    name = element.elements.editorElement.attr('name');
                }

                if (!value) {
                    errors.push({
                        message: this.errorMessages[name],
                        element: element
                    });
                }
            }, this));

            return errors;
        },


        /**
         * Возвращает данные формы
         *
         * @method
         * @name AddPostView.getFormData
         * @param {object} formFields
         * @returns {object}
         */
        getFormData: function (formFields) {
            var formsData = {};

            _.each(formFields, function (field) {
                var value,
                    name;

                if (field instanceof $) {
                    value = _s.trim(field.val());
                    name = field.attr('name');
                } else if (field.isEditor) {
                    name = field.elements.editorElement.attr('name');
                    value = field.cleanHtml();
                }

                formsData[name] = value;
            });

            return formsData;
        },

        /**
         * Показ сообщений от сервера
         *
         * @method
         * @name AddPostView._showSuccessMessage
         * @param {Object} response Ответ сервера
         * @returns {undefined}
         */
        showServerMessages: function (response) {
            if (response.error) {
                if (response.fields) {
                    this.showServerErrors(response.fields);
                } else if (response.message) {
                    Widgets.showMessages(response.message, null, 'alert-danger');
                }

                return;
            }

            if (response.message) {
                Widgets.showMessages(response.message, null, 'alert-success');
            }
        },

        /**
         * Обработчик отправки формы
         *
         * @method
         * @name AddPostView.submitForm
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        submitForm: function (event) {
            var formFields = this.elements.formFields;

            this.formErrors = this.checkForm(formFields);

            if (!this.formErrors.length) {
                $.post('/api/post',
                    this.getFormData(formFields),
                    this.showServerMessages
                );
            } else {
                Widgets.showErrorMessages(this.formErrors);
            }

            event.preventDefault();
        },

        /**
         * @method
         * @name AddPostView.serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * @method
         * @name AddPostView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});