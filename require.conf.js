require.config(
    {
        baseUrl: '/static/',
        paths: {
            'jquery': 'scripts/libs/jquery',
            'bootstrap': 'scripts/libs/bootstrap',
            'prettify': 'scripts/libs/prettify'
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