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
            'yandex-metrika': 'libs/yandex-metrika'
        },
        shim: {
            'bootstrap': {
                deps: [
                    'jquery'
                ]
            }
        }
    }
);