'use strict';

// Date.now() polyfill
if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    }
}

/**
 * Zuid Generator Service
 *
 * Not to be confused with a "zid", a "zuid" is a zesty-platform-wide unique ID.
 */
var Zuid = {

    /**
     * Generate a zesty unique identifier
     *
     * @param assetNum
     * @returns {string}
     */
    generate: function (assetNum) {

        // Part one: a numeric id encoded as hexadecimal
        var part1 = assetNum.toString(16);

        // Part two: A timestamp in hexadecimal. We'll subtract January 1st, 2015 (in seconds) from now to make this hash shorter
        var part2 = Math.floor((Date.now() / 1000) - 1420070400).toString(16);

        // Part three: a random, 5-character, alphanumeric string (lowercase only)
        var part3 = Math.random().toString(36).substr(2, 5);

        // We'll combine the 3 with hyphens in between
        return part1 + '-' + part2 + '-' + part3;

    }
};

Zuid.prefix = {

    // Sites
    SITE: 0,

    // Media Service
    MEDIA_BIN: 1,
    MEDIA_FOLDER: 2,
    MEDIA_FILE: 3

};

module.exports = Zuid
