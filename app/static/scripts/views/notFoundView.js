'use strict';

(function (Soshace) {
    /**
     * Вид страницы 404
     *
     * @class Soshace.views.NotFoundView
     */

    Soshace.views.NotFoundView = Soshace.core.View.extend({
        /**
         * Путь до шаблона
         *
         * @field
         * @name Soshace.views.NotFoundView#template
         * @type {string}
         */
        template: Soshace.hbs['404']
    });
})(window.Soshace);