'use strict';

var PostsController = require('./../controllers/postsController').PostsController,
    _ = require('underscore');

var Router = {
    /**
     * @public
     * @function
     * @name Router.init
     * @param {Object} App объект приложения
     * @returns {undefined}
     */
    init: function (App) {
        App.get('/', function (request, response) {
            response.redirect('/ru');
        });

        //Получаем список постов
        App.get('/api/posts', PostsController.getPosts);
        //Получаем пост
        App.get('/api/post', PostsController.getPost);
        //Добавляем пост
        App.post('/api/post', PostsController.addPost);

        //TODO: временная страница
        //добавляем пост
        App.get('/_admin_s/_add_post', PostsController.renderAddPost);

        //Главная страница
        App.get('/:locale', PostsController.renderPosts);

        App.get('/:locale/posts', function(request, response){
            response.redirect('/ru');
        });

        //Страница отдельного поста
        App.get('/:locale/posts/:year/:month/:day/:titleUrl', PostsController.renderPost);
    }
};

exports.Router = Router;