require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'jquery': 'libs/jquery',
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