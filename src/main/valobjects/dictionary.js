(function(){

    "use strict";

    var _ = require("lodash");

    var SaveToObject = require("./save-to-object");

    /* stores name-value collection */
    var Dictionary = function(name, initial) {

        if (_.isUndefined(initial)) {
            initial = {};
        }

        SaveToObject.call(this, name, initial);

        this.onSetValue = function(ov, nv) {
            ov[nv[0]] = nv[1];
            return ov;
        }

        this.getValueParent = this.getValue;

        this.getValue = function(n) {
           return this.getValueParent()[n];
        };

		this.autoResolve = false;

    };

    module.exports = Dictionary;

})();
