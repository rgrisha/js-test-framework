(function() {

    "use strict";
    var SaveToObject = require("./save-to-object");

    /* stores count of distinct names */
     var DistinctCounter = function (name) {

         SaveToObject.call(this, name, {});

         var counter = 0;

         this.onSetValue = function(ov, nv) {
             if (!ov[nv]) {
                 ov[nv] = true;
                 counter++;
             }
             return ov;
         };

         this.onGetValue = function(v) {
             return counter;
         };

		 this.autoResolve = false;

    };

    module.exports = DistinctCounter;
})();

