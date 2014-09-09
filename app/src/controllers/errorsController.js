'use strict';
var Controller = srcRequire('common/controller');

/**
 * Контроллер страниц ошибок
 *
 * @class ErrorsController
 */
module.exports = Controller.extend({
    /**
     * Метод рендерит страницу 404
     *
     * @method
     * @name ErrorsController#render404
     * @returns {undefined}
     */
    render404: function () {
        this.renderError('Page not found', 404);
    }
});