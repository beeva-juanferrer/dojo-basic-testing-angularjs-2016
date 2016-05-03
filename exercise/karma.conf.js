module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/*.js',
            'app/components/**/*.js',
            'app/view*/**/*.js',
            'app/users/*.js',
            'app/users/models/*.js',
            'app/users/directives/*.js',
            'app/**/*.html',
            'test/**/*.js'
        ],

        autoWatch: false,

        frameworks: ['jasmine'],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'app/*.html': ['html2js'],
            'app/{components,users,view*}/**/*.html': ['ng-html2js'],
            'app/{view*,users}/**/*.js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: function (htmlPath, originalPath) {
                console.log(htmlPath);
                console.log(originalPath);
                return htmlPath.split('/')[0];
            }
        },

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        browsers: ['PhantomJS'],

        port: 8082,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        singleRun: true
    });
};
