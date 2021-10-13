'use strict';

const NS_PER_SEC = 1e9;

/**
 * Zuid Generator
 * Not to be confused with a "zid", a "zuid" is a zesty-platform-wide unique ID.
 *
 * @see https://github.com/zesty-io/zuid-specification
 */
var Zuid = {

  chars: 'bcdfghjklmnpqrstvwxz0123456789',

  /**
   * Generate a zesty unique identifier
   *
   * @param prefix
   * @returns {string}
   */
  generate: function generate(prefix, size) {
    size = size || 6;
    if (size < 6 || size > 35) {
      throw new Error('Suffix length must be between 6 and 35');
    }

    // Part one: a numeric id
    var part1 = prefix;

    // Part two: A nano second timestamp in hexadecimal.
    const time = process.hrtime()
    const ns = time[0] * NS_PER_SEC + time[1]
    const hex = Number(ns).toString(16)
    const begin = hex.length - 10
    const end = hex.length
    const hash = hex.slice(begin, end)
    var part2 = hash

    // Part three: a random alphanumeric string (lowercase only)
    var part3 = '';
    for (var i = 1;i <= size; i++) {
      part3 += Zuid.chars[Math.floor(Math.random() * Zuid.chars.length)]
    }

    // We'll combine the 3 with hyphens in between
    return part1 + '-' + part2 + '-' + part3;
  },

  /**
   * Check if a Zuid matches a certain asset prefix
   *
   * @param {string} zuid
   * @param {string|int} prefix
   */
  matches: function matches(zuid, prefix) {
    var zuidParts = zuid.split('-');
    return ((zuidParts[0] || '') == prefix);
  },

  isValid: function isValid(zuid) {
    if (typeof zuid !== typeof '') {
      return false;
    }

    if (zuid.length < 5 || zuid.length > 50) {
      return false;
    }

    return zuid.match(/^(([0-9]+)-([a-f0-9]+)-([a-z0-9]+))$/)
  }

};

// -----------------------------------------------------------------------------------------
// START OF AUTOMATICALLY UPDATED PREFIXES (DO NOT REMOVE THIS LINE)

Zuid.prefix = {
  "RESOURCE": 0,
  "USER": 5,

  "SITE": 8,
  "SITE_CONTENT_SET": 6,
  "SITE_CONTENT_ITEM": 7,
  "SITE_CONTENT_ITEM_VERSION": 9,
  "SITE_VIEW": 11,
  "SITE_RESOURCE": 10,
  "SITE_STYLE_VARIABLE": 13,
  "SITE_FIELD": 12,
  "SITE_BLUEPRINT": 14,
  "SITE_LINK": 17,
  "PUBLISH_RECORD": 18,
  "SITE_REDIRECT": 19,
  "SITE_REDIRECT_MODIFIER": 20,
  "SITE_SETTING": 29,
  "MEDIA_BIN": 1,
  "MEDIA_FOLDER": 2,
  "MEDIA_FILE": 3,
  "MEDIA_FILE_MODIFIED": 4,
  "WEBHOOK": 40,
  "AUDIT_LOG_ENTRY": 15,
  "API_TOKEN": 55,  
  "API_TOKEN_USER": 55
}

// END OF AUTOMATICALLY UPDATED PREFIXES (DO NOT REMOVE THIS LINE)
// -----------------------------------------------------------------------------------------

module.exports = Zuid;
