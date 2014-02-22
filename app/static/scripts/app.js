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
                //Заменяем слеши на точки
                formattedModuleName = moduleName.replace(/\//g, '.'),
                modulePath;

            if (elementData.module) {
                modulePath = 'modules/' + moduleName;
                require([modulePath], _.bind(function (module) {
                    module.$el = $el;
                    module.initialize();
                    this._delegateEvents(module, module.events, $el, formattedModuleName);
                }, this));
            }
        },

        /**
         * Берет список событий из events и навешивает на
         * родительский элемент $el
         *
         * Метод выдран из Backbone и немного переписан)
         *
         *  Set callbacks, where `this.events` is a hash of
         *
         * *{"event selector": "callback"}*
         *
         *     {
         *          'mousedown .title':  'edit',
         *          'click .button':     'save',
         *          'click .open':       function(e) { ... }
         *      }

         * pairs. Callbacks will be bound to the view, with `this` set properly.
         * Uses event delegation for efficiency.
         * Omitting the selector binds the event to `this.el`.
         * This only works for delegate-able events: not `focus`, `blur`, and
         * not `change`, `submit`, and `reset` in Internet Explorer.
         *
         * @private
         * @method
         * @name Blog._delegateEvents
         * @param {Object} module интересующий модуль
         * @param {Object} events список обработчиков событий
         * @param {jQuery} $el корневой элемент модуля
         * @param {string} moduleIndex идентификатор модуля (название модуля)
         * @returns {undefined}
         */
        _delegateEvents: function (module, events, $el, moduleIndex) {
            var key,
                method,
                match,
                selector,
                eventName,
                delegateEventSplitter = /^(\S+)\s*(.*)$/;

            if (typeof events !== 'object') {
                return;
            }

            this._unDelegateEvents($el, moduleIndex);

            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    method = events[key];

                    if (!_.isFunction(method)) {
                        method = module[events[key]];
                    }

                    if (!method) {
                        continue;
                    }

                    match = key.match(delegateEventSplitter);
                    eventName = match[1];
                    selector = match[2];
                    method = _.bind(method, module);
                    eventName += '.delegateEvents' + moduleIndex;

                    if (selector === '') {
                        $el.on(eventName, method);
                    } else {
                        $el.on(eventName, selector, method);
                    }
                }

            }
        },

        /**
         * Очищает все callback навешенные на родительский элемент DOM
         * модуля. Удаляются только те слушатели, которые бы навешены самим модулем
         * до этого.
         *
         * Clears all callbacks previously bound to the view with `delegateEvents`.
         * You usually don't need to use this, but may wish to if you have multiple
         * Backbone views attached to the same DOM element.
         *
         * @private
         * @name Blog._unDelegateEvents
         * @param {jQuery} $el корневой элемент модуля
         * @param {string} moduleIndex идентификатор модуля (название модуля)
         * @returns {undefined}
         */
        _unDelegateEvents: function ($el, moduleIndex) {
            $el.off('.delegateEvents' + moduleIndex);
        }
    };

    Blog.initialize();
});



