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
  const injectHTML = (data, { html, title, meta, body, scripts, state, css }) => {
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
    content = content.replace('</body>', `${scripts.join('')}</body>`);

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

    // Create a store (with a memory history) from our current url
    //   const { store } = createStore(req.url);

    const context = {};
    const modules = [];

    /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests

        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */
    frontloadServerRender(() =>
      renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StaticRouter location={req.url} context={context}>
            <Frontload isServer>
              <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                  <DeviceDetector userAgent={req.headers['user-agent']}>
                    <App />
                  </DeviceDetector>
                </MuiThemeProvider>
              </JssProvider>
            </Frontload>
          </StaticRouter>
        </Loadable.Capture>,
      ),
    ).then(routeMarkup => {
      if (context.url) {
        // If context has a url property, then we need to handle a redirection in Redux Router
        res.writeHead(302, {
          Location: context.url,
        });

        res.end();
      } else {
        // Otherwise, we carry on...

        // Let's give ourself a function to load all our page-specific JS assets for code splitting
        const extractAssets = (assets, chunks) =>
          Object.keys(assets)
            .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
            .map(k => assets[k]);

        // Let's format those assets into pretty <script> tags
        const extraChunks = extractAssets(manifest, modules).map(
          c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`,
        );

        // We need to tell Helmet to compute the right meta tags, title, and such
        const helmet = Helmet.renderStatic();

        // NOTE: Disable if you desire
        // Let's output the title, just to see SSR is working as intended
        console.log('THE TITLE', helmet.title.toString());

        // Grab the CSS from our sheetsRegistry.
        const css = sheetsRegistry.toString();

        // Pass all this nonsense into our HTML formatting function above
        const html = injectHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          body: routeMarkup,
          scripts: extraChunks,
          state: JSON.stringify({}).replace(/</g, '\\u003c'),
          css,
        });

        // We have all the final HTML, let's send it to the user already!
        res.send(html);
      }
    });
  });
};
