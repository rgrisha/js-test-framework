/**
 * Created by rolandas on 6/21/16.
 */

var abstractPage = require('../../main/pages/abstractPage');

var ResultsPage = function() {

    var resultPlaceNameElements = element.all(by.css('div.placeDetailsRow div.placeName span.ng-binding'));
    
    this.getFirstResult = function(res) {
        resultPlaceNameElements.first().getText().then(function(tx) {
            res.setValue(tx);
        });
		return this;
    };

     this.getSecondResult = function(res) {
        resultPlaceNameElements.get(1).getText().then(function(tx) {
            res.setValue(tx);
        });
		return this;
    };
    
}

ResultsPage.prototype = abstractPage;
module.exports = ResultsPage;
