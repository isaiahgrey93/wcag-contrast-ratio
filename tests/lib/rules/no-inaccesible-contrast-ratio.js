/**
 * @fileoverview Prohibit use of color combinations that fail WCAG contrast ratio guidelines.
 * @author Isaiah Grey
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-inaccesible-contrast-ratio"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-inaccesible-contrast-ratio", rule, {
  valid: [
    'var style = { color: "white", backgroundColor: "black" }',
    "`color: white; background-color: black;`"
  ],

  invalid: [
    {
      code: 'var style = { color: "red", backgroundColor: "red" }',
      errors: [
        {
          message:
            "WCAG Contrast Ratio - F - The color: red is inaccessible against background-color: red."
        }
      ]
    }
  ]
});
