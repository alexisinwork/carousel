# Simple Carousel

Sample webpack project with ES6 and Sass. Also includes Sass linting setup with [stylelint](https://github.com/stylelint/stylelint) and [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern), to enforce BEM patterns for selectors.
Also before start - webpack will check all js files, according to [eslint](https://github.com/eslint/eslint).

This is a basic carousel that only includes two main app files for demo purposes: `./src/main.js` and `./src/main.scss` and carousel folder with Carousel logic and styles.

## Environment setup

```sh
  $ npm install
```

## Development

Start the Webpack server (includes live reloading when you change files):

```sh
  $ npm start
```

It will also build a project, before starting a server.

Open [http://localhost:3000](http://localhost:3000) in a browser. `./src/main.js` is the entry point.
Open [http://localhost:3001](http://localhost:3001) in a browser for local development.

## Linting

[Stylelint](http://stylelint.io/) is used to enforce consistent conventions and avoid errors in stylesheets.
`.stylelintrc` configuration file contains all the available rules for completeness, with the ones that I don't currently need turned off (set to `null`).
I've edited the options of each rule to my liking, based mostly on [stylelint example config](http://stylelint.io/user-guide/example-config/) and [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard).
For more info, see [stylelint rules documentation](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md).

[EsLint](https://github.com/eslint/eslint) is used to enforce consistent conventions and avoid errors in stylesheets.

## Bundling

```sh
  $ npm run build
```
