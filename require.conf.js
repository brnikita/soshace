require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'utils': 'utils',
            'jquery': 'libs/jquery',
            'underscore': 'libs/underscore',
            'bootstrap': 'libs/bootstrap',
            'prettify': 'libs/prettify',
            'google-analytics': 'libs/google-analytics',
            'yandex-metrika': 'libs/yandex-metrika',
            'jquery.validation': 'libs/jquery/jquery.validation',
            'jquery.hotkeys': 'libs/jquery/jquery.hotkeys',
            'bootstrap.wysiwyg': 'libs/bootstrap/bootstrap.wysiwyg'
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
            'bootstrap.wysiwyg':{
                deps: [
                    'bootstrap',
                    'prettify',
                    'jquery.hotkeys'
                ]
            }
        }
    }
);