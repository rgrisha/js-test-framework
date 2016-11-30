(function(){

    "use strict";

    var _ = require("lodash");

    /* stores value when invoked setValue
     * has then method, thus is recognized as a promise by Promise.js
     * Serves as a base object for all other value store objects*/
    var SaveToObject = function(name, defaultValue) {

        var value = _.isUndefined(defaultValue) ? "" : defaultValue;
        /*
        * Because Jasmine is patched by protractor to wait also for promise in expect() , 
		* we decorate promise object that initially is unresolved and resolved when setValue is done.
        * */

		var that = protractor.promise.defer();
		//var that = this;

        var isPromise = protractor.promise.isPromise;

        that.name = function() {
            return name;
        };

        that.onGetValue = function(v) {
            return v;
        };

        that.onSetValue = function(oldVal, newVal) {
            return newVal;
        };

		that.autoResolve = true;

		that.resolve = function() {
			that.fulfill(value);
		};

        that.setValue = function(newValue) {
            var mv = this.onSetValue(value, newValue);
			console.log("setting value " + mv);
            value = mv;
			if (that.autoResolve) {
				that.resolve();
			}
        };

        that.getValue = function() {
            var gv = this.onGetValue(value);
            if (isPromise(gv)) {
                return protractor.promise.controlFlow().await(gv);
            }
            return gv;
        };

        that.valueOf = function() {
            return this.getValue();
        };

        that.toString = function() {
            return "" + this.getValue();
        };

		return that;
    };

    module.exports = SaveToObject;
})();
