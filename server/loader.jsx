// Express requirements
import path from 'path';
import fs from 'fs';

// Material UI stuff
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
// import { Provider } from "react-redux";
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';

// Our store, entrypoint, and manifest
// import createStore from "../src/store";
import DeviceDetector from '../src/components/DeviceDetector/DeviceDetector.jsx';
import App from '../src/components/App/App.jsx';
import manifest from '../build/asset-manifest.json'; // eslint-disable-line import/no-unresolved

import theme from '../src/EasTheme.jsx';

// LOADER
export default (req, res) => {
  /*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
  */
  const injectHTML = (data, { html, title, meta, body, state, css }) => {
    let content = data;
    content = content.replace('<html>', `<html ${html}>`);
    content = content.replace(/<title>.*?<\/title>/g, title);
    content = content.replace('</head>', `${meta}</head>`);
    content = content.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`,
    );
    content = content.replace(
      '<style id="jss-server-side"></style>',
      `<style id="jss-server-side">${css}</style>`,
    );
    return content;
  };

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Load in our HTML file from our build
  // eslint-disable-next-line consistent-return
  fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
    // If there's an error... serve up something nasty
    if (err) {
      console.error('Read error', err);
      return res.status(404).end();
    }

    const context = {};
    const renderedHtml = renderToString(
      <StaticRouter location={req.url} context={context}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <DeviceDetector userAgent={req.headers['user-agent']}>
              <App />
            </DeviceDetector>
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>,
    );

    // We need to tell Helmet to compute the right meta tags, title, and such
    const helmet = Helmet.renderStatic();

    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();

    // Pass all this nonsense into our HTML formatting function above
    const html = injectHTML(htmlData, {
      html: helmet.htmlAttributes.toString(),
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      body: renderedHtml,
      state: JSON.stringify({}).replace(/</g, '\\u003c'),
      css,
    });
    console.log(html);

    // We have all the final HTML, let's send it to the user already!
    res.send(html);
  });
};
