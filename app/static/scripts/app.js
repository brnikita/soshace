'use strict';

require([
    //Здесь подключаются зависимости, которе должны
    //будут попасть в сборку (которые нигде не подключены больше)
    'jquery',
    'underscore',
    'utils/helpers',
    'simpleClass',
    'jquery.validation',
    'modules/posts/postPreviewModule',
    'modules/posts/postDetailModule',
    'modules/posts/addPostModule',
    'google-analytics',
    'yandex-metrika'
], function ($, _, Helpers) {
    var Blog = {

        /**
         * @method
         * @name Blog.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var _this = this;

            //Инициализируем глобальную переменную
            window.Soshace = {
                errors: []
            };

            //Добавляем в конфинг локаль
            require.config({
                config: {
                    i18n: {
                        locale: Helpers.getLocale()
                    }
                }
            });

            $(function () {
                $('.js-module').each(function () {
                    _this.loadModule($(this));
                });
            });
        },

        /**
         * Инициализирует модули
         * по имени в атрибуте 'data-module'
         *
         * @method
         * @name Blog.loadModule
         * @param {jQuery} $el родительский элемет DOM модуля
         * @returns {undefined}
         */
        loadModule: function ($el) {
            var elementData = $el.data(),
                moduleName = elementData.module,
                modulePath;

            if (elementData.module) {
                modulePath = 'modules/' + moduleName;
                require([modulePath], _.bind(function (Module) {
                    new Module({$el: $el});
                }, this));
            }
        }
    };

    Blog.initialize();
});



