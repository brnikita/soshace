require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'utils': 'utils',
            'jquery': 'libs/jquery',
            'underscore': 'libs/underscore',
            'underscore.string': 'libs/underscore/underscore.string',
            'bootstrap': 'libs/bootstrap',
            'prettify': 'libs/prettify',
            'handlebars': 'libs/handlebars',
            'google-analytics': 'libs/google-analytics',
            'yandex-metrika': 'libs/yandex-metrika',
            'jquery.validation': 'libs/jquery/jquery.validation',
            'jquery.hotkeys': 'libs/jquery/jquery.hotkeys',
            'jquery.cookie': 'libs/jquery/jquery.cookie',
            'jquery.fileupload': 'libs/jquery/jquery.fileupload',
            'jquery.ui.widget': 'libs/jquery/jquery.ui.widget',
            'jquery.iframe-transport': 'libs/jquery/jquery.iframe-transport',
            'backbone': 'libs/backbone',
            'backbone.layoutmanager': 'libs/backbone/backbone.layoutmanager',
            'backbone.validation': 'libs/backbone/backbone.validation'

        },
        shim: {
            'bootstrap': {
                deps: [
                    'jquery'
                ]
            },
            'jquery.validation': {
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
            'jquery.iframe-transport': {
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
                ]
            },
            'backbone.layoutmanager': {
                deps: [
                    'backbone'
                ]
            },
            'backbone.validation': {
                deps: [
                    'backbone',
                    'underscore'
                ]
            },
            'handlebars': {
                exports: 'Handlebars'
            }
        }
    }
);