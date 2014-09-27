'use strict';

/**
 * Класс Контроллра
 *
 * @class Soshace.core.Controller
 */
Soshace.core.Controller = Soshace.core.Class.extend({
    /**
     * Алиас страницы
     *
     * @field
     * @name Soshace.core.Controller#pageAlias
     * @type {string}
     */
    pageAlias: Soshace.pageAlias,

    /**
     * Параметры запроса из роута
     *
     * @field
     * @name Soshace.core.Controller#routeParams
     * @type {Array | null}
     */
    routeParams: null,

    /**
     * Метод вызывает при рендере на сервере
     *
     * Метод должен быть переопрделен в унаследованном классе
     *
     * @method
     * @name Soshace.core.Controller#firstLoad
     * @returns {undefined}
     */
    firstLoad: function () {

    },

    /**
     * Метод вызывает при рендере на клиенте
     *
     * Метод должен быть переопрделен в унаследованном классе
     *
     * @method
     * @name Soshace.core.Controller#firstLoad
     * @returns {undefined}
     */
    secondLoad: function () {

    },

    /**
     * Метод вызывавется роутером,
     * в него передаются параметры запроса
     *
     * @method
     * @name Soshace.core.Controller#routeHandler
     * @returns {undefined}
     */
    routeHandler: function () {
        var app = Soshace.app,
            pageAlias = this.pageAlias;

        Soshace.pageAlias = pageAlias;

        if (typeof arguments !== 'undefined') {
            this.routeParams = arguments;
        }

        app.getView('.js-header').changeTab(pageAlias);
        app.getView('.js-system-messages').changePage(pageAlias);
        if (Soshace.firstLoad) {
            Soshace.firstLoad = false;
            this.firstLoad();
            return;
        }

        this.secondLoad();
    }
});