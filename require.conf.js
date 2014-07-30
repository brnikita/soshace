require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'utils': 'utils',
            'jquery': 'vendors/jquery',
            'underscore': 'vendors/underscore',
            'underscore.string': 'vendors/underscore/underscore.string',
            'bootstrap': 'vendors/bootstrap',
            'prettify': 'vendors/prettify',
            'handlebars': 'vendors/handlebars',
            'class': 'vendors/class',
            'google-analytics': 'vendors/google-analytics',
            'yandex-metrika': 'vendors/yandex-metrika',
            'jquery.hotkeys': 'vendors/jquery/jquery.hotkeys',
            'jquery.cookie': 'vendors/jquery/jquery.cookie',
            'jquery.fileupload': 'vendors/jquery/jquery.fileupload',
            'jquery.ui.widget': 'vendors/jquery/jquery.ui.widget',
            'backbone': 'vendors/backbone',
            'backbone.layoutmanager': 'vendors/backbone/backbone.layoutmanager',
            'backbone.validation': 'vendors/backbone/backbone.validation',
            'config': 'config',
            'templates': 'templates'

        },
        shim: {
            underscore: {
                exports: '_'
            },
            jquery: {
                exports: '$'
            },
            'bootstrap': {
                deps: [
                    'jquery'
                ]
            },
            'jquery.hotkeys': {
                deps: [
                    'jquery'
                ]
            },
            'jquery.cookie': {
                deps: [
                    'jquery'
                ]
            },
            'jquery.ui.widget': {
                deps: [
                    'jquery'
                ]
            },
            'jquery.fileuplaod': {
                deps: [
                    'jquery',
                    'jquery.ui.widget',
                    'jquery.iframe-transport'
                ]
            },
            'underscore.string': {
                deps: [
                    'underscore'
                ]
            },
            'backbone': {
                deps: [
                    'jquery',
                    'underscore'
                ],
                exports: 'Backbone'
            },
            'backbone.layoutmanager': {
                deps: [
                    'backbone'
                ]
            },
            'handlebars': {
                exports: 'Handlebars'
            },
            'class': {
                exports: 'Class'
            }
        },
        deps: [
            'config',
            'handlebars',
            'templates',
            'bootstrap',
            'utils/handlebarsHelpers',
            'google-analytics',
            'yandex-metrika',
            'app'
        ]
    }
);