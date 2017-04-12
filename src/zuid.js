'use strict';

// Date.now() polyfill
if (!Date.now) {
  Date.now = function() {
    return new Date().getTime();
  }
}

/**
 * Zuid Generator Service
 *
 * Not to be confused with a "zid", a "zuid" is a zesty-platform-wide unique ID.
 *
 * See https://github.com/zesty-io/zuid-specification
 */
var Zuid = {

  chars: 'bcdfghjklmnpqrstvwxz0123456789',
  
  /**
   * Generate a zesty unique identifier
   *
   * @param assetNum
   * @returns {string}
   */
  generate: function generate(assetNum, randomHashLength) {
    
    randomHashLength = randomHashLength || 6;
    
    if (randomHashLength < 5 || randomHashLength > 15) {
      throw new Error('randomHashLength must be between 5 and 15');
    }

    // Part one: a numeric id
    var part1 = assetNum;

    // Part two: A timestamp in hexadecimal. We'll subtract January 1st, 2015 (in seconds) from now to make this hash shorter
    var part2 = Math.floor((Date.now() / 1000) - 1420070400).toString(16);

    // Part three: a random, 5-character, alphanumeric string (lowercase only)
    var part3 = '';
    
    for (var i = 1;i <= randomHashLength; i++) {
      part3 += Zuid.chars[Math.floor(Math.random() * Zuid.chars.length)]
    }

    // We'll combine the 3 with hyphens in between
    return part1 + '-' + part2 + '-' + part3;

  },

  /**
   * Check if a Zuid matches a certain asset prefix
   *
   * @param {string} zuid
   * @param {string|int} assetNum
   */
  matches: function matches(zuid, assetNum) {
    var zuidParts = zuid.split('-');

    return ((zuidParts[0] || '') == assetNum);
  }

};

Zuid.prefix = {

  // Sites
  SITE: 0,

  // Media Service
  MEDIA_BIN: 1,
  MEDIA_FOLDER: 2,
  MEDIA_FILE: 3,
  MEDIA_FILE_MODIFIED: 4

};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Zuid;
}
