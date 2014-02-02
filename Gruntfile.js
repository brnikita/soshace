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
            dist: 'static'
        },

        //следит за изменениями
        watch: {
            scripts: {
                files: '<%= blog.app %>/static/scripts/**/*.js',
                tasks: [
                    'jshint',
                    'copy:dev'
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
                    'copy:dev'
                ]
            },
            icons: {
                files: '<%= blog.app %>/static/*.ico',
                tasks: [
                    'copy:dev'
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
                    'copy:dev'
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
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= blog.app %>/static',
                        dest: '<%= blog.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'bower_components/**/*.js',
                            'scripts/**/*.js',
                            'images/{,*/}*.{png,jpg,jpeg,gif,svg}',
                            'fonts/*',
                            'views/**/*.html'
                        ]
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= blog.app %>/static',
                        dest: '<%= blog.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'images/{,*/}*.{png,jpg,jpeg,gif,svg}',
                            'fonts/*'
                        ]
                    }
                ]
            }
        },

        // Проверяем код на наличие синтаксических ошибок
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: '<%= blog.app %>/static/scripts/libs/{,*/}*.js'
            },
            all: [
                'Gruntfile.js',
                '<%= blog.app %>/static/scripts/{,*/}*.js',
                '<%= blog.app %>/src/scripts/{,*/}*.js'
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
                    include: ['libs/require.js']
                }
            }
        }
    });

    //Девелоперская версия
    grunt.registerTask('dev', [
        'newer:jshint:all',
        'clean',
        'copy:requireConfig',
        'copy:dev',
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
        'dev'
    ]);
};