/**
 * @fileoverview Prohibit use of color combinations that fail WCAG contrast ratio guidelines.
 * @author Isaiah Grey
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const contrast = require("get-contrast");

module.exports = {
  meta: {
    name: "no-inaccesible-contrast-ratio",
    type: "suggestion",
    docs: {
      description:
        "Prohibit use of color combinations that fail WCAG contrast ratio guidelines.",
      category: "a11y",
      recommended: false
    },
    fixable: null,
    schema: []
  },

  create: function(context) {
    return {
      TemplateLiteral: function(primary) {
        const styles = primary.quasis[0].value.raw
          .split(";")
          .map(token =>
            token
              .split(":")
              .map(item => item.trim())
              .filter(item => !!item)
          )
          .filter(item => !!item.length)
          .reduce(
            (styleObj, [key, value]) => ({
              ...styleObj,
              [key]: value
            }),
            {}
          );

        if (styles.color && styles["background-color"]) {
          const score = contrast.score(
            styles.color,
            styles["background-color"]
          );

          const ratio = contrast
            .ratio(styles.color, styles["background-color"])
            .toFixed(2);

          if (score === "AA") {
            context.report(
              primary,
              `WCAG Contrast Ratio - AA - ${ratio} - The color: ${
                styles.color
              } is accessible against background-color: ${
                styles["background-color"]
              }, but requires a minimum font-size of 14pt-Bold or 18pt-Regular.`
            );
          } else if (score !== "AA" && score !== "AAA") {
            context.report(
              primary,
              `WCAG Contrast Ratio - F - ${ratio} - The color: ${
                styles.color
              } is inaccessible against background-color: ${
                styles["background-color"]
              }.`
            );
          }
        }
      },
      Property: function(primary) {
        if (primary.key.name !== "color") return;

        const colorKey = primary.key.name;
        const colorValue = primary.value.value;
        const parent = primary.parent;
        const properties = parent ? parent.properties : [];

        const backgroundColor = properties.find(
          property => property.key.name === "backgroundColor"
        );

        if (backgroundColor) {
          const backgroundColorKey = backgroundColor.key.name;
          const backgroundColorValue = backgroundColor.value.value;

          const score = contrast.score(colorValue, backgroundColorValue);
          const ratio = contrast
            .ratio(colorValue, backgroundColorValue)
            .toFixed(2);

          if (score === "AA") {
            context.report(
              primary,
              `WCAG Contrast Ratio - AA - ${ratio} - The color: ${colorValue} is accessible against background-color: ${backgroundColorValue}, but requires a minimum font-size of 14pt-Bold or 18pt-Regular.`
            );
          } else if (score !== "AA" && score !== "AAA") {
            context.report(
              primary,
              `WCAG Contrast Ratio - F - ${ratio} - The color: ${colorValue} is inaccessible against background-color: ${backgroundColorValue}.`
            );
          }
        }
      }
    };
  }
};
