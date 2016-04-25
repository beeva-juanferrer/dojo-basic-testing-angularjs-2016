module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/components/**/*.js',
            'app/view*/**/*.js',
            'test/**/*.js',
            'app/app.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'app/view*/**/*.js': ['coverage'],
            'app/app.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        browsers: ['PhantomJS'],

        // plugins: [
        //     'karma-chrome-launcher',
        //     'karma-firefox-launcher',
        //     'karma-jasmine',
        //     'karma-junit-reporter',
        // ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        singleRun: true
    });
};
