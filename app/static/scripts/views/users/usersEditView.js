'use strict';

(function(Soshace){
    var _ = Soshace._;

    /**
     * Вид страницы редактирования пользователя
     *
     * @class Soshace.views.UsersEditView
     */
    Soshace.views.UsersEditView = Soshace.core.View.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name Soshace.views.UsersEditView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name Soshace.views.UsersEditView#elements
         * @type {Object}
         */
        elements: {
            saveMessages: null,
            birthday: null,
            form: null
        },

        /**
         * Список обработчиков событий
         *
         * @field
         * @name Soshace.views.UsersEditView#events
         * @type {Object}
         */
        events: {
            'submit': 'submitHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name Soshace.views.UsersEditView#elements
         * @type {string}
         */
        template: Soshace.hbs['users/usersEdit'],

        /**
         * @constructor
         * @name Soshace.views.UsersEditView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Handlebars.registerPartial(
                'usersTabs',
                Soshace.hbs['partials/usersTabs']
            );
            Handlebars.registerPartial(
                'jquery/calendar/calendar',
                Soshace.hbs['partials/jquery/calendar/calendar']
            );
        },

        /**
         * Метод блокирует форму
         *
         * @method
         * @name Soshace.views.UsersEditView#formDisabled
         * @returns {undefined}
         */
        formDisabled: function () {

        },

        /**
         * Метод разблокирует форму
         *
         * @method
         * @name Soshace.views.UsersEditView#formEnabled
         * @returns {undefined}
         */
        formEnabled: function () {

        },

        /**
         * Метод показывает лоадер на кнопке
         *
         * @method
         * @name Soshace.views.UsersEditView#showButtonLoader
         * @returns {undefined}
         */
        showSubmitButtonLoader: function () {

        },

        /**
         * Метод скрывает лоадер
         *
         * @method
         * @name Soshace.views.UsersEditView#hideSubmitButtonLoader
         * @returns {undefined}
         */
        hideSubmitButtonLoader: function () {

        },

        /**
         * Метод устанавливает данные в модель взятые из шаблона
         *
         * @method
         * @name Soshace.views.UsersEditView#setModelFromTemplate
         * @returns {undefined}
         */
        setModelFromTemplate: function () {
            var $form = this.elements.form,
                userData = $form.data();

            this.model.set(userData);
        },

        /**
         * Метод возвращает сериализованную форму
         *
         * @method
         * @name Soshace.views.UsersEditView#getFormData
         * @returns {Object}
         */
        getFormData: function () {
            var $form = this.elements.form,
                serializedForm = $form.serializeArray();

            return _.object(_.map(serializedForm, function (field) {
                return [field.name, field.value];
            }));
        },

        /**
         * Метод обработчик отправки формы
         *
         * @method
         * @name Soshace.views.UsersEditView#submitHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        submitHandler: function (event) {
            var formData = this.getFormData(),
                diff;

            event.preventDefault();
            this.model.set(formData);
            diff = this.model.changed;

            if (_.isEmpty(diff)) {
                return;
            }

            this.formDisabled();
            this.showSubmitButtonLoader();
            Soshace.profile = this.model.toJSON();
            this.model.save(diff, {
                patch: true,
                success: _.bind(this.submitSuccessHandler, this),
                error: _.bind(this.submitErrorHandler, this)
            });
        },

        /**
         * Метод показывает системное сообщение после отправки формы
         *
         * @method
         * @name Soshace.views.UsersEditView#showSaveMessage
         * @param {string} message
         * @param {boolean} [isError] true, если нужно показать ошибку
         * @returns {undefined}
         */
        showSaveMessage: function (message, isError) {
            var $saveMessagesthis = this.elements.saveMessages,
                template;

            if (isError) {
                template = Soshace.hbs['messages/errorMessage']({
                    message: message
                });
            } else {
                template = Soshace.hbs['messages/successMessage']({
                    message: message
                });
            }

            $saveMessagesthis.html(template).removeClass('hide');
            Soshace.helpers.scrollToElementTop($saveMessagesthis);
        },

        /**
         * Метод скрывает системное сообщение после отправки формы
         *
         * @method
         * @name Soshace.views.UsersEditView#hideSaveMessage
         * @returns {undefined}
         */
        hideSaveMessage: function () {
            this.elements.saveMessages.addClass('hide');
        },

        /**
         * Метод обработчик успешного сохранения данных пользователя
         *
         * @method
         * @name Soshace.views.UsersEditView#submitSuccessHandler
         * @returns {undefined}
         */
        submitSuccessHandler: function () {
            this.hideSubmitButtonLoader();
            this.formEnabled();
            this.showSaveMessage('Profile successfully updated');
        },

        /**
         * Метод обработчик неудачного сохранения данных пользователя
         *
         * @method
         * @name Soshace.views.UsersEditView#submitErrorHandler
         * @param {UserModel} model модель пользователя
         * @param {Object} response ответ сервера
         * @returns {undefined}
         */
        submitErrorHandler: function (model, response) {
            var responseData = JSON.parse(response.responseText),
                error = responseData.error;

            this.hideSubmitButtonLoader();
            this.formEnabled();
            this.showSaveMessage(error, true);
        },

        /**
         * Метод используется в тех случаях, когда шаблон уже отрендерен
         * Но надо навесить слушатели и выполнить afterRender и т.д.
         *
         * @method
         * @name Soshace.views.UsersEditView#withoutRender
         * @param {jQuery} $el родительский элемент вида
         * @returns {undefined}
         */
        withoutRender: function ($el) {
            this.$el = $el;
            this.delegateEvents();
            this.setElements();
            this.setModelFromTemplate();
            this.model.getUser();
            this.setDatesControls();
        },

        /**
         * Метод возвращает True, если страница должна быть заблокирована
         * Если пользователь не авторизован или у пользователя не подтвержден email
         * см. Wiki
         *
         * @method
         * @name Soshace.views.UsersEditView#isDisabled
         * @returns {boolean}
         */
        isDisabled: function () {
            var app = Soshace.app,
                isAuthenticated = app.isAuthenticated(),
                profile;

            if (!isAuthenticated) {
                return true;
            }

            profile = Soshace.profile;
            return !profile.emailConfirmed;
        },

        /**
         * @method
         * @name Soshace.views.UsersEditView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                isAuthenticated = app.isAuthenticated(),
                data = {},
                model = this.model.toJSON(),
                profile = Soshace.profile,
                isOwner = isAuthenticated && model._id === profile._id;

            data.user = model;
            data.isOwner = isOwner;
            data.isUserEditTab = true;
            data.locale = Soshace.helpers.getLocale();
            data.sexList = this.model.getSexList();
            data.isDisabled = this.isDisabled();

            return data;
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name Soshace.views.UsersEditView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.form = this.$('.js-form');
            this.elements.saveMessages = this.$('.js-save-messages');
            this.elements.birthday = this.$('.js-birthday-calendar');
        },

        /**
         * Метод применяет плагин календаря к полям
         *
         * @method
         * @name Soshace.views.UsersEditView#setDatesControls
         * @returns {undefined}
         */
        setDatesControls: function () {
            this.elements.birthday.calendar();
        },

        /**
         * @method
         * @name Soshace.views.UsersEditView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.setDatesControls();
        }
    });
})(window.Soshace);