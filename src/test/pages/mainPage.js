/**
 * Created by rolandas on 6/21/16.
 */

var abstractPage = require('../../main/pages/abstractPage');

var MainPage = function () {

    var searchTermElement = $('input.searchTermInput');
    
    var searchLocationElement = $('input.searchLocationInput');
    var autocompleteResults = $$('ul.autocomplete-results>li>label>span[ng-bind="display(result)"]');
        
    var searchButton = $('button[type="submit"]');

    this.inputSearchTerm = function(txt) {
        //browser.driver.findElement(By.css(searchTermElement)).clear().sendKeys(txt);
        searchTermElement.clear();
        searchTermElement.sendKeys(txt);
        return this;
    };

    this.inputLocation = function(txt) {
        searchLocationElement.clear();
        searchLocationElement.sendKeys(txt);
        return this;
    };

    this.clickSearch = function() {
        searchButton.click();
        return this;
    };
    
    this.clickFirstAutocompleteResult = function() {
        autocompleteResults.first().click();
        return this;
    };
    
    this.inSearchResultsPage = function(fn) {
        return this.inPageDo('ResultsPage', this, fn);
    };

    this.checkElementPresent = function() {
        var elem = $('a.bigRedButton');
        browser.findElements(elem).then(
            function (elems) { console.log("big red elements count is " + elems.length) },
            function (err) { console.log("elements count failed " + err) }
        )
        return this;
    };

};

MainPage.prototype = abstractPage;
module.exports = new MainPage();
