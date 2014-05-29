'use strict';

var PostsController = require('./controllers/posts/postsController'),
    UploadImageController = require('./controllers/uploadImageController'),
    AddPostsController = require('./controllers/posts/addPostController'),
    RegistrationController = require('./controllers/auth/registrationController'),
    LoginController = require('./controllers/auth/loginController'),
    UserController = require('./controllers/userController');

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

        //Загружаем изображение
        App.post('/upload_img', UploadImageController.upload);

        //Получаем список постов
        App.get('/api/posts', PostsController.getPosts);
        //Получаем пост
        App.get('/api/post', PostsController.getPost);

        //Добавляем пост
        App.post('/api/post', AddPostsController.addPost);

        App.post('/api/create_user', RegistrationController.createUser);

        //добавляем пост
        App.get('/:locale/add_post', AddPostsController.renderAddPost);

        //Главная страница
        App.get('/:locale', PostsController.renderPosts);

        App.get('/:locale/posts', function (request, response) {
            response.redirect('/ru');
        });

        //Страница отдельного поста
        App.get('/:locale/posts/:year/:month/:date/:titleUrl', PostsController.renderPost);

        //страница регистрации
        App.get('/:locale/registration', RegistrationController.renderRegistration);

        //страница входа
        App.get('/:locale/login', LoginController.renderLogin);

        App.get('/:locale/user/:id', UserController.renderUserPage);
    }
};