# eslint-plugin-wcag-contrast-ratio

Help enforce Web Content Accessibility contrast ratio guidelines.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-wcag-contrast-ratio`:

```
$ npm install eslint-plugin-wcag-contrast-ratio --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-wcag-contrast-ratio` globally.

## Usage

Add `wcag-contrast-ratio` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "wcag-contrast-ratio"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "wcag-contrast-ratio/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





