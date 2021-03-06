/**
 * @fileoverview Help enforce Web Content Accessibility contrast ratio guidelines.
 * @author Isaiah Grey
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.configs = {
  recommended: {
    rules: {
      "no-inaccesible-contrast-ratio": 1
    }
  }
};
