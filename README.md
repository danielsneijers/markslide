# Presenter

A cool tool you fool

## Installation
Make sure you have Node.js (v6+) and `yarn` running on your machine, cd to the root of this project and then

```bash
$ yarn
```
to install dependencies.

## Editing your presentation
Running `$ yarn run dev` will open the presentation in your browser and'll refresh on every change you make (except when applying themes, see [themes](#themes)).

When you're ready for an optimized production build, use `$ yarn run build`, or `$yarn run serve` to build it and serve it from localhost.

### Syntax
Standard markdown syntax is used, but every `---` on a new line indicates a new slide.

### Settings
All files you need are in the `config` folder, change them however you seem fit

### Themes
Applying a different theme requires a Webpack restart
