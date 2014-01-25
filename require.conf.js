require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'utils': 'utils',
            'jquery': 'libs/jquery',
            'underscore': 'libs/underscore',
            'bootstrap': 'libs/bootstrap',
            'prettify': 'libs/prettify'
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