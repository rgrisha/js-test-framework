(function () {

    "use strict";

    var SaveToObject = require("./save-to-object");

    /* Before saving a value applies comparison function to existing and new values.
       If function succeeds, replaces existing value by new one */
    var SaveToObjectWithCompare = function(name, compareFn) {

        SaveToObject.call(this, name, "");
        this.val = "";

        this.onSetValue = function(ov, nv) {
            if (!ov) {
                return nv;
            }

            return compareFn(ov, nv) ? nv : ov;
        };

		this.autoResolve = true;

    };

    module.exports = SaveToObjectWithCompare;
})();
