'use strict';

var PostsController = require('./controllers/posts/postsController'),
    AddPostsController = require('./controllers/posts/addPostController');

module.exports = {
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
        App.post('/api/post', AddPostsController.addPost);

        //TODO: временная страница
        //добавляем пост
        App.get('/add_post', AddPostsController.renderAddPost);

        //Главная страница
        App.get('/:locale', PostsController.renderPosts);

        App.get('/:locale/posts', function (request, response) {
            response.redirect('/ru');
        });

        //Страница отдельного поста
        App.get('/:locale/posts/:year/:month/:day/:titleUrl', PostsController.renderPost);
    }
};