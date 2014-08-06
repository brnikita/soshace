//TODO: вынести редактирование, добавление поста в отдельныйц плагин jquery
//TODO: ссылки могут быть только относительные внутри проекта
//TODO: выпилить назад вперед
//TODO: выпилить список рядом с излбражением
//TODO: добавить подзаголовки
'use strict';

/**
 * Вид страницы редактирования статьи
 *
 * @class PostEditView
 */

define([
    'jquery',
    'underscore',
    'underscore.string',
    'backbone',
    'utils/helpers',
    'utils/widgets',
    'prettify',
    'jquery.hotkeys',
    'jquery.fileupload'
], function ($, _, _s, Backbone, Helpers, Widgets) {
    return Backbone.Layout.extend({

        /**
         * Список ошибок: поля и тексты ошибок
         * Результат исполнения метода checkForm
         *
         * @field
         * @name PostEditView#formErrors
         * @type {Array|null}
         */
        formErrors: null,

        /**
         * Позиция панели редактирования при рендере
         *
         * @field
         * @name PostEditView#toolbarInitOffeset
         * @type {Object}
         */
        toolbarInitOffset: null,

        /**
         * Дефолтные настройки редактора
         *
         * @private
         * @field
         * @name PostEditView#defaultConfig
         * @type {Object}
         */
        defaultConfig: {
            hotKeys: {
                'ctrl+b meta+b': 'bold',
                'ctrl+i meta+i': 'italic',
                'ctrl+u meta+u': 'underline',
                'ctrl+z meta+z': 'undo',
                'ctrl+y meta+y meta+shift+z': 'redo',
                'ctrl+l meta+l': 'justifyleft',
                'ctrl+r meta+r': 'justifyright',
                'ctrl+e meta+e': 'justifycenter',
                'ctrl+j meta+j': 'justifyfull',
                'shift+tab': 'outdent',
                'tab': 'indent'
            },
            toolbarSelector: '[data-role=editor-toolbar]',
            commandRole: 'edit',
            activeToolbarClass: 'btn-info',
            selectionMarker: 'edit-focus-marker',
            selectionColor: 'darkgrey'
        },

        /**
         * Список обработчиков ошибок
         *
         * @field
         * @name PostEditView#events
         * @type {Object}
         */
        events: {
            'click .js-submit-post': 'submitForm',
            'focus .js-post-title': 'focusTitle',
            'blur .js-post-title': '_blurField',
            'focus .js-post-body': 'focusField',
            'blur .js--post-body': '_blurField'
        },

        /**
         * @field
         * @name PostEditView#errorMessages
         * @type {Object}
         */
        errorMessages: {
            title: 'Вы забыли указать загловок',
            body: 'Вы забыли указать тело поста'
        },

        /**
         * Селектор кнопок редактора
         *
         * @field
         * @name PostEditView#toolbarBtnSelector
         * @type {String|null}
         */
        toolbarBtnSelector: null,

        /**
         * Настройки редактора
         *
         * @field
         * @name PostEditView#options
         * @type {Object|null}
         */
        options: null,

        /**
         * Объект, содержащий элементы редактора для
         * повторного обращения к ним
         *
         * @field
         * @name PostEditView#elements
         * @type {Object}
         */
        elements: {
            formFields: {
                postBody: null,
                title: null
            },
            toolbar: null,
            toolbarContainerElement: null,
            toolbarRowElement: null,
            addLinkModal: null,
            linkSaveButton: null,
            linkNameInput: null,
            window: null,
            messages: null
        },

        /**
         *
         * @field
         * @name PostEditView#selectedRange
         * @type {Object | null}
         */
        selectedRange: null,

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostEditView#elements
         * @type {string}
         */
        template: Soshace.hbs['posts/postEdit'],

        /**
         * @constructor
         * @name PostEditView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            var $el = params && params.$el,
                commandRole = this.defaultConfig.commandRole;

            _.bindAll(this,
                'showServerMessages',
                'windowScrollHandler',
                'touchHandler'
            );

            if ($el) {
                this.$el = $el;
            }

            this.toolbarBtnSelector = 'a[data-' +
                commandRole +
                '],button[data-' +
                commandRole +
                '],input[type=button][data-' +
                commandRole + ']';
        },

        /**
         * Метод делает основное поле ввода редактируемым
         *
         * @method
         * @name PostEditView#makeEditorFieldContentEditable
         * @returns {undefined}
         */
        makeEditorFieldContentEditable: function () {
            var editorField = this.elements.formFields.postBody;

            editorField.attr('contenteditable', true)
                .on('mouseup keyup mouseout', _.bind(function () {
                    this.saveSelection();
                    this.updateToolbar();
                }, this));
        },

        /**
         * Метод обработчик события touched
         *
         * @method
         * @name PostEditView#touchHandler
         * @returns {undefined}
         */
        touchHandler: function (event) {
            var editor = this.elements.formFields.postBody,
                isInside = (editor.is(event.target) || editor.has(event.target).length > 0),
                currentRange = this.getCurrentRange(),
                clear = currentRange && (currentRange.startContainer === currentRange.endContainer &&
                    currentRange.startOffset === currentRange.endOffset);

            if (!clear || isInside) {
                this.saveSelection();
                this.updateToolbar();
            }
        },

        /**
         * Метод обработчик скрола окна
         *
         * @method
         * @name PostEditView#windowScrollHandler
         * @returns {undefined}
         */
        windowScrollHandler: function () {
            var toolbar = this.elements.toolbar,
                toolbarPosition = this.toolbarInitOffset,
                toolbarPositionTop = toolbarPosition.top,
                $window = this.elements.window,
                scrollTop = $window.scrollTop();

            //Фиксируем тулбар на верху окна
            if (scrollTop >= toolbarPositionTop) {
                toolbar.addClass('add_post__toolbar-fixed');
                this.elements.toolbarContainerElement.addClass('container');
                this.elements.toolbarRowElement.addClass('container');
            } else {
                toolbar.removeClass('add_post__toolbar-fixed');
                this.elements.toolbarContainerElement.removeClass('container');
                this.elements.toolbarRowElement.removeClass('container');
            }
        },

        /**
         * Обработчик события получения фокуса полем формы
         *
         * @method
         * @name PostEditView#focusField
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        focusField: function (event) {
            var field = $(event.target);

            this.hideClientError(field);
        },

        /**
         * Обработчик события получения фокуса полем заголовка
         *
         * @method
         * @name PostEditView#focusTitle
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        focusTitle: function (event) {
            var $field = $(event.target);
            $field.attr('placeholder', '');
            this.hideClientError($field);
        },

        /**
         * Метод убирает ошибку у заданного поля
         *
         * @method
         * @name PostEditView#hideClientError
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
                        error.element.elements.postBody[0] : error.element[0];

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
         * @name PostEditView#showServerErrors
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
         * @name PostEditView#checkForm
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
                    name = element.elements.postBody.attr('name');
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
         * @name PostEditView#getFormData
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
                    name = field.elements.postBody.attr('name');
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
         * @name PostEditView#_showSuccessMessage
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
         * @name PostEditView#submitForm
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
         * Метод возвращает очищенное тело редактора
         *
         * @method
         * @name PostEditView#cleanHtml
         * @returns {string}
         */
        cleanHtml: function () {
            var html = this.elements.formFields.postBody.html();
            return html && html.replace(/(<br>|\s|<div>(<br>|\s|&nbsp;)*<\/div>|&nbsp;)*$/, '');
        },

        /**
         * TODO: доработать комментарий
         *
         * Метод делает активной или неактивной панель
         *
         * @method
         * @name PostEditView#updateToolbar
         * @returns {undefined}
         */
        updateToolbar: function () {
            if (this.defaultConfig.activeToolbarClass) {
                this.elements.toolbar.find(this.toolbarBtnSelector).each(_.bind(function () {
                    var command = this.elements.formFields.postBody.data(this.defaultConfig.commandRole);
                    if (document.queryCommandState(command)) {
                        this.elements.formFields.postBody.addClass(this.defaultConfig.activeToolbarClass);
                    } else {
                        this.elements.formFields.postBody.removeClass(this.defaultConfig.activeToolbarClass);
                    }
                }, this));
            }
        },

        /**
         * TODO: доработать описание параметров
         *
         * Метод для работы с выделенным текстом
         *
         * @method
         * @name PostEditView#execCommand
         * @param {string} commandWithArgs
         * @param {string} valueArg
         * @returns {undefined}
         */
        execCommand: function (commandWithArgs, valueArg) {
            var commandArr = commandWithArgs.split(' '),
                command = commandArr.shift(),
                args = commandArr.join(' ') + (valueArg || '');

            document.execCommand(command, null, args);
            this.updateToolbar();
        },

        /**
         * TODO: доработать описание
         *
         * Метод навешивает слушатель на тело редактора
         * Слушает нажатие горячих клавиш
         *
         * @method
         * @name PostEditView#execCommand
         * @param {Object} hotKeys список горячих клавиш
         * @returns {undefined}
         */
        bindHotKeys: function (hotKeys) {
            $.each(hotKeys, _.bind(function (hotKey, command) {
                this.elements.formFields.postBody.keydown(hotKey, _.bind(function (event) {
                    if (this.elements.formFields.postBody.attr('contenteditable') &&
                        this.elements.formFields.postBody.is(':visible')) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.execCommand(command);
                    }
                }, this)).keyup(hotKey, _.bind(function (event) {
                    if (this.elements.formFields.postBody.attr('contenteditable') &&
                        this.elements.formFields.postBody.is(':visible')) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }, this));
            }, this));
        },


        /**
         * Возвращает объект с информацией о выделенном участке
         * текста
         *
         * @method
         * @name PostEditView#execCommand
         * @returns {Range|null}
         */
        getCurrentRange: function () {
            var sel = window.getSelection();

            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }

            return null;
        },

        /**
         * Сохраняет информацию о выделленой области
         * в приватной переменной selectedRange
         *
         * @method
         * @name PostEditView#saveSelection
         * @returns {undefined}
         */
        saveSelection: function () {
            this.selectedRange = this.getCurrentRange();
        },

        /**
         * Удаляет выделение текущей выделенной области
         * и выдляет сохраненную область
         *
         * @method
         * @name PostEditView#restoreSelection
         * @returns {undefined}
         */
        restoreSelection: function () {
            var selection = window.getSelection();
            if (this.selectedRange) {
                try {
                    selection.removeAllRanges();
                } catch (ex) {
                    document.body.createTextRange().select();
                    document.selection.empty();
                }

                selection.addRange(this.selectedRange);
            }
        },

        /**
         * Выделяет цветом ранее сохраненную область выделения
         *
         * @method
         * @name PostEditView#markSelection
         * @param {jQuery} input
         * @param {string} color цвет выделения
         * @returns {undefined}
         */
        markSelection: function (input, color) {
            this.restoreSelection();
            this.saveSelection();
            input.data(this.defaultConfig.selectionMarker, color);
        },

        /**
         * TODO: доработать описание
         *
         * Навишивает слушатели на панель управления
         *
         * @method
         * @name PostEditView#bindToolbar
         * @returns {undefined}
         */
        bindToolbar: function () {
            var _this = this;

            this.elements.toolbar.find(this.toolbarBtnSelector).on('click', function () {
                var button = $(this),
                    command = button.data(_this.defaultConfig.commandRole);

                _this.restoreSelection();
                _this.elements.formFields.postBody.focus();
                _this.saveSelection();

                if (command === 'CreateLink') {
                    _this.showAddLinkModal();
                } else {
                    _this.execCommand(command);
                }
            });

            this.addSaveLinkBtnListener();

            this.elements.toolbar.find('input[type=text][data-' + this.defaultConfig.commandRole + ']').
                on('focus', function () {
                    var input = $(this);

                    if (!input.data(_this.defaultConfig.selectionMarker)) {
                        _this.markSelection(input, _this.defaultConfig.selectionColor);
                        input.focus();
                    }
                }).
                on('blur', function () {
                    var input = $(this);

                    if (input.data(_this.defaultConfig.selectionMarker)) {
                        _this.markSelection(input, false);
                    }
                });

            this.addImageButtonListener();
        },

        /**
         * Метод показывает модальное окно
         *
         * @method
         * @name PostEditView#showAddLinkModal
         * @returns {undefined}
         */
        showAddLinkModal: function () {
            this.elements.addLinkModal.modal({show: true});
        },

        /**
         * Метод навешивает слушатель на кнопку
         * 'Сохранить' в модальном окне добавления ссылки
         *
         * @method
         * @name PostEditView#addSaveLinkBtnListener
         * @returns {undefined}
         */
        addSaveLinkBtnListener: function () {
            this.elements.linkSaveButton.on('click', _.bind(function () {
                var url = this.elements.linkUrlInput.val();
                this.restoreSelection();
                this.execCommand('CreateLink', url);
                this.elements.addLinkModal.modal('hide');
            }, this));
        },

        /**
         * Метод навешивает слушатель на кнопку загрузки
         * изображения
         *
         * @method
         * @name PostEditView#addImageButtonListener
         * @returns {undefined}
         */
        addImageButtonListener: function () {
            var _this = this,
                preLoader = $('<img>', {
                    src: Soshace.urls.images + 'preloader.gif',
                    class: 'img-responsive center'
                });

            //TODO: блокировать панель до загрузки первого изображения
            //Загруженные картинки не удалять!!!
            this.elements.toolbar.find('input[type=file][data-' + _this.defaultConfig.commandRole + ']').
                fileupload({
                    dataType: 'json',
                    done: function (event, data) {
                        var result = data.result;

                        preLoader.remove();

                        if (result.error) {
                            Widgets.showMessages(result.error, 'alert-danger');
                            return;
                        }

                        _this.elements.formFields.postBody.append($('<img>', {
                            src: result.path,
                            class: 'img-responsive'
                        }));
                    }
                }).
                on('change', function () {
                    _this.elements.formFields.postBody.append(preLoader);
                });
        },

        /**
         * Метод сохраняет ссылки на элементы DOM
         *
         * @method
         * @name PostEditView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.window = $(window);
            this.elements.formFields = {};
            this.elements.toolbar = this.$('.js-editor-toolbar');
            this.elements.formFields.postBody = this.$('.js-post-body');
            this.elements.formFields.postTitle = this.$('.js-post-title');
            this.elements.addLinkModal = this.$('.js-add-link-modal');
            this.elements.toolbarContainerElement = this.$('.js-editor-toolbar-container');
            this.elements.toolbarRowElement = this.$('.js-editor-toolbar-row');
            this.elements.linkSaveButton = this.$('.js-add-link-save');
            this.elements.linkUrlInput = this.$('.js-add-link-modal-link-url');
            this.elements.messages = this.$('.js-messages');
        },

        /**
         * Метод возвращает True, если редактор должен быть заблокирован
         *
         * @method
         * @name PostEditView#isEditorDisabled
         * @returns {Boolean}
         */
        isEditorDisabled: function () {
            var app = Soshace.app,
                emailConfirmed = app.isAuthenticated() &&
                    Soshace.profile.emailConfirmed;

            return !emailConfirmed;
        },

        /**
         * @method
         * @name PostEditView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();

            data.title = 'Add Post';
            data.editorDisabled = this.isEditorDisabled();
            data.paths = Soshace.urls;

            return data;
        },

        /**
         * Метод вызывается роутером перед выходом из вида
         *
         * @method
         * @name PostEditView#viewExitHandler
         * @returns {undefined}
         */
        viewExitHandler: function () {
            this.elements.window.off('touchend', this.touchHandler).
                off('scroll', this.windowScrollHandler);
        },

        /**
         * @method
         * @name PostEditView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.toolbarInitOffset = this.elements.toolbar.position();
            this.bindHotKeys(this.defaultConfig.hotKeys);
            this.bindToolbar();
            this.makeEditorFieldContentEditable();
            this.elements.window.on('touchend', this.touchHandler).off('scroll', this.windowScrollHandler);
        }
    });
});