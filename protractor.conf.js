var HtmlReporter = require('protractor-html-screenshot-reporter');

var timeout = 70;

exports.config = {
    //seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar",

    specs: ['src/test/**/*.spec.js'],
    baseUrl: 'http://posse.com',
    framework: 'jasmine2',

    allScriptsTimeout: timeout * 1000,

    onPrepare: function(){
        // set implicit wait times in ms...
        browser.manage().timeouts().pageLoadTimeout(timeout * 1000);
        browser.manage().timeouts().implicitlyWait(timeout * 1000);
        // set browser size...
        browser.manage().window().maximize();
        // better jasmine 2 reports...
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    },

    capabilities: {
		browserName: 'chrome'
	},

    jasmineNodeOpts: {
        showColors: true,
        displayStacktrace: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: function () {},
        defaultTimeoutInterval: timeout * 1000
    }

};
