# Presenter

Simple tool to convert your markdown to shiny presentations

## Installation
Make sure you have Node.js (v6+) and `yarn` running on your machine, cd to the root of this project and then

```bash
$ yarn
```

to install dependencies.

## Editing your presentation
All files which are meant to be edited are in the `./config` folder of the project. `config/slides.md` holds the markdown that will be turned into the keynote. Running

```bash
$ yarn run dev
```

will open the presentation in your browser and'll refresh on every change you make. If you want a optimized and minified production build, see [Building and serving for production](#building-and-serving-for-production)

### Syntax
All standard and Github flavored markdown syntax is supported in your slide. There are some custom rules which help building rich slides:

| Syntax                                   | Second Header                       |
| ---------------------------------------- | ----------------------------------- |
| `---` (preceded and followed by newline) | Creates a new slide                 |
| `{:class foo}`                           | Add CSS class to the current slide  |

### Controls
| Key         | Function         |
| ----------- | ---------------- |
| Right Arrow | Next Slide       |
| Up Arrow    | Next Slide       |
| Left Arrow  | Previous Slide   |
| Down Arrow  | Previous Slide   |
| F           | Enter fullscreen |

### Config
The `config` folder holds all relevant data for your presentation.

| File / Folder | Usage                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| settings.js   | Global settings, see [Settings](#settings) for more details                                                           |
| slides.md     | The markdown file which will convert to your keynote                                                                  |
| custom.css    | File for you custom CSS. Each slide has a `slide-(index)` class, e.g. `slide-1`. Regular slides have the `regular-slide` class and code slides have the `code-slide` class by default                                                                            |
| images/       | For the images you want to use in your presentation. You can include them in your markdown files like [!inline-image](/images/foo.png) or css files like `/images/foo.png`                                                                    |
| themes/       | Folder containing the themes you can use in `settings.js` and a `index.js` file which dynamically loads the applied theme files                                                                                                                                   |
| __mocks__     | File containing mocks for tests                                                                                       |

### Settings
All files you need are in the `config` folder, change them however you seem fit

| Option        | Second Header                                              |
| ------------- | ---------------------------------------------------------- |
| `title`       | Sets the title in HTML head, visible in your browser tab   |
| `progressBar` | Toggles the progress bar on top of your slides             |
| `theme`       | The name of the theme you want to use (without the `.css`) |
| `colors`      | Define colors you can reuse in your presentation. For example `blue: '#56A9F6'` in settings can be used as `<blue>This text is blue</blue>` in your `slides.md`                                     |

## Building and serving for production
When you're ready for an optimized production build, use `$ yarn run build` to build a minified production build, or `$ yarn start` to do a production build and serve it from localhost.
