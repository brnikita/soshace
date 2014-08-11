//TODO: Убрать баги при редактировании поста
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
    'prettify',
    'jquery.hotkeys',
    'jquery.fileupload'
], function ($, _, _s, Backbone, Helpers) {
    return Backbone.Layout.extend({

        /**
         * Позиция панели редактирования при рендере
         *
         * @field
         * @name PostEditView#toolbarInitOffeset
         * @type {Object}
         */
        toolbarInitOffset: null,

        /**
         * @field
         * @name PostEditController#model
         * @type {Backbone.Model}
         */
        model: null,

        /**
         * @field
         * @name PostEditController#hotKeys
         * @type {Object}
         */
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

        /**
         * Список обработчиков ошибок
         *
         * @field
         * @name PostEditView#events
         * @type {Object}
         */
        events: {
            'click .js-post-save': 'postSave',
            'click .js-post-publish': 'postPublish',
            'keyup .js-post-title': 'saveTileToModel',
            'keyup .js-post-body': 'saveBodyToModel',
            'click .js-simple-command': 'applyCommand',
            'mouseup .js-post-body': 'saveSelection',
            'click .js-add-link': 'showAddLinkModal',
            'click .js-add-link-save': 'saveLinkHandler'
        },

        /**
         * Объект, содержащий элементы редактора для
         * повторного обращения к ним
         *
         * @field
         * @name PostEditView#elements
         * @type {Object}
         */
        elements: {
            postBody: null,
            postTitle: null,
            toolbar: null,
            addLinkModal: null,
            linkNameInput: null,
            window: null,
            commandBtn: null,
            imageUpload: null
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
            var $el = params.$el,
                model = params.model;

            if ($el) {
                this.$el = $el;
            }
            this.model = model;
        },

        /**
         * Метод обработчик клика по кнопке 'Сохранить'
         *
         * @method
         * @name PostEditView#postSave
         * @returns {undefined}
         */
        postSave: function () {
            this.model.save();
        },

        /**
         * Метод сохраняет значение поля 'Загловок'  в модели
         *
         * @method
         * @name PostEditView#saveTileToModel
         * @returns {undefined}
         */
        saveTileToModel: function () {
            var $title = this.elements.postTitle,
                value = $title.val();

            this.model.set('title', value);
        },

        /**
         * Метод сохраняет тело стсатьи  в модели
         *
         * @method
         * @name PostEditView#saveBodyToModel
         * @returns {undefined}
         */
        saveBodyToModel: function () {
            var $postBody = this.elements.postBody,
                value = $postBody.html();

            this.model.set('body', value);
            this.saveSelection();
        },

        /**
         * Метод обработчик клика по кнопке редактирования на тулбаре
         *
         *
         * @method
         * @name PostEditView#applyCommand
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        applyCommand: function (event) {
            var $target = $(event.target),
                $button = $target.closest('.js-command'),
                command = $button.data('edit');

            this.elements.postBody.focus();
            this.restoreSelection();
            this.execCommand(command, null);
            $button.toggleClass('active');
        },

        /**
         * Метод делает активной кнопку, если к выделенному
         * тексту применена команада
         *
         * @method
         * @name PostEditView#updateToolbar
         * @returns {undefined}
         */
        updateToolbar: function () {
            this.elements.commandBtn.each(function () {
                var $button = $(this),
                    command = $button.data('edit');

                if (document.queryCommandState(command)) {
                    $button.addClass('active');
                } else {
                    $button.removeClass('active');
                }
            });
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
                scrollTop = $window.scrollTop(),
                toolbarIsOut = scrollTop >= toolbarPositionTop;

            toolbar.toggleClass('post-edit__toolbar-fixed', toolbarIsOut);
        },

        /**
         * Метод возвращает очищенное тело редактора
         *
         * @method
         * @name PostEditView#cleanHtml
         * @returns {string}
         */
        cleanHtml: function () {
            var html = this.elements.postBody.html();
            return html && html.replace(/(<br>|\s|<div>(<br>|\s|&nbsp;)*<\/div>|&nbsp;)*$/, '');
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
                this.elements.postBody.keydown(hotKey, _.bind(function () {
                    this.execCommand(command, null);
                    return false;
                }, this)).keyup(hotKey, _.bind(function (event) {
                    if (this.elements.postBody.attr('contenteditable') &&
                        this.elements.postBody.is(':visible')) {
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
            this.updateToolbar();
        },

        /**
         * Метод восстанавливает выделение в редакторе
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
                } catch (exception) {
                    document.body.createTextRange().select();
                    document.selection.empty();
                }

                selection.addRange(this.selectedRange);
            }

            this.updateToolbar();
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
         * Метод обработчик клика по кнопке
         * 'Сохранить' в модальном окне добавления ссылки
         *
         * @method
         * @name PostEditView#saveLinkHandler
         * @returns {undefined}
         */
        saveLinkHandler: function () {
            var url = this.elements.linkUrlInput.val();
            this.restoreSelection();
            this.execCommand('CreateLink', url);
            this.elements.addLinkModal.modal('hide');
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
            //TODO: добавить обработку ошибок
            this.elements.imageUpload.fileupload({
                url: Soshace.urls.api.images,
                dataType: 'json',
                done: function (event, data) {
                    var result = data.result;

                    preLoader.remove();

                    if (result.error) {
                        //TODO: добавить отображение ошибки
                        return;
                    }

                    _this.elements.postBody.append($('<img>', {
                        src: result.path,
                        class: 'img-responsive'
                    }));
                }
            }).on('change', function () {
                _this.elements.postBody.append(preLoader);
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
            this.elements.toolbar = this.$('.js-editor-toolbar');
            this.elements.commandBtn = this.$('.js-command');
            this.elements.postBody = this.$('.js-post-body');
            this.elements.postTitle = this.$('.js-post-title');
            this.elements.addLinkModal = this.$('.js-add-link-modal');
            this.elements.linkUrlInput = this.$('.js-add-link-modal-link-url');
            this.elements.imageUpload = this.$('.js-upload-image input');
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

            data.title = Helpers.i18n('Edit Post');
            data.editorDisabled = this.isEditorDisabled();
            data.paths = Soshace.urls;

            return data;
        },

        /**
         * TODO: сейчас не вызывается!
         *
         * Метод вызывается роутером перед выходом из вида
         *
         * @method
         * @name PostEditView#viewExitHandler
         * @returns {undefined}
         */
        viewExitHandler: function () {
            this.elements.window.off('scroll', this.windowScrollHandler);
        },

        /**
         * @method
         * @name PostEditView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.addImageButtonListener();
            this.toolbarInitOffset = this.elements.toolbar.offset();
            this.elements.window.on('scroll', _.bind(this.windowScrollHandler, this));
        }
    });
});