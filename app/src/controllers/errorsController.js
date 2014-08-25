'use strict';
var _ = require('underscore'),
    Controller = srcRequire('common/controller'),
    RequestParams = srcRequire('common/requestParams');

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
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request);

        response.render(404, _.extend(requestParams, {status: 404}));
    }
});