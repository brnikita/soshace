require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'utils': 'utils',
            'jquery': 'libs/jquery',
            'underscore': 'libs/underscore',
            'bootstrap': 'libs/bootstrap',
            'prettify': 'libs/prettify',
            'ga': 'libs/google-analytics'
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