/**
 * Created by rolandas on 6/21/16.
 */

require('jasmine-expect');

var mainPage = require('../pages/mainPage');

var PosseCase = function() {

    describe ('Posse test suite', function() {

        it('Click search and check result', function() {

            browser.get("");
            
            mainPage
                .checkElementPresent()
                .inputSearchTerm('Coffee')
                .inputLocation('London')
                .clickFirstAutocompleteResult()
                .clickSearch()
                .inSearchResultsPage(function(p) {p
                    .getFirstResult(res)
                    .getSecondResult(res)
                })
				/*
                .then(function(){
                    expect(res.getValue()).toBe("Borough Market");
                    console.log('element present: ' + pre.getValue());
                })*/
				;

			expect(res).toBe("Borough Market-z");

        });
       
    })
}

module.exports = new PosseCase();
