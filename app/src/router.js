'use strict';

var PostsController = require('./controllers/posts/postsController'),
    UploadImageController = require('./controllers/uploadImageController'),
    AddPostsController = require('./controllers/posts/addPostController'),
    RegistrationController = require('./controllers/auth/registrationController'),
    LoginController = require('./controllers/auth/loginController'),
    UserController = require('./controllers/userController');

module.exports = function (App) {
    App.get('/', function (request, response) {
        //TODO: убрать хардкод
        response.redirect('/ru');
    });

    //Загружаем изображение
    App.post('/upload_img', UploadImageController.upload);

    //Получаем список постов
    App.get('/api/posts', function (request, response) {
        var postsController = new PostsController(request, response);
        postsController.getPosts();
    });
    //Получаем пост
    App.get('/api/post', function (request, response) {
        var postsController = new PostsController(request, response);
        postsController.getPost();
    });

    //Добавляем пост
    App.post('/api/post', AddPostsController.addPost);

    App.post('/api/create_user', RegistrationController.createUser);

    //добавляем пост
    App.get('/:locale/add_post', AddPostsController.renderAddPost);

    //Главная страница
    App.get('/:locale', function (request, response) {
        var postsController = new PostsController(request, response);
        postsController.renderPosts();
    });

    App.get('/:locale/posts', function (request, response) {
        response.redirect('/ru');
    });

    //Страница отдельного поста
    App.get('/:locale/posts/:year/:month/:date/:titleUrl', function (request, response) {
        var postsController = new PostsController(request, response);
        postsController.renderPost();
    });

    //страница регистрации
    App.get('/:locale/registration', RegistrationController.renderRegistration);

    //страница входа
    App.get('/:locale/login', LoginController.renderLogin);

    App.get('/:locale/user/:id', UserController.renderUserPage);

    App.get('/registration/confirm-email', RegistrationController.confirmAccount);
};