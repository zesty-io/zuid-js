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
  "MEDIA_BIN": 1,
  "MEDIA_FOLDER": 2,
  "MEDIA_FILE": 3,
  "MEDIA_FILE_MODIFIED": 4,
  "USER": 5,
  "SITE_CONTENT_SET": 6,
  "SITE_CONTENT_ITEM": 7,
  "SITE": 8,
  "SITE_CONTENT_ITEM_VERSION": 9,
  "SITE_RESOURCE": 10,
  "SITE_VIEW": 11,
  "SITE_FIELD": 12,
  "SITE_STYLE_VARIABLE": 13,
  "SITE_BLUEPRINT": 14,
  "AUDIT_LOG_ENTRY": 15,
  "SITE_STYLE_VARIABLE_CATEGORY": 16,
  "SITE_LINK": 17,
  "SITE_PUBLISH_RECORD": 18,
  "SITE_REDIRECT": 19,
  "SITE_REDIRECT_MODIFIER": 20,
  "SITE_HEADTAG": 21,
  "SITE_DOMAIN": 22,
  "LEAD": 23,
  "COMMENT": 24,
  "REPLY": 25,
  "SITE_GROUP": 26,
  "SITE_RELEASE": 27,
  "SITE_RELEASE_MEMBER": 28,
  "SITE_SETTING": 29,
  "ROLE": 30,
  "SYSTEM_ROLE": 31,
  "GRANULAR_ROLE": 32,
  "ECOSYSTEM": 35,
  "SITE_LABEL": 36,
  "SITE_ITEM_LABELING": 37,
  "WEBHOOK": 40,
  "INSTANCE_PLAN": 50,
  "API_TOKEN": 55,  
  "API_TOKEN_USER": 55,  
  "COMPANY": 60,
  "TEAM": 65,
  "TEAM_INVITE": 66,
  "INVITE": 70,
  "USER_EMAIL": 71,
  "APP_INSTALL": 81,
  "THIRD_PARTY_APPLICATION": 90,
  "THIRD_PARTY_OAUTH_TOKEN": 91,
  "CHAT": 100,
  "PROMPT": 101
}

// END OF AUTOMATICALLY UPDATED PREFIXES (DO NOT REMOVE THIS LINE)
// -----------------------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Zuid;
}
