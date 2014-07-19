'use strict';

module.exports = function (grunt) {

    // Загружает grunt tasks автоматически
    require('load-grunt-tasks')(grunt);

    //Модуль показывает время выполнения всех задач в консоли
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Настройки проекта
        blog: {
            // Путь до проекта
            app: 'app',
            //Папка, в котрую grunt будет сливать получившуюся после
            //после сбоки и минификации статику
            dist: 'dist'
        },

        //следит за изменениями
        watch: {
            scripts: {
                files: '<%= blog.app %>/static/scripts/**/*.js',
                tasks: [
                    'copy:scripts'
                ]
            },
            css: {
                files: '<%= blog.app %>/static/styles/**/*.less',
                tasks: [
                    'less:dev'
                ]
            },
            images: {
                files: '<%= blog.app %>/static/images/{,*/}*.{png,jpg,jpeg,gif,svg}',
                tasks: [
                    'copy:images'
                ]
            },
            icons: {
                files: '<%= blog.app %>/static/*.ico',
                tasks: [
                    'copy:images'
                ]
            },
            requireConfig: {
                files: 'require.conf.js',
                tasks: [
                    'copy:requireConfig'
                ]
            },
            fonts: {
                files: '<%= blog.app %>/static/fonts/*',
                tasks: [
                    'copy:fonts'
                ]
            },
            views: {
                files: '<%= blog.app %>/views/**/*.hbs',
                tasks: [
                    'copy:views'
                ]
            },
            locales: {
                files: '<%= blog.app %>/locales/*.json',
                tasks: [
                    'copy:locales'
                ]
            }
        },

        // Очищаем папку статики
        clean: ['<%= blog.dist %>/*'],

        // Копируем файлы из папки статики
        copy: {
            requireConfig: {
                files: [
                    {
                        dest: '<%= blog.dist %>/require.conf.js',
                        src: 'require.conf.js'
                    }
                ]
            },
            scripts: {
                expand: true,
                cwd: '<%= blog.app %>/static/',
                dest: '<%= blog.dist %>',
                src: 'scripts/**/*.js'
            },
            images: {
                expand: true,
                cwd: '<%= blog.app %>/static/',
                dest: '<%= blog.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    'images/{,*/}*.{png,jpg,jpeg,gif,svg}'
                ]
            },
            fonts: {
                expand: true,
                cwd: '<%= blog.app %>/static',
                dest: '<%= blog.dist %>',
                src: 'fonts/*'
            },
            views: {
                expand: true,
                cwd: '<%= blog.app %>',
                src: 'views/**/*.hbs',
                dest: '<%= blog.dist %>'
            },
            locales: {
                expand: true,
                cwd: '<%= blog.app %>',
                src: 'locales/**/*.json',
                dest: '<%= blog.dist %>'
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= blog.app %>/static',
                        dest: '<%= blog.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'scripts/**/*.js',
                            'images/{,*/}*.{png,jpg,jpeg,gif,svg}',
                            'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= blog.app %>',
                        src: 'views/**/*.hbs',
                        dest: '<%= blog.dist %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= blog.app %>',
                        src: 'locales/**/*.json',
                        dest: '<%= blog.dist %>'
                    }
                ]
            }
        },

        // Проверяем код на наличие синтаксических ошибок
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= blog.app %>/static/{,*/}*.js',
                '<%= blog.app %>/src/{,*/}*.js',
                '!<%= blog.app %>/static/scripts/vendors/{,*/}*.js',
                '!<%= blog.app %>/src/vendors/{,*/}*.js'
            ]
        },

        //Конфигурируем стили
        less: {
            dev: {
                files: {
                    '<%= blog.dist %>/styles/styles.css': '<%= blog.app %>/static/styles/styles.less'
                }
            },
            prod: {
                options: {
                    compress: true
                },
                files: {
                    '<%= blog.dist %>/styles/styles.css': '<%= blog.app %>/static/styles/styles.less'
                }
            }
        },

        //Собираем скрипты
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= blog.app %>/static/scripts/',
                    name: 'app',
                    mainConfigFile: 'require.conf.js',
                    out: '<%= blog.dist %>/scripts/scripts.min.js',
                    include: ['vendors/require.js']
                }
            }
        }
    });

    //Девелоперская версия
    grunt.registerTask('copyDev', [
        'copy:requireConfig',
        'copy:scripts',
        'copy:views',
        'copy:locales',
        'copy:images',
        'copy:fonts'
    ]);

    //Девелоперская версия
    grunt.registerTask('dev', [
        'newer:jshint:all',
        'clean',
        'copyDev',
        'less:dev',
        'watch'
    ]);

    //Верия для продакшена
    grunt.registerTask('prod', [
        'newer:jshint:all',
        'clean',
        'copy:prod',
        'requirejs',
        'less:prod'
    ]);

    grunt.registerTask('default', [
        'copyDev',
        'less:dev',
        'watch'
    ]);
};