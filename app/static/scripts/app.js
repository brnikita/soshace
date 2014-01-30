'use strict';

require([
    //Здесь подключаются зависимости, которе должны
    //будут попасть в сборку
    'jquery',
    'underscore',
    'jquery.validation',
    'modules/posts/postPreviewModule',
    'modules/posts/postDetailModule',
    'modules/posts/addPostModule',
    'google-analytics',
    'yandex-metrika'
], function ($) {
    var Blog = {

        /**
         * @method
         * @name Blog.initialize
         * @returns {undefined}
         */
        initialize: function () {
            var _this = this;

            $(function () {
                $('.js-module').each(_this.loadModule);
            });
        },

        /**
         * Инициализирует модули
         * по имени в атрибуте 'data-module'
         *
         * @method
         * @name Blog.loadModule
         * @returns {undefined}
         */
        loadModule: function () {
            var $this = $(this),
                elementData = $this.data(),
                modulePath;

            if (elementData.module) {
                modulePath = 'modules/' + elementData.module;
                require([modulePath], function (module) {
                    module.initialize({
                        context: $this
                    });
                });
            }
        }
    };

    Blog.initialize();
});



