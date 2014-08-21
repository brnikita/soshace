'use strict';
var _ = require('underscore'),
    Controller = srcRequire('common/controller'),
    PostsModel = srcRequire('models/postsModel'),
    RequestParams = srcRequire('common/requestParams');

/**
 * Контроллер страницы адмистрирования
 *
 * @class AdminController
 */
module.exports = Controller.extend({
    /**
     * Рендерим страницу регистрации
     *
     * @method
     * @name AdminController#renderLogin
     * @return {undefined}
     */
    renderAdmin: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            locale = requestParams.locale;
        
        if(!requestParams.isAuthenticated){
            response.render('404', requestParams);
            return;
        }

        if(!requestParams.profile.admin){
            response.render('404', requestParams);
            return;
        }

        PostsModel.getStatusSentPosts(locale, _.bind(this.renderAdminHandler, this));
    },

    /**
     * Метод рендерит страницу для адмистрирования после
     * получения статей для адмистирования
     *
     * @method
     * @name AdminController#renderAdminHandler
     * @param {Object} error
     * @param {Array} posts список стай для администрирования
     * @returns {undefined}
     */
    renderAdminHandler: function(error, posts){
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request);

        if(error){
            //TODO: сделать рендер страниц ошибок
            this.render('');
            return;
        }

        response.render('admin/admin', _.extend(requestParams, {
            posts: posts,
            title: 'Admin page'
        }));
    }
});