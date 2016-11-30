(function() {

    "use strict";

    var SaveToObject = require("./save-to-object");
    var _ = require("lodash");

    /* this object stores not an actual value, but setValue calls */
    var Counter = function(name, counter) {

        if (_.isUndefined(counter)) {
            counter = 0;
        }

        SaveToObject.call(this, name, counter);

        this.onSetValue = function(ov, nv) {
            return ov + 1;
        }

		this.autoResolve = false;

    };

    module.exports = Counter;
})();
