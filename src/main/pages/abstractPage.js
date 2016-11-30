var AbstractPage = function() {

    /**
     * wait and verify that a page is loaded
     * 
     * @requires a page to include `pageLoaded` property
     */
    this.at = function() {
        var that = this;
        return browser.wait(function() {
            return that.pageLoaded.call();
        }, 10000);
    };

    this.elementWaitTimeout = 5000;


    /**
     * navigate to a page via it's `url` var
     * and verify/wait via at()
     * 
     * @requires page have both `url` and `pageLoaded` properties
     */
    this.goTo = function() {
        browser.get(this.url, 5000);
        return this.at();
    };

    /**
     * Wrappers for expected conditions
     *
     * I find ECs are generally poorly named, so we wrap them in
     * methods that are 9% more sexy, and allow us to add logging, etc...
     *
     * @returns {ExpectedCondition}
     */
    var EC = protractor.ExpectedConditions;

    this.isVisible = function(locator) {
        return EC.visibilityOf(locator);
    };

    this.isNotVisible = function(locator) {
        return EC.invisibilityOf(locator);
    };

    this.inDom = function(locator) {
        return EC.presenceOf(locator);
    };

    this.notInDom = function(locator) {
        return EC.stalenessOf(locator);
    };

    this.isClickable = function(locator) {
        return EC.elementToBeClickable(locator);
    };

    this.hasText = function(locator, text) {
        return EC.textToBePresentInElement(locator, text);
    };

    this.and = function(arrayOfFunctions) {
        return EC.and(arrayOfFunctions);
    };

    this.titleIs = function(title) {
        return EC.titleIs(title);
    };

    /**
     * test if an element has a class
     * 
     * @param  {elementFinder} locator - eg. $('div#myId')
     * @param  {string}  klass  - class name
     * @return {Boolean} - does the element have the class?
     */
    this.hasClass = function(locator, klass) {
        browser.sleep(500);
        return locator.getAttribute('class').then(function(classes) {
            return classes.split(' ').indexOf(klass) !== -1;
        });
    };

    /**
     * Webdriver equivilant to hitting Enter/Return key.
     */
    this.hitReturn = function() {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    };

    /**
     * switches to a new window/tab via index
     * Note: call from the page you intend to switch to, we wait 
     * for correct page to load via .at()
     *
     * @param {int} index - the index of the window to switch to
     */
    this.switchToWindow = function(index) { 
        var that = this;
        browser.getAllWindowHandles().then(function(handles) {
            console.log('Switching to window ' + index);
            browser.switchTo().window(handles[index]);
            that.at();
        });
    };

    this.then = function(fn) {
        browser.controlFlow().execute(fn);
        return this;
    }

    /*
    this.expect = function(fn) {
        fn().then(function(v){
            expect(v)});
        return this;
    }
    */

    /**
     * get an element's width
     * extend's protractors ElementFinder
     * 
     * @return {int} - the width of the element
     */
    protractor.ElementFinder.prototype.getWidth = function () {
        return this.getSize().then(function (size) {
            return size.width;
        });
    };

    this.selectDropdownByNum = function ( element, optionNum ) {
        var self = this;
        if(!optionNum) {
            throw 'Cannot select from dropdown by option number as it is empty';
        }
        element.all(by.tagName('option')).filter(function(elem, index) {
            var n = self.getValue(optionNum);
            return index == n;
        }).first().click();
    };

    this.selectDropdownByRegexp = function (element, rexp) {
        var self = this;
        var re = '';
        if(!rexp) {
            throw 'Cannot select from dropdown by regexp as it is empty';
        }
        element.all(by.tagName('option')).filter(function(elem, index) {
            re = new RegExp(self.getValue(rexp));
            return elem.getText().then(function(txt){
                return re.test(txt);
            })
        }).first().click();
    };

    this.selectDropDownByValue = function(element, value){
        var self = this;
        if(!value) {
            throw 'Cannot select from dropdown by value as it is empty';
        }
        element.all(by.tagName('option')).filter(function(elem) {
            return elem.getAttribute('value').then(function(itemValue){
                return itemValue == value;
            })
        }).first().click();

    }

    this.pageContext = this.then(function(){this.pageContext={}});


    var hasProperty = function has(object, key) {
        return object ? hasOwnProperty.call(object, key) : false;
    }

    this.getValue = function(valueObject) {
        if(typeof valueObject == 'function') {
            return valueObject();
        }
        if(typeof valueObject == 'object') {
            if(hasProperty(valueObject, 'getValue')) {
                return valueObject.getValue();
            }
        }
        return valueObject;
    }

    var requirePage = function(pagePath) {
        return require('../../../src/test/posse/' + pagePath);
    };

    this.createPage = function(pagePath, parent){
        if(typeof parent == 'undefined') {
            parent = this;
        }
        var Page = requirePage(pagePath);
        Page.prototype = parent;
        var newPage = new Page();
        return newPage;
    }

    this.inPageDo = function(pagePath, parent, scriptFn) {
        var page = this.createPage(pagePath, parent);
        scriptFn(page);
        return this;
    }

};

AbstractPage.prototype = protractor.ExpectedConditions;
module.exports = new AbstractPage();