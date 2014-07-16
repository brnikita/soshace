'use strict';

var PostsController = require('./controllers/posts/postsController'),
    UploadImageController = require('./controllers/uploadImageController'),
    AddPostsController = require('./controllers/posts/addPostController'),
    RegistrationController = require('./controllers/auth/registrationController'),
    LoginController = require('./controllers/auth/loginController'),
    UserController = require('./controllers/userController');

module.exports = function (App) {
    //--------------------API------------------------------//
    //Загружаем изображение
    App.post('/api/upload_img', function(request, response){
        var uploadImageController = new UploadImageController(request, response);
        uploadImageController.upload();
    });

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
    App.post('/api/post', function(request, response){
        var addPostsController = new AddPostsController(request, response);
        addPostsController.addPost();
    });

    App.post('/api/create_user', function(request, response){
        var registrationController = new RegistrationController(request, response);
        registrationController.createUser();
    });

    App.get('/api/get_user', function(request, response){
        var userController = new UserController(request, response);
        userController.getUser();
    });

    App.get('/api/get_profile', function(request, response){
        var userController = new UserController(request, response);
        userController.getProfile();
    });

    App.post('/api/login', function(request, response, next){
        var loginController = new LoginController(request, response, next);
        loginController.loginHandler();
    });

    App.get('/api/logout', function(request, response, next){
        var loginController = new LoginController(request, response, next);
        loginController.logoutHandler();
    });

    App.get('/api/registration/validate_field', function(request, response){
        var registrationController = new RegistrationController(request, response);
        registrationController.validateField();
    });

    //--------------------API END------------------------------//

    App.get('/', function (request, response) {
        var locale = request.i18n.getLocale();
        response.redirect('/' + locale);
    });

    //добавляем пост
    App.get('/:locale/add_post', function(request, response){
        var addPostsController = new AddPostsController(request, response);
        addPostsController.renderAddPost();
    });

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
    App.get('/:locale/registration', function(request, response){
        var registrationController = new RegistrationController(request, response);
        registrationController.renderRegistration();
    });

    //страница входа
    App.get('/:locale/login', function(request, response){
        var loginController = new LoginController(request, response);
        loginController.renderLogin();
    });

    App.get('/:locale/user/:id', function(request, response){
        var userController = new UserController(request, response);
        userController.renderUserPage();
    });

    App.get('/:locale/registration/confirm_email', function(request, response){
        var registrationController = new RegistrationController(request, response);
        registrationController.renderConfirmAccountPage();
    });
};