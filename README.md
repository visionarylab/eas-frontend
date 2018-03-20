> *This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) +
  [backpack-react-scripts](https://github.com/Skyscanner/backpack-react-scripts/tree/master/packages/react-scripts).*
  It is very similar to one that you would create using [Create React App](https://github.com/facebookincubator/create-react-app)
  without [backpack-react-scripts](https://github.com/Skyscanner/backpack-react-scripts/tree/master/packages/react-scripts),
  so please refer to [it's documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
  for more usage information.

# EchaloASuerte

Echalo A Suerte in React

## npm script commands

`backpack-react-scripts` is listed as a `devDependency` in your [package.json](./package.json) and exposes the following
npm scripts:

- `npm start`: Runs the app in development mode. Open [http://localhost:3000/](http://localhost:3000/) to
  view it in the browser. The page will reload if you make edits. You will see the build errors in the console.
- `npm test`: Runs the test watcher in an interactive mode. By default, runs tests related to files changes
  since the last commit.
- `npm run build`: Builds the app for production to the build folder. It correctly bundles React in production mode
  and optimizes the build for the best performance. The build is minified and the filenames include the hashes.
  Your app is ready to be deployed!
- `npm run lint`: Lints all javascript using [`eslint-config-skyscanner`](https://www.npmjs.com/package/eslint-config-skyscanner).

## Server Side Rendering (SSR)

Most of the time you wont need server side rendering, however if you need to generate your app's HTML on
the server and send the markup down on the initial request to improve perceived page load or to allow search engines
to crawl your pages for SEO purposes, then create a file named `ssr.js` in your app's root folder:

```
my-app/
  src/
    ...
    index.js
    ssr.js    // <-- create this file
```

Inside `ssr.js`, export the components that you wish to expose for server side rendering - the file contents should look
something like this:

```js
import App from './App';

export default { App };
```

Run `npm run build` as you would to build a production browser bundle - you should notice an additional `ssr.js` file in
the output directory:
```
my-app/
  build/
    static/
    asset-manifest.json
    favicon.ico
    index.html
    ssr.js                // <-- new output file
```

This file can now be required and pre-rendered on the server like so (rough implementation):

`server.js`:

```js
const React = require('react');
const express = require('express');
const ReactDOMServer = require('react-dom/server');

const components = require('./my-app/build/ssr').default;

const router = express.Router();

router.get('/', (req, res) => {
  const element = React.createElement(components.App);
  const html = ReactDOMServer.renderToString(element);

  res.render('index', { html });
});

module.exports = router;
```

`index.html`:

```html
<div id="root">{{{html}}}</div>
```

If you call `ReactDOM.render()` on a node that already has this server-rendered markup (`<div id="root">` in the example
above), React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

**Note:** Your external module imports (anything you import from `node_modules/` i.e. `import React from 'react';`) are bundled
into the `ssr.js` output file. If you want to exclude any external modules from the output file for performance / code sharing
reasons (i.e. if it's beign required elsewhere and is already in memory) you can do so by adding the following to your
`package.json`:

```json
{
  ...
  "backpack-react-scripts": {
    "ssrExternals": [
      "react",
      "react-dom"
    ]
  }
}
```
